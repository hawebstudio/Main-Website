import { WhatsAppIcon } from "@/components/icons/whatsapp-icon";
import { buildWhatsAppUrl, defaultWhatsAppMessage } from "@/lib/whatsapp";

/**
 * FloatingWhatsAppButton — persistent bottom-right WhatsApp launcher.
 * Rendered once in the root layout so it appears on every page. Hovering
 * reveals a "Chat with us" label; clicking opens WhatsApp with a general
 * enquiry message pre-filled. Pure CSS hover (no client JS needed).
 */
export function FloatingWhatsAppButton() {
  return (
    <a
      href={buildWhatsAppUrl(defaultWhatsAppMessage)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      title="Chat with us on WhatsApp"
      className="group fixed bottom-6 right-6 z-50 flex items-center overflow-hidden rounded-full bg-[#25D366] p-3.5 text-white shadow-lg shadow-black/25 transition-[padding] duration-300 hover:pr-5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring sm:bottom-8 sm:right-8"
    >
      <WhatsAppIcon className="size-6 shrink-0" />
      <span className="max-w-0 overflow-hidden whitespace-nowrap text-sm font-medium opacity-0 transition-all duration-300 group-hover:max-w-40 group-hover:opacity-100 group-hover:pl-2">
        Chat with us
      </span>
    </a>
  );
}
