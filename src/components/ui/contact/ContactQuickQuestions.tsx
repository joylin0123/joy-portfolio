import Section from '../common/Section';
import CopyButton from '../common/CopyButton';
import A, { typesOfA } from '../common/A';
import mailtoUrl from '@/libs/helpers/mailToUrl';
import { profile } from '@/libs/constants/profile';
import { pixelBorderInlineStyle } from '@/libs/constants/pixelBorderStyle';

export default function ContactQuickQuestions() {
  return (
    <Section title="Quick Actions">
      <div className="grid md:grid-cols-2 gap-4">
        <article className={`${pixelBorderInlineStyle} p-4`}>
          <h3 className="font-bold mb-2">Email</h3>
          <p className="text-sm opacity-80 mb-3">
            Best for detailed inquiries, collaboration, or interview scheduling.
          </p>
          <div className="flex flex-wrap gap-2">
            <A
              href={mailtoUrl('Hello Joy', 'Hi Joy, can we chat about ...')}
              type={typesOfA.BUTTON}
            >
              New message
            </A>
            <CopyButton value={profile.email} label="Copy address" />
          </div>
        </article>

        <article className={`${pixelBorderInlineStyle} p-4`}>
          <h3 className="font-bold mb-2">LinkedIn</h3>
          <p className="text-sm opacity-80 mb-3">
            Connect or send a quick note—mention where you saw my work.
          </p>
          <div className="flex flex-wrap gap-2">
            <A
              href={profile.linkedin}
              target="_blank"
              rel="noreferrer"
              type={typesOfA.BUTTON}
            >
              Open LinkedIn
            </A>
            <CopyButton value={profile.linkedin} label="Copy profile URL" />
          </div>
        </article>

        <article className={`${pixelBorderInlineStyle} p-4`}>
          <h3 className="font-bold mb-2">Phone</h3>
          <p className="text-sm opacity-80 mb-3">
            For urgent matters. Otherwise, please email first.
          </p>
          <div className="flex flex-wrap gap-2">
            <A
              href={`tel:${profile.phone.replace(/\s|-/g, '')}`}
              type={typesOfA.BUTTON}
            >
              Call
            </A>
            <CopyButton value={profile.phone} label="Copy number" />
          </div>
        </article>

        <article className={`${pixelBorderInlineStyle} p-4`}>
          <h3 className="font-bold mb-2">GitHub</h3>
          <p className="text-sm opacity-80 mb-3">
            See code samples and projects. Issues/PRs welcome.
          </p>
          <div className="flex flex-wrap gap-2">
            <A
              href={profile.github}
              target="_blank"
              rel="noreferrer"
              type={typesOfA.BUTTON}
            >
              Open GitHub
            </A>
            <CopyButton value={profile.github} label="Copy repo URL" />
          </div>
        </article>
      </div>
    </Section>
  );
}
