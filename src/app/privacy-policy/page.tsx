import type { Metadata } from "next";
import { LegalDocument } from "@/components/legal-document";
import { privacyPolicy } from "@/content/legal";

export const metadata: Metadata = {
  title: privacyPolicy.title,
  description:
    "How Research NXT collects, uses and protects your personal data, and the rights you have over it.",
  alternates: { canonical: "/privacy-policy" },
};

export default function PrivacyPolicyPage() {
  return <LegalDocument document={privacyPolicy} />;
}
