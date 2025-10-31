import Section from '@/components/ui/common/Section';
import PixelDivider from '@/components/ui/common/PixelDivider';
import FeatureCard from '@/components/ui/common/FeatureCard';
import { getArticleMetaList } from '@/libs/helpers/markdown';
import { pixelBorderStyle } from '@/libs/constants/pixelBorderStyle';
import { ArticleMeta } from '@/types/ArticleMeta';
import PixelBadge from '@/components/ui/common/PixelBadge';
import ArticleCard from '@/components/ui/common/ArticleCard';

function byTag(items: ArticleMeta[], tag: string, limit = 1) {
  const lower = tag.toLowerCase();
  return items
    .filter((m) => (m.tags ?? []).map((t) => t.toLowerCase()).includes(lower))
    .slice(0, limit);
}

export const runtime = 'nodejs';

export default async function FlatHome() {
  const all = await getArticleMetaList();

  const latestTech = byTag(all, 'tech', 1).concat(byTag(all, 'technical', 1));
  const latestPhoto = byTag(all, 'photo', 1).concat(
    byTag(all, 'photography', 1),
  );

  return (
    <main className="bg-background text-foreground min-h-dvh">
      <div className="mx-auto max-w-4xl px-5 py-8 md:py-12">
        {/* Hero */}
        <header className="mb-8 md:mb-10">
          <h1 className="text-2xl md:text-4xl tracking-wider font-bold">
            <span className="text-ring ring-glow">Joy's</span>{' '}
            <span className="opacity-85">— Portfolio</span>
          </h1>
          <p className="mt-2 text-sm md:text-base">
            Welcome to my portfolio! I'm Joy — a Computer Science master's
            student at UvA and VU, currently living in Amsterdam. I love
            building things with code and capturing moments through photography.
            Hope you enjoy exploring this website!
          </p>
          <div className="mt-3">
            <nav className="flex flex-wrap gap-2">
              <a href="/articles">
                <PixelBadge>Articles</PixelBadge>
              </a>
              <a href="/resume">
                <PixelBadge>Resume</PixelBadge>
              </a>
              <a href="/contact">
                <PixelBadge>Contact</PixelBadge>
              </a>
              <a href="/3d?view=3d">
                <PixelBadge>Switch to 3D</PixelBadge>
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
              blurb="Small photo sets and notes on gear, composition, and color. Expect minimal edits and honest light."
              href="/articles?tag=photography"
              chips={['fuji', 'street', 'travel']}
              latest={latestPhoto.slice(0, 1)}
            />
            <FeatureCard
              title="Technical"
              blurb="Code write-ups, architecture notes, and experiments (React-Three-Fiber, SwiftUI, AWS, more)."
              href="/articles?tag=tech"
              chips={['r3f', 'swiftui', 'aws']}
              latest={latestTech.slice(0, 1)}
            />
          </div>
        </Section>

        {/* Tiny latest strip (site-wide) */}
        <Section title="Latest across the site">
          {all.length === 0 ? (
            <p className="text-sm opacity-75">No posts yet.</p>
          ) : (
            <div className="grid md:grid-cols-2 gap-3">
              {all.slice(0, 4).map((m) => (
                <ArticleCard
                  key={m.slug}
                  title={m.title}
                  summary={m.summary}
                  slug={m.slug}
                  date={m.date}
                />
              ))}
            </div>
          )}
        </Section>

        <footer className="mt-10 text-xs">
          <p>
            2D mode — optimized for touch and low-power devices. ©{' '}
            {new Date().getFullYear()} Joy Lin
          </p>
        </footer>
      </div>

      <style>{pixelBorderStyle}</style>
    </main>
  );
}
