import React, { useMemo } from 'react';
import { getArticleMetaList } from '../../contents/articles/registry';
import Section from '@/components/ui/Section';
import PixelBadge from '@/components/ui/PixelBadge';
import PixelDivider from '@/components/ui/PixelDivider';
import formatDate from '@/libs/helpers/formatDate';

export default function ArticlesIndexPage() {
  const items = useMemo(() => getArticleMetaList().sort((a,b) => (a.date < b.date ? 1 : -1)), []);

  return (
    <main className="min-h-screen text-slate-100 bg-slate-950 print:bg-white print:text-black">
      {/* Background */}
      <div className="fixed inset-0 -z-10 pointer-events-none">
        <div className="absolute inset-0 opacity-25" style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(45,212,191,0.35) 1px, transparent 1px)',
          backgroundSize: '22px 22px',
        }}/>
        <div className="absolute inset-0 bg-[radial-gradient(60%_60%_at_50%_0%,rgba(16,185,129,0.15)_0%,transparent_70%)]"/>
      </div>

      <div className="mx-auto max-w-4xl px-5 py-8 md:py-12">
        <header className="mb-8 md:mb-10">
          <h1 className="text-2xl md:text-4xl font-black tracking-wider">
            <span className="text-emerald-300 drop-shadow-[0_0_4px_rgba(16,185,129,0.7)]">Articles</span>
          </h1>
          <p className="text-slate-300/90 mt-1 text-sm md:text-base">Notes on everything.</p>
        </header>

        <PixelDivider />

        <Section title="All posts">
          <div className="space-y-4">
            {items.map((m) => (
              <a key={m.slug} href={`/articles/${m.slug}`} className="block pixel-border bg-slate-900/40 p-4 hover:bg-slate-900/60">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="font-bold text-lg md:text-xl tracking-wide text-emerald-300">{m.title}</h3>
                  <span className="text-xs opacity-70">{formatDate(m.date)}</span>
                </div>
                <p className="text-sm opacity-85 mt-1">{m.summary}</p>
                {m.tags && m.tags.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {m.tags.map((t) => <PixelBadge key={t}>{t}</PixelBadge>)}
                  </div>
                )}
              </a>
            ))}
          </div>
        </Section>

        <footer className="mt-10 text-xs text-slate-400/80">
          <p>Content is stored in-repo under <code>/content/articles</code>. — © {new Date().getFullYear()} Joy Lin</p>
        </footer>
      </div>

      {/* Local styles */}
      <style>{`
        .pixel-border {
          position: relative;
          border: 2px solid rgba(16, 185, 129, 0.7);
          box-shadow: 0 0 0 2px rgba(16,185,129,0.15) inset, 0 0 8px rgba(16,185,129,0.35), 0 0 24px rgba(16,185,129,0.15);
          image-rendering: pixelated;
        }
        @media print { .pixel-border { box-shadow: none; border-color: #222; } main { background: #fff !important; } }
        .prose pre { white-space: pre-wrap; word-break: break-word; }
      `}</style>
    </main>
  );
}


