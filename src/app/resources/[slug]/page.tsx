import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/layout/page-hero";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { getResourcePage, resourcePages } from "@/content/resources";

/**
 * PHASE B: one shared placeholder template for the Resources pages that do not
 * have real content yet (Experts view has its own route).
 * The pages are noindexed and absent from the sitemap until real content
 * lands; drop the robots override and add them to `sitemap.ts` then.
 */

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return resourcePages.map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const page = getResourcePage(slug);
  if (!page) return {};

  return {
    title: page.metaTitle,
    description: page.lede,
    robots: { index: false },
    alternates: { canonical: `/resources/${page.slug}` },
  };
}

export default async function ResourcePage({ params }: Params) {
  const { slug } = await params;
  const page = getResourcePage(slug);
  if (!page) notFound();

  return (
    <main id="main">
      <PageHero eyebrow="Resources" title={page.title} lede={page.lede} />

      <Section spacing="default">
        <Container>
          <div className="flex max-w-xl flex-col gap-5 border-t border-line pt-8">
            <span
              aria-hidden="true"
              className="h-1 w-8 rounded-[1px] bg-signal"
            />
            <h2 className="text-title font-display-soft">
              This page is being prepared
            </h2>
            <p className="text-base leading-relaxed text-ink-soft">
              The content for this section is on its way. In the meantime, tell
              us what you are working on and we will point you at the right
              research.
            </p>
            <div className="pt-2">
              <Button href="/contact">Contact us</Button>
            </div>
          </div>
        </Container>
      </Section>
    </main>
  );
}
