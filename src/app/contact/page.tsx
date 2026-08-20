import type { Metadata } from "next";
import { JotformEmbed } from "@/components/forms/jotform-embed";
import { PageHero } from "@/components/layout/page-hero";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { site } from "@/config/site";
import { contactPage } from "@/content/contact";

export const metadata: Metadata = {
  title: "Contact",
  description: contactPage.metaDescription,
  alternates: { canonical: "/contact" },
};

/** A labelled block in the contact sidebar. */
function Detail({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-3 border-t border-line pt-6">
      {/* h3: these sit under the aside's h2, not beside it. */}
      <h3 className="flex items-center gap-2.5 text-sm font-semibold text-ink">
        <span
          aria-hidden="true"
          className="size-1.5 shrink-0 rounded-[1px] bg-signal"
        />
        {label}
      </h3>
      {children}
    </div>
  );
}

export default function ContactPage() {
  return (
    <main id="main">
      <PageHero
        eyebrow={contactPage.eyebrow}
        title={contactPage.title}
        lede={contactPage.lede}
      />

      <Section spacing="default">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1fr_1.5fr] lg:gap-20">
            <aside className="flex flex-col gap-8">
              <div className="flex flex-col gap-3">
                <h2 className="text-title font-display-soft">
                  {contactPage.aside.title}
                </h2>
                <p className="text-sm leading-relaxed text-ink-soft">
                  {contactPage.aside.body}
                </p>
              </div>

              <Detail label="Office">
                <address className="not-italic text-sm leading-relaxed text-ink-soft">
                  {site.address.lines.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </address>
              </Detail>

              <Detail label="Email">
                <a
                  href={`mailto:${site.email}`}
                  className="text-sm font-semibold text-accent transition-colors duration-200 hover:text-accent-hover"
                >
                  {site.email}
                </a>
              </Detail>
            </aside>

            <div className="border-t-2 border-ink pt-8">
              {/* Enquiries land through Jotform, not a local form. */}
              <JotformEmbed
                formId="92022271643449"
                title="Business enquiry form"
              />
            </div>
          </div>
        </Container>
      </Section>
    </main>
  );
}
