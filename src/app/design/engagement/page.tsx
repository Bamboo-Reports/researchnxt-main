import type { Metadata } from "next";
import Link from "next/link";
import { EngagementSpotlight } from "@/components/home/engagement-spotlight";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { engagementSteps } from "@/content/home";

export const metadata: Metadata = {
  title: "Engagement layout options",
  robots: { index: false, follow: false },
};

const options = [
  { id: "steps", name: "Stepped journey" },
  { id: "outcome", name: "The handoff" },
  { id: "spotlight", name: "Stage spotlight" },
];
const offsets = ["lg:mt-0", "lg:mt-14", "lg:mt-28", "lg:mt-42"];

/** Round two inherits DM Sans display/body roles, blue #0073b6,
 * ink #0c0e12, soft ink #39404d, line #dde3ea and white.
 * Three distinct structures: descending treads; research leading to a
 * prominent handoff; a manually selected stage with one large outcome.
 * All copy comes from the existing process. Option 1 is applied to the homepage.
 */
export default function EngagementOptionsPage() {
  const finalStage = engagementSteps.steps[3];

  return (
    <main id="main">
      <Section surface="subtle" spacing="tight">
        <Container>
          <Link href="/" className="text-sm font-semibold text-accent hover:underline">← Back to homepage</Link>
          <h1 className="mt-6 text-headline font-display-soft">How an engagement runs: round two</h1>
          <p className="mt-4 max-w-2xl text-ink-soft">Option 1, Stepped journey, is now used on the homepage.</p>
          <nav aria-label="Layout options" className="mt-6 flex flex-wrap gap-x-8 gap-y-3">
            {options.map((option, index) => (
              <a key={option.id} href={`#${option.id}`} className="py-2 text-sm font-semibold text-accent underline decoration-accent/30 underline-offset-4 hover:decoration-accent">{index + 1}. {option.name}</a>
            ))}
          </nav>
        </Container>
      </Section>

      <Section id="steps" surface="bright" bordered className="scroll-mt-28">
        <Container>
          <OptionLabel number="1" name="Stepped journey" note="Four open stages descend across the page. The shape itself shows the order." />
          <SectionHeading eyebrow={engagementSteps.eyebrow} title={engagementSteps.title} className="max-w-3xl" />
          <ol aria-label="Engagement stages" className="mt-14 grid gap-y-8 lg:grid-cols-4 lg:gap-y-0">
            {engagementSteps.steps.map((stage, index) => (
              <li key={stage.name} className={`relative border-t border-accent pt-6 lg:pr-8 ${offsets[index]}`}>
                {index > 0 && <span aria-hidden="true" className="absolute -top-14 left-0 hidden h-14 w-px bg-accent lg:block" />}
                <p className="text-sm font-semibold tabular-nums text-accent">Step {String(index + 1).padStart(2, "0")}</p>
                <h3 className="mt-4 text-headline font-display-soft">{stage.name}</h3>
                <p className="mt-4 max-w-[42ch] text-sm leading-relaxed text-ink-soft">{stage.description}</p>
                <p className="mt-6 text-sm font-semibold text-accent"><span className="sr-only">Outcome: </span>{stage.outcome}</p>
              </li>
            ))}
          </ol>
        </Container>
      </Section>

      <Section id="outcome" surface="subtle" bordered className="scroll-mt-28">
        <Container>
          <OptionLabel number="2" name="The handoff" note="The research stages lead into one prominent destination: qualified pipeline." />
          <SectionHeading eyebrow={engagementSteps.eyebrow} title={engagementSteps.title} className="max-w-3xl" />
          <ol aria-label="From research to engagement" className="mt-12 grid gap-x-16 lg:grid-cols-2 lg:grid-rows-3">
            {engagementSteps.steps.slice(0, 3).map((stage, index) => (
              <li key={stage.name} className="grid grid-cols-[2rem_minmax(0,1fr)] gap-x-4 border-t border-line py-7 lg:col-start-1">
                <span className="pt-1 text-sm tabular-nums text-accent"><span className="sr-only">Step </span>{String(index + 1).padStart(2, "0")}</span>
                <div>
                  <h3 className="text-title font-display-soft">{stage.name}</h3>
                  <p className="mt-2 max-w-[48ch] text-sm leading-relaxed text-ink-soft">{stage.description}</p>
                  <p className="mt-3 text-sm font-semibold text-accent">{stage.outcome}</p>
                </div>
              </li>
            ))}
            <li className="mt-5 flex flex-col justify-between gap-12 bg-accent px-8 py-12 text-white sm:px-12 lg:col-start-2 lg:row-span-3 lg:row-start-1 lg:mt-0 lg:rounded-bl-[5rem]">
              <div>
                <p className="text-sm font-semibold">Step 04 · {finalStage.name}</p>
                <h3 className="mt-8 max-w-[12ch] text-display-sm font-display">{finalStage.outcome}</h3>
              </div>
              <p className="max-w-[36ch] text-lg leading-relaxed">{finalStage.description}</p>
            </li>
          </ol>
        </Container>
      </Section>

      <Section id="spotlight" surface="bright" bordered className="scroll-mt-28">
        <Container>
          <OptionLabel number="3" name="Stage spotlight" note="Select a stage to see its outcome at scale. A compact interactive version with no automatic cycling." />
          <SectionHeading eyebrow={engagementSteps.eyebrow} title={engagementSteps.title} className="max-w-3xl" />
          <EngagementSpotlight />
        </Container>
      </Section>
    </main>
  );
}

function OptionLabel({ number, name, note }: { number: string; name: string; note: string }) {
  return (
    <div className="mb-10 border-b border-line pb-5">
      <p className="text-sm font-semibold text-ink">Option {number} · {name}</p>
      <p className="mt-2 text-sm text-ink-soft">{note}</p>
    </div>
  );
}
