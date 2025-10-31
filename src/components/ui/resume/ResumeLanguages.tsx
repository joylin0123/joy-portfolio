import Section from '../Section';
import { resume } from '@/libs/constants/resume';
import PixelBadge from '../PixelBadge';

export default function ResumeLanguages() {
  return (
    <Section title="Languages">
      <div className="flex flex-wrap gap-2">
        {resume.languages.map((lang) => (
          <PixelBadge key={lang}>{lang}</PixelBadge>
        ))}
      </div>
    </Section>
  );
}
