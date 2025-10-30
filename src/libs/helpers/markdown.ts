import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeStringify from "rehype-stringify";

export type ArticleMeta = {
  slug: string;
  title: string;
  date: string;
  summary?: string;
  tags?: string[];
};

export type Article = {
  meta: ArticleMeta;
  html: string;
};

const ARTICLES_DIR = path.join(process.cwd(), "src", "contents", "articles");

export async function getArticleSlugs(): Promise<string[]> {
  const files = await fs.readdir(ARTICLES_DIR);
  return files
    .filter((f) => f.endsWith(".md"))
    .map((f) => f.replace(/\.md$/, ""));
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  const file = path.join(ARTICLES_DIR, `${slug}.md`);
  try {
    const src = await fs.readFile(file, "utf8");
    const { content, data } = matter(src);

    const html = String(
      await unified()
        .use(remarkParse)
        .use(remarkGfm)
        .use(remarkRehype, { allowDangerousHtml: false })
        .use(rehypeSlug)
        .use(rehypeAutolinkHeadings, { behavior: "wrap" })
        .use(rehypeStringify)
        .process(content)
    );

    const meta: ArticleMeta = {
      slug,
      title: data.title ?? slug,
      date: data.date ?? new Date().toISOString(),
      summary: data.summary ?? "",
      tags: Array.isArray(data.tags) ? data.tags : [],
    };

    return { meta, html };
  } catch {
    return null;
  }
}

export async function getArticleMetaList(): Promise<ArticleMeta[]> {
  const slugs = await getArticleSlugs();
  const list = await Promise.all(
    slugs.map(async (s) => (await getArticleBySlug(s))!.meta)
  );
  return list.sort((a, b) => (a.date < b.date ? 1 : -1));
}
