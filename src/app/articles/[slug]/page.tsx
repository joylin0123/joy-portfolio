import { notFound } from 'next/navigation';
import PixelDivider from '@/components/ui/PixelDivider';
import formatDate from '@/libs/helpers/formatDate';
import { getArticleBySlug, getArticleSlugs } from '@/libs/helpers/markdown';

export const runtime = 'nodejs'; // using fs

export async function generateStaticParams() {
  const slugs = await getArticleSlugs();
  return slugs.map((slug) => ({ slug }));
}

export default async function ArticleDetailPage(
  { params }: { params: Promise<{ slug: string }> }   // ← Promise here
) {
  const { slug } = await params;                       // ← unwrap it
  const article = await getArticleBySlug(slug);
  if (!article) notFound();

  const m = article.meta;

  return (
    <main className="min-h-screen text-slate-100 bg-slate-950 print:bg-white print:text-black">
      <div className="fixed inset-0 -z-10 pointer-events-none">
        <div className="absolute inset-0 opacity-25" style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(45,212,191,0.35) 1px, transparent 1px)',
          backgroundSize: '22px 22px',
        }}/>
        <div className="absolute inset-0 bg-[radial-gradient(60%_60%_at_50%_0%,rgba(16,185,129,0.15)_0%,transparent_70%)]" />
      </div>

      <div className="mx-auto max-w-3xl px-5 py-8 md:py-12">
        <header className="mb-6">
          <a href="/articles" className="inline-block mb-3 pixel-border px-2 py-1 text-xs bg-slate-900/60 hover:bg-slate-800">← Back</a>
          <h1 className="text-2xl md:text-3xl font-black tracking-wider text-emerald-300">{m.title}</h1>
          <p className="text-xs opacity-75 mt-1">{formatDate(m.date)}</p>
        </header>

        <PixelDivider />

        <article className="prose prose-invert max-w-none pixel-border bg-slate-900/40 p-5">
          <div dangerouslySetInnerHTML={{ __html: article.html }} />
        </article>
      </div>
    </main>
  );
}
