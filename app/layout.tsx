import type { Metadata } from "next";
import { Geist, Geist_Mono, Nunito } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Loaded so Phaser game text can use Nunito for a lighthearted feel
const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Roger Flores | Software Engineer",
  description:
    "Software engineer building at the intersection of full-stack development and AI. Currently exploring LLM training on consumer hardware.",
  openGraph: {
    title: "Roger Flores | Software Engineer",
    description:
      "Software engineer building at the intersection of full-stack development and AI.",
    type: "website",
  },
};

/* ------------------------------------------------
   CTA Banner — reusable, used by (site) pages
   ------------------------------------------------ */
export function CTABanner() {
  return (
    <div className="cta-banner">
      <h3>Looking for SWE / AI engineering roles</h3>
      <p>Let&apos;s talk about what I can build for your team.</p>
      <a href="mailto:rflores3113@gmail.com">rflores3113@gmail.com →</a>
    </div>
  );
}

/* ------------------------------------------------
   Root Layout — bare HTML shell only.
   Nav + footer live in app/(site)/layout.tsx.
   The game page (/) gets this shell with nothing else.
   ------------------------------------------------ */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} ${nunito.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
