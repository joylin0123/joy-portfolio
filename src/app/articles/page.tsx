import { getArticleMetaList } from '@/libs/helpers/markdown';
import Section from '@/components/ui/common/Section';
import PixelDivider from '@/components/ui/common/PixelDivider';
import TagFilter from '@/components/ui/articles/TagFilter';
import ArticleCard from '@/components/ui/common/ArticleCard';

export const runtime = 'nodejs';

type Search = { tag?: string };

export default async function ArticlesIndexPage({
  searchParams,
}: {
  searchParams: Promise<Search>;
}) {
  const { tag } = await searchParams;

  // Load all posts once for tag list + filtering
  const all = await getArticleMetaList();

  const allTags = Array.from(
    new Set(
      all.flatMap((m) => (m.tags ?? []).map((t) => t.trim())).filter(Boolean),
    ),
  ).sort((a, b) => a.localeCompare(b));

  const items = tag
    ? all.filter((m) =>
        (m.tags || []).some((t) => t.toLowerCase() === tag.toLowerCase()),
      )
    : all;

  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="mx-auto max-w-4xl px-5 py-8 md:py-12">
        <header className="mb-6 md:mb-8">
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

        {allTags.length > 0 && (
          <div className="mb-6 md:mb-8">
            <TagFilter tags={allTags} selected={tag} />
          </div>
        )}

        <PixelDivider />

        <Section title="All posts">
          <div className="space-y-4">
            {items.map((m) => (
              <ArticleCard
                key={m.title}
                title={m.title}
                slug={m.slug}
                summary={m.summary}
                tags={m.tags}
                date={m.date}
              />
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
