import HomePhotoSection from './HomePhotoSection';
import HomeArticleSection from './HomeArticleSection';
import HomeAboutSection from './HomeAboutSection';
import SectionReveal from '@/components/ui/common/SectionReveal';

type SectionBlockProps = {
  id?: string;
  kicker: string;
  title: string;
  description?: string;
  children: React.ReactNode;
  delay?: number;
};

function SectionBlock({
  id,
  kicker,
  title,
  description,
  children,
  delay = 0,
}: SectionBlockProps) {
  return (
    <section id={id} className="border-t border-border/60 pt-8 md:pt-10">
      <SectionReveal delay={delay}>
        <div className="grid gap-6 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
          <div className="md:pr-10 space-y-2">
            <p className="text-[10px] uppercase tracking-[0.28em] text-foreground/55">
              {kicker}
            </p>
            <h2 className="text-[15px] md:text-[16px] font-medium tracking-tight">
              {title}
            </h2>
            {description && (
              <p className="max-w-sm text-[13px] leading-relaxed text-foreground/70">
                {description}
              </p>
            )}
          </div>

          <div className="md:pl-4">{children}</div>
        </div>
      </SectionReveal>
    </section>
  );
}

export default async function HomeSections() {
  return (
    <div className="mx-auto mb-16 max-w-6xl space-y-10 px-4 pb-10 sm:px-6 sm:pb-20 md:space-y-12">
      <SectionBlock
        id="about"
        kicker="Profile"
        title="Who I am"
        description="Background, what I care about, and what I like building and learning."
        delay={0}
      >
        <HomeAboutSection />
      </SectionBlock>

      <SectionBlock
        id="articles"
        kicker="Writing & Notes"
        title="Articles, study notes, and travel journals"
        description="Mostly software, data, systems and sometimes trains, cities, and camera notes."
        delay={0.05}
      >
        <HomeArticleSection />
      </SectionBlock>

      <SectionBlock
        id="photos"
        kicker="Photos"
        title="Visual notes"
        description="Images from places I’ve spent time in."
        delay={0.1}
      >
        <HomePhotoSection />
      </SectionBlock>
    </div>
  );
}
