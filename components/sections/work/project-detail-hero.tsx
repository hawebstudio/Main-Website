import { HeroWrapper } from "@/components/sections/hero-wrapper";
import { Heading, Text } from "@/components/primitives/typography";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import type { WithContent } from "@/lib/content/source";
import type { Project } from "@/lib/content/types";
import { formatProjectCategory } from "./project-detail-utils";
import Image from "next/image";
import { Globe } from "lucide-react";

export function ProjectDetailHero({
  project,
}: {
  project: WithContent<Project>;
}) {
  return (
    <HeroWrapper
      className="py-12 md:py-16"
      background={
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(14,165,233,0.14),transparent_20%),linear-gradient(180deg,rgba(255,255,255,0.02),transparent_44%)]" />
          <div className="absolute left-1/2 top-0 h-80 w-176 -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />
          { project.cover && (
          <Image
            src={project.cover.src}
            alt={project.cover.alt}
            fill
            className="absolute inset-0 object-cover"
          />)}
        </div>
      }
    >
      <div className="mx-auto flex max-w-6xl flex-col gap-6">
        <div className="flex flex-wrap items-center gap-2 text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
          <span className="rounded-full border border-border/60 bg-background/45 px-3 py-1.5">
            {formatProjectCategory(project.category)}
          </span>
          {project.lifecycle ? (
            <span className="rounded-full border border-border/60 bg-background/45 px-3 py-1.5">
              Lifecycle: {project.lifecycle}
            </span>
          ) : null}
          {project.year ? (
            <span className="rounded-full border border-border/60 bg-background/45 px-3 py-1.5">
              {project.year}
            </span>
          ) : null}
          {project.url ? (
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-border/60 bg-background/45 px-3 py-1.5 hover:bg-background/60"
            >
              <Globe className="size-4 text-muted-foreground" />
            </a>
          ) : null}
        </div>

        <Heading
          level={1}
          size="display"
          className="max-w-4xl text-balance leading-[0.9] tracking-tight"
        >
          {project.title}
        </Heading>
        <Text
          size="lg"
          tone="muted"
          className="max-w-3xl text-pretty leading-relaxed"
        >
          {project.description}
        </Text>

        {project.technologies?.length ? (
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech) => (
              <Badge key={tech} variant="secondary">
                {tech}
              </Badge>
            ))}
          </div>
        ) : null}

        {project.publicLinks?.length ? (
          <div className="flex flex-wrap gap-3">
            {project.publicLinks.map((item) => (
              <a
                key={item.label}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className={buttonVariants({
                  variant: "outline",
                  className: "bg-transparent",
                })}
              >
                {item.label}
              </a>
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-border/60 bg-background/35 px-4 py-3 text-sm text-muted-foreground">
            Public links are not available for this project at the moment.
          </div>
        )}
      </div>
    </HeroWrapper>
  );
}
