import { WhatsAppIcon } from "@/components/icons/whatsapp-icon";
import { buildWhatsAppUrl, defaultWhatsAppMessage } from "@/lib/whatsapp";

/**
 * FloatingWhatsAppButton — persistent bottom-right WhatsApp launcher.
 * Rendered once in the root layout so it appears on every page. Hovering
 * reveals a "Chat with us" label; clicking opens WhatsApp with a general
 * enquiry message pre-filled. Pure CSS hover (no client JS needed).
 *
 * Two accessibility details live here:
 * - the label is dark green, not white: white on the brand green `#25D366` is
 *   1.98:1, well under the 4.5:1 that 1.4.3 requires for 14 px text, while
 *   `#0B3B2E` on the same green measures about 6.3:1. The brand colour of the
 *   pill and the white glyph are unchanged.
 * - positioning lives in `.floating-whatsapp` (app/globals.css) because it has
 *   to clear the consent banner, whose height the banner publishes as
 *   `--consent-banner-height` while it is displayed (WCAG 2.4.11).
 */
export function FloatingWhatsAppButton() {
  return (
    <a
      href={buildWhatsAppUrl(defaultWhatsAppMessage)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      title="Chat with us on WhatsApp"
      className="group floating-whatsapp flex items-center overflow-hidden rounded-full bg-[#25D366] p-3.5 text-white shadow-lg shadow-black/25 transition-[padding] duration-300 hover:pr-5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
    >
      <WhatsAppIcon className="size-6 shrink-0" />
      <span className="max-w-0 overflow-hidden whitespace-nowrap text-sm font-medium text-[#0B3B2E] opacity-0 transition-all duration-300 group-hover:max-w-40 group-hover:opacity-100 group-hover:pl-2">
        Chat with us
      </span>
    </a>
  );
}
