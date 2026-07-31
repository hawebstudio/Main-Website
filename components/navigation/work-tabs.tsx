"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { routes } from "@/config/routes";

const tabs = [
  { name: "All Work", href: routes.work.index() },
  { name: "Client", href: routes.work.client() },
  { name: "Personal", href: routes.work.personal() },
  { name: "Internal", href: routes.work.internal() },
  { name: "Labs", href: routes.work.labs() },
];

export function WorkTabs() {
  const pathname = usePathname();

  return (
    <div className="flex flex-wrap items-center gap-2 mb-12">
      {tabs.map((tab) => {
        const isActive = pathname === tab.href;
        return (
          <Link
            key={tab.href}
            href={tab.href}
            className={cn(
              "rounded-full px-4 py-2 text-sm font-medium transition-colors",
              isActive
                ? "bg-primary text-primary-foreground"
                : "bg-secondary/50 text-secondary-foreground hover:bg-secondary",
            )}
          >
            {tab.name}
          </Link>
        );
      })}
    </div>
  );
}
