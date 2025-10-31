import { pixelBorderInlineStyle } from '@/libs/constants/pixelBorderStyle';

export default function ArticleCard({
  slug,
  title,
  date,
  summary,
}: {
  slug: string;
  title: string;
  date: string;
  summary?: string;
}) {
  return (
    <a
      key={slug}
      href={`/articles/${slug}`}
      className={`${pixelBorderInlineStyle} p-3`}
    >
      <div className="flex items-baseline justify-between gap-2">
        <h3 className="font-semibold text-sm md:text-base tracking-wide">
          {title}
        </h3>
        <span className="text-[11px] opacity-70">
          {new Date(date).toLocaleDateString('en-GB', {
            year: 'numeric',
            month: 'short',
            day: '2-digit',
          })}
        </span>
      </div>
      {summary && (
        <p className="text-sm opacity-85 mt-1 line-clamp-2">{summary}</p>
      )}
    </a>
  );
}
