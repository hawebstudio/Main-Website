import type { CSSProperties } from "react";
import { cn } from "@/lib/utils";

/**
 * Hero backgrounds — lightweight, CSS-only premium background system.
 *
 * These previously mounted continuously-rendering canvas/WebGL effects
 * (Aurora, Silk, Waves, LightRays, GradientWaves — all built on `ogl` /
 * `three`), each running its own requestAnimationFrame loop, pointer
 * listeners, and per-frame GPU work on every hero on every page. That
 * was the single largest contributor to desktop TBT.
 *
 * They're replaced here with static, layered CSS gradients ("glow"
 * layers) that reuse the same brand color stops. Each variant paints
 * once and composites — no JS, no rAF, no canvas/WebGL context, and no
 * continuously-running animation. The only motion is a one-time,
 * finite fade/scale-in on mount (`.hero-glow`, defined in
 * globals.css), which is a no-op under `prefers-reduced-motion`.
 *
 * This file is intentionally a Server Component: it needs no browser
 * APIs, so nothing here forces a client boundary.
 */

type HeroGlowVariant = "aurora" | "silk" | "waves" | "rays" | "horizon";

interface HeroGlowProps {
  variant: HeroGlowVariant;
  colors: [string, string, string?];
  className?: string;
}

function HeroGlow({ variant, colors, className }: HeroGlowProps) {
  const [primary, secondary, tertiary] = colors;

  return (
    <div
      aria-hidden="true"
      className={cn("hero-glow", `hero-glow-${variant}`, className)}
      style={
        {
          "--glow-1": primary,
          "--glow-2": secondary,
          "--glow-3": tertiary ?? primary,
        } as CSSProperties
      }
    />
  );
}

function Overlay({ className = "" }: { className?: string }) {
  return (
    <>
      <div
        className={`absolute inset-0 z-10 pointer-events-none bg-[radial-gradient(circle_at_top,rgba(14,165,233,0.08),transparent_40%),linear-gradient(180deg,rgba(255,255,255,0.015),transparent_44%)] ${className}`}
      />
      <div className="absolute left-1/2 top-0 h-96 w-208 -translate-x-1/2 rounded-full bg-primary/8 blur-3xl z-10 pointer-events-none" />
    </>
  );
}

export function HomeHeroBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <HeroGlow
        variant="aurora"
        colors={["#0ea5e9", "#3b82f6", "#0ea5e9"]}
        className="opacity-35"
      />
      <Overlay />
      <div className="absolute inset-x-0 bottom-0 h-px bg-linear-to-r from-transparent via-border to-transparent z-10 pointer-events-none" />
    </div>
  );
}

export function ServicesHeroBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden bg-background">
      <HeroGlow variant="silk" colors={["#0ea5e9", "#0ea5e9"]} className="opacity-30" />
      <Overlay />
    </div>
  );
}

export function ServiceDetailHeroBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <HeroGlow variant="waves" colors={["#0ea5e9", "#0ea5e9"]} className="opacity-25" />
      <Overlay />
    </div>
  );
}

export function ServiceFamilyHeroBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <HeroGlow
        variant="horizon"
        colors={["#0ea5e9", "#3b82f6", "#3b82f6"]}
        className="opacity-30"
      />
      <Overlay />
    </div>
  );
}

export function AboutHeroBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <HeroGlow
        variant="aurora"
        colors={["#0ea5e9", "#6366f1", "#0ea5e9"]}
        className="opacity-30"
      />
      <Overlay />
    </div>
  );
}

export function ProblemsHeroBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <HeroGlow variant="rays" colors={["#0ea5e9", "#0ea5e9"]} className="opacity-25" />
      <Overlay />
    </div>
  );
}

export function CaseStudiesHubHeroBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <HeroGlow
        variant="horizon"
        colors={["#0284c7", "#0ea5e9", "#0ea5e9"]}
        className="opacity-30"
      />
      <Overlay />
    </div>
  );
}

export function CaseStudyDetailHeroBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <HeroGlow variant="waves" colors={["#0ea5e9", "#0ea5e9"]} className="opacity-20" />
      <Overlay />
    </div>
  );
}

export function WorkHubHeroBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden bg-background">
      <HeroGlow variant="silk" colors={["#0ea5e9", "#0ea5e9"]} className="opacity-25" />
      <Overlay />
    </div>
  );
}

export function WorkDetailHeroBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <HeroGlow
        variant="aurora"
        colors={["#0ea5e9", "#06b6d4", "#0ea5e9"]}
        className="opacity-25"
      />
      <Overlay />
    </div>
  );
}

export function InsightsHeroBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <HeroGlow variant="rays" colors={["#0ea5e9", "#0ea5e9"]} className="opacity-20" />
      <Overlay />
    </div>
  );
}

export function TechnologiesHeroBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <HeroGlow variant="waves" colors={["#0ea5e9", "#0ea5e9"]} className="opacity-20" />
      <Overlay />
    </div>
  );
}

export function ContactHeroBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <HeroGlow
        variant="horizon"
        colors={["#0ea5e9", "#38bdf8", "#38bdf8"]}
        className="opacity-25"
      />
      <Overlay />
    </div>
  );
}

export function SearchHeroBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden bg-background">
      <HeroGlow variant="silk" colors={["#0ea5e9", "#0ea5e9"]} className="opacity-20" />
      <Overlay />
    </div>
  );
}

export function SocialsHeroBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <HeroGlow
        variant="aurora"
        colors={["#0ea5e9", "#3b82f6", "#6366f1"]}
        className="opacity-25"
      />
      <Overlay />
    </div>
  );
}

export function WorkSubpageHeroBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <HeroGlow variant="waves" colors={["#0ea5e9", "#0ea5e9"]} className="opacity-20" />
      <Overlay />
    </div>
  );
}

export function ProblemDetailHeroBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <HeroGlow variant="rays" colors={["#0ea5e9", "#0ea5e9"]} className="opacity-20" />
      <Overlay />
    </div>
  );
}

export function LocationsHeroBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <HeroGlow variant="waves" colors={["#0ea5e9", "#0ea5e9"]} className="opacity-25" />
      <Overlay />
    </div>
  );
}

export function TechnologyDetailHeroBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <HeroGlow
        variant="horizon"
        colors={["#0ea5e9", "#0284c7", "#0284c7"]}
        className="opacity-20"
      />
      <Overlay />
    </div>
  );
}
