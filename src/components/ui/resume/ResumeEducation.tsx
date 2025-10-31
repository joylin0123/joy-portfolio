import Section from '../Section';
import { resume } from '@/libs/constants/resume';
import { pixelBorderInlineStyle } from '@/libs/constants/pixelBorderStyle';

export default function ResumeEducation() {
  return (
    <Section title="Education">
      {resume.education.map((ed, idx) => (
        <article key={idx} className={`p-4 ${pixelBorderInlineStyle}`}>
          <header className="mb-1 flex flex-col items-baseline justify-between gap-2">
            <h3 className="font-bold text-lg md:text-xl tracking-wide">
              {ed.school}
            </h3>
            <p className="text-sm">
              {ed.location} · {ed.period}
            </p>
          </header>
          <p className="text-sm">{ed.degree}</p>
        </article>
      ))}
    </Section>
  );
}
