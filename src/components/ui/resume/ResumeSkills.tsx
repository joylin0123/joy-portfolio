import Section from '../Section';
import { resume } from '@/libs/constants/resume';
import { pixelBorderInlineStyle } from '@/libs/constants/pixelBorderStyle';
import PixelBadge from '../PixelBadge';

export default function ResumeSkills() {
  return (
    <Section title="Skills">
      <div className="grid md:grid-cols-2 gap-4">
        {Object.entries(resume.skills).map(([group, items]) => (
          <div key={group} className={`p-4 ${pixelBorderInlineStyle}`}>
            <h4 className="font-bold mb-2">{group}</h4>
            <div className="flex flex-wrap gap-1.5">
              {items.map((it) => (
                <PixelBadge key={it}>{it}</PixelBadge>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
