import { photos } from '@/libs/constants/photos';
import Image from 'next/image';

export default function HomePhotoSection() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold tracking-tight text-foreground">
          Recent photography works
        </h3>
      </div>

      <div className="relative">
        <div
          className="no-scrollbar flex gap-3 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-3 [-webkit-overflow-scrolling:touch]"
          aria-label="Photo gallery"
        >
          {photos.map((p, i) => (
            <div key={i} className="snap-start shrink-0 group">
              <div className="overflow-hidden rounded-2xl border border-border/60 bg-background/80 shadow-sm">
                <Image
                  src={p.src}
                  alt={p.alt ?? 'photo'}
                  width={900}
                  height={1200}
                  className="h-[48vw] max-h-[360px] w-auto object-cover sm:h-[38vw] md:h-[300px] transition-transform duration-300 group-hover:scale-[1.03]"
                  loading="lazy"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
