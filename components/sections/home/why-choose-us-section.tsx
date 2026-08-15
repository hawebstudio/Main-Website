import { Check, X } from "lucide-react";
import { Container } from "@/components/primitives/container";
import { Section } from "@/components/primitives/section";
import { Heading, Text } from "@/components/primitives/typography";
import { whyChooseUsItems } from "./home-data";

export function WhyChooseUsSection() {
  return (
    <Section spacing="xl" className="border-t border-border/50">
      <Container>
        <div className="flex flex-col gap-12 lg:flex-row lg:items-start lg:gap-20">
          {/* Header column */}
          <div className="flex flex-col gap-4 lg:sticky lg:top-32 lg:w-[400px] lg:shrink-0">
            <Heading level={2} size="xl">
              Why partner with us?
            </Heading>
            <Text size="lg" tone="muted">
              Most agencies focus on making something that looks good today. We
              focus on building a foundation that performs tomorrow.
            </Text>
          </div>

          {/* Comparison table */}
          <div className="flex-1 w-full overflow-hidden rounded-3xl border border-border/50 bg-background/50">
            {/* Table Header */}
            <div className="grid grid-cols-2 gap-4 border-b border-border/50 bg-muted/20 p-6 md:p-8">
              <div>
                <span className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                  Typical agency
                </span>
              </div>
              <div>
                <span className="text-sm font-semibold uppercase tracking-wider text-primary">
                  HA Web Studio
                </span>
              </div>
            </div>

            {/* Table Rows */}
            <div className="divide-y divide-border/30">
              {whyChooseUsItems.map((row, i) => (
                <div
                  key={i}
                  className="grid grid-cols-2 gap-4 p-6 transition-colors hover:bg-muted/10 md:p-8"
                >
                  <div className="flex flex-col gap-3 pr-4 md:pr-8">
                    <span className="text-xs font-medium text-muted-foreground">
                      {row.dimension}
                    </span>
                    <div className="flex items-start gap-3 text-muted-foreground">
                      <X className="mt-0.5 size-4 shrink-0 text-muted-foreground/50" />
                      <span className="text-sm">{row.typical}</span>
                    </div>
                  </div>

                  <div className="flex flex-col gap-3 border-l border-border/30 pl-4 md:pl-8">
                    <span className="text-xs font-medium text-primary opacity-0 max-md:hidden">
                      {row.dimension}
                    </span>
                    <div className="flex items-start gap-3">
                      <Check className="mt-0.5 size-4 shrink-0 text-primary" />
                      <span className="text-sm font-medium">{row.ha}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
