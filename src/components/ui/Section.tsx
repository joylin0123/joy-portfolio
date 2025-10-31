import React from 'react';

export default function Section({ id, title, children }: { id?: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} className="mb-10">
      <h2 className="mb-4 text-xl md:text-2xl font-black uppercase">
        <span className="px-3 py-1">{title}</span>
      </h2>
      <div className="space-y-4">{children}</div>
    </section>
  );
}