'use client';
import React, { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';

function K({ children }: { children: React.ReactNode }) {
  return (
    <span
      className="hud-key"
      style={{
        display: 'inline-block',
        minWidth: 22,
        padding: '2px 6px',
        margin: '0 4px',
        textAlign: 'center',
        fontWeight: 700,
        border: '2px solid rgba(52, 211, 153, 0.7)',
        background: '#0b1322',
        boxShadow:
          '0 0 0 2px rgba(52,211,153,.15) inset, 0 0 8px rgba(52,211,153,.35), 0 0 20px rgba(52,211,153,.12)',
        borderRadius: 6,
        lineHeight: 1.1,
      }}
    >
      {children}
    </span>
  );
}

export default function ControlsHUD({ hidden = false }: { hidden?: boolean }) {
  const [locked, setLocked] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const onChange = () => setLocked(document.pointerLockElement != null);
    document.addEventListener('pointerlockchange', onChange);
    onChange();
    return () => document.removeEventListener('pointerlockchange', onChange);
  }, []);

  const go2D = useCallback(() => {
    // release pointer lock first so navigation is not confusing
    try { document.exitPointerLock?.(); } catch {}
    // set cookie via query and go to 2D
    router.push('/2d?view=2d');
  }, [router]);

  return (
    <>
      {/* NEW: Switch to 2D button (top-right) */}
      <div
        style={{
          position: 'fixed',
          right: 14,
          top: 14,
          zIndex: 60,
          pointerEvents: hidden ? 'none' : 'auto',
          transition: 'opacity .2s ease-out',
          opacity: hidden ? 0 : 1,
        }}
      >
        <button
          onClick={go2D}
          title="Switch to 2D"
          style={{
            fontFamily:
              'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
            color: '#d1fae5',
            background: 'linear-gradient(180deg, rgba(15,23,42,.9) 0%, rgba(2,8,23,.9) 100%)',
            border: '2px solid rgba(52, 211, 153, 0.7)',
            boxShadow:
              '0 0 0 2px rgba(52,211,153,.15) inset, 0 0 8px rgba(52,211,153,.35), 0 0 20px rgba(52,211,153,.12)',
            borderRadius: 10,
            padding: '8px 12px',
            fontSize: 12,
            fontWeight: 700,
            cursor: 'pointer',
            backdropFilter: 'blur(6px)',
          }}
        >
          ← Switch to 2D
        </button>
        <div style={{ fontSize: 10, opacity: 0.6, marginTop: 4, textAlign: 'right', color: '#d1fae5' }}>
          {locked ? 'Press Esc if click is blocked' : '\u00A0'}
        </div>
      </div>

      {/* Existing bottom-left HUD */}
      <div
        style={{
          position: 'fixed',
          left: 14,
          bottom: 14,
          zIndex: 50,
          pointerEvents: 'none', // keep non-interactive
          opacity: hidden ? 0 : 1,
          transition: 'opacity .2s ease-out',
          fontFamily:
            'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
          color: '#d1fae5',
          textShadow: '0 0 6px rgba(16,185,129,.25)',
        }}
      >
        {/* Card */}
        <div
          style={{
            padding: '10px 12px',
            background:
              'linear-gradient(180deg, rgba(15,23,42,.86) 0%, rgba(2,8,23,.86) 100%)',
            border: '1px solid rgba(255,255,255,.08)',
            borderRadius: 12,
            boxShadow:
              '0 10px 30px rgba(0,0,0,.35), inset 0 0 0 1px rgba(16,185,129,.15)',
            backdropFilter: 'blur(6px)',
            maxWidth: 'min(92vw, 760px)',
          }}
        >
          {/* Title / help line */}
          <div style={{ fontSize: 12, opacity: 0.8, marginBottom: 6 }}>
            {locked ? 'Mouse captured — use controls:' : 'Click to capture mouse — then use controls:'}
          </div>

          {/* Controls line */}
          <div style={{ fontSize: 13, display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 6 }}>
            <span style={{ opacity: 0.85 }}>Move</span>
            <K>W</K>
            <K>A</K>
            <K>S</K>
            <K>D</K>
            <span style={{ opacity: 0.5, margin: '0 6px' }}>•</span>
            <span style={{ opacity: 0.85 }}>Look</span>
            <span style={{ marginLeft: 6, opacity: 0.8 }}>Mouse</span>
            <span style={{ opacity: 0.5, margin: '0 6px' }}>•</span>
            <span style={{ opacity: 0.85 }}>Jump</span>
            <K>Space</K>
            <span style={{ opacity: 0.5, margin: '0 6px' }}>•</span>
            <span style={{ opacity: 0.85 }}>Interact</span>
            <K>E</K>
          </div>
        </div>
      </div>
    </>
  );
}
