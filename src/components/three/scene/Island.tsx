'use client';

import { Canvas } from '@react-three/fiber';
import { Physics, RigidBody } from '@react-three/rapier';
import { Suspense, useMemo, useRef, useState } from 'react';
import IslandModel from '../world/IslandModel';
import Player from '../player/Player';
import * as THREE from 'three';
import HotspotMeshes from '../world/HotspotMeshes';
import { HOTSPOTS } from '@/libs/constants/hotspots';
import ControlsHUD from '../world/ControlsHUD';
import MatrixLoader from '../world/MatrixLoader';

type IslandInfo = {
  topY: number;
  waterY: number;
  landCenter: [number, number];
};

export default function Island() {
  const [panel, setPanel] = useState<string | null>(null);
  const [info, setInfo] = useState<IslandInfo | null>(null);
  const [ready, setReady] = useState(false);

  const handleReady = (payload: any) => {
    if (typeof payload === 'number') {
      setInfo({ topY: payload, waterY: 0.15, landCenter: [0, 0] });
    } else if (payload && typeof payload === 'object') {
      const topY = Number(payload.topY ?? 2);
      const waterY = Number(payload.waterY ?? 0.15);
      const cx = Number(payload.landCenter?.[0] ?? 0);
      const cz = Number(payload.landCenter?.[1] ?? 0);
      setInfo({ topY, waterY, landCenter: [cx, cz] });
    }
    setReady(true);
  };

  const spawn = useMemo<[number, number, number] | null>(() => {
    if (!info) return null;
    const [cx, cz] = info.landCenter ?? [0, 0];
    const top = Number.isFinite(info.topY) ? info.topY : 2;
    return [cx, top + 0.6, cz];
  }, [info]);

  const cameraRef = useRef<THREE.PerspectiveCamera>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  return (
    <div style={{ height: '100vh' }}>
      <Canvas
        ref={canvasRef as any}
        camera={{ position: [0, 4, 12], fov: 55 }}
        dpr={[1, 1.5]}
        gl={{ antialias: false, powerPreference: 'high-performance', preserveDrawingBuffer: false }}
        onCreated={({ camera }) => {
          cameraRef.current = camera as THREE.PerspectiveCamera;
        }}
      >
        <color attach="background" args={['#0b0f1a']} />
        <ambientLight intensity={0.35} />
        <hemisphereLight intensity={0.9} groundColor="#213" />
        <directionalLight position={[6, 10, 6]} intensity={1.6} />

        <Suspense fallback={null}>
          <Physics gravity={[0, -12, 0]}>
            <IslandModel onReady={handleReady} />

            {info && (
              <>
                <HotspotMeshes
                  center={info.landCenter ?? [0, 0]}
                  topY={info.topY ?? 2}
                />

                <RigidBody type="fixed">
                  <mesh position={[0, (info.waterY ?? 0.15) - 3, 0]} visible={false}>
                    <boxGeometry args={[2000, 0.5, 2000]} />
                    <meshBasicMaterial />
                  </mesh>
                </RigidBody>
              </>
            )}

            {info && spawn && (
              <Player
                key={`${spawn[0].toFixed(2)}-${spawn[2].toFixed(2)}`}
                spawn={spawn}
                waterLevel={info.waterY ?? 0.15}
                cameraRef={cameraRef as React.RefObject<THREE.PerspectiveCamera>}
                canvasRef={canvasRef as React.RefObject<HTMLCanvasElement>}
                onInteract={(id) => {
                  const h = HOTSPOTS.find((x) => x.id === id);
                  if (h) setPanel(h.url);
                }}
              />
            )}
          </Physics>
        </Suspense>
      </Canvas>
      <MatrixLoader ready={ready} minDurationMs={100} />
      <ControlsHUD hidden={!!panel} />
      {panel && (
        <div className="fixed inset-0 bg-black/50 grid place-items-center">
          <div className="w-[90vw] max-w-[900px] h-[80vh] bg-[#141824] rounded-2xl border border-white/10 overflow-hidden">
            <div className="flex justify-between items-center px-4 h-10 border-b border-white/10 text-sm">
              <span className="opacity-70">{panel}</span>
              <button onClick={() => setPanel(null)} className="opacity-80">
                Close
              </button>
            </div>
            <iframe src={panel} className="w-full h-[calc(100%-40px)]" />
          </div>
        </div>
      )}
    </div>
  );
}
