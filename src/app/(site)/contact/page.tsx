'use client';

import { profile } from '../../../libs/constants/profile';
import ContactQuickQuestions from '@/components/ui/contact/ContactQuickQuestions';
import ContactMessageForm from '@/components/ui/contact/ContactMessageForm';
import ContactAvailability from '@/components/ui/contact/ContactAvailability';

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="mx-auto max-w-4xl px-5 py-8 md:py-12">
        <ContactQuickQuestions />
        <ContactMessageForm />
        <ContactAvailability />
        <footer className="mt-10 text-xs">
          <p>
            Built with a pixel/terminal aesthetic. — ©{' '}
            {new Date().getFullYear()} {profile.name}
          </p>
        </footer>
      </div>
    </main>
  );
}
