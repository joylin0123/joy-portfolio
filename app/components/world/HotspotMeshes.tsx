'use client';

import { Billboard, Text } from '@react-three/drei';
import { useThree, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useEffect, useMemo, useRef, useState } from 'react';
import { HOTSPOTS, INTERACT_RADIUS } from './hotspots';

type Props = {
  center: [number, number]; // [cx, cz]
  waterY: number;
  topY: number;
};

type WorldHotspot = (typeof HOTSPOTS)[number] & {
  worldPos: [number, number, number]; // panel pos (slightly above ground)
  groundY: number;                    // exact ground height at XZ
};

/* ---------- Arrow that points DOWN to the ground tip = y=0 ---------- */
function ArrowDown({
  height = 0.7,            // shaft length
  color = '#ff4d6d',
  active = false,
}: { height?: number; color?: string; active?: boolean }) {
  const g = useRef<THREE.Group>(null);
  const tRef = useRef(0);

  useFrame((_, dt) => {
    tRef.current += dt;
    if (!g.current) return;
    // gentle bob + pulse when active
    const bob = (active ? 0.08 : 0.04) * Math.sin(tRef.current * 3.0);
    g.current.position.y = 0.02 + bob;
    g.current.rotation.y = Math.sin(tRef.current * 1.2) * 0.25; // tiny sway
  });

  const tipH = 0.24; // cone height
  const shaftR = 0.04;

  return (
    // group origin at ground; tip apex sits at y≈0
    <group ref={g}>
      <group rotation={[Math.PI, 0, 0]}>
        {/* tip (downwards) — place so apex touches ground */}
        <mesh position={[0, tipH / 2, 0]}>
          <coneGeometry args={[0.12, tipH, 16]} />
          <meshStandardMaterial
            color={color}
            emissive={color}
            emissiveIntensity={active ? 1.0 : 0.5}
          />
        </mesh>
        {/* shaft (downwards) starting right above the tip */}
        <mesh position={[0, tipH + height / 2, 0]}>
          <cylinderGeometry args={[shaftR, shaftR, height, 12]} />
          <meshStandardMaterial
            color={color}
            emissive={color}
            emissiveIntensity={active ? 0.6 : 0.3}
          />
        </mesh>
      </group>
    </group>
  );
}

export default function HotspotMeshes({ center, waterY, topY }: Props) {
  const { scene, camera } = useThree();

  const [items, setItems] = useState<WorldHotspot[]>([]);
  const [nearId, setNearId] = useState<string | null>(null);

  // Compute world positions and snap to terrain with a raycast
  useEffect(() => {
    const rc = new THREE.Raycaster();
    const up = topY + 10;

    const next: WorldHotspot[] = HOTSPOTS.map(h => {
      const [dx, dy, dz] = h.pos;
      const x = center[0] + dx;
      const z = center[1] + dz;

      rc.set(new THREE.Vector3(x, up, z), new THREE.Vector3(0, -1, 0));
      const hits = rc.intersectObjects(scene.children, true);
      const hit = hits.find(hh => hh.point.y > waterY + 0.05);

      const groundY = hit ? hit.point.y : waterY;
      const y = (hit ? hit.point.y : waterY) + 0.12 + dy; // panel slightly above ground

      return { ...h, worldPos: [x, y, z] as [number, number, number], groundY };
    });

    setItems(next);
  }, [center, waterY, topY, scene]);

  // simple proximity highlight
  useEffect(() => {
    const v = new THREE.Vector3();
    let raf = 0;
    const loop = () => {
      let id: string | null = null;
      let min = INTERACT_RADIUS;
      const p = camera.position;
      items.forEach(h => {
        const d = v.set(h.worldPos[0], 0, h.worldPos[2]).distanceTo(new THREE.Vector3(p.x, 0, p.z));
        if (d < min) { min = d; id = h.id; }
      });
      setNearId(id);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [items, camera]);

  return (
    <>
      {items.map(h => (
        <group key={h.id}>
          <group position={h.worldPos}>
            {h.kind === 'crate' ? (
              <mesh>
                <boxGeometry args={h.size ?? [0.8, 0.6, 0.8]} />
                <meshStandardMaterial
                  color={nearId === h.id ? '#ffd166' : '#8ecae6'}
                  emissive={nearId === h.id ? '#ffb703' : '#000'}
                  emissiveIntensity={nearId === h.id ? 0.7 : 0}
                />
              </mesh>
            ) : (
              <Billboard follow>
                <mesh>
                  <boxGeometry args={h.size ?? [1.2, 0.8, 0.08]} />
                  <meshStandardMaterial
                    color={nearId === h.id ? '#ffd6a5' : '#cbd5e1'}
                    emissive={nearId === h.id ? '#fb8500' : '#000'}
                    emissiveIntensity={nearId === h.id ? 0.7 : 0}
                  />
                </mesh>
                <Text
                  fontSize={0.24}
                  anchorX="center"
                  anchorY="middle"
                  position={[0, 0, 0.06]}
                  outlineWidth={0.02}
                  outlineColor="#000"
                  color="white"
                >
                  {h.label}
                </Text>
              </Billboard>
            )}
          </group>
        </group>
      ))}
    </>
  );
}
