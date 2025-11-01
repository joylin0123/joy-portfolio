import { resume } from '@/libs/constants/resume';
import PixelBadge from '../common/PixelBadge';
import A, { typesOfA } from '../common/A';
import { copyToClickBoard } from '@/libs/helpers/copyToClickBoard';

export default function AboutHeader() {
  return (
    <header className="mb-8 md:mb-12">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div>
            <h1 className="text-2xl md:text-4xl font-black tracking-wider">
              <span className="">{resume.name}</span>
            </h1>
            <p className="text-sm md:text-base mt-1">
              {resume.role} · {resume.location}
            </p>
            <div className="mt-2 flex flex-wrap gap-2">
              <PixelBadge>React/Next.js</PixelBadge>
              <PixelBadge>Typescript</PixelBadge>
              <PixelBadge>Node.js</PixelBadge>
              <PixelBadge>AWS</PixelBadge>
            </div>
          </div>
        </div>

        <div className="hidden md:flex flex-col items-end gap-2">
          <div className="flex items-center gap-2">
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                window.print();
              }}
            >
              <PixelBadge>Print</PixelBadge>
            </a>
          </div>
        </div>
      </div>

      <div className="mt-4 grid gap-2 text-sm md:text-base">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
          <A href={`mailto:${resume.contacts.email}`} type={typesOfA.UNDERLINE}>
            {resume.contacts.email}
          </A>
          <span className="text-slate-500">|</span>
          <A
            href={`tel:${resume.contacts.phone.replace(/\s|-/g, '')}`}
            type={typesOfA.UNDERLINE}
          >
            {resume.contacts.phone}
          </A>
          <span className="text-slate-500">|</span>
          <A
            href={resume.contacts.linkedin}
            type={typesOfA.UNDERLINE}
            target="_blank"
            rel="noreferrer"
          >
            linkedin.com/in/joy-lin-tw
          </A>
          <span className="text-slate-500">|</span>
          <A
            href={resume.contacts.github}
            target="_blank"
            rel="noreferrer"
            type={typesOfA.UNDERLINE}
          >
            github.com/joylin0123
          </A>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => copyToClickBoard(resume.contacts.email)}
            className="px-2 py-1 text-xs"
          >
            Copy email
          </button>
          <button
            onClick={() => copyToClickBoard(resume.contacts.github)}
            className="px-2 py-1 text-xs"
          >
            Copy GitHub
          </button>
        </div>
      </div>
    </header>
  );
}
