'use client';
import dynamic from 'next/dynamic';

const Island = dynamic(() => import('../components/Island'), { ssr: false });

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0b0f1a] text-white">
      {/* <header className="max-w-5xl mx-auto px-6 py-6 flex justify-between">
        <div className="font-semibold">Joy Lin</div>
        <nav className="space-x-4 text-sm opacity-80">
          <a href="/resume">Resume</a>
          <a href="/articles">Articles</a>
          <a href="https://github.com/joylin0123" target="_blank">GitHub</a>
        </nav>
      </header> */}
      <Island />
    </main>
  );
}
