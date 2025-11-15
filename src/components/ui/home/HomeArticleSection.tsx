import Link from 'next/link';
import { getArticleMetaList } from '@/libs/helpers/markdown';
import formatDate from '@/libs/helpers/formatDate';

export default async function HomeArticleSection() {
  const articles = (await getArticleMetaList()).slice(0, 5);

  return (
    <div className="space-y-3">
      {/* 小列 meta */}
      <div className="flex items-center justify-between text-[11px] text-foreground/60">
        <span className="tracking-[0.22em] uppercase">
          Selected pieces ({articles.length})
        </span>
        <Link
          href="/articles"
          className="text-[11px] tracking-[0.18em] uppercase underline-offset-4 hover:underline"
        >
          View all
        </Link>
      </div>

      <div className="divide-y divide-border/60 border-t border-border/60">
        {articles.map((m) => (
          <Link
            key={m.slug}
            href={`/articles/${m.slug}`}
            className="group flex items-baseline gap-3 py-3 text-[13px]"
          >
            <span className="w-4 text-xs text-foreground/50 group-hover:text-foreground">
              +
            </span>

            <div className="flex-1 space-y-1">
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-medium tracking-tight group-hover:underline underline-offset-2">
                  {m.title}
                </span>
                {m.tags && m.tags.length > 0 && (
                  <span className="text-[11px] uppercase tracking-[0.18em] text-foreground/50">
                    {m.tags[0]}
                  </span>
                )}
              </div>

              {m.summary && (
                <p className="text-[12px] text-foreground/65 line-clamp-2">
                  {m.summary}
                </p>
              )}
            </div>

            <span className="text-[11px] text-foreground/50">
              {formatDate(m.date)}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
