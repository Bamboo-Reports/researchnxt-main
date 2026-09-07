import type { Metadata } from "next";
import { RemixIcon } from "@/components/ui/remix-icon";
import Link from "next/link";
import { ReasonSpotlight } from "@/components/home/reason-spotlight";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { differentiators } from "@/content/home";

export const metadata: Metadata = {
  title: "Why Research NXT layout options",
  robots: { index: false, follow: false },
};

const options = [
  { id: "experience", name: "Experience leads" },
  { id: "manifesto", name: "The manifesto" },
  { id: "spotlight", name: "Reason spotlight" },
];

/** Round two keeps DM Sans and the brand palette; changes scale, spatial
 * hierarchy and interaction. Option 1 is now applied to the homepage. */
export default function WhyResearchNxtOptionsPage() {
  const [experience, ...reasons] = differentiators.items;
  return (
    <main id="main">
      <Section surface="subtle" spacing="tight">
        <Container>
          <Link href="/" className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-accent hover:underline"><RemixIcon name="arrow-left-line" className="size-4" />Back to homepage</Link>
          <h1 className="mt-6 text-headline font-display-soft">Why Research NXT: round two</h1>
          <p className="mt-4 max-w-2xl text-ink-soft">Option 1, Experience leads, is now used on the homepage.</p>
          <nav aria-label="Layout options" className="mt-6 flex flex-wrap gap-x-8 gap-y-3">
            {options.map((option, index) => (
              <a key={option.id} href={`#${option.id}`} className="py-2 text-sm font-semibold text-accent underline decoration-accent/30 underline-offset-4 hover:decoration-accent">{index + 1}. {option.name}</a>
            ))}
          </nav>
        </Container>
      </Section>
      <Section id="experience" surface="bright" bordered className="scroll-mt-28">
        <Container>
          <OptionLabel number="1" name="Experience leads" note="A large experience statement anchors one side; the other reasons form a supporting column." />
          <p className="text-sm font-semibold text-accent">{differentiators.eyebrow}</p>
          <h2 className="mt-5 max-w-4xl text-headline font-display-soft">{differentiators.title}</h2>
          <div className="mt-12 grid gap-10 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] lg:gap-20">
            <div className="flex flex-col justify-center bg-accent px-8 py-12 text-white sm:px-12 sm:py-16 lg:rounded-tr-[6rem]">
              <h3 className="font-display"><span className="block text-[6rem] leading-none tracking-[-0.04em]">7+</span><span className="mt-4 block text-headline">years of experience</span></h3>
              <p className="mt-6 max-w-[36ch] text-lg leading-relaxed">{experience.description}</p>
            </div>
            <ul className="flex flex-col justify-center gap-8 sm:gap-10">
              {reasons.map((item) => (
                <li key={item.title}><h3 className="text-title font-display-soft">{item.title}</h3><p className="mt-3 max-w-[42ch] text-base leading-relaxed text-ink-soft">{item.description}</p></li>
              ))}
            </ul>
          </div>
        </Container>
      </Section>
      <Section id="manifesto" surface="subtle" bordered className="scroll-mt-28">
        <Container>
          <OptionLabel number="2" name="The manifesto" note="Large, staggered statements give this section its own rhythm. Every reason stays visible." />
          <div className="grid gap-6 md:grid-cols-2 md:gap-12">
            <h2 className="text-title font-display-soft text-accent">{differentiators.eyebrow}</h2>
            <p className="max-w-[48ch] text-lg leading-relaxed text-ink-soft">{differentiators.title}</p>
          </div>
          <ul className="mt-14 space-y-12 sm:space-y-16 lg:mt-20">
            {differentiators.items.map((item, index) => (
              <li key={item.title} className={`max-w-4xl ${index % 2 === 1 ? "md:ml-auto md:pl-20" : "md:pr-20"}`}>
                <h3 className={`max-w-[22ch] text-display-sm font-display ${index % 2 === 1 ? "text-accent" : "text-ink"}`}>{item.title}</h3>
                <p className="mt-4 max-w-[48ch] text-base leading-relaxed text-ink-soft">{item.description}</p>
              </li>
            ))}
          </ul>
        </Container>
      </Section>
      <Section id="spotlight" bordered className="scroll-mt-28">
        <Container>
          <OptionLabel number="3" name="Reason spotlight" note="Choose a reason to bring it into focus. One large statement at a time, with no automatic cycling." />
          <p className="text-sm font-semibold text-accent">{differentiators.eyebrow}</p>
          <h2 className="mt-5 max-w-4xl text-headline font-display-soft">{differentiators.title}</h2>
          <ReasonSpotlight />
        </Container>
      </Section>
    </main>
  );
}

function OptionLabel({ number, name, note }: { number: string; name: string; note: string }) {
  return <div className="mb-10 border-b border-line pb-5"><p className="text-sm font-semibold text-ink">Option {number} · {name}</p><p className="mt-2 text-sm text-ink-soft">{note}</p></div>;
}
