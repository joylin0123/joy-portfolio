import Link from 'next/link';

export default function HomeAboutSection() {
  return (
    <div className="flex flex-col gap-5 md:items-start md:justify-between">
      <div className="max-w-xl space-y-2">
        <h3 className="text-sm font-semibold tracking-tight text-foreground">
          About
        </h3>
        <p className="text-[13px] md:text-md leading-relaxed text-foreground/80">
          I’m Joy Lin — CS student at VU &amp; UvA in Amsterdam, previously at
          NTHU in Taiwan. I design and build full-stack products at work and do
          photography when I&apos;m free. I post articles about my life, tech,
          and the cities I live in or travel to.
        </p>
      </div>

      <div className="flex flex-wrap gap-3 md:justify-end md:items-start">
        <Link
          href="/about"
          className="inline-flex items-center rounded-full border border-border/70 
                     bg-background/60 px-4 py-2 text-[12px] font-medium tracking-tight 
                     hover:bg-foreground/5 transition-colors"
        >
          View Resume
        </Link>

        <Link
          href="/contact"
          className="inline-flex items-center rounded-full px-4 py-2 text-[12px] 
                     font-medium tracking-tight bg-button-background 
                     hover:bg-button-background-hover text-foreground 
                     shadow-sm transition-colors"
        >
          Contact Me
        </Link>
      </div>
    </div>
  );
}
