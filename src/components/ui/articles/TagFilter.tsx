'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export default function TagFilter({
  tags,
  selected,
  className = '',
  size = 'xs', // 'xs' | 'sm'
  onChange,
}: {
  tags: string[];
  selected?: string;
  className?: string;
  size?: 'xs' | 'sm';
  onChange?: (tag?: string) => void;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const setTag = (tag?: string) => {
    const params = new URLSearchParams(searchParams ?? undefined);
    if (!tag) params.delete('tag');
    else params.set('tag', tag);
    const qs = params.toString();
    router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
    onChange?.(tag);
  };

  const sizing =
    size === 'xs'
      ? { pad: 'px-2.5 py-0.5', text: 'text-[11px]', gap: 'gap-1.5' }
      : { pad: 'px-3 py-1', text: 'text-xs', gap: 'gap-2' };

  const Chip = ({
    label,
    active,
    onClick,
  }: {
    label: string;
    active?: boolean;
    onClick: () => void;
  }) => (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={[
        'rounded-md border transition',
        sizing.pad,
        sizing.text,
        active
          ? 'border-ring bg-ring/10 text-foreground'
          : 'border-border hover:bg-muted/60',
      ].join(' ')}
    >
      {label}
    </button>
  );

  return (
    <div
      className={`flex flex-wrap ${sizing.gap} ${className}`}
      role="radiogroup"
      aria-label="Filter by tag"
    >
      <Chip label="All" active={!selected} onClick={() => setTag(undefined)} />
      {tags.map((t) => (
        <Chip
          key={t}
          label={t}
          active={selected?.toLowerCase() === t.toLowerCase()}
          onClick={() => setTag(t)}
        />
      ))}
    </div>
  );
}
