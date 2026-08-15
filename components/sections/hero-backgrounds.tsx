"use client";

import dynamic from "next/dynamic";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

const Aurora = dynamic(() => import("@/components/Aurora"), { ssr: false });
const Silk = dynamic(() => import("@/components/Silk"), { ssr: false });
const Waves = dynamic(() => import("@/components/Waves"), { ssr: false });
const LightRays = dynamic(() => import("@/components/LightRays"), {
  ssr: false,
});
const GradientWaves = dynamic(() => import("@/components/GradientWaves"), {
  ssr: false,
});
// Note: components/GridDistortion.tsx (a Three.js effect) exists in the
// repo but isn't used by any Hero*Background below — no dynamic import
// left declared-but-unrendered here, so there's nothing to code-split.

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
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className="absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 z-0 opacity-35">
        {prefersReducedMotion ? (
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(14,165,233,0.14),transparent_24%),radial-gradient(circle_at_50%_18%,rgba(255,255,255,0.05),transparent_20%)]" />
        ) : (
          <Aurora
            colorStops={["#0ea5e9", "#3b82f6", "#0ea5e9"]}
            blend={0.6}
            amplitude={1.0}
            speed={0.4}
          />
        )}
      </div>
      <Overlay />
      <div className="absolute inset-x-0 bottom-0 h-px bg-linear-to-r from-transparent via-border to-transparent z-10 pointer-events-none" />
    </div>
  );
}

export function ServicesHeroBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden bg-background">
      <div className="absolute inset-0 z-0 opacity-30">
        <Silk
          speed={3}
          scale={1}
          color="#0ea5e9"
          noiseIntensity={1.0}
          rotation={0.2}
        />
      </div>
      <Overlay />
    </div>
  );
}

export function ServiceDetailHeroBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 z-0 opacity-25">
        <Waves
          lineColor="rgba(14, 165, 233, 0.3)"
          backgroundColor="transparent"
          waveSpeedX={0.008}
          waveSpeedY={0.003}
          waveAmpX={28}
          waveAmpY={12}
          xGap={14}
          yGap={36}
        />
      </div>
      <Overlay />
    </div>
  );
}

export function ServiceFamilyHeroBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 z-0 opacity-30">
        <GradientWaves
          horizonColor="#050510"
          waveColor="#0ea5e9"
          crestColor="#3b82f6"
          speed={0.6}
          amplitude={0.8}
          zoom={1.2}
          height={0.6}
          fogDepth={0.8}
          detail="medium"
          brightness={0.8}
        />
      </div>
      <Overlay />
    </div>
  );
}

export function AboutHeroBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 z-0 opacity-30">
        <Aurora
          colorStops={["#0ea5e9", "#6366f1", "#0ea5e9"]}
          blend={0.5}
          amplitude={0.9}
          speed={0.35}
        />
      </div>
      <Overlay />
    </div>
  );
}

export function ProblemsHeroBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 z-0 opacity-25">
        <LightRays
          raysOrigin="top-center"
          raysColor="#0ea5e9"
          raysSpeed={0.02}
          lightSpread={1.5}
          rayLength={0.8}
          fadeDistance={0.8}
          saturation={0.6}
        />
      </div>
      <Overlay />
    </div>
  );
}

export function CaseStudiesHubHeroBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 z-0 opacity-30">
        <GradientWaves
          horizonColor="#030712"
          waveColor="#0284c7"
          crestColor="#0ea5e9"
          speed={0.4}
          amplitude={0.6}
          zoom={1.4}
          height={0.5}
          fogDepth={0.9}
          detail="low"
          brightness={0.7}
        />
      </div>
      <Overlay />
    </div>
  );
}

export function CaseStudyDetailHeroBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 z-0 opacity-20">
        <Waves
          lineColor="rgba(14, 165, 233, 0.25)"
          backgroundColor="transparent"
          waveSpeedX={0.006}
          waveSpeedY={0.002}
          waveAmpX={24}
          waveAmpY={10}
          xGap={16}
          yGap={40}
        />
      </div>
      <Overlay />
    </div>
  );
}

