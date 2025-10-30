'use client';
import React, { useEffect, useRef, useState } from 'react';
import { useProgress } from '@react-three/drei';

export default function MatrixLoader({
  ready = false,
  minDurationMs = 100,
  fadeMs = 400,
}: { ready?: boolean; minDurationMs?: number; fadeMs?: number }) {
  const { progress, item, loaded, total } = useProgress(); // still used for % only
  const startRef = useRef<number>(performance.now());
  const [show, setShow] = useState(true);     // opacity 1/0
  const [mounted, setMounted] = useState(true); // unmount after fade
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number | null>(null);

  // Digital rain
  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext('2d')!;
    const chars = 'アイウエオｱｲｳｴｵｶｷｸｹｺABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    const fontSize = 16;

    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);
    let cols = Math.floor(w / fontSize);
    let drops = Array(cols).fill(0).map(() => Math.random() * h / fontSize);

    const onResize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
      cols = Math.floor(w / fontSize);
      drops = Array(cols).fill(0).map(() => Math.random() * h / fontSize);
    };
    window.addEventListener('resize', onResize);

    const loop = () => {
      ctx.fillStyle = 'rgba(0,0,0,0.08)';
      ctx.fillRect(0, 0, w, h);
      ctx.font = `${fontSize}px ui-monospace, Menlo, monospace`;

      for (let i = 0; i < cols; i++) {
        const ch = chars[(Math.random() * chars.length) | 0];
        const x = i * fontSize;
        const y = drops[i] * fontSize;

        const grad = ctx.createLinearGradient(x, y - fontSize * 1.2, x, y + fontSize * 0.2);
        grad.addColorStop(0, 'rgba(167,243,208,0)');
        grad.addColorStop(0.6, '#22c55e');
        grad.addColorStop(1, '#86efac');
        ctx.fillStyle = grad;

        ctx.fillText(ch, x, y);

        if (y > h && Math.random() > 0.975) drops[i] = 0;
        drops[i]++;
      }
      rafRef.current = requestAnimationFrame(loop);
    };

    // prime background and start
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, w, h);
    loop();

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  // when YOU declare ready, wait for the remaining hold, then fade out
  useEffect(() => {
    if (!ready) return; // keep showing
    const elapsed = performance.now() - startRef.current;
    const left = Math.max(0, minDurationMs - elapsed);
    const t = setTimeout(() => setShow(false), left);
    return () => clearTimeout(t);
  }, [ready, minDurationMs]);

  // unmount after fade
  useEffect(() => {
    if (show) { setMounted(true); return; }
    const t = setTimeout(() => setMounted(false), fadeMs);
    return () => clearTimeout(t);
  }, [show, fadeMs]);

  if (!mounted) return null;

  const displayProgress = Math.round(ready ? 100 : progress);

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 60,
        pointerEvents: 'none',
        opacity: show ? 1 : 0,
        transition: `opacity ${fadeMs}ms ease`,
        color: '#a7f3d0',
      }}
    >
      <canvas ref={canvasRef} style={{ width: '100%', height: '100%' }} />

      {/* center HUD */}
      <div
        style={{
          position: 'absolute',
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
          textAlign: 'center',
          pointerEvents: 'none',
          fontFamily: 'ui-monospace, Menlo, monospace',
        }}
      >
        <div style={{ fontSize: 14, letterSpacing: 2, textTransform: 'uppercase', opacity: 0.8, marginBottom: 10 }}>
          Booting world…
        </div>
        <div
          style={{
            display: 'inline-block',
            minWidth: 260,
            padding: '10px 14px',
            borderRadius: 10,
            background: 'rgba(2,8,23,.6)',
            boxShadow: '0 0 0 1px rgba(52,211,153,.25), 0 10px 30px rgba(0,0,0,.35)',
            border: '1px solid rgba(255,255,255,.06)',
            backdropFilter: 'blur(4px)',
          }}
        >
          <div style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>{displayProgress}%</div>
          <div style={{ width: 260, height: 8, background: 'rgba(15,23,42,.7)', borderRadius: 6, overflow: 'hidden' }}>
            <div
              style={{
                width: `${displayProgress}%`,
                height: '100%',
                background: 'linear-gradient(90deg,#16a34a,#22c55e,#86efac)',
                boxShadow: '0 0 12px #22c55e',
              }}
            />
          </div>
          <div style={{ fontSize: 12, opacity: 0.75, marginTop: 8 }}>
            {loaded}/{total} assets
            {typeof item === 'string' ? <> — <span style={{ opacity: 0.8 }}>{item.split('/').pop()}</span></> : null}
          </div>
        </div>
      </div>
    </div>
  );
}
