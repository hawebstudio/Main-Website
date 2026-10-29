import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Code2, Cpu, Globe2, ShieldCheck, Zap } from "lucide-react";
import { createMetadata } from "@/lib/seo/metadata";
import { Breadcrumbs } from "@/components/navigation/breadcrumbs";
import { Container } from "@/components/primitives/container";
import { CtaSection } from "@/components/sections/cta-section";
import { CTAS } from "@/lib/data/ctas";
import { JsonLd } from "@/components/seo/json-ld";
import { personJsonLd, webPageJsonLd } from "@/lib/seo/json-ld";
import { routes } from "@/config/routes";

export const metadata: Metadata = createMetadata({
  title: "M.A. Malik | Studio Direction & Engineering",
  description:
    "M.A. Malik leads technical direction and engineering at HA Web Studio, building fast, maintainable web applications and websites with Next.js and TypeScript.",
  path: "/m-a-malik",
});

const breadcrumbItems = [
  { label: "Home", href: routes.home() },
  { label: "M.A. Malik", href: "/m-a-malik" },
];

const jsonLdData = [
  webPageJsonLd({
    title: "M.A. Malik | Studio Direction & Engineering",
    description:
      "M.A. Malik leads technical direction and engineering at HA Web Studio, building fast, maintainable web applications and websites with Next.js and TypeScript.",
    path: "/m-a-malik",
    type: "AboutPage",
  }),
  personJsonLd({
    name: "M.A. Malik",
    role: "Studio Director & Technical Lead",
    description:
      "M.A. Malik leads technical direction and web engineering at HA Web Studio, focusing on Next.js, TypeScript, and high-performance digital systems.",
    path: "/m-a-malik",
  }),
];

