import { PageHero } from "@/components/layout/page-hero";
import { Container } from "@/components/ui/container";
import { Prose } from "@/components/ui/prose";
import { Section } from "@/components/ui/section";
import type { LegalDocument as LegalDocumentData } from "@/content/legal";

export function LegalDocument({ document }: { document: LegalDocumentData }) {
  return (
    <main id="main">
      <PageHero
        eyebrow="Legal"
        title={document.title}
        lede={
          document.effectiveDate
            ? `Effective date: ${document.effectiveDate}`
            : undefined
        }
      />

      <Section spacing="default">
        <Container width="narrow">
          <Prose>
            {document.intro?.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}

            {document.sections.map((section) => (
              <section key={section.heading ?? section.paragraphs?.[0]}>
                {section.heading ? <h2>{section.heading}</h2> : null}
                {section.paragraphs?.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
                {section.list ? (
                  <ul>
                    {section.list.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                ) : null}
              </section>
            ))}
          </Prose>
        </Container>
      </Section>
    </main>
  );
}
