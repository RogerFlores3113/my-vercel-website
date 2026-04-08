import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
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
   Nav link component with active state
   ------------------------------------------------ */
function NavLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  // NOTE: Since layout.tsx is a Server Component, we can't use usePathname() here.
  // For active states, you have two options:
  //   Option A: Extract the nav into a separate "use client" component (recommended).
  //   Option B: Keep it simple with CSS :hover only (what we're doing here for now).
  //
  // If you want active link highlighting, create a `components/Nav.tsx` client component
  // that uses `usePathname()` and move this nav markup there.

  return (
    <Link
      href={href}
      className="text-[var(--foreground-muted)] hover:text-[var(--foreground)] transition-colors duration-200 text-[15px]"
    >
      {children}
    </Link>
  );
}

/* ------------------------------------------------
   CTA Banner  reusable, goes at bottom of every page
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
   Footer
   ------------------------------------------------ */
function Footer() {
  return (
    <footer className="max-w-3xl mx-auto px-6 py-12 mt-8 border-t border-[var(--border)]">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-[13px] text-[var(--foreground-faint)]">
        <span>© 2026 Roger Flores</span>
        <div className="flex gap-6">
          <a
            href="https://github.com/RogerFlores3113"
            target="_blank"
            className="hover:text-[var(--foreground-muted)] transition-colors"
          >
            GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/roger-flores-3113-nu/"
            target="_blank"
            className="hover:text-[var(--foreground-muted)] transition-colors"
          >
            LinkedIn
          </a>
          <a
            href="mailto:rflores3113@gmail.com"
            className="hover:text-[var(--foreground-muted)] transition-colors"
          >
            Email
          </a>
        </div>
      </div>
    </footer>
  );
}

/* ------------------------------------------------
   Root Layout
   ------------------------------------------------ */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* ---- NAV ---- */}
        <nav className="sticky top-0 z-50 backdrop-blur-md bg-[var(--background)]/80 border-b border-[var(--border)]">
          <div className="max-w-3xl mx-auto px-6 h-14 flex items-center justify-between">
            {/* Name as home link */}
            <Link
              href="/"
              className="font-medium text-[var(--foreground)] text-[15px] hover:opacity-80 transition-opacity"
            >
              Roger Flores
            </Link>

            {/* Page links + Resume CTA */}
            <div className="flex items-center gap-6">
              <NavLink href="/projects">Projects</NavLink>
              <NavLink href="/about">About</NavLink>
              <NavLink href="/reading">Reading</NavLink>
              <a
                href="/rflores_resume.pdf"
                className="pill-link !py-[5px] !px-[14px] !text-[13px]"
              >
                Resume
              </a>
            </div>
          </div>
        </nav>

        {/* ---- PAGE CONTENT ---- */}
        {children}

        {/* ---- FOOTER ---- */}
        <Footer />
      </body>
    </html>
  );
}