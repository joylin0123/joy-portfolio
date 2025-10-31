import { useState, useEffect } from 'react';
import Section from '../common/Section';
import { pixelBorderInlineStyle } from '@/libs/constants/pixelBorderStyle';

export default function ContactAvailability() {
  const [now, setNow] = useState<string>('');
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat('en-GB', {
      timeZone: 'Europe/Amsterdam',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
      weekday: 'short',
      day: '2-digit',
      month: 'short',
    });
    const tick = () => setNow(fmt.format(new Date()));
    tick();
    const t = setInterval(tick, 15_000);
    return () => clearInterval(t);
  }, []);

  return (
    <Section title="Availability & Response">
      <div className={`${pixelBorderInlineStyle} p-4`}>
        <ul className="list-disc list-outside ml-5 space-y-1.5 text-[0.95rem]">
          <li>
            Timezone: <span className="text-ring">Europe/Amsterdam</span> —
            local time <span className="text-ring">{now || '—'}</span>
          </li>
          <li>Typical response within 24 hours on weekdays.</li>
          <li>
            Preferred: concise subject lines (e.g.,{' '}
            <code className="px-1 rounded">[Collab]</code>,{' '}
            <code className="px-1 rounded">[Interview]</code>
            ).
          </li>
        </ul>
      </div>
    </Section>
  );
}
