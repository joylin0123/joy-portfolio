import { getArticleMetaList } from '@/libs/helpers/markdown';
import Section from '@/components/ui/Section';
import PixelBadge from '@/components/ui/PixelBadge';
import PixelDivider from '@/components/ui/PixelDivider';
import formatDate from '@/libs/helpers/formatDate';
import { pixelBorderStyle } from '@/libs/constants/pixelBorderStyle';
import Link from 'next/link';

export const runtime = 'nodejs';

type Search = { tag?: string };

export default async function ArticlesIndexPage(
  { searchParams }: { searchParams: Promise<Search> }
) {
  const { tag } = await searchParams;

  let items = await getArticleMetaList();
  if (tag) {
    const norm = tag.toLowerCase();
    items = items.filter(m => (m.tags || []).some(t => t.toLowerCase() === norm));
  }

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
          <div className="mb-3">
            <Link
              href="/choose"
              aria-label="Go to home"
              className="pixel-border inline-flex items-center gap-2 bg-slate-900/60 hover:bg-slate-800 px-2 py-1 text-xs"
              title="Back to Home"
            >
              <span>←</span>
              <span>Home</span>
            </Link>
          </div>

          <h1 className="text-2xl md:text-4xl font-black tracking-wider">
            <span className="text-emerald-300 drop-shadow-[0_0_4px_rgba(16,185,129,0.7)]">Articles</span>
          </h1>
          <p className="text-slate-300/90 mt-1 text-sm md:text-base">
            {tag ? <>Filtered by <span className="font-semibold">{tag}</span></> : 'Notes on everything.'}
          </p>
        </header>

        <PixelDivider />

        <Section title="All posts">
          <div className="space-y-4">
            {items.map((m) => (
              <Link key={m.slug} href={`/articles/${m.slug}`} className="block pixel-border bg-slate-900/40 p-4 hover:bg-slate-900/60">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="font-bold text-lg md:text-xl tracking-wide text-emerald-300">{m.title}</h3>
                  <span className="text-xs opacity-70">{formatDate(m.date)}</span>
                </div>
                {m.summary && <p className="text-sm opacity-85 mt-1">{m.summary}</p>}
                {!!m.tags?.length && (
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {m.tags!.map((t) => (
                      <PixelBadge key={t}>{t}</PixelBadge>
                    ))}
                  </div>
                )}
              </Link>
            ))}
            {!items.length && (
              <p className="text-sm opacity-75">
                {tag ? 'No posts for this tag yet.' : 'No posts yet.'}
              </p>
            )}
          </div>
        </Section>

        <footer className="mt-10 text-xs text-slate-400/80">
          <p>
            Content is stored in-repo under <code>/src/contents/articles</code>. — © {new Date().getFullYear()} Joy Lin
          </p>
        </footer>
      </div>

      <style>{pixelBorderStyle}</style>
    </main>
  );
}
