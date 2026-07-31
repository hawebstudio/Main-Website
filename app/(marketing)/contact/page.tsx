import type { Metadata } from "next";
import { Suspense } from "react";
import { createMetadata } from "@/lib/seo/metadata";
import { Container } from "@/components/primitives/container";
import { Heading, Text } from "@/components/primitives/typography";
import { LeadForm } from "@/components/forms/lead-form";
import { SplitLayout } from "@/components/layouts/split-layout";
import { Mail, MapPin, Clock, MessageCircle } from "lucide-react";
import { company, contact } from "@/lib/business/company";

export const metadata: Metadata = createMetadata({
  title: "Contact Us",
  description: `Discuss your project with ${company.name}. We are ready to build your next digital product.`,
  path: "/contact",
});

export default function ContactPage() {
  return (
    <div className="py-24 md:py-36">
      <Container>
        <SplitLayout>
          <div className="flex flex-col gap-12 lg:pr-12">
            <div className="flex flex-col gap-6">
              <Heading level={1} size="display">
                Let's discuss your project.
              </Heading>
              <Text size="lg" tone="muted">
                Whether you need a complete website redesign, a complex web
                application, or an ecommerce platform, we have the expertise to
                deliver.
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
          </div>

          <div className="rounded-3xl border border-border/50 bg-background/50 p-6 md:p-10 shadow-sm backdrop-blur-xl">
            <Suspense fallback={null}>
              <LeadForm />
            </Suspense>
          </div>
        </SplitLayout>
      </Container>
    </div>
  );
}
