import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  FileCheck2,
  Layers3,
  Microscope,
  ShieldCheck,
} from "lucide-react";
import { createMetadata } from "@/lib/seo/metadata";
import { JsonLd } from "@/components/seo/json-ld";
import {
  collectionPageJsonLd,
  faqJsonLd,
} from "@/lib/seo/json-ld";
import { HeroWrapper } from "@/components/sections/hero-wrapper";
import { Breadcrumbs } from "@/components/navigation/breadcrumbs";
import { WorkHubHeroBackground } from "@/components/sections/hero-backgrounds";
import { Heading, Text, Eyebrow } from "@/components/primitives/typography";
import { Container } from "@/components/primitives/container";
import { Section } from "@/components/primitives/section";
import { CtaSection } from "@/components/sections/cta-section";
import { WorkTabs } from "@/components/navigation/work-tabs";
import { ProjectCard } from "@/components/cards/domain-cards";
import {
  MagazineFeatured,
  MagazineGrid,
  MagazineLayout,
} from "@/components/layouts/magazine-layout";
import { projects } from "@/lib/content/source";
import { buttonVariants } from "@/components/ui/button";
import { routes } from "@/config/routes";
import { CTAS } from "@/lib/data/ctas";

export const metadata: Metadata = createMetadata({
  title: "Our Work — Websites, eCommerce & Custom Web Apps",
  description:
    "See real projects from HA Web Studio — business websites, eCommerce stores, browser extensions, and custom web applications we've designed, built, and delivered.",
  path: "/work",
});

const workFaqEntries = [
  {
    question: "Is everything on this page real client work?",
    answer:
      "Not all of it, and we're upfront about that. Projects are marked Client, Personal, Internal, or Labs. Client work comes from paid engagements; Personal projects are things we've built ourselves to the same quality bar.",
  },
  {
    question: "Why show personal projects alongside client work?",
    answer:
      "Many client projects are confidential and can't be shown publicly. Our personal projects — including a full online store and a published browser extension — let you see our actual build quality when client work isn't available to share.",
  },
  {
    question: "How do I know which service fits a project I'm interested in?",
    answer:
      "Each project links to the service it falls under — website development, eCommerce, custom web applications, and more — so you can go straight from an example to the service that would cover a similar project for your business.",
  },
];

