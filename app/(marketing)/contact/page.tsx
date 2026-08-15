import type { Metadata } from "next";
import { Suspense } from "react";
import { createMetadata } from "@/lib/seo/metadata";
import { JsonLd } from "@/components/seo/json-ld";
import { webPageJsonLd } from "@/lib/seo/json-ld";
import { Breadcrumbs } from "@/components/navigation/breadcrumbs";
import { Container } from "@/components/primitives/container";
import { Heading, Text } from "@/components/primitives/typography";
import { LeadForm } from "@/components/forms/lead-form";
import { PromotionBanner } from "@/components/promotions/promotion-banner";
import { SplitLayout } from "@/components/layouts/split-layout";
import { Mail, MapPin, Clock, MessageCircle } from "lucide-react";
import { company, contact } from "@/lib/business/company";
import { routes } from "@/config/routes";
import { getActivePromotion } from "@/lib/content/source";

const contactDescription = `Discuss your project with ${company.name}. We are ready to build your next digital product.`;

export const metadata: Metadata = createMetadata({
  title: "Contact Us",
  description: contactDescription,
  path: "/contact",
});

const breadcrumbItems = [
  { label: "Home", href: routes.home() },
  { label: "Contact", href: routes.contact() },
];

export default async function ContactPage() {
  // Reads content/promotion/ — resolves to null (and every consumer below
  // renders nothing) when that folder has no currently active promotion.
  const promotion = await getActivePromotion();

  return (
    <div className="py-24 md:py-36">
      <JsonLd
        data={[
          webPageJsonLd({
            title: "Contact Us",
            description: contactDescription,
            path: routes.contact(),
            type: "ContactPage",
          }),
        ]}
      />
      <Container>
        <Breadcrumbs items={breadcrumbItems} className="mb-8" />
      </Container>
      <Container>
        <SplitLayout>
          <div className="flex flex-col gap-12 lg:pr-12">
            <div className="flex flex-col gap-6">
              <PromotionBanner promotion={promotion} />
              <Heading level={1} size="display">
                Let's discuss your project.
              </Heading>
              <Text size="lg" tone="muted">
                Tell us about your website, ecommerce store, or web application
                project — what you're trying to build and where things stand
                today. We review every enquiry personally and reply with next
                steps, not an automated form response.
              </Text>
            </div>

            <div className="flex flex-col gap-8">
              <div className="flex items-start gap-4">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Mail className="size-5" />
                </div>
                <div className="flex flex-col">
                  <span className="font-semibold">Email</span>
                  <a
                    href={`mailto:${contact.emails.general}`}
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    {contact.emails.general}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <MessageCircle className="size-5" />
                </div>
                <div className="flex flex-col">
                  <span className="font-semibold">WhatsApp</span>
                  <a
                    href={contact.urls.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    {contact.phones.whatsapp}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <MapPin className="size-5" />
                </div>
                <div className="flex flex-col">
                  <span className="font-semibold">Location</span>
                  <span className="text-muted-foreground">
                    Remote-first, serving clients worldwide.
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Clock className="size-5" />
                </div>
                <div className="flex flex-col">
                  <span className="font-semibold">Response Time</span>
                  <span className="text-muted-foreground">
                    We aim to respond to all enquiries within 24 hours during
                    business days.
                  </span>
                </div>
              </div>
            </div>

            <Text tone="muted" className="text-sm leading-relaxed">
              After you reach out, expect a reply asking a few clarifying
              questions about your project and goals — not a generic sales
              pitch. If it's a good fit, we'll outline scope and next steps
              from there.
            </Text>
          </div>

          <div className="rounded-3xl border border-border/50 bg-background/50 p-6 md:p-10 shadow-sm backdrop-blur-xl">
            <Suspense fallback={null}>
              <LeadForm promotion={promotion} />
            </Suspense>
          </div>
        </SplitLayout>
      </Container>
    </div>
  );
}
