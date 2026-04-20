import Link from "next/link";
import Image from "next/image";
import { PandaWalker } from "@/app/components/PandaWalker";

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="text-[var(--foreground-muted)] hover:text-[var(--foreground)] transition-colors duration-200 text-[15px]"
    >
      {children}
    </Link>
  );
}

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

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <nav className="sticky top-0 z-50 backdrop-blur-md bg-[var(--background)]/80 border-b border-[var(--border)]">
        <div className="max-w-3xl mx-auto px-6 h-14 flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 hover:opacity-80 transition-opacity"
          >
            <Image
              src="/headshot_pic.jpg"
              alt="Roger Flores"
              width={28}
              height={28}
              className="rounded-full object-cover object-top"
            />
            <span className="font-medium text-[var(--foreground)] text-[15px]">Roger Flores</span>
          </Link>
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
      {children}
      <Footer />
      <PandaWalker />
    </>
  );
}
