import Link from 'next/link';
import { getArticleMetaList } from '@/libs/helpers/markdown';
import ArticleCard from '../common/ArticleCard';

export default async function HomeArticleSection() {
  const articles = (await getArticleMetaList()).slice(0, 3);
  return (
    <section className="mb-12">
      <div className="mb-4 flex items-end justify-between">
        <h2 className="text-xl font-bold tracking-wide">Latest Articles</h2>
        <Link
          href="/articles"
          className="text-sm underline-offset-4 hover:underline"
        >
          View all
        </Link>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
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
    </section>
  );
}
