export type ArticleMeta = {
  slug: string;
  title: string;
  date: string; // ISO or 'YYYY-MM-DD'
  summary: string;
  tags?: string[];
  draft?: boolean;
};

export type ArticleModule = {
  default: React.ComponentType;
  meta: ArticleMeta;
};

export const ARTICLES: {
  meta: ArticleMeta;
  loader: () => Promise<ArticleModule>;
}[] = [
  {
    meta: {
      slug: "hello-world",
      title: "Hello, World — Why This Island Exists",
      date: "2025-10-30",
      summary:
        "A short intro about the 3D personal site, goals, and what to expect.",
      tags: ["intro", "portfolio"],
    },
    loader: () => import("./hello-world"),
  },
  {
    meta: {
      slug: "pixel-aesthetic",
      title: "Designing a Pixel/Technical Aesthetic in React + Tailwind",
      date: "2025-10-30",
      summary:
        "How the “pixel-border” look works, print-friendliness, and reusable tokens.",
      tags: ["design", "frontend", "tailwind"],
    },
    loader: () => import("./pixel-aesthetic"),
  },
];

export function getArticleMetaList() {
  return ARTICLES.filter((a) => !a.meta.draft).map((a) => a.meta);
}

export function getArticleEntry(slug: string) {
  return ARTICLES.find((a) => a.meta.slug === slug) || null;
}