export function WorkHubHeroBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden bg-background">
      <div className="absolute inset-0 z-0 opacity-25">
        <Silk
          speed={2}
          scale={0.8}
          color="#0ea5e9"
          noiseIntensity={0.8}
          rotation={0.1}
        />
      </div>
      <Overlay />
    </div>
  );
}

export function WorkDetailHeroBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 z-0 opacity-25">
        <Aurora
          colorStops={["#0ea5e9", "#06b6d4", "#0ea5e9"]}
          blend={0.4}
          amplitude={0.7}
          speed={0.3}
        />
      </div>
      <Overlay />
    </div>
  );
}

export function InsightsHeroBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 z-0 opacity-20">
        <LightRays
          raysOrigin="top-left"
          raysColor="#0ea5e9"
          raysSpeed={0.015}
          lightSpread={1.8}
          rayLength={0.7}
          fadeDistance={0.9}
          saturation={0.5}
        />
      </div>
      <Overlay />
    </div>
  );
}

export function TechnologiesHeroBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 z-0 opacity-20">
        <Waves
          lineColor="rgba(14, 165, 233, 0.3)"
          backgroundColor="transparent"
          waveSpeedX={0.01}
          waveSpeedY={0.004}
          waveAmpX={20}
          waveAmpY={8}
          xGap={12}
          yGap={28}
        />
      </div>
      <Overlay />
    </div>
  );
}

export function ContactHeroBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 z-0 opacity-25">
        <GradientWaves
          horizonColor="#050510"
          waveColor="#0ea5e9"
          crestColor="#38bdf8"
          speed={0.5}
          amplitude={0.7}
          zoom={1.3}
          height={0.55}
          fogDepth={0.85}
          detail="low"
          brightness={0.7}
        />
      </div>
      <Overlay />
    </div>
  );
}

export function SearchHeroBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden bg-background">
      <div className="absolute inset-0 z-0 opacity-20">
        <Silk speed={2} scale={0.6} color="#0ea5e9" noiseIntensity={0.6} />
      </div>
      <Overlay />
    </div>
  );
}

export function SocialsHeroBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 z-0 opacity-25">
        <Aurora
          colorStops={["#0ea5e9", "#3b82f6", "#6366f1"]}
          blend={0.5}
          amplitude={0.8}
          speed={0.3}
        />
      </div>
      <Overlay />
    </div>
  );
}

export function WorkSubpageHeroBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 z-0 opacity-20">
        <Waves
          lineColor="rgba(14, 165, 233, 0.25)"
          backgroundColor="transparent"
          waveSpeedX={0.007}
          waveSpeedY={0.003}
          waveAmpX={20}
          waveAmpY={10}
          xGap={14}
          yGap={34}
        />
      </div>
      <Overlay />
    </div>
  );
}

export function ProblemDetailHeroBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 z-0 opacity-20">
        <LightRays
          raysOrigin="top-center"
          raysColor="#0ea5e9"
          raysSpeed={0.015}
          lightSpread={1.6}
          rayLength={0.6}
          fadeDistance={0.85}
          saturation={0.5}
        />
      </div>
      <Overlay />
    </div>
  );
}

export function LocationsHeroBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 z-0 opacity-25">
        <Waves
          lineColor="rgba(14, 165, 233, 0.28)"
          backgroundColor="transparent"
          waveSpeedX={0.009}
          waveSpeedY={0.0035}
          waveAmpX={26}
          waveAmpY={11}
          xGap={14}
          yGap={32}
        />
      </div>
      <Overlay />
    </div>
  );
}

export function TechnologyDetailHeroBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 z-0 opacity-20">
        <GradientWaves
          horizonColor="#030712"
          waveColor="#0ea5e9"
          crestColor="#0284c7"
          speed={0.4}
          amplitude={0.5}
          zoom={1.5}
          height={0.45}
          fogDepth={0.9}
          detail="low"
          brightness={0.6}
        />
      </div>
      <Overlay />
    </div>
  );
}
