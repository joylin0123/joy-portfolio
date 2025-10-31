import Section from '../Section';
import PixelBadge from '../PixelBadge';
import { resume } from '@/libs/constants/resume';
import { pixelBorderInlineStyle } from '@/libs/constants/pixelBorderStyle';
import A, { typesOfA } from '../A';

export default function ResumeProjects() {
  return (
    <Section title="Projects">
      <div className="grid md:grid-cols-2 gap-4">
        {resume.projects.map((p, idx) => (
          <article
            key={idx}
            className={`p-4 ${pixelBorderInlineStyle} flex flex-col`}
          >
            <header className="mb-1 flex items-baseline justify-between gap-2">
              <h3 className="font-bold text-lg tracking-wide">{p.name}</h3>
              {p.link && (
                <A
                  href={p.link}
                  target="_blank"
                  rel="noreferrer"
                  type={typesOfA.UNDERLINE}
                >
                  repo →
                </A>
              )}
            </header>
            <p className="text-[0.95rem] mb-2">{p.blurb}</p>
            <div className="mt-auto flex flex-wrap gap-1.5">
              {p.stack.map((s) => (
                <PixelBadge key={s}>{s}</PixelBadge>
              ))}
            </div>
          </article>
        ))}
      </div>
    </Section>
  );
}
