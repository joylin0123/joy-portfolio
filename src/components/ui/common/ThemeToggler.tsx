'use client';

import { useEffect, useState } from 'react';

export default function ThemeToggler() {
  const [isDark, setIsDark] = useState(false);
  const root = () => document.documentElement;

  useEffect(() => {
    const stored = localStorage.getItem('theme'); // 'dark' | 'light' | null
    const prefersDark = window.matchMedia?.(
      '(prefers-color-scheme: dark)',
    ).matches;
    const shouldDark = stored ? stored === 'dark' : prefersDark;

    setIsDark(shouldDark);
    const el = root();
    el.classList.toggle('dark', shouldDark);
    el.classList.toggle('light', !shouldDark);
  }, []);

  const toggleTheme = () => {
    const next = !isDark;
    setIsDark(next);
    const el = root();
    el.classList.toggle('dark', next);
    el.classList.toggle('light', !next);
    localStorage.setItem('theme', next ? 'dark' : 'light');
  };

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-pressed={isDark}
      aria-label="Toggle theme"
      className={[
        'group inline-flex items-center gap-2 rounded-xl',
        'px-3 py-2 border border-ring hover:bg-button-background-hover',
        'transition-all duration-200 active:scale-[0.98]',
      ].join(' ')}
    >
      <span
        aria-hidden
        className="pointer-events-none absolute -inset-px rounded-xl opacity-0 blur-sm transition-opacity duration-200 group-hover:opacity-30"
        style={{
          background:
            'radial-gradient(60% 60% at 50% 0%, rgba(16,185,129,.35), transparent 70%)',
        }}
      />
      <span className="relative h-5 w-5">
        {/* Sun */}
        <svg
          className="absolute inset-0 h-5 w-5 opacity-100 transition-opacity duration-200 dark:opacity-0"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
        >
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2m0 16v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2m16 0h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
        </svg>
        {/* Moon */}
        <svg
          className="absolute inset-0 h-5 w-5 opacity-0 transition-opacity duration-200 dark:opacity-100"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
        >
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
      </span>
    </button>
  );
}
