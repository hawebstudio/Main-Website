"use client";

import { useEffect, useState } from "react";
import { Mail, Link as LinkIcon, Check, Share2 } from "lucide-react";
import { Container } from "@/components/primitives/container";
import { Section } from "@/components/primitives/section";
import { Text } from "@/components/primitives/typography";
import { WhatsAppIcon } from "@/components/icons/whatsapp-icon";
import { cn } from "@/lib/utils";

interface SocialShareSectionProps {
  /** Page title, used as the pre-filled share text */
  title: string;
  /** Absolute URL of the page being shared */
  url: string;
  /** Optional short description, used by the native share sheet and email body */
  description?: string;
  className?: string;
}

type ShareAction =
  | {
      kind: "button";
      label: string;
      onClick: () => void;
      icon: React.ReactNode;
      activeIcon?: React.ReactNode;
      active?: boolean;
    }
  | { kind: "link"; label: string; href: string; icon: React.ReactNode };

/**
 * Drop this at the bottom of any content detail page (insight, problem,
 * technology, case study, service, or project). Renders, in order:
 * Copy Link, Native Share (only if the browser supports the Web Share API),
 * WhatsApp, X, Facebook, LinkedIn, Email.
 *
 * Usage:
 *   <SocialShareSection title={entry.title} description={entry.description} url={absoluteUrl(routes.x.detail(entry.slug))} />
 */
export function SocialShareSection({
  title,
  url,
  description,
  className,
}: SocialShareSectionProps) {
  const [copied, setCopied] = useState(false);
  const [canNativeShare, setCanNativeShare] = useState(false);

  // Checked client-side after mount: navigator.share is undefined during SSR,
  // and most desktop browsers still don't support it, so this only renders
  // the native option when it will actually work (mainly mobile browsers).
  useEffect(() => {
    setCanNativeShare(
      typeof navigator !== "undefined" && typeof navigator.share === "function",
    );
  }, []);

  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);
  const encodedBody = encodeURIComponent(
    description ? `${description}\n\n${url}` : url,
  );

  const shareText = description ? `${title} — ${description}` : title;
  const truncatedShareText =
    shareText.length > 200 ? `${shareText.slice(0, 197)}...` : shareText;
  const encodedShareText = encodeURIComponent(truncatedShareText);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard API unavailable (e.g. insecure context) — fail silently,
      // the other share options below still work.
    }
  }

  async function handleNativeShare() {
    try {
      await navigator.share({ title, text: description, url });
    } catch (error) {
      // AbortError fires when the person just closes the share sheet —
      // that's a normal cancel, not a failure, so don't surface it.
      if (error instanceof Error && error.name === "AbortError") return;
    }
  }

  const actions: ShareAction[] = [
    {
      kind: "button",
      label: copied ? "Copied" : "Copy link",
      onClick: handleCopy,
      icon: <LinkIcon className="size-4" />,
      activeIcon: <Check className="size-4" />,
      active: copied,
    },
    ...(canNativeShare
      ? ([
          {
            kind: "button",
            label: "Share",
            onClick: handleNativeShare,
            icon: <Share2 className="size-4" />,
          },
        ] as ShareAction[])
      : []),
    {
      kind: "link",
      label: "Share on WhatsApp",
      href: `https://wa.me/?text=${encodedShareText}%20${encodedUrl}`,
      icon: <WhatsAppIcon className="size-4" />,
    },
    {
      kind: "link",
      label: "Share on X",
      href: `https://twitter.com/intent/tweet?text=${encodedShareText}&url=${encodedUrl}`,
      icon: <XIcon className="size-4" />,
    },
    {
      kind: "link",
      label: "Share on Facebook",
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      icon: <FacebookIcon className="size-4" />,
    },
    {
      kind: "link",
      label: "Share on LinkedIn",
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      icon: <LinkedInIcon className="size-4" />,
    },
    {
      kind: "link",
      label: "Share via email",
      href: `mailto:?subject=${encodedTitle}&body=${encodedBody}`,
      icon: <Mail className="size-4" />,
    },
  ];

  return (
    <Section spacing="sm" className={className}>
      <Container>
        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-border pt-8">
          <Text size="sm" tone="muted" className="font-medium">
            Share this page
          </Text>
          <div className="flex flex-wrap items-center gap-2">
            {actions.map((action) =>
              action.kind === "link" ? (
                <a
                  key={action.label}
                  href={action.href}
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  aria-label={action.label}
                  title={action.label}
                  className="flex size-9 items-center justify-center rounded-full border border-border/60 bg-background/45 text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary"
                >
                  {action.icon}
                </a>
              ) : (
                <button
                  key={action.label}
                  type="button"
                  onClick={action.onClick}
                  aria-label={action.label}
                  title={action.label}
                  className={cn(
                    "flex items-center gap-2 rounded-full border border-border/60 bg-background/45 px-3 py-2 text-xs font-medium text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary",
                    action.active && "border-primary/40 text-primary",
                  )}
                >
                  {action.active ? action.activeIcon : action.icon}
                  {action.label}
                </button>
              ),
            )}
          </div>
        </div>
      </Container>
    </Section>
  );
}

/* ---------- Inline brand icons ----------
 * lucide-react (v1.x used in this project) dropped brand/logo icons, so
 * these are small local SVGs instead of a dependency on an icon pack.
 * Share2, Mail, Link, and Check are generic (non-brand) icons and still
 * come from lucide-react.
 */

function XIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.446-2.136 2.94v5.666H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 1 1 0-4.124 2.062 2.062 0 0 1 0 4.124zM7.114 20.452H3.56V9h3.554v11.452z" />
    </svg>
  );
}

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M22 12.06C22 6.505 17.523 2 12 2S2 6.505 2 12.06c0 5.02 3.657 9.184 8.438 9.94v-7.03H7.898v-2.91h2.54V9.845c0-2.507 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562v1.877h2.773l-.443 2.91h-2.33V22c4.78-.756 8.437-4.92 8.437-9.94z" />
    </svg>
  );
}
