import Link from 'next/link';

export default function HomeAboutSection() {
  return (
    <section className="mb-12">
      <h2 className="text-xl font-bold tracking-wide">About</h2>

      <div className="grid gap-6 md:grid-cols-[1.2fr_0.8fr]">
        <p className="mt-2 text-[15px] leading-relaxed">
          I’m Joy Lin — CS student at VU & UvA in Amsterdam. Graduated from NTHU
          in Taiwan. I design & build full-stack products at work and do
          photography when I'm free. I post articles about my life and tech,
          scroll for more content!
        </p>

        <div className="flex items-end justify-end gap-3">
          <Link
            href="/about"
            className="rounded-full border border-black/15 px-4 py-2 text-sm hover:bg-black/5"
          >
            View Resume
          </Link>
          <Link
            href="/contact"
            className="rounded-full bg-button-background hover:bg-button-background-hover px-4 py-2 text-sm"
          >
            Contact Me
          </Link>
        </div>
      </div>
    </section>
  );
}
