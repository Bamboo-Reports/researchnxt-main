"use client";

// TODO(phase-c): wire to a real backend (HubSpot / route handler + email).
// Nothing here submits anywhere — onSubmit is intercepted and acknowledged
// inline so the flow can be reviewed without a provider.

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { solutionsNav } from "@/config/nav";
import { formConfirmation } from "@/content/contact";
import { Checkbox, Field, Input, Select, Textarea } from "./fields";

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div role="status" className="flex flex-col gap-3 border-t border-line pt-6">
        <h2 className="text-title font-display-soft">{formConfirmation.title}</h2>
        <p className="text-sm leading-relaxed text-ink-soft">
          {formConfirmation.lede}
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Full name" htmlFor="name" required>
          <Input id="name" name="name" autoComplete="name" required />
        </Field>

        <Field label="Work email" htmlFor="email" required>
          <Input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
          />
        </Field>

        <Field label="Company" htmlFor="company" required>
          <Input
            id="company"
            name="company"
            autoComplete="organization"
            required
          />
        </Field>

        <Field label="Job title" htmlFor="jobTitle">
          <Input
            id="jobTitle"
            name="jobTitle"
            autoComplete="organization-title"
          />
        </Field>
      </div>

      <Field
        label="What are you interested in?"
        htmlFor="solution"
        hint="Pick the closest fit. You can tell us the detail below."
      >
        <Select id="solution" name="solution" defaultValue="">
          <option value="" disabled>
            Select a solution
          </option>
          {solutionsNav.map((solution) => (
            <option key={solution.href} value={solution.label}>
              {solution.label}
            </option>
          ))}
          <option value="Something else">Something else</option>
        </Select>
      </Field>

      <Field label="How can we help?" htmlFor="message" required>
        <Textarea
          id="message"
          name="message"
          required
          placeholder="Tell us about your target market, campaign goals or data challenges."
        />
      </Field>

      <Checkbox
        name="consent"
        required
        label={
          <>
            I agree to Research NXT processing my details in line with the{" "}
            <Link
              href="/privacy-policy"
              className="text-accent underline underline-offset-2"
            >
              Privacy Policy
            </Link>
            .
          </>
        }
      />

      <div className="flex flex-wrap items-center gap-4 pt-1">
        <Button type="submit">
          Send enquiry
        </Button>
        <p className="text-sm text-ink-muted">
          We respond within 24 hours on business days.
        </p>
      </div>
    </form>
  );
}
