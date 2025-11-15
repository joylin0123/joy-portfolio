'use client';

import { motion } from 'framer-motion';

export default function HeroEditorial() {
  return (
    <section className="mx-auto max-w-6xl px-4 pt-16 pb-16 sm:px-6 sm:pt-20 sm:pb-20">
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        className="mb-10 flex items-center justify-between text-[11px] text-foreground/60"
      >
        <span className="tracking-[0.22em] uppercase">
          Joy Lin · Software &amp; Photography
        </span>
        <span className="tracking-[0.22em] uppercase">Amsterdam</span>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut', delay: 0.05 }}
        className="space-y-6"
      >
        <h1 className="text-[clamp(2.4rem,5vw,3.4rem)] font-semibold tracking-[-0.04em] leading-tight">
          <span className="block">A small logbook</span>
          <span className="block">of things I notice.</span>
        </h1>

        <p className="max-w-xl text-[13px] leading-relaxed text-foreground/75">
          I&apos;m a CS student at VU &amp; UvA in Amsterdam, previously
          Mathematics &amp; CS at NTHU in Taiwan. I design and build full-stack
          products, learn about systems and optimization, and keep visual notes
          through photography and travel journals.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: 'easeOut', delay: 0.12 }}
        className="mt-10 grid gap-4 text-[11px] text-foreground/60 sm:grid-cols-3"
      >
        <div className="space-y-1">
          <p className="tracking-[0.22em] uppercase">Focus</p>
          <p className="text-[12px] text-foreground/80">
            Backend · Web · Data · Systems
          </p>
        </div>
        <div className="space-y-1">
          <p className="tracking-[0.22em] uppercase">Currently</p>
          <p className="text-[12px] text-foreground/80">
            Joint MSc CS (VU &amp; UvA), software engineer intern.
          </p>
        </div>
        <div className="space-y-1">
          <p className="tracking-[0.22em] uppercase">This site</p>
          <p className="text-[12px] text-foreground/80">
            Selected projects, notes, and photos.
          </p>
        </div>
      </motion.div>
    </section>
  );
}
