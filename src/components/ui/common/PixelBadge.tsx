import { pixelBorderInlineStyle } from '@/libs/constants/pixelBorderStyle';
export default function PixelBadge({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <span
      className={`inline-block pixel-border px-2 py-1 text-sm capitalize font-semibold tracking-wide ${pixelBorderInlineStyle}`}
    >
      {children}
    </span>
  );
}
