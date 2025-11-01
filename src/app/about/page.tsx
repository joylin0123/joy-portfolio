'use client';

import { resume } from '@/libs/constants/resume';
import ResumeExperience from '@/components/ui/resume/ResumeExperience';
import ResumeEducation from '@/components/ui/resume/ResumeEducation';
import ResumeProjects from '@/components/ui/resume/ResumeProjects';
import ResumeSkills from '@/components/ui/resume/ResumeSkills';
import ResumeLanguages from '@/components/ui/resume/ResumeLanguages';

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="mx-auto max-w-4xl px-5 py-8 md:py-12">
        <ResumeExperience />
        <ResumeEducation />
        <ResumeProjects />
        <ResumeSkills />
        <ResumeLanguages />
        <footer className="mt-10 text-xs">
          <p>
            Built with a pixel/terminal aesthetic. Print-friendly. — ©{' '}
            {new Date().getFullYear()} {resume.name}
          </p>
        </footer>
      </div>
    </main>
  );
}
