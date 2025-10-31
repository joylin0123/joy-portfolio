import { getArticleMetaList } from '@/libs/helpers/markdown';
import Section from '@/components/ui/common/Section';
import PixelBadge from '@/components/ui/common/PixelBadge';
import PixelDivider from '@/components/ui/common/PixelDivider';
import formatDate from '@/libs/helpers/formatDate';
import { pixelBorderInlineStyle } from '@/libs/constants/pixelBorderStyle';
import Link from 'next/link';

export const runtime = 'nodejs';

type Search = { tag?: string };

export default async function ArticlesIndexPage({
  searchParams,
}: {
  searchParams: Promise<Search>;
}) {
  const { tag } = await searchParams;

  let items = await getArticleMetaList();
  if (tag) {
    const norm = tag.toLowerCase();
    items = items.filter((m) =>
      (m.tags || []).some((t) => t.toLowerCase() === norm),
    );
  }

  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="mx-auto max-w-4xl px-5 py-8 md:py-12">
        <header className="mb-8 md:mb-10">
          <h1 className="text-2xl md:text-4xl font-black tracking-wider">
            <span className="ring-glow">Articles</span>
          </h1>
          <p className="mt-1 text-sm md:text-base">
            {tag ? (
              <>
                Filtered by <span className="font-semibold">{tag}</span>
              </>
            ) : (
              'Notes on everything.'
            )}
          </p>
        </header>

        <PixelDivider />

        <Section title="All posts">
          <div className="space-y-4">
            {items.map((m) => (
              <Link
                key={m.slug}
                href={`/articles/${m.slug}`}
                className={`block ${pixelBorderInlineStyle} p-4`}
              >
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="font-bold text-lg md:text-xl tracking-wide">
                    {m.title}
                  </h3>
                  <span className="text-xs opacity-70">
                    {formatDate(m.date)}
                  </span>
                </div>
                {m.summary && (
                  <p className="text-sm opacity-85 mt-1">{m.summary}</p>
                )}
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

        <footer className="mt-10 text-xs">
          <p>
            Content is stored in-repo under <code>/src/contents/articles</code>.
            — © {new Date().getFullYear()} Joy Lin
          </p>
        </footer>
      </div>
    </main>
  );
}
