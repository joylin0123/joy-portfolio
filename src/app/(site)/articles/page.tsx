import { getArticleMetaList } from '@/libs/helpers/markdown';
import CommandPalette from '@/components/ui/articles/CommandPalette';
import ArticleCard from '@/components/ui/common/ArticleCard';
import TagsPanel from '@/components/ui/articles/TagsPanel';

export const runtime = 'nodejs';

type Search = { tag?: string };

export default async function ArticlesIndexPage({
  searchParams,
}: {
  searchParams: Promise<Search>;
}) {
  const { tag } = await searchParams;
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
        <header className="flex flex-col">
          <h1 className="text-2xl md:text-4xl">
            <span className="ring-glow font-black tracking-wider">
              Articles
            </span>
          </h1>
          <p className="my-1 text-sm md:text-base">
            {tag ? (
              <>
                Filtered by <span className="font-semibold">{tag}</span>
              </>
            ) : (
              'Notes on everything.'
            )}
          </p>
        </header>
        <div className="flex flex-row items-center gap-2 my-2">
          <CommandPalette items={items} />
          <TagsPanel tags={allTags} selected={tag} />
        </div>

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

        <footer className="mt-10 text-xs text-muted-foreground">
          Content is stored in-repo under <code>/src/contents/articles</code>. —
          © {new Date().getFullYear()} Joy Lin
        </footer>
      </div>
    </main>
  );
}
