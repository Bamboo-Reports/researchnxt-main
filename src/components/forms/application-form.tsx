"use client";

// TODO(phase-c): wire to a real backend, including resume file handling.
// The file input below accepts a file but nothing is uploaded or read.

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Checkbox, Field, Input, Textarea } from "./fields";

export function ApplicationForm({ role }: { role: string }) {
  const router = useRouter();

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    router.push("/thank-you");
  }

  // Namespaced ids so multiple openings can render forms on the same page.
  const id = (field: string) =>
    `${role.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-${field}`;

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <input type="hidden" name="role" value={role} />

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Full name" htmlFor={id("name")} required>
          <Input id={id("name")} name="name" autoComplete="name" required />
        </Field>

        <Field label="Email" htmlFor={id("email")} required>
          <Input
            id={id("email")}
            name="email"
            type="email"
            autoComplete="email"
            required
          />
        </Field>

        <Field label="Phone" htmlFor={id("phone")}>
          <Input
            id={id("phone")}
            name="phone"
            type="tel"
            autoComplete="tel"
          />
        </Field>

        <Field label="LinkedIn profile" htmlFor={id("linkedin")}>
          <Input
            id={id("linkedin")}
            name="linkedin"
            type="url"
            placeholder="https://linkedin.com/in/…"
          />
        </Field>
      </div>

      <Field
        label="Resume"
        htmlFor={id("resume")}
        hint="PDF or DOCX, up to 5 MB."
      >
        <Input
          id={id("resume")}
          name="resume"
          type="file"
          accept=".pdf,.doc,.docx"
          className="py-2 text-sm file:mr-3 file:rounded-[3px] file:border-0 file:bg-surface-muted file:px-3 file:py-1.5 file:text-sm file:font-semibold file:text-ink"
        />
      </Field>

      <Field label="Why this role?" htmlFor={id("message")}>
        <Textarea
          id={id("message")}
          name="message"
          placeholder="A few lines on what draws you to this opening."
        />
      </Field>

      <Checkbox
        name="consent"
        required
        label={
          <>
            I agree to Research NXT storing my application in line with the{" "}
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

      <div className="pt-1">
        <Button type="submit">Submit application</Button>
      </div>
    </form>
  );
}
