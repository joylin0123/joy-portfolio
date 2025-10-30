'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Island from '@/components/three/scene/Island';

function hasWebGL(): boolean {
  try {
    const c = document.createElement('canvas');
    return !!(c.getContext('webgl') || c.getContext('experimental-webgl'));
  } catch { return false; }
}

export default function Page3D() {
  const router = useRouter();

  useEffect(() => {
    if (!hasWebGL()) {
      router.replace('/flat?reason=webgl');
    }
  }, [router]);

  return (
    <div className="h-dvh">
      <Island />
    </div>
  );
}
