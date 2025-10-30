import PixelBadge from "@/components/ui/PixelBadge";
import { ArticleMeta } from "@/types/ArticleMeta";

export default function FeatureCard(props: {
  title: string;
  emoji: string;
  blurb: string;
  href: string;
  chips?: string[];
  latest?: ArticleMeta[];
}) {
  return (
    <a href={props.href} className="block pixel-border bg-slate-900/40 p-4 hover:bg-slate-900/60">
      <div className="flex items-baseline justify-between gap-3">
        <h3 className="font-bold text-lg tracking-wide text-emerald-300">
          <span className="opacity-90 mr-2">{props.emoji}</span>{props.title}
        </h3>
        <div className="flex flex-wrap gap-1">
          {props.chips?.slice(0, 3).map(c => <PixelBadge key={c}>{c}</PixelBadge>)}
        </div>
      </div>
      <p className="text-sm opacity-85 mt-1">{props.blurb}</p>

      {props.latest && props.latest.length > 0 && (
        <div className="mt-3 text-sm">
          <div className="opacity-70 mb-1">Latest</div>
          <ul className="space-y-1">
            {props.latest.map(p => (
              <li key={p.slug} className="flex items-center gap-2">
                <span className="opacity-50">▸</span>
                <span className="truncate">{p.title}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
      <div className="mt-3 text-[12px] opacity-70">Tap to enter →</div>
    </a>
  );
}
