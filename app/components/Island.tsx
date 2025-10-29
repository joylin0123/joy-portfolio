'use client';

import { Canvas } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import {
  Physics,
} from '@react-three/rapier';
import { Suspense, useRef, useState } from 'react';
import IslandModel from './IslandModel';
import Player from './Player';
import * as THREE from 'three';

export default function Island() {
  const [panel, setPanel] = useState<string|null>(null);
  const [spawnY, setSpawnY] = useState<number|null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  return (
    <div style={{ height: '100vh' }}>
      <Canvas
        ref={canvasRef as any}
        camera={{ position: [0, 4, 12], fov: 55 }}
        dpr={[1, 1.5]}
        gl={{ antialias:false, powerPreference:'high-performance', preserveDrawingBuffer:false }}
        onCreated={({ camera }) => { cameraRef.current = camera as THREE.PerspectiveCamera; }}
      >
        {/* background + lights */}
        <color attach="background" args={['#0b0f1a']} />
        <ambientLight intensity={0.35} />
        <hemisphereLight intensity={0.9} groundColor="#213" />
        <directionalLight position={[6, 10, 6]} intensity={1.6} />

        {/* Click message (disappears after pointer lock) */}
        <Html center style={{ pointerEvents: 'none' }}>
          <div style={{ opacity: 0.7, fontSize: 14 }}>Click to capture mouse • WASD move • Mouse look • Space jump</div>
        </Html>

        <Suspense fallback={null}>
          <Physics gravity={[0, -12, 0]}>
            <IslandModel onReady={(topY) => setSpawnY(Math.max(2, topY + 0.3))} />
            {spawnY !== null && (
              <Player
                key={`spawn-${spawnY}`}
                spawnY={spawnY}
                cameraRef={cameraRef as React.RefObject<THREE.PerspectiveCamera>}
                canvasRef={canvasRef as React.RefObject<HTMLCanvasElement>}
                onInteract={(id) => {
                  if (id === 'resume') setPanel('/resume');
                  if (id === 'articles') setPanel('/articles');
                  if (id === 'projects') setPanel('/projects');
                }}
              />
            )}

            {/* No safety floor so you can jump/fall/swim into the ocean */}
          </Physics>
        </Suspense>
      </Canvas>

      {panel && (
        <div className="fixed inset-0 bg-black/50 grid place-items-center">
          <div className="w-[90vw] max-w-[840px] h-[70vh] bg-[#141824] rounded-2xl border border-white/10 overflow-hidden">
            <div className="flex justify-between items-center px-4 h-10 border-b border-white/10 text-sm">
              <span className="opacity-70">{panel}</span>
              <button onClick={() => setPanel(null)} className="opacity-80">Close</button>
            </div>
            <iframe src={panel} className="w-full h-[calc(100%-40px)]" />
          </div>
        </div>
      )}
    </div>
  );
}
