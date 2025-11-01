import { notFound } from 'next/navigation';
import PixelDivider from '@/components/ui/common/PixelDivider';
import formatDate from '@/libs/helpers/formatDate';
import { getArticleBySlug, getArticleSlugs } from '@/libs/helpers/markdown';
import Markdown from '@/components/ui/common/Markdown';
import HashTag from '@/components/ui/common/Hashtag';

export const runtime = 'nodejs'; // using fs

export async function generateStaticParams() {
  const slugs = await getArticleSlugs();
  return slugs.map((slug) => ({ slug }));
}

export default async function ArticleDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  if (!article) notFound();

  const m = article.meta;

  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="mx-auto max-w-4xl px-5 py-8 md:py-12">
        <header className="mb-6">
          <a href="/articles" className="inline-block mb-3">
            ← Back to Articles
          </a>
          <h1 className="text-2xl md:text-3xl font-black tracking-wider ring-glow">
            {m.title}
          </h1>
          <p className="text-xs opacity-75 mt-1">{formatDate(m.date)}</p>
        </header>
        <div className="flex flex-row gap-2">
          {m.tags && m.tags.map((tag) => <HashTag key={tag} text={tag} />)}
        </div>
        <PixelDivider />
        <Markdown content={article.html} />
      </div>
    </main>
  );
}
