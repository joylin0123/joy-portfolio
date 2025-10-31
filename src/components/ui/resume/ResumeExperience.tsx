import Section from '../common/Section';
import { pixelBorderInlineStyle } from '@/libs/constants/pixelBorderStyle';
import { resume } from '@/libs/constants/resume';
import A, { typesOfA } from '../common/A';

export default function ResumeExperience() {
  return (
    <Section title="Experience">
      {resume.experience.map((job, idx) => (
        <article key={idx} className={`p-4 ${pixelBorderInlineStyle}`}>
          <header className="mb-2 flex flex-wrap items-baseline justify-between gap-2">
            <h3 className="font-bold text-lg md:text-xl tracking-wide">
              {job.title} ·{' '}
              <A
                href={job.company_url}
                target="_blank"
                type={typesOfA.UNDERLINE}
              >
                <span className="text-ring">{job.company}</span>
              </A>
            </h3>
            <p className="text-sm">
              {job.location} · {job.period}
            </p>
          </header>
          <ul className="list-disc list-outside ml-5 space-y-1.5 text-[0.95rem]">
            {job.bullets.map((b, i) => (
              <li key={i}>{b}</li>
            ))}
          </ul>
        </article>
      ))}
    </Section>
  );
}
