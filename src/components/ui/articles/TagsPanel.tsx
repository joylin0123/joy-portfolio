'use client';

import { useEffect, useRef, useState } from 'react';
import TagFilter from '@/components/ui/articles/TagFilter';

export default function TagsPanel({
  tags,
  selected,
}: {
  tags: string[];
  selected?: string;
}) {
  const [open, setOpen] = useState(false);
  const btnRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      const t = e.target as Node;
      if (panelRef.current?.contains(t) || btnRef.current?.contains(t)) return;
      setOpen(false);
    };
    const onEsc = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('mousedown', onClick);
    window.addEventListener('keydown', onEsc);
    return () => {
      window.removeEventListener('mousedown', onClick);
      window.removeEventListener('keydown', onEsc);
    };
  }, [open]);

  return (
    <div className="relative inline-block">
      {/* trigger */}
      <button
        ref={btnRef}
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls="filters-popover"
        className="inline-flex items-center gap-2 rounded-md border border-border bg-card/60 px-2.5 py-2 text-xs hover:bg-muted/60"
      >
        <svg viewBox="0 0 24 24" className="h-4 w-4">
          <path
            d="M4 6h16M7 12h10m-6 6h2"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
        </svg>
        Filter
        {selected && (
          <span className="rounded-sm bg-ring/15 px-1.5 py-0.5 text-[10px]">
            {selected}
          </span>
        )}
      </button>

      {open && (
        <div
          className="fixed inset-0 z-40 bg-transparent"
          aria-hidden
          onClick={() => setOpen(false)}
        />
      )}

      {/* popover panel (overlay, not affecting layout) */}
      {open && (
        <div
          id="filters-popover"
          ref={panelRef}
          role="dialog"
          aria-label="Filters"
          className="absolute right-0 z-50 mt-2 w-[min(88vw,28rem)] rounded-lg border border-border bg-card shadow-xl bg-background"
        >
          <div className="flex items-center justify-between px-3 pt-2 pb-1">
            <div className="text-[11px] uppercase tracking-wide text-muted-foreground">
              Filters
            </div>
            <button
              onClick={() => setOpen(false)}
              className="rounded p-1 text-xs hover:bg-muted/60"
              aria-label="Close"
            >
              ✕
            </button>
          </div>
          <div className="h-px bg-border/70" />

          <div className="p-3">
            {/* compact chips */}
            <TagFilter tags={tags} selected={selected} size="xs" />
            <div className="mt-2 flex items-center justify-between">
              <span className="text-[11px] text-muted-foreground">
                {selected ? '1 active' : 'No filters'}
              </span>
              {selected && (
                <button
                  onClick={() => {
                    // simple “clear”: navigate without tag
                    const url = new URL(window.location.href);
                    url.searchParams.delete('tag');
                    window.location.href = url.toString();
                  }}
                  className="text-[11px] underline hover:opacity-80"
                >
                  Reset
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
