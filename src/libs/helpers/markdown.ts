import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";
import { ArticleMeta } from "@/types/ArticleMeta";

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

    const meta: ArticleMeta = {
      slug,
      title: data.title ?? slug,
      date: data.date ?? new Date().toISOString(),
      summary: data.summary ?? "",
      tags: Array.isArray(data.tags) ? data.tags : [],
    };

    return { meta, html: content };
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
