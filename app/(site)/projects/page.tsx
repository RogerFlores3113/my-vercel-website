"use client";

import { useState } from "react";
import Image from "next/image";
import { CTABanner } from "../../components/CTABanner";
import ComingSoonModal from "../../components/ComingSoonModal";
import OfflinePlaceholder from "../../components/OfflinePlaceholder";

export default function Projects() {
  const [searchModalOpen, setSearchModalOpen] = useState(false);

  return (
    <main className="max-w-3xl mx-auto px-6">
      <ComingSoonModal isOpen={searchModalOpen} onClose={() => setSearchModalOpen(false)} />

      {/* Header */}
      <section className="pt-16 pb-10">
        <h1 className="text-4xl font-medium tracking-tight mb-4">Projects</h1>
        <p className="text-lg text-[var(--foreground-muted)] leading-relaxed">
          Everything here was built with purpose, whether it be solving a real problem for
          someone I know or exploring something I found genuinely interesting.
        </p>
      </section>

      {/* ============================================
          PROFESSIONAL EXPERIENCE
          ============================================ */}
      <section className="mb-16">
        <h2 className="text-xl font-semibold text-[var(--foreground)] mb-4">Professional experience</h2>

        <div className="space-y-5">
          {/* Property Appraisal */}
          <div className="project-card">
            <p className="label-pro mb-2">Pilot deployment · 2 county clients</p>
            <h2 className="text-xl font-medium mb-3">
              Property Appraisal Prediction Platform
            </h2>
            <p className="text-[15px] text-[var(--foreground-muted)] leading-relaxed mb-3">
              County governments needed to modernize property valuations, but
              their data was inconsistent, with missing fields, ambiguous
              definitions, and unresponsive data providers across jurisdictions.
            </p>
            <p className="text-[15px] text-[var(--foreground-muted)] leading-relaxed mb-3">
              I led pilot deployment for two counties: gathering requirements
              directly from government stakeholders, translating messy
              real-world data into usable ML features, and customizing the
              React frontend for county-specific workflows.
            </p>
            <p className="text-[15px] text-[var(--foreground-muted)] leading-relaxed mb-4">
              Both pilots shipped to production despite significant data
              pipeline limitations and coordination challenges across
              organizations.
            </p>
            <div className="flex flex-wrap gap-2 mb-3">
              <span className="tech-tag">React</span>
              <span className="tech-tag">Python</span>
              <span className="tech-tag">SQL</span>
              <span className="tech-tag">Cassandra</span>
              <span className="tech-tag">Data Integration</span>
            </div>
            <p className="text-[13px] text-[var(--foreground-faint)]">
              Proprietary client work
            </p>
          </div>

          {/* Inventory Optimization */}
          <div className="project-card">
            <p className="label-pro mb-2">Fortune 500 clients · 6-person team</p>
            <h2 className="text-xl font-medium mb-3">
              Inventory Optimization Platform
            </h2>
            <p className="text-[15px] text-[var(--foreground-muted)] leading-relaxed mb-3">
              Fortune 500 energy and steel companies needed AI-powered inventory
              optimization across multi-terabyte datasets. This was demand forecasting,
              pricing fluctuations, and logistics constraints all in one system.
            </p>
            <p className="text-[15px] text-[var(--foreground-muted)] leading-relaxed mb-3">
              I worked across the full stack: resolving complex bugs where React
              UI components interacted poorly with large-scale database
              operations, building automated data validation jobs, and shipping
              features under tight client deadlines.
            </p>
            <p className="text-[15px] text-[var(--foreground-muted)] leading-relaxed mb-4">
              Maintained and extended the production system alongside five other
              engineers, balancing ongoing bug resolution with new feature development.
            </p>
            <div className="flex flex-wrap gap-2 mb-3">
              <span className="tech-tag">React</span>
              <span className="tech-tag">Python</span>
              <span className="tech-tag">SQL</span>
              <span className="tech-tag">Cassandra</span>
            </div>
            <p className="text-[13px] text-[var(--foreground-faint)]">
              Proprietary client work
            </p>
          </div>
        </div>
      </section>

      {/* ============================================
          PERSONAL PROJECTS
          ============================================ */}
      <section className="mb-16">
        <h2 className="text-xl font-semibold text-[var(--foreground)] mb-4">Personal projects</h2>

        <div className="space-y-5">
          {/* Podium — featured */}
          <div className="project-card featured-card">
            <div className="project-screenshot">
              <Image
                src="/screenshots/podium.png"
                alt="Podium app screenshot"
                fill
                style={{ objectFit: "cover", objectPosition: "top center" }}
                sizes="(max-width: 768px) 100vw, 768px"
              />
            </div>
            <p className="label-personal mb-2">RAG LLM assistant · Live</p>
            <h2 className="text-xl font-medium mb-3">
              Podium{" "}
              <a
                href="https://podium.rogerflores.dev/"
                target="_blank" rel="noopener noreferrer"
                className="text-sm text-[var(--accent)] hover:underline font-normal"
              >
                podium.rogerflores.dev ↗
              </a>
            </h2>
            <p className="text-[15px] text-[var(--foreground-muted)] leading-relaxed mb-3">
              A production RAG assistant with agentic tools and modular plug-and-play LLM support — swap
              backends without changing your workflow. Users bring their own API keys; credentials are
              never stored. Clerk handles auth, with a free guest tier so anyone can try it.
            </p>
            <p className="text-[15px] text-[var(--foreground-muted)] leading-relaxed mb-4">
              Infrastructure managed via Terraform on AWS. Frontend on Vercel. My current main build.
            </p>
            <div className="flex flex-wrap gap-2 mb-3">
              <span className="tech-tag">Next.js</span>
              <span className="tech-tag">TypeScript</span>
              <span className="tech-tag">AWS</span>
              <span className="tech-tag">Terraform</span>
              <span className="tech-tag">Clerk</span>
              <span className="tech-tag">RAG</span>
              <span className="tech-tag">LLM</span>
            </div>
            <a
              href="https://podium.rogerflores.dev/"
              target="_blank" rel="noopener noreferrer"
              className="text-[13px] text-[var(--accent)] hover:underline"
            >
              Try it out! Guests get limited free usage. →
            </a>
          </div>

          {/* Search */}
          <div
            className="project-card cursor-pointer"
            onClick={() => setSearchModalOpen(true)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") setSearchModalOpen(true); }}
          >
            <div className="offline-placeholder">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.4 }}>
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <span>Screenshot coming soon</span>
            </div>
            <p className="label-personal mb-2">Agentic tool · In development</p>
            <h2 className="text-xl font-medium mb-3">Search</h2>
            <p className="text-[15px] text-[var(--foreground-muted)] leading-relaxed mb-3">
              An LLM-powered agent that loops: screenshot → click → screenshot → click. Designed to
              collect apartment listings, recruitment leads, job openings, or anything that fits a
              mass search format. Modular enough to aim at new targets with minimal reconfiguration.
            </p>
            <p className="text-[15px] text-[var(--foreground-muted)] leading-relaxed mb-4">
              Locally installed. Not a web app.
            </p>
            <div className="flex flex-wrap gap-2 mb-3">
              <span className="tech-tag">Python</span>
              <span className="tech-tag">LLM</span>
              <span className="tech-tag">Computer Use</span>
            </div>
            <p className="text-[13px] text-[var(--foreground-faint)]">
              Available on request
            </p>
          </div>

          {/* Experiments */}
          <div className="project-card">
            <div className="project-screenshot">
              <Image
                src="/screenshots/experiments.png"
                alt="Experiments site screenshot"
                fill
                style={{ objectFit: "cover", objectPosition: "top center" }}
                sizes="(max-width: 768px) 100vw, 768px"
              />
            </div>
            <p className="label-personal mb-2">LLM research · Live</p>
            <h2 className="text-xl font-medium mb-3">
              Experiments{" "}
              <a
                href="https://experiments.rogerflores.dev"
                target="_blank" rel="noopener noreferrer"
                className="text-sm text-[var(--accent)] hover:underline font-normal"
              >
                experiments.rogerflores.dev ↗
              </a>
            </h2>
            <p className="text-[15px] text-[var(--foreground-muted)] leading-relaxed mb-3">
              A site where I post writeups on my own experiments running and tuning local LLMs —
              LoRA fine-tuning, weight probes, math benchmarks, and whatever else I&apos;m currently
              obsessing over.
            </p>
            <div className="flex flex-wrap gap-2 mb-3">
              <span className="tech-tag">Python</span>
              <span className="tech-tag">LLM</span>
              <span className="tech-tag">LoRA</span>
            </div>
          </div>

          {/* Longdle */}
          <div className="project-card">
            <div className="project-screenshot">
              <Image
                src="/screenshots/longdle.png"
                alt="Longdle word game screenshot"
                fill
                style={{ objectFit: "cover", objectPosition: "top center" }}
                sizes="(max-width: 768px) 100vw, 768px"
              />
            </div>
            <p className="label-personal mb-2">Word game · Live</p>
            <h2 className="text-xl font-medium mb-3">
              Longdle{" "}
              <a
                href="https://longdle.rogerflores.dev"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-[var(--accent)] hover:underline font-normal"
              >
                longdle.rogerflores.dev ↗
              </a>
            </h2>
            <p className="text-[15px] text-[var(--foreground-muted)] leading-relaxed mb-3">
              Wordle, but the word is six letters. Daily puzzle updates, localStorage score tracking,
              and infinite replayability via a randomizer mode for when the daily isn&apos;t enough.
            </p>
            <p className="text-[15px] text-[var(--foreground-muted)] leading-relaxed mb-4">
              Try if you dare.
            </p>
            <div className="flex flex-wrap gap-2 mb-3">
              <span className="tech-tag">Next.js</span>
              <span className="tech-tag">TypeScript</span>
            </div>
          </div>

          {/* Short */}
          <div className="project-card">
            <div className="project-screenshot">
              <Image
                src="/screenshots/short.png"
                alt="Short URL shortener screenshot"
                fill
                style={{ objectFit: "cover", objectPosition: "top center" }}
                sizes="(max-width: 768px) 100vw, 768px"
              />
            </div>
            <h2 className="text-xl font-medium mb-3">
              Short{" "}
              <a
                href="https://short.rogerflores.dev"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-[var(--accent)] hover:underline font-normal"
              >
                short.rogerflores.dev ↗
              </a>
            </h2>
            <p className="text-[15px] text-[var(--foreground-muted)] leading-relaxed mb-3">
              Simple, minimal, functional. A URL shortener I built as a deliberate test of my own
              system design and fundamentals — rate limiting, collision handling, redirect latency.
              Ended up being genuinely useful.
            </p>
            <div className="flex flex-wrap gap-2 mb-3">
              <span className="tech-tag">Next.js</span>
              <span className="tech-tag">TypeScript</span>
              <span className="tech-tag">System Design</span>
            </div>
          </div>

          {/* Property */}
          <div className="project-card">
            <div className="project-screenshot">
              <Image
                src="/screenshots/property.png"
                alt="Property app screenshot"
                fill
                style={{ objectFit: "cover", objectPosition: "top center" }}
                sizes="(max-width: 768px) 100vw, 768px"
              />
            </div>
            <p className="label-personal mb-2">Personal project · Discontinued · Live</p>
            <h2 className="text-xl font-medium mb-3">
              Property{" "}
              <a
                href="https://property.rogerflores.dev"
                target="_blank" rel="noopener noreferrer"
                className="text-sm text-[var(--accent)] hover:underline font-normal"
              >
                property.rogerflores.dev ↗
              </a>
            </h2>
            <p className="text-[15px] text-[var(--foreground-muted)] leading-relaxed mb-3">
              A property search tool I built and deployed. Still live, but no longer maintained —
              I hit technical constraints that are better solved by starting fresh rather than
              patching. The lessons carried forward.
            </p>
            <p className="text-[13px] text-[var(--foreground-faint)]">
              Live but unmaintained
            </p>
          </div>

          {/* Law Firm Scraper */}
          <div className="project-card">
            <OfflinePlaceholder />
            <p className="label-personal mb-2">Automation · 3-day build</p>
            <h2 className="text-xl font-medium mb-3">
              Law Firm Lead Scraper
            </h2>
            <p className="text-[15px] text-[var(--foreground-muted)] leading-relaxed mb-3">
              Someone needed structured contact data from law firm websites.
              I built an automated scraper that takes a URL as input and outputs clean, structured
              lead data in Excel format.
            </p>
            <p className="text-[15px] text-[var(--foreground-muted)] leading-relaxed mb-4">
              Uses Selenium for dynamic content handling and custom parsing
              logic. Completed in three days as a practical tool for a real need.
            </p>
            <div className="flex flex-wrap gap-2 mb-3">
              <span className="tech-tag">Python</span>
              <span className="tech-tag">Selenium</span>
            </div>
            <p className="text-[13px] text-[var(--foreground-faint)]">
              Private repository
            </p>
          </div>

          {/* Minecraft Escape Room */}
          <div className="project-card">
            <OfflinePlaceholder />
            <p className="label-personal mb-2">
              Game design · Collaborative build
            </p>
            <h2 className="text-xl font-medium mb-3">
              Minecraft Escape Room
            </h2>
            <p className="text-[15px] text-[var(--foreground-muted)] leading-relaxed mb-3">
              A custom adventure map featuring puzzles, narrative elements,
              command blocks, and datapacks, built collaboratively with a
              friend. Thousands of connected command blocks, coordinated
              through a shared Google Drive planning system.
            </p>
            <p className="text-[15px] text-[var(--foreground-muted)] leading-relaxed mb-3">
              The first escape room is complete: roughly 4 hours of gameplay.
              A second, significantly larger room is currently in progress.
            </p>
            <div className="flex flex-wrap gap-2 mb-3">
              <span className="tech-tag">Game Design</span>
              <span className="tech-tag">JSON</span>
              <span className="tech-tag">Project Planning</span>
            </div>
            <p className="text-[13px] text-[var(--foreground-faint)]">
              World file available on request,{" "}
              <a
                href="mailto:rflores3113@gmail.com"
                className="text-[var(--accent)] hover:underline"
              >
                email me
              </a>
            </p>
          </div>
        </div>
      </section>

      {/* ============================================
          CTA
          ============================================ */}
      <section className="mb-16">
        <CTABanner />
      </section>
    </main>
  );
}
