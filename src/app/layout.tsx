import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import { site } from "@/config/site";
import "./globals.css";

/**
 * One family, both axes. The display voice comes from pushing the optical-size
 * axis to 40 at weight 800 rather than from introducing a second typeface,
 * which keeps the page sans-only and the font payload to a single variable file.
 */
const dmSans = DM_Sans({
  subsets: ["latin"],
  axes: ["opsz"],
  display: "swap",
  variable: "--font-dm-sans",
});

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: site.name,
  url: site.url,
  description: site.description,
  email: site.email,
  address: {
    "@type": "PostalAddress",
    streetAddress: site.address.lines.slice(0, 2).join(", "),
    addressLocality: "Pune",
    addressRegion: "Maharashtra",
    postalCode: "411006",
    addressCountry: "IN",
  },
  sameAs: site.social.map((channel) => channel.href),
};

/**
 * Runs before first paint so the hero never flashes from visible to hidden.
 * Animation is gated entirely behind this attribute, so a headless render, a
 * no-JS visit or a reduced-motion preference ships the page fully visible with
 * no motion at all.
 *
 * Setting it on the server instead is not an option: the value depends on the
 * visitor's motion preference, which the server cannot know. That means `<html>`
 * carries an attribute after this script runs that was not in the SSR output,
 * so the element is marked `suppressHydrationWarning` below. The suppression
 * applies to that one element's own attributes, not to its subtree.
 */
const motionGate = `try{if(!matchMedia("(prefers-reduced-motion: reduce)").matches){document.documentElement.dataset.motion="on"}}catch(e){}`;

export const metadata: Metadata = {
  metadataBase: new URL("https://researchnxt.com"),
  title: {
    default:
      "Research NXT: turnkey research solutions for B2B marketing leaders",
    template: "%s | Research NXT",
  },
  description:
    "Research NXT offers custom engagement solutions based on high-quality research to business and marketing leaders, covering prospect database, account intelligence and research-based marketing.",
  openGraph: {
    type: "website",
    siteName: "Research NXT",
    locale: "en_IN",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // `data-scroll-behavior="smooth"` keeps Next's pre-16 behaviour: the global
  // `scroll-behavior: smooth` applies to in-page anchors, but route transitions
  // still jump to the top instantly. Without it, Next 16 leaves the CSS alone
  // and navigations animate their scroll.
  return (
    <html
      lang="en"
      className={dmSans.variable}
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: motionGate }} />
      </head>
      <body className="flex min-h-screen flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />
        <a
          href="#main"
          className="sr-only z-[var(--z-skip)] focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:rounded-md focus:bg-accent focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white"
        >
          Skip to content
        </a>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
