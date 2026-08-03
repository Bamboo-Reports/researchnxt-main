"use client";

// TODO(phase-c): wire to a real backend and serve the actual report file.
// Nothing here submits anywhere — onSubmit is intercepted and acknowledged
// inline so the flow can be reviewed without a provider. The company-size
// options are stand-ins until the real form's ranges are confirmed.

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import type { ConsentSegment } from "@/content/resources";
import { Checkbox, Field, Input, Select } from "./fields";

const sizeOptions = ["1-50", "51-200", "201-1,000", "1,001-5,000", "5,000+"];

export function DownloadForm({
  report,
  submitLabel,
  consent,
}: {
  /** Report title, used to namespace field ids. */
  report: string;
  submitLabel: string;
  consent: ConsentSegment[];
}) {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div role="status" className="flex flex-col gap-3 border-t border-line pt-6">
        <h2 className="text-title font-display-soft">
          We have got it. Thanks for reaching out
        </h2>
        <p className="text-sm leading-relaxed text-ink-soft">
          A member of the Research NXT team will send the report to your inbox
          within 24 hours on business days.
        </p>
      </div>
    );
  }

  const id = (field: string) =>
    `${report.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-${field}`;

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="First name" htmlFor={id("first-name")} required>
          <Input
            id={id("first-name")}
            name="firstName"
            autoComplete="given-name"
            required
          />
        </Field>

        <Field label="Last name" htmlFor={id("last-name")} required>
          <Input
            id={id("last-name")}
            name="lastName"
            autoComplete="family-name"
            required
          />
        </Field>

        <Field label="Job title" htmlFor={id("job-title")} required>
          <Input
            id={id("job-title")}
            name="jobTitle"
            autoComplete="organization-title"
            required
          />
        </Field>

        <Field label="Company" htmlFor={id("company")} required>
          <Input
            id={id("company")}
            name="company"
            autoComplete="organization"
            required
          />
        </Field>

        <Field label="Work email" htmlFor={id("email")} required>
          <Input
            id={id("email")}
            name="email"
            type="email"
            autoComplete="email"
            required
          />
        </Field>

        <Field label="Phone" htmlFor={id("phone")}>
          <Input id={id("phone")} name="phone" type="tel" autoComplete="tel" />
        </Field>

        <Field label="Company size" htmlFor={id("size")}>
          <Select id={id("size")} name="size" defaultValue="">
            <option value="" disabled>
              Please select
            </option>
            {sizeOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </Select>
        </Field>

        <Field label="Country" htmlFor={id("country")}>
          <Input
            id={id("country")}
            name="country"
            autoComplete="country-name"
            defaultValue="India"
          />
        </Field>
      </div>

      <Checkbox
        name="consent"
        required
        label={
          <>
            {consent.map((segment) =>
              segment.href ? (
                segment.external ? (
                  <a
                    key={segment.text}
                    href={segment.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-accent underline underline-offset-2"
                  >
                    {segment.text}
                  </a>
                ) : (
                  <Link
                    key={segment.text}
                    href={segment.href}
                    className="text-accent underline underline-offset-2"
                  >
                    {segment.text}
                  </Link>
                )
              ) : (
                segment.text
              ),
            )}
          </>
        }
      />

      <div className="pt-1">
        <Button type="submit">{submitLabel}</Button>
      </div>
    </form>
  );
}
