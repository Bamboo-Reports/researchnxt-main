import { ReportCardGrid } from "@/components/report-card-grid";
import { cn } from "@/lib/cn";
import type { ReportCardItem } from "@/content/resources";

/**
 * The report landing's expert insights, one tab per group.
 *
 * The tabs run down the left at `lg` rather than across the top: group names
 * are report-specific and can be a full phrase ("Personalisation and Customer
 * Engagement"), and four of those wrap into a ragged centred row. A left rail
 * gives every name one line, a shared left edge to scan, and puts the cards
 * beside it. Below `lg` the rail becomes a stacked list above the cards.
 *
 * Built on a native radio group rather than JavaScript state, so this stays a
 * server component and, more importantly, every group is still reachable with
 * no JS: the radios work, arrow keys move between them for free, and the
 * checked one drives its panel through `peer-checked`.
 *
 * `peer-checked/name:` compiles to a sibling selector, so the inputs, the
 * labels and the panels all have to be siblings of one another. That is why
 * this is one grid with explicit row and column placement rather than the
 * nested markup the layout suggests. Tailwind needs the peer names as literal
 * strings, hence the fixed table below; it covers more groups than either
 * report currently has.
 */

const stageStyles = [
  {
    input: "peer/stage-0",
    row: "lg:row-start-1",
    label:
      "peer-checked/stage-0:text-ink peer-checked/stage-0:after:bg-signal peer-focus-visible/stage-0:outline-2 peer-focus-visible/stage-0:outline-offset-2 peer-focus-visible/stage-0:outline-accent",
    panel: "peer-checked/stage-0:block",
  },
  {
    input: "peer/stage-1",
    row: "lg:row-start-2",
    label:
      "peer-checked/stage-1:text-ink peer-checked/stage-1:after:bg-signal peer-focus-visible/stage-1:outline-2 peer-focus-visible/stage-1:outline-offset-2 peer-focus-visible/stage-1:outline-accent",
    panel: "peer-checked/stage-1:block",
  },
  {
    input: "peer/stage-2",
    row: "lg:row-start-3",
    label:
      "peer-checked/stage-2:text-ink peer-checked/stage-2:after:bg-signal peer-focus-visible/stage-2:outline-2 peer-focus-visible/stage-2:outline-offset-2 peer-focus-visible/stage-2:outline-accent",
    panel: "peer-checked/stage-2:block",
  },
  {
    input: "peer/stage-3",
    row: "lg:row-start-4",
    label:
      "peer-checked/stage-3:text-ink peer-checked/stage-3:after:bg-signal peer-focus-visible/stage-3:outline-2 peer-focus-visible/stage-3:outline-offset-2 peer-focus-visible/stage-3:outline-accent",
    panel: "peer-checked/stage-3:block",
  },
  {
    input: "peer/stage-4",
    row: "lg:row-start-5",
    label:
      "peer-checked/stage-4:text-ink peer-checked/stage-4:after:bg-signal peer-focus-visible/stage-4:outline-2 peer-focus-visible/stage-4:outline-offset-2 peer-focus-visible/stage-4:outline-accent",
    panel: "peer-checked/stage-4:block",
  },
  {
    input: "peer/stage-5",
    row: "lg:row-start-6",
    label:
      "peer-checked/stage-5:text-ink peer-checked/stage-5:after:bg-signal peer-focus-visible/stage-5:outline-2 peer-focus-visible/stage-5:outline-offset-2 peer-focus-visible/stage-5:outline-accent",
    panel: "peer-checked/stage-5:block",
  },
] as const;

export function ExpertInsightsTabs({
  groups,
}: {
  groups: { stage: string; items: ReportCardItem[] }[];
}) {
  const stages = groups.slice(0, stageStyles.length);

  return (
    <fieldset>
      <legend className="sr-only">Choose a group of interviews</legend>

      {/* The explicit row template ends in a `1fr` filler: the panel is far
          taller than the four labels, and without the filler the grid would
          stretch the label rows apart to fill the panel's height, scattering
          the rail down the page. All extra height lands in the empty last
          row instead, so the labels stay clustered at the top. */}
      <div className="grid gap-x-10 gap-y-2 lg:grid-cols-[minmax(0,15rem)_minmax(0,1fr)] lg:grid-rows-[repeat(6,auto)_1fr]">
        {stages.map((group, index) => (
          <input
            key={group.stage}
            type="radio"
            name="expert-insights-stage"
            id={`expert-insights-${index}`}
            defaultChecked={index === 0}
            className={cn("sr-only", stageStyles[index].input)}
          />
        ))}

        {stages.map((group, index) => (
          <label
            key={group.stage}
            htmlFor={`expert-insights-${index}`}
            className={cn(
              "relative cursor-pointer border-l border-line py-2 pl-4 text-sm font-semibold text-ink-muted transition-colors duration-200 [transition-timing-function:var(--ease-out-quart)] hover:text-ink",
              // The active mark is the same signal bar as the nav, turned on
              // its side to sit on the rail's own hairline.
              "after:absolute after:inset-y-0 after:-left-px after:w-0.5 after:bg-transparent after:transition-colors after:duration-200",
              "lg:col-start-1",
              stageStyles[index].row,
              stageStyles[index].label,
            )}
          >
            {group.stage}
          </label>
        ))}

        {stages.map((group, index) => (
          <div
            key={group.stage}
            className={cn(
              "mt-8 hidden lg:col-start-2 lg:row-span-full lg:row-start-1 lg:mt-0",
              stageStyles[index].panel,
            )}
          >
            <ReportCardGrid items={group.items} />
          </div>
        ))}
      </div>
    </fieldset>
  );
}
