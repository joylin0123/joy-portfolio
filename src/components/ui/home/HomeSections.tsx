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
    <section id={id} className="border-t border-border/60 pt-10 md:pt-12">
      <SectionReveal delay={delay}>
        <div className="grid gap-8 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
          <div className="md:pr-10">
            <p className="mb-3 text-[10px] uppercase tracking-[0.24em] text-foreground/55">
              {kicker}
            </p>
            <h2 className="mb-3 text-xl md:text-2xl font-semibold tracking-tight">
              {title}
            </h2>
            {description && (
              <p className="max-w-sm text-sm text-foreground/70">
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
    <div className="mx-auto mb-16 max-w-6xl space-y-12 px-4 pb-10 sm:px-6 sm:pb-20 md:space-y-16">
      <SectionBlock
        id="about"
        kicker="Profile"
        title="Who I am"
        description="A quick snapshot of my background, what I care about, and what I like building and learning."
        delay={0}
      >
        <HomeAboutSection />
      </SectionBlock>

      <SectionBlock
        id="articles"
        kicker="Writing & Notes"
        title="Articles, study notes, and travel journals"
        description="I write about software, data, systems, and sometimes about cities, trains, and camera experiments."
        delay={0.05}
      >
        <HomeArticleSection />
      </SectionBlock>

      <SectionBlock
        id="photos"
        kicker="Photos"
        title="Visual notes from trips & everyday life"
        description="A small selection of photos that document places I’ve lived in, traveled to, and people I met."
        delay={0.1}
      >
        <HomePhotoSection />
      </SectionBlock>
    </div>
  );
}