export default async function WorkPage() {
  const allProjects = await projects.getAll();

  const sortedProjects = [...allProjects].sort((a, b) => {
    if (a.featured && !b.featured) return -1;
    if (!a.featured && b.featured) return 1;
    return (b.year ?? 0) - (a.year ?? 0);
  });

  const featuredProjects = sortedProjects
    .filter((project) => project.featured)
    .slice(0, 3);
  const clientProjects = sortedProjects.filter(
    (project) => project.category === "client",
  );
  const personalProjects = sortedProjects.filter(
    (project) => project.category === "personal",
  );
  const labsProjects = sortedProjects.filter(
    (project) => project.category === "labs",
  );
  const internalProjects = sortedProjects.filter(
    (project) => project.category === "internal",
  );

  const breadcrumbItems = [
    { label: "Home", href: routes.home() },
    { label: "Work", href: routes.work.index() },
  ];

  return (
    <article className="pb-4 md:pb-8">
      <JsonLd
        data={[
          collectionPageJsonLd({
            title: "HA Web Studio Work — Websites, eCommerce & Custom Apps",
            description:
              "A look at real websites, online stores, browser tools, and custom web applications built and delivered by HA Web Studio.",
            path: routes.work.index(),
            items: sortedProjects.map((project) => ({
              title: project.title,
              path: routes.work.detail(project.slug),
            })),
          }),
          faqJsonLd(workFaqEntries),
        ]}
      />

      <HeroWrapper
        className="pt-14 md:pt-20 pb-0 md:pb-0"
        background={<WorkHubHeroBackground />}
      >
        <div className="mx-auto flex max-w-6xl flex-col gap-10 lg:gap-14 relative z-20">
          <Breadcrumbs items={breadcrumbItems} className="mb-0" />
          <div className="max-w-4xl space-y-6">
            <Eyebrow>Our Work</Eyebrow>
            <Heading
              level={1}
              size="display"
              className="max-w-5xl text-balance leading-[0.88] tracking-tight"
            >
              Proof of work, not a portfolio of promises.
            </Heading>
            <Text
              size="lg"
              tone="muted"
              className="max-w-3xl text-pretty leading-relaxed"
            >
              Every project here is real — live websites, online stores, browser
              tools, and custom applications we've designed and built end to
              end. Each one is labeled Client, Personal, Internal, or Labs, so
              you always know exactly what you're looking at.
            </Text>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link
                href={routes.contact('start-project')}
                className={buttonVariants({ size: "lg" })}
              >
                Discuss Your Project
              </Link>
              <Link
                href={routes.services.index()}
                className={buttonVariants({
                  size: "lg",
                  variant: "outline",
                  className: "bg-transparent",
                })}
              >
                Explore Services
              </Link>
            </div>
          </div>

          <div className="grid gap-4 lg:grid-cols-4">
            <div className="glass-strong rounded-[2rem] border border-border/50 p-5">
              <BadgeCheck className="size-5 text-primary" />
              <div className="mt-3 text-sm font-semibold uppercase tracking-[0.2em] text-primary">
                Transparency
              </div>
              <Text size="sm" tone="muted" className="mt-2">
                Only real, shippable work is listed here. Where client details
                are confidential, that's stated directly instead of filled in
                with generic claims.
              </Text>
            </div>
            <div className="glass-strong rounded-[2rem] border border-border/50 p-5">
              <FileCheck2 className="size-5 text-primary" />
              <div className="mt-3 text-sm font-semibold uppercase tracking-[0.2em] text-primary">
                Commercial fit
              </div>
              <Text size="sm" tone="muted" className="mt-2">
                Each project is tied to a specific service — website
                development, eCommerce, custom applications, or performance — so
                you can see exactly what kind of work it represents.
              </Text>
            </div>
            <div className="glass-strong rounded-[2rem] border border-border/50 p-5">
              <Layers3 className="size-5 text-primary" />
              <div className="mt-3 text-sm font-semibold uppercase tracking-[0.2em] text-primary">
                Easy to explore
              </div>
              <Text size="sm" tone="muted" className="mt-2">
                Every project connects back to the service, technology, and case
                study behind it, so you can go from an example straight to the
                details that matter to you.
              </Text>
            </div>
            <div className="glass-strong rounded-[2rem] border border-border/50 p-5">
              <ShieldCheck className="size-5 text-primary" />
              <div className="mt-3 text-sm font-semibold uppercase tracking-[0.2em] text-primary">
                The full picture
              </div>
              <Text size="sm" tone="muted" className="mt-2">
                We show the thinking behind each project, not just a finished
                screenshot — what we built, why, and what it took to get there.
              </Text>
            </div>
          </div>
        </div>
      </HeroWrapper>

      <Section
        spacing="sm"
        className="border-y border-border/50 bg-background/70"
      >
        <Container>
          <WorkTabs />

          <div className="mt-2 grid gap-6 xl:grid-cols-12">
            <div className="@container glass-strong rounded-[2rem] border border-border/50 p-6 xl:col-span-8">
              <Eyebrow>Featured work</Eyebrow>
              <Heading level={2} size="xl" className="mt-3">
                A closer look at recent projects.
              </Heading>
              <Text size="lg" tone="muted" className="mt-4 max-w-3xl">
                These are the projects we point to most — websites, online
                stores, and custom applications that show how we approach a
                project from the first decision to the finished product.
              </Text>

              {featuredProjects.length > 0 ? (
                <div className="mt-8">
                  <MagazineLayout>
                    <MagazineFeatured>
                      <div className="mx-auto max-w-5xl">
                        <ProjectCard project={featuredProjects[0]} />
                      </div>
                    </MagazineFeatured>
                    {featuredProjects.length > 1 ? (
                      <MagazineGrid gridCols={2}>
                        {featuredProjects.slice(1).map((project) => (
                          <ProjectCard key={project.slug} project={project} />
                        ))}
                      </MagazineGrid>
                    ) : null}
                  </MagazineLayout>
                </div>
              ) : (
                <div className="mt-8 rounded-3xl border border-dashed border-border/60 bg-background/30 p-8 text-center text-muted-foreground">
                  Featured work will appear as projects are promoted.
                </div>
              )}
            </div>

            <div className="glass rounded-[2rem] border border-border/50 p-6 xl:col-span-4">
              <Eyebrow>Browse by type</Eyebrow>
              <div className="mt-4 space-y-3">
                {[
                  {
                    label: "Client Projects",
                    href: routes.work.client(),
                    count: clientProjects.length,
                  },
                  {
                    label: "Personal Projects",
                    href: routes.work.personal(),
                    count: personalProjects.length,
                  },
                  {
                    label: "Internal Projects",
                    href: routes.work.internal(),
                    count: internalProjects.length,
                  },
                  {
                    label: "Labs",
                    href: routes.work.labs(),
                    count: labsProjects.length,
                  },
                ].map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    className="group flex items-center justify-between rounded-2xl border border-border/60 bg-background/35 px-4 py-3 transition-colors hover:border-primary/40 hover:bg-background/55"
                  >
                    <span className="text-sm font-medium text-foreground">
                      {item.label}
                    </span>
                    <span className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-muted-foreground">
                      {item.count}
                      <ArrowRight className="size-3 transition-transform group-hover:translate-x-0.5" />
                    </span>
                  </Link>
                ))}
              </div>

              <div className="mt-6 rounded-2xl border border-border/60 bg-background/30 p-4">
                <div className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                  Client transparency
                </div>
                <Text size="sm" tone="muted" className="mt-2 leading-relaxed">
                  We never invent client names, projects, or results. If a
                  client project can't be shown publicly, we'll say so rather
                  than filling the gap with something vague.
                </Text>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      <Section spacing="lg">
        <Container>
          <div className="grid gap-6 xl:grid-cols-3">
            <div className="rounded-[2rem] border border-border/50 bg-background/35 p-6">
              <Eyebrow>Client projects</Eyebrow>
              <Heading level={3} size="sm" className="mt-3">
                Work we've delivered
              </Heading>
              <Text tone="muted" size="sm" className="mt-3 leading-relaxed">
                {clientProjects.length > 0
                  ? `${clientProjects.length} client ${clientProjects.length === 1 ? "project is" : "projects are"} shown here, spanning eCommerce stores, business websites, and custom web applications.`
                  : "No public client projects are listed at this time. We don't publish confidential work just to fill this page."}
              </Text>
              <Link
                href={routes.work.client()}
                className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-primary"
              >
                View client projects <ArrowRight className="size-4" />
              </Link>
            </div>

            <div className="rounded-[2rem] border border-border/50 bg-background/35 p-6">
              <Eyebrow>Personal projects</Eyebrow>
              <Heading level={3} size="sm" className="mt-3">
                Built by us, for the same standard
              </Heading>
              <Text tone="muted" size="sm" className="mt-3 leading-relaxed">
                Our own products — including a full eCommerce platform, an AI
                video creation tool, and a public browser extension — are built
                to the same standard as anything we deliver for a client.
              </Text>
              <Link
                href={routes.work.personal()}
                className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-primary"
              >
                View personal projects <ArrowRight className="size-4" />
              </Link>
            </div>

            <div className="rounded-[2rem] border border-border/50 bg-background/35 p-6">
              <Eyebrow>Labs</Eyebrow>
              <Heading level={3} size="sm" className="mt-3">
                Where we try new ideas
              </Heading>
              <Text tone="muted" size="sm" className="mt-3 leading-relaxed">
                Labs projects are marked as experiments — a space to test new
                interactions and ideas before they're ready for a client site.
              </Text>
              <Link
                href={routes.work.labs()}
                className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-primary"
              >
                View labs projects <ArrowRight className="size-4" />
              </Link>
            </div>
          </div>
        </Container>
      </Section>

      <Section spacing="lg" className="bg-muted/20">
        <Container>
          <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="glass-strong rounded-[2rem] border border-border/50 p-6 md:p-8">
              <Eyebrow>Where each project leads</Eyebrow>
              <Heading level={2} size="xl" className="mt-3">
                Every project points to what comes next.
              </Heading>
              <Text size="lg" tone="muted" className="mt-4 leading-relaxed">
                From any project, you can jump straight to the service it falls
                under, the technology behind it, a full case study, or a related
                article — and from there, straight to us.
              </Text>
              <div className="mt-6 flex flex-wrap gap-2 text-sm text-muted-foreground">
                {[
                  "Services",
                  "Solutions",
                  "Technologies",
                  "Case Studies",
                  "Insights",
                  "Contact",
                ].map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-border/60 bg-background/45 px-3 py-1.5"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <div className="glass rounded-[2rem] border border-border/50 p-6">
              <Heading level={3} size="sm" className="mt-3">
                We'd rather show less than fake it.
              </Heading>

              <div className="mt-5 rounded-2xl border border-border/60 bg-background/30 p-4">
                <Microscope className="size-4 text-primary" />
                <Text size="sm" tone="muted" className="mt-2 leading-relaxed">
                  Until we can share more client work publicly, our personal
                  projects and Labs experiments are here to give you a real look
                  at how we build.
                </Text>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      <Section spacing="lg">
        <Container>
          <div className="max-w-3xl">
            <Eyebrow>Common questions</Eyebrow>
            <Heading level={2} size="xl" className="mt-3">
              Questions about our work
            </Heading>
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {workFaqEntries.map((faq) => (
              <div
                key={faq.question}
                className="rounded-[2rem] border border-border/50 bg-background/35 p-6"
              >
                <Heading level={3} size="sm">
                  {faq.question}
                </Heading>
                <Text tone="muted" size="sm" className="mt-3 leading-relaxed">
                  {faq.answer}
                </Text>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <CtaSection
        title="Need something like this for your business?"
        description="Tell us about your project and we'll show you the closest example of our work — and the right service to get it built."
        primaryCta={{ label: "Discuss Your Project", href: routes.contact('start-project') }}
        secondaryCta={CTAS.requestAudit}
      />
    </article>
  );
}
