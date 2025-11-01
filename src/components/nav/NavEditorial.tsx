'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import ThemeToggler from '../ui/common/ThemeToggler';

const links = [
  { href: '/articles', label: 'Articles' },
  { href: '/contact', label: 'Contact' },
  { href: '/about', label: 'About Me' },
];

export default function NavEditorial() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header className="sticky top-0 z-40">
      <div className="mx-auto max-w-6xl bg-background/80 backdrop-blur px-4 sm:px-6">
        <nav className="grid h-16 grid-cols-[1fr_auto_1fr] items-center">
          <Link href="/" className="text-sm font-semibold tracking-tight">
            Joy&apos;s Portfolio
          </Link>

          <ul className="hidden md:flex items-center gap-7 text-[13.5px]">
            {links.map((l) => {
              const active =
                pathname === l.href || pathname?.startsWith(l.href + '/');
              return (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className={`relative transition-colors ${
                      active
                        ? 'text-foreground'
                        : 'text-foreground/60 hover:text-foreground'
                    }`}
                  >
                    {l.label}
                    {active && (
                      <span className="absolute -bottom-1 left-1/2 h-[2px] w-5 -translate-x-1/2 rounded-full bg-foreground" />
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
          <div className="md:hidden"></div>
          <div className="flex items-center justify-end gap-2">
            <ThemeToggler />
            <button
              className="md:hidden inline-flex h-9 w-9 items-center justify-center rounded-md border border-border/60 hover:bg-accent/30"
              onClick={() => setOpen((v) => !v)}
              aria-label="Open menu"
              aria-expanded={open}
            >
              {/* simple hamburger / close */}
              <span className="relative block h-3 w-4">
                <span
                  className={`absolute left-0 top-0 h-0.5 w-full bg-foreground transition ${
                    open ? 'translate-y-1.5 rotate-45' : ''
                  }`}
                />
                <span
                  className={`absolute left-0 top-1/2 h-0.5 w-full -translate-y-1/2 bg-foreground transition ${
                    open ? 'opacity-0' : ''
                  }`}
                />
                <span
                  className={`absolute left-0 bottom-0 h-0.5 w-full bg-foreground transition ${
                    open ? '-translate-y-1.5 -rotate-45' : ''
                  }`}
                />
              </span>
            </button>
          </div>
        </nav>

        {/* mobile menu (collapsible) */}
        <div
          className={`md:hidden grid overflow-hidden transition-[grid-template-rows,opacity] duration-300 ${
            open ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
          }`}
        >
          <div className="min-h-0">
            <ul className="flex flex-col gap-1 py-2">
              {links.map((l) => {
                const active =
                  pathname === l.href || pathname?.startsWith(l.href + '/');
                return (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      className={`block rounded-md px-2 py-2 text-sm ${
                        active
                          ? 'bg-accent/30 text-foreground'
                          : 'text-foreground/80 hover:bg-accent/20'
                      }`}
                    >
                      {l.label}
                    </Link>
                  </li>
                );
              })}
              <li className="mt-1 h-px bg-border/60" />
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
}
