import { photos } from '@/libs/constants/photos';
import Image from 'next/image';

export default function HomePhotoSection() {
  return (
    <section className="mb-12">
      <div className="mb-4 flex items-end justify-between">
        <h2 className="text-xl font-bold tracking-wide">
          Recent Photography Works
        </h2>
      </div>

      <div className="relative">
        <div
          className="no-scrollbar flex gap-3 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-3 [-webkit-overflow-scrolling:touch]"
          aria-label="Photo gallery"
        >
          {photos.map((p, i) => (
            <div key={i} className="snap-start shrink-0">
              <div className="overflow-hidden rounded-xl border border-black/10 bg-white">
                <Image
                  src={p.src}
                  alt={p.alt ?? 'photo'}
                  width={900}
                  height={1200}
                  className="h-[48vw] max-h-[360px] w-auto object-cover sm:h-[38vw] md:h-[300px]"
                  loading="lazy"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
