"use server";

import { headers } from "next/headers";
import {
  contactFormSchema,
  contactIntentOptions,
  budgetOptions,
  ContactFormValues,
} from "@/lib/content/schemas";
import {
  RATE_LIMIT_CONFIGS,
  createRateLimiter,
  validateHoneypot,
  validateServerAction,
  sanitizeContactField,
} from "@/lib/security";
import { contact } from "@/lib/business/company";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY || "");

const limiter = createRateLimiter(RATE_LIMIT_CONFIGS.strict);

export async function submitContactForm(data: ContactFormValues) {
  try {
    const parsedData = contactFormSchema.parse(data);

    const honeypot = validateHoneypot(parsedData);
    if (!honeypot.valid) {
      return {
        success: true,
        message: "Your enquiry has been received. We will be in touch shortly.",
      };
    }

    const security = await validateServerAction({
      validateInput: (input) => contactFormSchema.safeParse(input).success,
    });
    if (!security.valid) {
      return {
        success: false,
        message:
          security.reason ||
          "Unable to verify your submission. Please try again.",
      };
    }

    const ip = getClientIp(await headers());
    const rateLimit = limiter.check(ip);
    if (!rateLimit.success) {
      return {
        success: false,
        message: "Too many submissions. Please wait a minute and try again.",
      };
    }

    const submissionId = crypto.randomUUID();
    console.info(`Contact enquiry received: ${submissionId}`);

    const budgetLabel = parsedData.budget
      ? budgetOptions.find((option) => option.value === parsedData.budget)?.label ||
        parsedData.budget
      : "N/A";
    const resolvedBudget =
      parsedData.budget === "custom" && parsedData.customBudget
        ? `Custom: ${parsedData.customBudget}`
        : budgetLabel;

    // Attribution fields arrive from client-side state (query params /
    // referrer), so they're sanitized like any other client-provided
    // input before use — never trusted blindly (never used for logic,
    // only surfaced for context in the notification email below).
    const sourcePage = parsedData.sourcePage
      ? sanitizeContactField(parsedData.sourcePage, 300)
      : "";
    const campaign = parsedData.campaign
      ? sanitizeContactField(parsedData.campaign, 150)
      : "";
    const utmSource = parsedData.utmSource
      ? sanitizeContactField(parsedData.utmSource, 150)
      : "";
    const utmMedium = parsedData.utmMedium
      ? sanitizeContactField(parsedData.utmMedium, 150)
      : "";
    const utmCampaign = parsedData.utmCampaign
      ? sanitizeContactField(parsedData.utmCampaign, 150)
      : "";
    const utmContent = parsedData.utmContent
      ? sanitizeContactField(parsedData.utmContent, 150)
      : "";
    const hasCampaignData = Boolean(
      campaign || utmSource || utmMedium || utmCampaign || utmContent
    );

    const intentLabel =
      contactIntentOptions.find((option) => option.value === parsedData.intent)
        ?.label || parsedData.intent;

    // Server-generated submission time — the client-supplied `timestamp`
    // field exists only for the honeypot's bot-timing check (see
    // lib/security/honeypot.ts) and shouldn't be reused for display.
    const submittedAt = new Date().toLocaleString("en-IN", {
      dateStyle: "medium",
      timeStyle: "short",
      timeZone: "Asia/Kolkata",
    });

    // Phase 4: Real Email Sending with Resend
    if (process.env.RESEND_API_KEY) {
      const { error: sendError } = await resend.emails.send({
        from: process.env.RESEND_FROM_EMAIL || "HA Web Studio <enquiries@hawebstudio.com>",
        to: contact.emails.general,
        replyTo: parsedData.email,
        // Leads intent up front so it's visible in an inbox preview
        // without opening the email.
        subject: `New Lead: ${intentLabel} — ${parsedData.name}`,
        text: buildLeadEmailText({
          intentLabel,
          sourcePage,
          resolvedBudget,
          name: parsedData.name,
          email: parsedData.email,
          company: parsedData.company,
          message: parsedData.message,
          hasCampaignData,
          campaign,
          utmSource,
          utmMedium,
          utmCampaign,
          utmContent,
          submittedAt,
        }),
      });

      // The Resend SDK returns `{ error }` on failure instead of throwing,
      // so this has to be checked explicitly or failures pass silently.
      if (sendError) {
        console.error(
          `Contact enquiry ${submissionId} received but email failed to send:`,
          sendError
        );
        return {
          success: false,
          message:
            "There was an error submitting your enquiry. Please try again.",
        };
      }
    }

    return {
      success: true,
      message: "Your enquiry has been received. We will be in touch shortly.",
    };
  } catch (error) {
    console.error("Contact form submission error:", error);
    return {
      success: false,
      message: "There was an error submitting your enquiry. Please try again.",
    };
  }
}

// Structured, scannable lead-notification body. Puts "what do they want"
// and "where did they come from" first, since those are the two things
// HA needs to qualify a lead before opening anything else.
//
// Note: this codebase captures the referring page (same-origin
// `document.referrer`, see components/forms/lead-form.tsx) as a single
// attribution signal — there's no separate mechanism that records the
// specific CTA a visitor clicked. "Source Page" below is that signal;
// it deliberately isn't duplicated under a second "CTA Source" label; that
// would create the false impression of two independent data points, only
// add it back once the CTA components actually pass a click-level label.
function buildLeadEmailText(input: {
  intentLabel: string;
  sourcePage: string;
  resolvedBudget: string;
  name: string;
  email: string;
  company?: string;
  message: string;
  hasCampaignData: boolean;
  campaign: string;
  utmSource: string;
  utmMedium: string;
  utmCampaign: string;
  utmContent: string;
  submittedAt: string;
}) {
  const {
    intentLabel,
    sourcePage,
    resolvedBudget,
    name,
    email,
    company,
    message,
    hasCampaignData,
    campaign,
    utmSource,
    utmMedium,
    utmCampaign,
    utmContent,
    submittedAt,
  } = input;

  const lines = [
    "--------------------------------",
    "NEW HA WEB STUDIO LEAD",
    "--------------------------------",
    "",
    "Lead Intent:",
    intentLabel,
    "",
    "Budget:",
    resolvedBudget,
    "",
    "Name:",
    name,
    "",
    "Email:",
    email,
    "",
    "Company:",
    company || "N/A",
    "",
    "Message:",
    message,
    "",
    "Source Page:",
    sourcePage || "Direct / not captured",
  ];

  if (hasCampaignData) {
    lines.push(
      "",
      "Campaign:",
      campaign || "N/A",
      `(utm_source: ${utmSource || "N/A"}, utm_medium: ${utmMedium || "N/A"}, utm_campaign: ${utmCampaign || "N/A"}, utm_content: ${utmContent || "N/A"})`
    );
  }

  lines.push(
    "",
    "Submitted:",
    submittedAt,
    "",
    "--------------------------------"
  );

  return lines.join("\n");
}

function getClientIp(requestHeaders: Headers) {
  return (
    requestHeaders.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    requestHeaders.get("x-real-ip") ??
    "local"
  );
}
