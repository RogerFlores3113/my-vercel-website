import { CTABanner } from "../../layout";
import Link from "next/link";

export default function Boring() {
  return (
    <main className="max-w-3xl mx-auto px-6">

      {/* Hero */}
      <section className="boring-hero mt-10">
        <p className="eyebrow mb-3">Software Engineer</p>
        <h1 className="text-4xl font-medium tracking-tight mb-4">Roger Flores</h1>
        <p className="text-lg text-[var(--foreground-muted)] leading-relaxed mb-6">
          Full-stack and AI engineering. I&apos;ve shipped production systems for
          Fortune 500 companies and county governments — and I&apos;m building
          one of my own right now.
        </p>
        <div className="flex flex-wrap gap-3">
          <Link href="/projects" className="pill-link">Projects</Link>
          <Link href="/about"    className="pill-link">About</Link>
          <Link href="/reading"  className="pill-link">Reading</Link>
          <a href="/"            className="pill-link">← game version</a>
        </div>
      </section>

      {/* Currently building */}
      <section className="mb-12">
        <p className="eyebrow">Currently building</p>
        <div className="project-card featured-card">
          <h2 className="text-xl font-medium mb-2">
            Podium{" "}
            <a
              href="https://podium-beta.vercel.app/"
              target="_blank"
              className="text-sm text-[var(--accent)] font-normal hover:underline"
            >
              podium-beta.vercel.app ↗
            </a>
          </h2>
          <p className="text-[15px] text-[var(--foreground-muted)] leading-relaxed mb-3">
            RAG assistant with bring-your-own-key architecture. Agentic tools, multiple
            LLM backends, Terraform IaC on AWS. Beta is live.
          </p>
          <div className="flex flex-wrap gap-2">
            <span className="tech-tag">Next.js</span>
            <span className="tech-tag">AWS</span>
            <span className="tech-tag">Terraform</span>
            <span className="tech-tag">RAG</span>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mb-16">
        <CTABanner />
      </section>
    </main>
  );
}
