import Image from 'next/image';

export default function HeroEditorial() {
  return (
    <section className="mx-auto mt-6 max-w-6xl rounded-2xl px-4 pb-16 pt-8 sm:px-6 md:pt-10">
      <div className="flex flex-col">
        <div className="ml-auto w-[min(180px,92%)] md:w-[min(300px,92%)] rounded-2xl border border-black/10 bg-white p-2 shadow-sm">
          <div className="overflow-hidden rounded-xl">
            <Image
              src="/joy-profile.JPG"
              alt="hello"
              width={800}
              height={800}
              className="aspect-4/5 w-full object-cover"
              priority
            />
          </div>
        </div>
        <div className="flex flex-col md:flex-row mt-4 md:mt-0">
          <h1 className="flex flex-col gap-4">
            <span className="block leading-[0.9] font-black tracking-[-0.02em] text-[clamp(2.8rem,10vw,8rem)]">
              Joy Lin
            </span>
            <span className="block font-bold text-4xl">
              Welcome to my portfolio!
            </span>
          </h1>
        </div>
      </div>
    </section>
  );
}
