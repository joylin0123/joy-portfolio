import React from "react";
import type { ArticleMeta } from "./registry";

export const meta: ArticleMeta = {
  slug: "pixel-aesthetic",
  title: "Designing a Pixel/Technical Aesthetic in React + Tailwind",
  date: "2025-10-30",
  summary:
    "How the “pixel-border” look works, print-friendliness, and reusable tokens.",
  tags: ["design", "frontend", "tailwind"],
};

export default function Article() {
  return (
    <article className="prose prose-invert max-w-none">
      <p>
        The pixel/terminal vibe comes from a few repeatable primitives: the{" "}
        <code>pixel-border</code> utility, a light teal glow, grid-like
        background, and conservative animations.
      </p>
      <h3>Ingredients</h3>
      <ul>
        <li>
          <strong>Border + glow:</strong> a 2px border with inner/outer shadows
          to fake a CRT-ish bezel.
        </li>
        <li>
          <strong>Monospace accent:</strong> headings or badges use a mono font
          for that utility feel.
        </li>
        <li>
          <strong>Print mode:</strong> remove shadows/borders in{" "}
          <code>@media print</code> for crisp PDFs.
        </li>
      </ul>
      <pre>{`.pixel-border {
border: 2px solid rgba(16,185,129,.7);
box-shadow:
0 0 0 2px rgba(16,185,129,.15) inset,
0 0 8px rgba(16,185,129,.35),
0 0 24px rgba(16,185,129,.15);
}`}</pre>
      <p>
        Keep it subtle; the content should lead, the styling should support it.
        Reuse the same tokens across pages so everything feels cohesive.
      </p>
    </article>
  );
}
