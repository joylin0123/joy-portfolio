import { useState } from 'react';
import Section from '../common/Section';
import { pixelBorderInlineStyle } from '@/libs/constants/pixelBorderStyle';
import mailtoUrl from '@/libs/helpers/mailToUrl';

export default function ContactMessageForm() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const submit = () => {
    const subject = `Hello Joy — from ${form.name || 'your website'}`;
    const body = `${form.message}\n\n— ${form.name}${
      form.email ? ` <${form.email}>` : ''
    }`;
    window.location.href = mailtoUrl(subject, body);
  };

  return (
    <Section title="Message Me">
      <div className={`${pixelBorderInlineStyle} p-4`}>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="flex flex-col gap-2">
            <label className="text-xs uppercase tracking-wide opacity-70">
              Your name
            </label>
            <input
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="border border-ring px-3 py-2 text-sm outline-none"
              placeholder="Ada Lovelace"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-xs uppercase tracking-wide opacity-70">
              Your email
            </label>
            <input
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="border border-ring px-3 py-2 text-sm outline-none"
              placeholder="you@example.com"
            />
          </div>
          <div className="md:col-span-2 flex flex-col gap-2">
            <label className="text-xs uppercase tracking-wide opacity-70">
              Message
            </label>
            <textarea
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              rows={5}
              className="border border-ring px-3 py-2 text-sm outline-none"
              placeholder="Hi Joy, I'd like to talk about ..."
            />
          </div>
        </div>
        <div className="mt-4 flex gap-2">
          <button
            onClick={submit}
            className="border border-ring px-3 py-1 text-sm"
          >
            Send via Email
          </button>
          <a
            href={mailtoUrl(
              'Hello Joy',
              'Hi Joy, I found your portfolio and ...',
            )}
            className="border border-ring px-3 py-1 text-sm"
          >
            Quick compose
          </a>
        </div>
        <p className="text-xs mt-2">
          No server involved — this opens your email client with a prefilled
          message.
        </p>
      </div>
    </Section>
  );
}
