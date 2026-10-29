---
name: ha-content-workflow
description: Human-centered content workflow for HA Web Studio. Integrates factual research, E-E-A-T principles, anti-cliche review, and technical editorial discipline without hallucination or detector gaming.
---

# HA Web Studio — Human-Centered Content Workflow

A disciplined, seven-stage editorial workflow for researching, drafting, auditing, and publishing content for HA Web Studio.

## Core Philosophy

1. **Specifics Over Fluff**: If a sentence can be written without knowing the client's actual architecture or business model, it is generic slop and must be rewritten.
2. **Factuality Over Fabrication**: Never invent metrics, client names, project statistics, or guarantees. Unverified claims must either be removed or marked with `[OWNER REVIEW NEEDED]`.
3. **Voice Over Sterile Scrubbing**: Removing AI tells must not leave behind a lifeless, timid "nothing-voice". HA Web Studio writes from the perspective of an experienced, pragmatic technical director—calm, precise, opinionated about trade-offs, and grounded in real engineering realities.
4. **No Deception**: Do not write to game third-party AI detectors. Do not make unprovable promises about detector evasion. Write for human discernment and searcher satisfaction.

---

## The 7-Stage Editorial Pipeline

```
1. Audit & Classify ──► 2. Research & Evidence ──► 3. Technical Draft
         │
         ▼
4. Surface Polish   ──► 5. Structural Flow     ──► 6. SEO & A11y QA ──► 7. Human Read
```

### Stage 1: Audit & Classify
- Identify page role: Service Family, Specific Service, Technical Case Study, Technology Guide, Problem Analysis, or Studio Profile.
- Identify target reader: Non-technical founder, marketing VP, technical director, or agency partner.
- Clarify conversion intent: Booking an architectural consultation, requesting a code audit, or understanding technical trade-offs.

### Stage 2: Research & Evidence
- Primary technical sources: Official framework documentation (Next.js, React, Node.js, TypeScript), platform specs (Shopify, Vercel), web standards (W3C, Web.dev Core Web Vitals).
- Search guidelines: Google Search Central helpful content guidelines, searcher intent analysis, and real SERP gap evaluation.
- Project records: Verified repository implementations, real architectural choices, confirmed limitations.

### Stage 3: Technical Draft
- State the problem clearly before presenting a solution.
- Outline specific technical mechanisms (e.g. Next.js Server Components, streaming SSR, ISR revalidation, typed server actions) rather than buzzwords ("blazing fast", "cutting-edge").
- Articulate genuine trade-offs: when a bespoke solution is necessary vs. when an off-the-shelf platform (e.g. Shopify theme vs. headless store) is the better choice.

### Stage 4: Surface Pattern Review
Eliminate standard mechanical AI tells:
- **Significance Inflation**: Replace "represents a pivotal milestone in the digital landscape" with concrete statements like "reduces cold-start latency across regional edges".
- **Copula Avoidance**: Replace "stands as an innovative paradigm that serves as" with direct verbs: "is", "delivers", "runs".
- **Hype Adjectives & Clichés**: Strip "delve", "testament", "tapestry", "revolutionize", "seamlessly", "unlocking", "game-changer".
- **Formulaic Parallelisms**: Avoid monotonous "not only... but also..." and robotic rule-of-three triplets ("reliable, scalable, and robust").
- **Em Dash Overuse**: Replace indiscriminate em dash interruptions with clean periods, commas, or structured bullet lists.

### Stage 5: Structural & Discourse Review
- **Avoid Premature Conclusion Stamps**: Eliminate predictable summary openers ("In summary", "In conclusion", "Ultimately"). Conclude with practical next steps or concrete engagement criteria.
- **Vary Sentence & Paragraph Cadence**: Break monotonous sentence lengths. Mix short declarative assertions with reasoned technical explanations.
- **Pacing and Thought Flow**: Retain the rationale behind architectural decisions. Explain what broke, why a particular approach was chosen, and what constraints governed the outcome.

### Stage 6: Technical SEO, Factuality & Accessibility QA
- **Metadata**: Unique, descriptive `<title>` using the site template (`%s — HA Web Studio`); actionable `<meta name="description">` under 160 characters.
- **Heading Structure**: Single `<h1>` that states page identity; logical `<h2>`/`<h3>` hierarchy without skipping levels.
- **Internal Links**: Canonical, descriptive anchor text linking to relevant service families or case studies.
- **Structured Data**: Valid Schema.org JSON-LD (e.g. `ProfessionalService`, `ProfilePage`, `Person`) matching visible text on the page.
- **Owner Identity**: Public owner name is strictly **M.A. Malik**. No personal legal names or private personal profiles.

### Stage 7: Human Read & Final Sign-Off
- Read aloud test: Does this sound like a competent engineer who has built production systems, or a chatbot summarizer?
- Verify every technical claim holds true against the actual codebase.

---

## Upstream References & Licensing Acknowledgments

This workflow synthesizes principles and research from eight public open-source projects and industry discussions:

| Project / Source | License / Status | Key Contribution Selected |
| :--- | :--- | :--- |
| [NulightJens/humanizer-stack](https://github.com/NulightJens/humanizer-stack) | MIT License (c) 2026 Jens Heitmann | Two-pass model; StoryScope finding that structural discourse features matter more than surface vocabulary. |
| [harshaneel/humanize](https://github.com/harshaneel/humanize) | MIT License (c) 2026 Harshaneel | 9 humanization levers; honest recognition of the classifier ceiling; voice matching via anchor samples. |
| [matsuikentaro1/humanizer_academic](https://github.com/matsuikentaro1/humanizer_academic) | MIT License (c) 2025 Kentaro Matsui | Strict preservation of figures and citations; eliminating significance inflation and false ranges. |
| [AIScientists-Dev/academic-humanizer](https://github.com/AIScientists-Dev/academic-humanizer) | MIT License | Stripping generic "In recent years..." openers; tying technical claims strictly to verifiable mechanisms. |
| [crabin/paper-humanizer-skill](https://github.com/crabin/paper-humanizer-skill) | Reference only (All Rights Reserved) | 4-part audit-and-refine protocol concept; strict factuality discipline. No code copied. |
| [LeonardNJU/code-humanizer](https://github.com/LeonardNJU/code-humanizer) | MIT License (c) 2026 Leonard Shangao Li | AI code slop catalog; guarding code against speculative single-implementation abstractions. |
| [MADEVAL/HumanAI](https://github.com/MADEVAL/HumanAI) | MIT License | Specificity ladder; consulting (`biz`) and case study (`case`) tone profiles. |
| [masterball-w/Master-humanizer-skill](https://github.com/masterball-w/Master-humanizer-skill) | Reference only | "Patterns over word lists"; "Draft first, audit second"; embedding real thought flow and time anchors. |
| [r/claudeskills discussion](https://reddit.com/r/claudeskills/comments/1upmqe6/) | Community Discussion | Avoiding the "sterile careful nothing-voice"; preserving domain perspective and distinct human voice. |