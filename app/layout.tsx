import type { Metadata } from "next";
import { Chivo, JetBrains_Mono, Public_Sans } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { SkipLink } from "@/components/ui/primitives";
import { capabilities, identity, positioning } from "@/content/profile";

// All three are variable fonts, so `weight` is deliberately omitted — passing it
// would force static per-weight files instead of one variable file per family.
const chivo = Chivo({ variable: "--font-chivo", subsets: ["latin"], display: "swap" });
const publicSans = Public_Sans({ variable: "--font-public-sans", subsets: ["latin"], display: "swap" });
const jetbrains = JetBrains_Mono({ variable: "--font-jetbrains", subsets: ["latin"], display: "swap" });

const TITLE = `${identity.name} — ${identity.title}`;

export const metadata: Metadata = {
  metadataBase: new URL(identity.site),
  title: { default: TITLE, template: `%s · ${identity.name}` },
  description: positioning.subhead,
  applicationName: TITLE,
  authors: [{ name: identity.name, url: identity.site }],
  creator: identity.name,
  openGraph: {
    type: "profile",
    siteName: TITLE,
    title: TITLE,
    description: positioning.subhead,
    url: identity.site,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: positioning.subhead,
  },
  robots: { index: true, follow: true },
};

/**
 * Person schema. This is what a search engine reads when someone searches the
 * name, so it is built from the same content module the page renders.
 */
function personJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: identity.name,
    alternateName: identity.alternateName,
    jobTitle: identity.title,
    description: positioning.subhead,
    url: identity.site,
    email: `mailto:${identity.email}`,
    telephone: identity.phone,
    sameAs: [identity.linkedin],
    address: { "@type": "PostalAddress", addressLocality: "Guadalajara", addressCountry: "MX" },
    knowsAbout: capabilities.map((c) => c.name),
    knowsLanguage: ["en", "es"],
  };
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      // Next 16 no longer forces scroll-behavior during navigation; this opts the
      // anchor links (/capabilities#id) back into smooth scrolling.
      data-scroll-behavior="smooth"
      suppressHydrationWarning
      className={`${chivo.variable} ${publicSans.variable} ${jetbrains.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-canvas text-text">
        {/* First child of <body>: runs before paint, so an explicit theme choice
            never flashes. Does nothing in the common case — color-scheme already
            resolves the OS preference in pure CSS. */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "(function(){try{var t=localStorage.getItem('theme');if(t==='dark'||t==='light')document.documentElement.setAttribute('data-theme',t)}catch(e){}})()",
          }}
        />
        <script
          type="application/ld+json"
          // JSON.stringify does not escape `<`; doing it by hand prevents the
          // string from closing the script tag.
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(personJsonLd()).replace(/</g, "\\u003c"),
          }}
        />
        <SkipLink />
        <SiteHeader />
        <main id="main" className="flex-1">
          {children}
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}
