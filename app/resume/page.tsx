'use client';

import Link from "next/link";
import React, { useMemo, useState } from "react";

function Section({ id, title, children }: { id?: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} className="mb-10 print:mb-6">
      <h2 className="mb-4 text-xl md:text-2xl font-black uppercase">
        <span className="pixel-border px-3 py-1 bg-slate-900/60">{title}</span>
      </h2>
      <div className="space-y-4">{children}</div>
    </section>
  );
}

function PixelBadge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-block pixel-border bg-slate-900/60 px-2 py-1 text-xs font-semibold tracking-wide">
      {children}
    </span>
  );
}

function PixelDivider() {
  return <div className="h-1 w-full bg-[repeating-linear-gradient(90deg,#0ea5a7_0_10px,transparent_10px_20px)] opacity-40 my-4"/>;
}

function K({ children }: { children: React.ReactNode }) {
  return <kbd className="px-2 py-0.5 ml-1 rounded pixel-border text-[0.7rem]">{children}</kbd>;
}

// --------------------------
// Data (edit here)
// --------------------------
const resume = {
  name: "Joy Lin",
  role: "Software Engineer",
  location: "Amsterdam, NL",
  contacts: {
    email: "linjoy6@gmail.com",
    phone: "+31 620 596 715",
    linkedin: "https://www.linkedin.com/in/joy-lin-tw/",
    github: "https://github.com/joylin0123",
  },
  education: [
    {
      school: "University of Amsterdam (UvA) & Vrije Universiteit Amsterdam (VU)",
      degree: "MS in Computer Science — Track: Software Engineering & Green IT",
      period: "Sept 2025 – Now",
      location: "Amsterdam, NL",
    },
    {
      school: "National Tsing Hua University (NTHU)",
      degree: "BS in Computer Science & Mathematics (GPA 3.3/4.3; 2× Academic Excellence Award)",
      period: "Sept 2020 – Jun 2025",
      location: "Hsinchu, Taiwan",
    },
  ],
  experience: [
    {
      company: "Tenfold AI",
      company_url: "https://tenfoldai.io",
      title: "Software Engineer Intern",
      location: "Remote, Taiwan",
      period: "Aug 2024 – Jul 2025",
      bullets: [
        "Built an end‑to‑end customer data pipeline (AWS Lambda, S3, Python, MongoDB, SageMaker) delivering daily updates; removed manual reporting and improved freshness from 7 days to 24 hours.",
        "Implemented Redis caching and query optimizations; improved p95 latency by 80% (1200 ms → 240 ms).",
        "Re‑architected data store and API: redesigned MongoDB schema & access patterns, standardized JWT auth.",
        "Established CI/CD with linting, test matrix, preview envs; coverage from 0% → 60% and enabled parallel workstreams.",
        "Defined interface contracts and reviewed cross‑repo PRs for interoperability.",
      ],
    },
    {
      company: "Crypto Arsenal",
      company_url: "https://crypto-arsenal.io",
      title: "Software Engineer Intern",
      location: "Remote, Taiwan",
      period: "Jun 2024 – Aug 2024",
      bullets: [
        "Migrated Next.js from Pages Router to App Router (layouts, route groups) across 10+ components with zero downtime.",
        "Built reusable React/TypeScript UI components; added Storybook stories with React Hook Form to showcase validation states.",
        "Introduced a PR template (context, change list, test plan, screenshots); reduced review turnaround by 10–15%.",
        "Unblocked GraphQL usage (queries/mutations, error handling); improved type correctness across shared fragments.",
      ],
    },
    {
      company: "AppWorks School (AiWorks)",
      company_url: "https://aiworks.tw",
      title: "Web Development Trainee",
      location: "Taipei, Taiwan",
      period: "Aug 2023 – Jan 2024",
      bullets: [
        "Admitted to a selective full‑time SWE program; intensive training in modern frontend & backend.",
        "Shipped two full‑stack projects (Next.js/JS, Node.js, Postgres/Supabase) covering auth, CRUD APIs, CI checks.",
      ],
    },
  ],
  projects: [
    {
      name: "Balance Cat",
      blurb: "Personal finance manager. Voted ‘Most Popular’ by peers; budgeting, asset overview, category analytics.",
      stack: ["React", "Next.js"],
      link: "https://github.com/MengChiehLiu/BalanceCat",
    },
    {
      name: "GymRat",
      blurb: "Fitness tracker with workout logging, calorie calculator, weight charts, coach chat.",
      stack: ["React", "Next.js", "Tailwind", "Node.js", "Express", "MySQL"],
      link: "https://github.com/joylin0123/gymrat-backend",
    },
  ],
  skills: {
    Frontend: ["React", "Next.js", "TypeScript", "Storybook", "Tailwind CSS"],
    "Backend & APIs": ["Node.js", "Express", "OAuth 2.0/OIDC", "JWT", "Swagger", "REST"],
    "Data & Cache": ["MySQL", "MongoDB", "Redis"],
    "Cloud/DevOps": ["AWS (Lambda, S3, EC2, RDS, CloudFront, Route53, CodePipeline)", "Docker", "GitHub Actions"],
    Testing: ["Jest", "Playwright"],
  },
  languages: [
    "Mandarin (Native)",
    "English (Fluent)",
    "Dutch/German (A1)",
  ],
};

