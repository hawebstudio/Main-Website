"use server";

import { headers } from "next/headers";
import {
  contactFormSchema,
  contactIntentOptions,
  ContactFormValues,
} from "@/lib/content/schemas";
import {
  RATE_LIMIT_CONFIGS,
  createRateLimiter,
  validateHoneypot,
  validateServerAction,
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

    // Phase 4: Real Email Sending with Resend
    if (process.env.RESEND_API_KEY) {
      const { error: sendError } = await resend.emails.send({
        from: process.env.RESEND_FROM_EMAIL || "HA Web Studio <enquiries@hawebstudio.com>",
        to: contact.emails.general,
        replyTo: parsedData.email,
        subject: `New Enquiry from ${parsedData.name}`,
        text: `
          Name: ${parsedData.name}
          Email: ${parsedData.email}
          Company: ${parsedData.company || "N/A"}
          Budget: ${parsedData.budget || "N/A"}
          Interested in: ${
            contactIntentOptions.find((option) => option.value === parsedData.intent)
              ?.label || parsedData.intent
          }
          
          Message:
          ${parsedData.message}
        `,
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

function getClientIp(requestHeaders: Headers) {
  return (
    requestHeaders.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    requestHeaders.get("x-real-ip") ??
    "local"
  );
}
