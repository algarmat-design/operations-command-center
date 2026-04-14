import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css";
import { Sidebar } from "@/components/sidebar";
import { Footer } from "@/components/footer";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"], display: "swap" });
const mono = JetBrains_Mono({ variable: "--font-mono", subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL("https://operations-command-center.vercel.app"),
  title: "Operations Command Center · Álvaro García",
  description:
    "A portfolio project by Álvaro García — Senior IT Director. Executive dashboard that simulates running multi-business operations with KPIs, incident detection and automated recommendations.",
  openGraph: {
    title: "Operations Command Center · Álvaro García",
    description:
      "Portfolio project — executive dashboard with KPIs, incident detection, and an automated recommendations engine.",
    type: "website",
    url: "https://operations-command-center.vercel.app",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} ${mono.variable} h-full antialiased`}>
      <body className="min-h-full bg-[var(--background)] text-[var(--foreground)]">
        <div className="flex min-h-screen">
          <Sidebar />
          <div className="flex min-h-screen flex-1 flex-col">
            <MobileNav />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </div>
      </body>
    </html>
  );
}

function MobileNav() {
  return (
    <div className="flex items-center justify-between border-b border-white/5 bg-[var(--surface)]/60 px-4 py-3 lg:hidden">
      <Link href="/" className="flex items-center gap-2">
        <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-500/15 text-emerald-300 text-xs font-bold">
          CC
        </span>
        <span className="text-sm font-semibold text-white">Command Center</span>
      </Link>
      <div className="flex items-center gap-3 text-xs text-slate-300">
        <Link href="/" className="hover:text-white">Dashboard</Link>
        <Link href="/workflow" className="hover:text-white">Workflow</Link>
        <Link href="/resume" className="text-emerald-300 hover:text-emerald-200">Resume</Link>
      </div>
    </div>
  );
}
