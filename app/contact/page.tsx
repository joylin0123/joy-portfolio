'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import { profile } from '../../constants/profile';

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

// --------------------------
// Helpers
// --------------------------
function copy(text: string) {
  navigator.clipboard.writeText(text).catch(() => {});
}

function mailtoUrl(subject: string, body: string) {
  return `mailto:${profile.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

// tiny copied tooltip button
function CopyButton({ value, label }: { value: string; label: string }) {
  const [ok, setOk] = useState(false);
  return (
    <button
      onClick={() => { copy(value); setOk(true); setTimeout(() => setOk(false), 1400); }}
      className="relative pixel-border px-2 py-1 text-xs bg-slate-900/60 hover:bg-slate-800"
    >
      {ok ? 'Copied!' : label}
    </button>
  );
}

// --------------------------
// Main component
// --------------------------
export default function ContactPage() {
  const [crt, setCrt] = useState(false);
  const initials = useMemo(() => profile.name.split(' ').map((s) => s[0]).join(''), []);

  // live clock (Europe/Amsterdam)
  const [now, setNow] = useState<string>('');
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat('en-GB', {
      timeZone: 'Europe/Amsterdam', hour: '2-digit', minute: '2-digit', hour12: false,
      weekday: 'short', day: '2-digit', month: 'short'
    });
    const tick = () => setNow(fmt.format(new Date()));
    tick();
    const t = setInterval(tick, 15_000);
    return () => clearInterval(t);
  }, []);

  // contact form
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const submit = () => {
    const subject = `Hello Joy — from ${form.name || 'your website'}`;
    const body = `${form.message}\n\n— ${form.name}${form.email ? ` <${form.email}>` : ''}`;
    window.location.href = mailtoUrl(subject, body);
  };

  return (
    <main className="min-h-screen text-slate-100 bg-slate-950 print:bg-white print:text-black">
      {/* Background grid + glow */}
      <div className="fixed inset-0 -z-10 pointer-events-none">
        <div className="absolute inset-0 opacity-25" style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(45,212,191,0.35) 1px, transparent 1px)',
          backgroundSize: '22px 22px',
        }}/>
        <div className="absolute inset-0 bg-[radial-gradient(60%_60%_at_50%_0%,rgba(16,185,129,0.15)_0%,transparent_70%)]"/>
      </div>

      {/* CRT/scanline overlay (toggleable) */}
      {crt && (
        <div aria-hidden className="fixed inset-0 pointer-events-none mix-blend-overlay opacity-30" style={{
          backgroundImage: 'repeating-linear-gradient(0deg, rgba(255,255,255,0.05) 0px, rgba(255,255,255,0.05) 1px, transparent 2px, transparent 4px)',
        }}/>
      )}

      <div className="mx-auto max-w-4xl px-5 py-8 md:py-12">
        {/* Quick Actions */}
        <Section title="Quick Actions">
          <div className="grid md:grid-cols-2 gap-4">
            <article className="pixel-border bg-slate-900/40 p-4">
              <h3 className="font-bold mb-2 text-emerald-300">Email</h3>
              <p className="text-sm opacity-80 mb-3">Best for detailed inquiries, collaboration, or interview scheduling.</p>
              <div className="flex flex-wrap gap-2">
                <a href={mailtoUrl('Hello Joy', 'Hi Joy, can we chat about ...')} className="pixel-border px-2 py-1 text-xs bg-slate-900/60 hover:bg-slate-800">New message</a>
                <CopyButton value={profile.email} label="Copy address" />
              </div>
            </article>

            <article className="pixel-border bg-slate-900/40 p-4">
              <h3 className="font-bold mb-2 text-emerald-300">LinkedIn</h3>
              <p className="text-sm opacity-80 mb-3">Connect or send a quick note—mention where you saw my work.</p>
              <div className="flex flex-wrap gap-2">
                <a href={profile.linkedin} target="_blank" rel="noreferrer" className="pixel-border px-2 py-1 text-xs bg-slate-900/60 hover:bg-slate-800">Open LinkedIn</a>
                <CopyButton value={profile.linkedin} label="Copy profile URL" />
              </div>
            </article>

            <article className="pixel-border bg-slate-900/40 p-4">
              <h3 className="font-bold mb-2 text-emerald-300">Phone</h3>
              <p className="text-sm opacity-80 mb-3">For urgent matters. Otherwise, please email first.</p>
              <div className="flex flex-wrap gap-2">
                <a href={`tel:${profile.phone.replace(/\s|-/g,'')}`} className="pixel-border px-2 py-1 text-xs bg-slate-900/60 hover:bg-slate-800">Call</a>
                <CopyButton value={profile.phone} label="Copy number" />
              </div>
            </article>

            <article className="pixel-border bg-slate-900/40 p-4">
              <h3 className="font-bold mb-2 text-emerald-300">GitHub</h3>
              <p className="text-sm opacity-80 mb-3">See code samples and projects. Issues/PRs welcome.</p>
              <div className="flex flex-wrap gap-2">
                <a href={profile.github} target="_blank" rel="noreferrer" className="pixel-border px-2 py-1 text-xs bg-slate-900/60 hover:bg-slate-800">Open GitHub</a>
                <CopyButton value={profile.github} label="Copy repo URL" />
              </div>
            </article>
          </div>
        </Section>

        {/* Message form (mailto) */}
        <Section title="Message Me">
          <div className="pixel-border bg-slate-900/40 p-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <label className="text-xs uppercase tracking-wide opacity-70">Your name</label>
                <input value={form.name} onChange={(e)=>setForm({...form, name: e.target.value})}
                       className="pixel-border bg-slate-950/60 px-3 py-2 text-sm outline-none focus:bg-slate-950" placeholder="Ada Lovelace"/>
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-xs uppercase tracking-wide opacity-70">Your email</label>
                <input value={form.email} onChange={(e)=>setForm({...form, email: e.target.value})}
                       className="pixel-border bg-slate-950/60 px-3 py-2 text-sm outline-none focus:bg-slate-950" placeholder="you@example.com"/>
              </div>
              <div className="md:col-span-2 flex flex-col gap-2">
                <label className="text-xs uppercase tracking-wide opacity-70">Message</label>
                <textarea value={form.message} onChange={(e)=>setForm({...form, message: e.target.value})}
                          rows={5}
                          className="pixel-border bg-slate-950/60 px-3 py-2 text-sm outline-none focus:bg-slate-950"
                          placeholder="Hi Joy, I'd like to talk about ..."/>
              </div>
            </div>
            <div className="mt-4 flex gap-2">
              <button onClick={submit} className="pixel-border px-3 py-1 text-sm bg-slate-900/60 hover:bg-slate-800">Send via Email</button>
              <a href={mailtoUrl('Hello Joy', 'Hi Joy, I found your portfolio and ...')} className="pixel-border px-3 py-1 text-sm bg-slate-900/60 hover:bg-slate-800">Quick compose</a>
            </div>
            <p className="text-xs text-slate-400 mt-2">No server involved — this opens your email client with a prefilled message.</p>
          </div>
        </Section>

        {/* Availability */}
        <Section title="Availability & Response">
          <div className="pixel-border bg-slate-900/40 p-4">
            <ul className="list-disc list-outside ml-5 space-y-1.5 text-[0.95rem]">
              <li>Timezone: <span className="text-emerald-300">Europe/Amsterdam</span> — local time <span className="text-emerald-200">{now || '—'}</span></li>
              <li>Typical response within 24 hours on weekdays.</li>
              <li>Preferred: concise subject lines (e.g., <code className="px-1 bg-slate-800/60 rounded">[Collab]</code>, <code className="px-1 bg-slate-800/60 rounded">[Interview]</code>).</li>
            </ul>
          </div>
        </Section>

        <footer className="mt-10 text-xs text-slate-400/80">
          <p>
            Built with a pixel/terminal aesthetic. — © {new Date().getFullYear()} {profile.name}
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
