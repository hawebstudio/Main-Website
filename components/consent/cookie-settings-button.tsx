"use client";

export function CookieSettingsButton() {
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new Event("ha:open-cookie-settings"))}
      className="text-left text-xs text-muted-foreground underline underline-offset-4 transition-colors hover:text-foreground"
    >
      Cookie settings
    </button>
  );
}
