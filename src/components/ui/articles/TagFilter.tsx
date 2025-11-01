'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export default function TagFilter({
  tags,
  selected,
  className = '',
}: {
  tags: string[];
  selected?: string;
  className?: string;
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
  };

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
        'px-3 py-1 rounded-md text-sm border transition',
        active ? 'border-ring bg-ring/10' : 'border-border hover:bg-accent/30',
      ].join(' ')}
    >
      {label}
    </button>
  );

  return (
    <div
      className={`flex flex-wrap gap-2 ${className}`}
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