// --------------------------
// Helpers
// --------------------------
function copy(text: string) {
  navigator.clipboard.writeText(text).catch(() => {});
}

// --------------------------
// Main component
// --------------------------
export default function ResumePage() {
  const [crt, setCrt] = useState(false);
  const initials = useMemo(() => {
    return resume.name
      .split(" ")
      .map((s) => s[0])
      .join("");
  }, []);

  return (
    <main className="min-h-screen text-slate-100 bg-slate-950 print:bg-white print:text-black">
      {/* Background grid + glow */}
      <div className="fixed inset-0 -z-10 pointer-events-none">
        <div className="absolute inset-0 opacity-25" style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, rgba(45,212,191,0.35) 1px, transparent 1px)",
          backgroundSize: "22px 22px",
        }}/>
        <div className="absolute inset-0 bg-[radial-gradient(60%_60%_at_50%_0%,rgba(16,185,129,0.15)_0%,transparent_70%)]"/>
      </div>

      {/* CRT/scanline overlay (toggleable) */}
      {crt && (
        <div aria-hidden className="fixed inset-0 pointer-events-none mix-blend-overlay opacity-30" style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, rgba(255,255,255,0.05) 0px, rgba(255,255,255,0.05) 1px, transparent 2px, transparent 4px)",
        }}/>
      )}

      <div className="mx-auto max-w-4xl px-5 py-8 md:py-12">
        {/* Header */}
        <header className="mb-8 md:mb-12">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 md:w-20 md:h-20 grid place-items-center bg-slate-900/60 pixel-border text-2xl font-black tracking-widest">
                {initials}
              </div>
              <div>
                <h1 className="text-2xl md:text-4xl font-black tracking-wider">
                  <span className="text-emerald-300 drop-shadow-[0_0_4px_rgba(16,185,129,0.7)]">{resume.name}</span>
                </h1>
                <p className="text-sm md:text-base text-slate-300/90 mt-1">
                  {resume.role} · {resume.location}
                </p>
                <div className="mt-2 flex flex-wrap gap-2">
                  <PixelBadge>React/Next.js</PixelBadge>
                  <PixelBadge>Typescript</PixelBadge>
                  <PixelBadge>Node.js</PixelBadge>
                  <PixelBadge>AWS</PixelBadge>
                </div>
              </div>
            </div>

            <div className="hidden md:flex flex-col items-end gap-2">
              <div className="flex items-center gap-2">
                <button onClick={() => setCrt((v) => !v)} className="pixel-border px-3 py-1 text-xs bg-slate-900/60 hover:bg-slate-800">
                  CRT {crt ? "ON" : "OFF"}
                </button>
                <a href="#" onClick={(e)=>{e.preventDefault(); window.print();}} className="pixel-border px-3 py-1 text-xs bg-slate-900/60 hover:bg-slate-800">
                  Print
                </a>
              </div>
              <p className="text-[11px] text-slate-400">Tip: toggle CRT or press<K>⌘</K>+<K>P</K> to print</p>
            </div>
          </div>

          <div className="mt-4 grid gap-2 text-sm md:text-base">
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
              <a className="hover:underline decoration-emerald-400/60 underline-offset-4" href={`mailto:${resume.contacts.email}`}>{resume.contacts.email}</a>
              <span className="text-slate-500">|</span>
              <a className="hover:underline decoration-emerald-400/60 underline-offset-4" href={`tel:${resume.contacts.phone.replace(/\s|-/g,"")}`}>{resume.contacts.phone}</a>
              <span className="text-slate-500">|</span>
              <a className="hover:underline decoration-emerald-400/60 underline-offset-4" href={resume.contacts.linkedin} target="_blank" rel="noreferrer">linkedin.com/in/joy-lin-tw</a>
              <span className="text-slate-500">|</span>
              <a className="hover:underline decoration-emerald-400/60 underline-offset-4" href={resume.contacts.github} target="_blank" rel="noreferrer">github.com/joylin0123</a>
            </div>
            <div className="flex gap-2">
              <button onClick={() => copy(resume.contacts.email)} className="pixel-border px-2 py-1 text-xs bg-slate-900/60 hover:bg-slate-800">Copy email</button>
              <button onClick={() => copy(resume.contacts.github)} className="pixel-border px-2 py-1 text-xs bg-slate-900/60 hover:bg-slate-800">Copy GitHub</button>
            </div>
          </div>
        </header>

        <PixelDivider />

        {/* Experience */}
        <Section title="Experience">
          {resume.experience.map((job, idx) => (
            <article key={idx} className="pixel-border bg-slate-900/40 p-4">
              <header className="mb-2 flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="font-bold text-lg md:text-xl tracking-wide">
                  {job.title} · <a href={job.company_url} target="_blank"><span className="text-emerald-300 hover:underline">{job.company}</span></a>
                </h3>
                <p className="text-sm text-slate-300/80">{job.location} · {job.period}</p>
              </header>
              <ul className="list-disc list-outside ml-5 space-y-1.5 text-[0.95rem]">
                {job.bullets.map((b, i) => (
                  <li key={i}>{b}</li>
                ))}
              </ul>
            </article>
          ))}
        </Section>

        {/* Education */}
        <Section title="Education">
          {resume.education.map((ed, idx) => (
            <article key={idx} className="pixel-border bg-slate-900/40 p-4">
              <header className="mb-1 flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="font-bold text-lg md:text-xl tracking-wide">
                  {ed.school}
                </h3>
                <p className="text-sm text-slate-300/80">{ed.location} · {ed.period}</p>
              </header>
              <p className="text-[0.95rem]">{ed.degree}</p>
            </article>
          ))}
        </Section>

        {/* Projects */}
        <Section title="Projects">
          <div className="grid md:grid-cols-2 gap-4">
            {resume.projects.map((p, idx) => (
              <article key={idx} className="pixel-border bg-slate-900/40 p-4 flex flex-col">
                <header className="mb-1 flex items-baseline justify-between gap-2">
                  <h3 className="font-bold text-lg tracking-wide text-emerald-300">{p.name}</h3>
                  {p.link && (
                    <a className="text-xs underline decoration-emerald-400/60 underline-offset-4 hover:text-emerald-200" href={p.link} target="_blank" rel="noreferrer">repo →</a>
                  )}
                </header>
                <p className="text-[0.95rem] mb-2">{p.blurb}</p>
                <div className="mt-auto flex flex-wrap gap-1.5">
                  {p.stack.map((s) => (
                    <PixelBadge key={s}>{s}</PixelBadge>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </Section>

        {/* Skills */}
        <Section title="Skills">
          <div className="grid md:grid-cols-2 gap-4">
            {Object.entries(resume.skills).map(([group, items]) => (
              <div key={group} className="pixel-border bg-slate-900/40 p-4">
                <h4 className="font-bold mb-2 text-emerald-300">{group}</h4>
                <div className="flex flex-wrap gap-1.5">
                  {items.map((it) => (
                    <PixelBadge key={it}>{it}</PixelBadge>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* Languages */}
        <Section title="Languages">
          <div className="flex flex-wrap gap-2">
            {resume.languages.map((lang) => (
              <PixelBadge key={lang}>{lang}</PixelBadge>
            ))}
          </div>
        </Section>

        <footer className="mt-10 text-xs text-slate-400/80">
          <p>
            Built with a pixel/terminal aesthetic. Print-friendly. — © {new Date().getFullYear()} {resume.name}
          </p>
        </footer>
      </div>

      {/* Local styles for pixel borders */}
      <style>{`
        .pixel-border {
          position: relative;
          border: 2px solid rgba(16, 185, 129, 0.7);
          box-shadow:
            0 0 0 2px rgba(16, 185, 129, 0.15) inset,
            0 0 8px rgba(16, 185, 129, 0.35),
            0 0 24px rgba(16, 185, 129, 0.15);
          image-rendering: pixelated;
        }
        @media print {
          .pixel-border { box-shadow: none; border-color: #222; }
          a { color: #000 !important; text-decoration: none !important; }
          main { background: #fff !important; }
        }
      `}</style>
    </main>
  );
}
