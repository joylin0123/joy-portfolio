'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

export default function HeroEditorial() {
  return (
    <section className="mx-auto max-w-6xl pt-16 pb-20 sm:pt-20 sm:pb-24">
      <div className="grid items-center gap-10 md:grid-cols-[minmax(0,1.2fr)_minmax(0,0.9fr)]">
        <div>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 0.6, y: 0 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className="text-[10px] uppercase tracking-[0.28em] mb-4"
          >
            Software · Photography · Notes
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: 'easeOut', delay: 0.05 }}
            className="text-4xl sm:text-5xl md:text-[3.3rem] font-semibold tracking-[-0.03em] leading-[1.02]"
          >
            Joy Lin,
            <span className="block">building tools, stories,</span>
            <span className="block">and little experiments.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 0.9, y: 0 }}
            transition={{ duration: 0.45, ease: 'easeOut', delay: 0.12 }}
            className="mt-5 max-w-xl text-sm text-foreground/70"
          >
            Student currently based in Amsterdam. I like building web things,
            playing with data, and documenting trips and everyday moments
            through photos.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: 'easeOut', delay: 0.18 }}
            className="mt-7 flex flex-wrap gap-3"
          >
            <motion.a
              href="#articles"
              whileTap={{ scale: 0.96 }}
              whileHover={{ y: -1 }}
              className="inline-flex items-center rounded-full border border-border px-4 py-2 text-xs font-medium tracking-tight hover:bg-foreground hover:text-background transition-colors"
            >
              Read notes & articles
            </motion.a>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut', delay: 0.16 }}
          className="md:justify-self-end"
        >
          <div className="relative w-[min(260px,90vw)] sm:w-[min(300px,90vw)] rounded-2xl border border-border/70 bg-background/70 backdrop-blur px-3 py-3 shadow-sm">
            <div className="overflow-hidden rounded-xl">
              <Image
                src="/joy-profile.JPG"
                alt="Portrait of Joy"
                width={800}
                height={1000}
                className="aspect-4/5 w-full object-cover"
                priority
              />
            </div>

            <div className="mt-3 flex items-center justify-between text-[11px] text-foreground/70">
              <span className="uppercase tracking-[0.2em]">Joy Lin</span>
              <span className="rounded-full border border-border px-2 py-0.5 text-[10px] uppercase tracking-[0.16em]">
                Portfolio · 2025
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
