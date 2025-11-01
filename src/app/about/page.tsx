'use client';

import { resume } from '@/libs/constants/resume';
import AboutExperience from '@/components/ui/about/AboutExperience';
import AboutEducation from '@/components/ui/about/AboutEducation';
import AboutProjects from '@/components/ui/about/AboutProjects';
import AboutSkills from '@/components/ui/about/AboutSkills';
import AboutLanguages from '@/components/ui/about/AboutLanguages';
import AboutHeader from '@/components/ui/about/AboutHeader';

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="mx-auto max-w-4xl px-5 py-8 md:py-12">
        <AboutHeader />
        <AboutExperience />
        <AboutEducation />
        <AboutProjects />
        <AboutSkills />
        <AboutLanguages />
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
