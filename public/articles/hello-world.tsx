import type { ArticleMeta } from "./registry";

export const meta: ArticleMeta = {
  slug: "hello-world",
  title: "Hello, World — Why This Island Exists",
  date: "2025-10-30",
  summary:
    "A short intro about the 3D personal site, goals, and what to expect.",
  tags: ["intro", "portfolio"],
};

export default function Article() {
  return (
    <article className="prose prose-invert max-w-none">
      <p>
        Welcome to my little island on the web. I wanted something playful and
        technical— a place where 3D interactions meet practical content like my
        resume, projects, and articles.
      </p>
      <p>
        On the island, hotspots open panels with content pages. Under the hood
        it’s React, Next.js, and a small design system (the{" "}
        <code>pixel-border</code> look). This article content lives right inside
        the codebase as a React component—no CMS needed.
      </p>
      <h3>What you can expect</h3>
      <ul>
        <li>
          Short writeups on frontend/devtools, 3D interactions, and UI patterns.
        </li>
        <li>Project breakdowns: architecture, tradeoffs, and perf notes.</li>
        <li>Occasional posts about studying/working in NL.</li>
      </ul>
      <p>Thanks for reading—enjoy exploring! ✨</p>
    </article>
  );
}
