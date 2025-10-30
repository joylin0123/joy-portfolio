export default function PixelBadge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-block pixel-border bg-slate-900/60 px-2 py-1 text-[11px] font-semibold tracking-wide">
      {children}
    </span>
  );
}