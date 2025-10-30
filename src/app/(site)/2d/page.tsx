import Section from '@/components/ui/Section';
import PixelDivider from '@/components/ui/PixelDivider';
import FeatureCard from '@/components/ui/FeatureCard';
import { getArticleMetaList } from '@/libs/helpers/markdown';
import { pixelBorderStyle } from '@/libs/constants/pixelBorderStyle';
import { ArticleMeta } from '@/types/ArticleMeta';

function byTag(items: ArticleMeta[], tag: string, limit = 1) {
  const lower = tag.toLowerCase();
  return items.filter(m => (m.tags ?? []).map(t => t.toLowerCase()).includes(lower)).slice(0, limit);
}

export const runtime = 'nodejs'; // uses fs under the hood

export default async function FlatHome() {
  const all = await getArticleMetaList(); // ✅ no Promise type error

  const latestTech    = byTag(all, 'tech', 1).concat(byTag(all, 'technical', 1));
  const latestPhoto   = byTag(all, 'photo', 1).concat(byTag(all, 'photography', 1));

  return (
    <main className="min-h-dvh text-slate-100 bg-slate-950 print:bg-white print:text-black">
      {/* Background */}
      <div className="fixed inset-0 -z-10 pointer-events-none">
        <div
          className="absolute inset-0 opacity-25"
          style={{
            backgroundImage:
              'radial-gradient(circle at 1px 1px, rgba(45,212,191,0.35) 1px, transparent 1px)',
            backgroundSize: '22px 22px',
          }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(60%_60%_at_50%_0%,rgba(16,185,129,0.15)_0%,transparent_70%)]" />
      </div>

      <div className="mx-auto max-w-4xl px-5 py-8 md:py-12">
        {/* Hero */}
        <header className="mb-8 md:mb-10">
          <h1 className="text-2xl md:text-4xl font-black tracking-wider">
            <span className="text-emerald-300 drop-shadow-[0_0_4px_rgba(16,185,129,0.7)]">Joy's</span>{' '}
            <span className="opacity-85">— Portfolio</span>
          </h1>
          <p className="text-slate-300/90 mt-2 text-sm md:text-base">
            I build interactive things on the web (and sometimes in 3D). This lightweight home
            explains what you’ll find here and routes you to the right place—perfect for mobile
            and low-power devices. Switch to the full 3D island anytime.
          </p>
          <div className="mt-3">
            
            <nav className="flex flex-wrap gap-2">
              <a className="pixel-border px-3 py-1 bg-slate-900/40 hover:bg-slate-900/60" href="/articles">Articles</a>
              <a className="pixel-border px-3 py-1 bg-slate-900/40 hover:bg-slate-900/60" href="/resume">Resume</a>
              <a className="pixel-border px-3 py-1 bg-slate-900/40 hover:bg-slate-900/60" href="/contact">Contact</a>
              <a className="pixel-border inline-block bg-slate-900/40 px-3 py-1 text-sm hover:bg-slate-900/60" href="/3d?view=3d">
                Switch to 3D
              </a>
            </nav>
          </div>
        </header>

        <PixelDivider />

        {/* What you'll find */}
        <Section title="What you’ll find">
          <div className="grid md:grid-cols-2 gap-4">
            <FeatureCard
              title="Photography"
              emoji="📷"
              blurb="Small photo sets and notes on gear, composition, and color. Expect minimal edits and honest light."
              href="/articles?tag=photography"
              chips={['fuji', 'street', 'travel']}
              latest={latestPhoto.slice(0,1)}
            />
            <FeatureCard
              title="Technical"
              emoji="⌨️"
              blurb="Code write-ups, architecture notes, and experiments (React-Three-Fiber, SwiftUI, AWS, more)."
              href="/articles?tag=tech"
              chips={['r3f', 'swiftui', 'aws']}
              latest={latestTech.slice(0,1)}
            />
          </div>
        </Section>

        {/* Tiny latest strip (site-wide) */}
        <Section title="Latest across the site">
          {all.length === 0 ? (
            <p className="text-sm opacity-75">No posts yet.</p>
          ) : (
            <div className="grid md:grid-cols-2 gap-3">
              {all.slice(0,4).map(m => (
                <a key={m.slug} href={`/articles/${m.slug}`} className="pixel-border bg-slate-900/40 p-3 hover:bg-slate-900/60">
                  <div className="flex items-baseline justify-between gap-2">
                    <h3 className="font-semibold text-sm md:text-base tracking-wide">{m.title}</h3>
                    <span className="text-[11px] opacity-70">
                      {new Date(m.date).toLocaleDateString('en-GB', { year:'numeric', month:'short', day:'2-digit' })}
                    </span>
                  </div>
                  {m.summary && <p className="text-sm opacity-85 mt-1 line-clamp-2">{m.summary}</p>}
                </a>
              ))}
            </div>
          )}
        </Section>

        <footer className="mt-10 text-xs text-slate-400/80">
          <p>2D mode — optimized for touch and low-power devices. © {new Date().getFullYear()} Joy Lin</p>
        </footer>
      </div>

      <style>{pixelBorderStyle}</style>
    </main>
  );
}
