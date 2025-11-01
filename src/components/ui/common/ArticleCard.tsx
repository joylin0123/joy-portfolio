import { pixelBorderInlineStyle } from '@/libs/constants/pixelBorderStyle';
import Link from 'next/link';
import HashTag from './Hashtag';
import formatDate from '@/libs/helpers/formatDate';

export default function ArticleCard({
  slug,
  title,
  date,
  summary,
  tags,
}: {
  slug: string;
  title: string;
  date: string;
  summary?: string;
  tags?: string[];
}) {
  return (
    <article
      className={`relative block ${pixelBorderInlineStyle} p-4 hover:bg-accent/30 transition`}
    >
      <Link
        href={`/articles/${slug}`}
        className="absolute inset-0 z-0"
        aria-label={`Open article: ${title}`}
      >
        <span className="sr-only">{title}</span>
      </Link>

      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h3 className="font-bold text-lg md:text-xl tracking-wide">{title}</h3>
        <span className="text-xs opacity-70">{formatDate(date)}</span>
      </div>

      {summary && <p className="text-sm opacity-85 mt-1">{summary}</p>}

      {!!tags?.length && (
        <div className="mt-2 flex flex-wrap gap-1.5">
          {tags!.map((t) => (
            <Link
              key={t}
              href={{ pathname: '/articles', query: { tag: t } }}
              className="relative z-10 inline-block"
              aria-label={`Filter by ${t}`}
            >
              <HashTag text={t} />
            </Link>
          ))}
        </div>
      )}
    </article>
  );
}
