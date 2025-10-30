'use client';
import dynamic from 'next/dynamic';

const Island = dynamic(() => import('../components/three/scene/Island'), { ssr: false });

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0b0f1a] text-white">
      <Island />
    </main>
  );
}
