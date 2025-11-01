import { pixelBorderInlineStyle } from '@/libs/constants/pixelBorderStyle';
export default function PixelBadge({
  children,
  clickable = false,
}: {
  children: React.ReactNode;
  clickable?: Boolean;
}) {
  return (
    <span
      className={`inline-block pixel-border px-2 py-1 text-sm capitalize font-semibold tracking-wide ${pixelBorderInlineStyle} ${
        clickable && 'hover:bg-ring/10'
      }`}
    >
      {children}
    </span>
  );
}
