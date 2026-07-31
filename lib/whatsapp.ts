import { company, contact } from "@/lib/business/company";

/**
 * wa.me requires digits only (no +, spaces, or dashes), so the configured
 * contact number is normalized once here.
 */
const WHATSAPP_PHONE = contact.phones.whatsapp.replace(/[^\d]/g, "");

/**
 * Builds a WhatsApp deep link. Pass a message to pre-fill the chat —
 * every WhatsApp entry point on the site should pass one so the
 * conversation starts with useful context instead of a blank chat.
 */
export function buildWhatsAppUrl(message?: string): string {
  if (!message) return `https://wa.me/${WHATSAPP_PHONE}`;
  return `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(message)}`;
}

/**
 * Generic message used by the site-wide floating WhatsApp button, shown on
 * every page that isn't a specific service context.
 */
export const defaultWhatsAppMessage = `Hi ${company.name}, I'd like to talk about a project.`;

/**
 * Per-service message used on service cards and service detail pages, so
 * the conversation opens already scoped to the service the visitor clicked
 * from.
 */
export function serviceWhatsAppMessage(serviceTitle: string): string {
  return `Hi ${company.name}, I'm interested in your "${serviceTitle}" service. Could you share more details?`;
}
