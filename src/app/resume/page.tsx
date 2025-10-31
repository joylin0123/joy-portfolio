'use client';

import { resume } from '@/libs/constants/resume';
import React from 'react';
import PixelDivider from '@/components/ui/PixelDivider';
import ResumeHeader from '@/components/ui/resume/ResumeHeader';
import ResumeExperience from '@/components/ui/resume/ResumeExperience';
import ResumeEducation from '@/components/ui/resume/ResumeEducation';
import ResumeProjects from '@/components/ui/resume/ResumeProjects';
import ResumeSkills from '@/components/ui/resume/ResumeSkills';
import ResumeLanguages from '@/components/ui/resume/ResumeLanguages';

function K({ children }: { children: React.ReactNode }) {
  return (
    <kbd className="px-2 py-0.5 ml-1 rounded text-[0.7rem]">{children}</kbd>
  );
}

export default function ResumePage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="mx-auto max-w-4xl px-5 py-8 md:py-12">
        <ResumeHeader />
        <PixelDivider />
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
