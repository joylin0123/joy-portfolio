// Tailwind utility string approximating the original `.pixel-border` CSS.
// Notes:
// - Complex layered box-shadow and exact rgba colors are preserved via
//   Tailwind arbitrary values.
// - Print/global rules (targeting `a` and `main`) cannot be expressed by a
//   single utility class — keep those as global print styles in your CSS if
//   you need the exact behavior.
export const pixelBorderStyle =
  'relative border-2 border-[rgba(16,185,129,0.7)] shadow-[inset_0_0_0_2px_rgba(16,185,129,0.15),0_0_8px_rgba(16,185,129,0.35),0_0_24px_rgba(16,185,129,0.15)] [image-rendering:pixelated] print:shadow-none print:border-[#222]';

// Shorter inline variant for use directly on elements. Keep the long form if
// you need the exact layered shadow; this shorter one uses the same border
// color and preserves pixelated rendering.
export const pixelBorderInlineStyle =
  'relative border-2 border-ring [image-rendering:pixelated] ring-glow';
