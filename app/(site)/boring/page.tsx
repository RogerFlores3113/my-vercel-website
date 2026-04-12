import { CTABanner } from "../../layout";
import Link from "next/link";

export default function Boring() {
  return (
    <main className="max-w-3xl mx-auto px-6">
      <section className="pt-16 pb-10">
        <p className="eyebrow mb-4">standard site</p>
        <h1 className="text-4xl font-medium tracking-tight mb-3">Roger Flores</h1>
        <p className="text-lg text-[var(--foreground-muted)] leading-relaxed mb-6">
          Software engineer at the intersection of full-stack development and AI.
          Currently looking for SWE / AI engineering roles.
        </p>
        <div className="flex flex-wrap gap-3">
          <Link href="/projects" className="pill-link">Projects</Link>
          <Link href="/about"    className="pill-link">About</Link>
          <Link href="/reading"  className="pill-link">Reading</Link>
          <a href="/"            className="pill-link">← game version</a>
        </div>
      </section>

      <section className="mb-16">
        <CTABanner />
      </section>
    </main>
  );
}
