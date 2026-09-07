import { RemixIcon, type RemixIconName } from "@/components/ui/remix-icon";

export function SocialIcon({ label, className }: { label: string; className?: string }) {
  const name: RemixIconName | null = /linkedin/i.test(label) ? "linkedin-box-fill"
    : /twitter|^x$/i.test(label) ? "twitter-x-fill"
    : /youtube/i.test(label) ? "youtube-fill" : null;
  return name ? <RemixIcon name={name} className={className} /> : null;
}
