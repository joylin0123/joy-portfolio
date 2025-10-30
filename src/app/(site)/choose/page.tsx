'use client';
import { useRouter } from 'next/navigation';

export default function ChoosePage() {
  const router = useRouter();

  const choose = (mode: '3d' | '2d') => {
    document.cookie = `viewMode=${mode}; path=/; max-age=${60 * 60 * 24 * 365}`;
    router.replace(`/${mode}`);
  };

  return (
    <main className="min-h-dvh flex items-center justify-center gap-6 p-6">
      <Card title="3D Experience" desc="Full 3D island with camera + physics" onClick={() => choose('3d')} />
      <Card title="2D Experience" desc="Lightweight, touch-friendly list & articles" onClick={() => choose('2d')} />
    </main>
  );
}

function Card({ title, desc, onClick }: { title: string; desc: string; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="w-64 rounded-2xl border border-white/20 p-5 text-left hover:bg-white/5 transition"
    >
      <h2 className="text-lg font-semibold">{title}</h2>
      <p className="text-sm opacity-70 mt-1">{desc}</p>
      <div className="mt-3 text-sm opacity-60">Remember my choice ✔︎</div>
    </button>
  );
}
