import Link from 'next/link';
import { getArticleMetaList } from '@/libs/helpers/markdown';
import ArticleCard from '../common/ArticleCard';

export default async function HomeArticleSection() {
  const articles = (await getArticleMetaList()).slice(0, 3);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold tracking-tight text-foreground">
          Latest Articles
        </h3>
        <Link
          href="/articles"
          className="text-[12px] font-medium text-foreground/70 underline-offset-4 hover:text-foreground hover:underline"
        >
          View all
        </Link>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
        {articles.map((m) => (
          <ArticleCard
            key={m.slug}
            title={m.title}
            date={m.date}
            summary={m.summary}
            slug={m.slug}
            tags={m.tags}
          />
        ))}
      </div>
    </div>
  );
}
