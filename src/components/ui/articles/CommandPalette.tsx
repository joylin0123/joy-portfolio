'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import type { ArticleMeta } from '@/types/ArticleMeta';
import formatDate from '@/libs/helpers/formatDate';

type Props = {
  items: ArticleMeta[];
};

export default function CommandPalette({ items }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [q, setQ] = useState(searchParams.get('q') ?? '');
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  // ⌘K / Ctrl+K or "/" focuses the input
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const inField = /^(input|textarea)$/i.test(
        (e.target as HTMLElement)?.tagName || '',
      );
      if (
        (e.key === 'k' && (e.metaKey || e.ctrlKey)) ||
        (e.key === '/' && !inField)
      ) {
        e.preventDefault();
        inputRef.current?.focus();
      }
      if (!q.trim()) return; // only handle nav when searching
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setActive((i) => Math.min(i + 1, filtered.length - 1));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setActive((i) => Math.max(i - 1, 0));
      } else if (e.key === 'Enter') {
        const hit = filtered[active];
        if (hit) router.push(`/articles/${hit.slug}`);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [q]); // eslint-disable-line

  // sync URL ?q=
  useEffect(() => {
    const t = setTimeout(() => {
      const params = new URLSearchParams(Array.from(searchParams.entries()));
      if (q) params.set('q', q);
      else params.delete('q');
      router.replace(`${pathname}?${params.toString()}`);
      setActive(0);
    }, 150);
    return () => clearTimeout(t);
  }, [q]);

  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase();
    if (!needle) return items;
    return items.filter((m) => {
      const t = m.title.toLowerCase();
      const s = (m.summary || '').toLowerCase();
      const tags = (m.tags || []).join(' ').toLowerCase();
      return t.includes(needle) || s.includes(needle) || tags.includes(needle);
    });
  }, [q, items]);

  const showPanel = q.trim().length > 0; // ← only when user starts typing

  return (
    <div className="w-full">
      <div className="relative">
        <div className="relative">
          <div className="pointer-events-none absolute inset-y-0 left-3 flex items-center">
            <Magnifier className="h-4 w-4 opacity-60" />
          </div>
          <input
            ref={inputRef}
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search"
            aria-label="Search"
            className="w-full rounded-xl border border-border bg-background/80 ps-9 pe-16 py-2 text-sm outline-none ring-offset-background
                       focus:ring-2 focus:ring-ring/50"
          />
          <kbd className="absolute right-2 top-1/2 -translate-y-1/2 rounded-md border border-border px-2 py-0.5 text-[10px] text-muted-foreground">
            ⌘K
          </kbd>
        </div>

        {showPanel && (
          <>
            <div
              className="absolute left-0 right-0 top-full z-50 mt-2 rounded-xl border border-border bg-background shadow-xl"
              role="listbox"
            >
              <div className="flex items-center justify-between px-3 pt-2 pb-1">
                <span className="text-[11px] uppercase tracking-wide text-muted-foreground">
                  Results
                </span>
              </div>
              {filtered.length ? (
                <ul className="max-h-80 overflow-auto py-1">
                  {filtered.map((m, i) => (
                    <li key={m.slug}>
                      <button
                        onMouseEnter={() => setActive(i)}
                        onClick={() => router.push(`/articles/${m.slug}`)}
                        className={
                          'flex w-full items-center justify-between gap-3 px-3 py-2 text-left ' +
                          (i === active ? 'bg-muted' : 'hover:bg-muted/60')
                        }
                      >
                        <div className="min-w-0">
                          <div className="truncate text-sm">{m.title}</div>
                          <div className="truncate text-[11px] text-muted-foreground">
                            {(m.tags || []).join(' • ')}
                          </div>
                        </div>
                        <div className="shrink-0 text-[10px] text-muted-foreground">
                          {formatDate(m.date)}
                        </div>
                      </button>
                    </li>
                  ))}
                </ul>
              ) : (
                <EmptyState />
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function Magnifier({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className}>
      <path
        d="M15.5 15.5 20 20"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <circle
        cx="10.5"
        cy="10.5"
        r="6.5"
        stroke="currentColor"
        strokeWidth="1.5"
        fill="none"
      />
    </svg>
  );
}
function EmptyState() {
  return (
    <div className="grid place-items-center gap-2 px-6 py-10 text-center">
      <div className="rounded-full border border-dashed border-border p-5">
        <Magnifier className="h-8 w-8 opacity-60" />
      </div>
      <p className="text-sm">No articles found</p>
      <p className="text-xs text-muted-foreground">
        Try a different keyword or clear your search.
      </p>
    </div>
  );
}
