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
  icons: { icon: "/icon.png" },
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
   Re-exported here for backward compat with existing imports.
   ------------------------------------------------ */
export { CTABanner } from "./components/CTABanner";

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