export default function MALMalikPage() {
  return (
    <article className="py-8 sm:py-12 md:py-16">
      <JsonLd data={jsonLdData} />
      <Container size="lg">
        <Breadcrumbs items={breadcrumbItems} className="mb-6 sm:mb-8" />

        {/* Hero Profile Panel — Editorial Studio Design */}
        <section className="relative overflow-hidden rounded-3xl border border-border/80 bg-gradient-to-b from-card/95 via-card/80 to-card/50 p-6 shadow-sm backdrop-blur-sm sm:p-10 md:p-12">
          <div className="relative z-10 max-w-3xl space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/10 px-3.5 py-1 text-xs font-mono uppercase tracking-wider text-primary">
              <Cpu className="size-3.5" />
              <span>Technical Direction & Engineering</span>
            </div>

            <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl md:text-5xl">
              M.A. Malik<span className="text-primary">.</span>
            </h1>

            <p className="text-lg font-medium leading-relaxed text-foreground/90 sm:text-xl">
              Engineering web systems for business clarity, durable performance, and honest collaboration.
            </p>

            <div className="space-y-4 text-base leading-relaxed text-muted-foreground">
              <p>
                M.A. Malik is the technical director and owner of HA Web Studio. He works directly with founders,
                commercial teams, and agency partners who need websites and web applications built right the first
                time—without bloated templates, fragile codebases, or unnecessary technical complexity.
              </p>
              <p>
                The work is grounded in modern full-stack web engineering: React, Next.js, TypeScript, and disciplined
                systems design. Every project begins with the commercial outcome in mind—clarifying what the business
                offers, making customer journeys intuitive, and delivering clean, maintainable code that teams can
                confidently run and scale.
              </p>
              <div className="rounded-xl border border-primary/20 bg-primary/5 p-4 text-sm leading-relaxed text-foreground/85">
                The studio name carries personal significance: &ldquo;HA&rdquo; stands for his grandfather&apos;s
                initials—a quiet, lasting reminder to build with care, integrity, and pride in work that lasts.
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Link
                href={routes.services.index()}
                className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground shadow-sm transition-all hover:bg-primary/90 hover:shadow"
              >
                <span>Explore Services</span>
                <ArrowRight className="size-4" />
              </Link>
              <Link
                href={routes.contact("start-project")}
                className="inline-flex items-center gap-2 rounded-xl border border-border/80 bg-background/80 px-5 py-2.5 text-sm font-medium text-foreground shadow-sm transition-colors hover:border-primary/60 hover:bg-muted/80"
              >
                <span>Discuss a Project</span>
              </Link>
            </div>
          </div>
        </section>

        {/* Engineering Philosophy Grid */}
        <section className="mt-12 sm:mt-16" aria-labelledby="principles-heading">
          <div className="max-w-2xl">
            <h2 id="principles-heading" className="text-2xl font-semibold tracking-tight sm:text-3xl">
              Working Principles
            </h2>
            <p className="mt-2 text-base text-muted-foreground">
              How technical decisions are evaluated from discovery to long-term operation.
            </p>
          </div>

          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-2xl border border-border/70 bg-card/60 p-6 shadow-sm transition-colors hover:border-border">
              <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Globe2 className="size-5" />
              </div>
              <h3 className="mt-4 text-lg font-medium text-foreground">Commercial Clarity First</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Technology exists to support a real operational or commercial objective. We design architectures around
                how customers actually research, decide, and enquire.
              </p>
            </div>

            <div className="rounded-2xl border border-border/70 bg-card/60 p-6 shadow-sm transition-colors hover:border-border">
              <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Zap className="size-5" />
              </div>
              <h3 className="mt-4 text-lg font-medium text-foreground">Performance by Design</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Sub-second page loads, lean JavaScript bundles, and Core Web Vitals compliance are engineered into
                every component and routing layer from day one.
              </p>
            </div>

            <div className="rounded-2xl border border-border/70 bg-card/60 p-6 shadow-sm transition-colors hover:border-border">
              <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <ShieldCheck className="size-5" />
              </div>
              <h3 className="mt-4 text-lg font-medium text-foreground">Maintainable Handoffs</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Codebases should remain comprehensible after delivery. We deliver clean TypeScript schemas,
                documented architectures, and zero proprietary lock-in.
              </p>
            </div>
          </div>
        </section>

        {/* Focus Areas & Boundaries */}
        <section className="mt-12 sm:mt-16 grid gap-8 lg:grid-cols-2" aria-labelledby="capabilities-heading">
          <div className="rounded-2xl border border-border/70 bg-card/60 p-6 sm:p-8">
            <div className="flex items-center gap-3">
              <div className="flex size-9 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                <Code2 className="size-4.5" />
              </div>
              <h3 id="capabilities-heading" className="text-xl font-semibold">Where We Add High Value</h3>
            </div>
            <ul className="mt-5 space-y-3 text-sm text-muted-foreground">
              <li className="flex items-start gap-2.5">
                <span className="mt-1 size-1.5 shrink-0 rounded-full bg-emerald-500" />
                <span>Custom Next.js web applications, internal operational tools, and validated SaaS MVPs.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="mt-1 size-1.5 shrink-0 rounded-full bg-emerald-500" />
                <span>Performance-critical B2B websites, service catalogs, and full digital redesigns.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="mt-1 size-1.5 shrink-0 rounded-full bg-emerald-500" />
                <span>Modern e-commerce architecture: custom Shopify theme development and headless API integrations.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="mt-1 size-1.5 shrink-0 rounded-full bg-emerald-500" />
                <span>Technical SEO infrastructure: programmatic routing guards, structured JSON-LD data, and Core Web Vitals remediation.</span>
              </li>
            </ul>
          </div>

          <div className="rounded-2xl border border-border/70 bg-card/60 p-6 sm:p-8">
            <div className="flex items-center gap-3">
              <div className="flex size-9 items-center justify-center rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400">
                <ShieldCheck className="size-4.5" />
              </div>
              <h3 className="text-xl font-semibold">Clear Project Boundaries</h3>
            </div>
            <ul className="mt-5 space-y-3 text-sm text-muted-foreground">
              <li className="flex items-start gap-2.5">
                <span className="mt-1 size-1.5 shrink-0 rounded-full bg-amber-500" />
                <span>We do not build generic template sites where an existing no-code platform (e.g. Squarespace or Webflow) is the more sensible choice for the client.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="mt-1 size-1.5 shrink-0 rounded-full bg-amber-500" />
                <span>We do not push complex headless architectures on small e-commerce stores when native Shopify Liquid themes are faster, cheaper, and easier to manage.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="mt-1 size-1.5 shrink-0 rounded-full bg-amber-500" />
                <span>We do not fabricate marketing metrics or offer artificial rankings guarantees—recommendations are backed by verifiable technical rationale.</span>
              </li>
            </ul>
          </div>
        </section>
      </Container>

      <div className="mt-16 sm:mt-20">
        <CtaSection
          title="Discuss Your Next Web Project"
          description="Speak directly with technical direction to evaluate architecture, performance feasibility, and scope."
          primaryCta={CTAS.bookConsultation}
        />
      </div>
    </article>
  );
}
