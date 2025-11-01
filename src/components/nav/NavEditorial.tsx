'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import ThemeToggler from '../ui/common/ThemeToggler';

const links = [
  { href: '/articles', label: 'Articles' },
  { href: '/contact', label: 'Contact' },
  { href: '/about', label: 'About Me' },
];

export default function NavEditorial() {
  const pathname = usePathname();
  return (
    <header className="sticky top-0 z-40">
      <div className="mx-auto max-w-6xl rounded-2xl bg-background backdrop-blur px-4 sm:px-6">
        <nav className="grid grid-cols-[1fr_auto_1fr] items-center h-16">
          <Link href="/" className="text-sm font-semibold tracking-tight">
            <p>Joy's Portfolio</p>
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
                      <span className="absolute -bottom-1 left-1/2 h-1 w-5 -translate-x-1/2 rounded-full bg-foreground" />
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* right: CTA */}
          <div className="flex justify-end">
            <ThemeToggler />
          </div>
        </nav>
      </div>
    </header>
  );
}
