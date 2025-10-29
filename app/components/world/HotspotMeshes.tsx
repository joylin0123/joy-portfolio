'use client';

import { Billboard, Text } from '@react-three/drei';
import { useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { useEffect, useMemo, useState } from 'react';
import { HOTSPOTS, INTERACT_RADIUS } from './hotspots';

type Props = {
  center: [number, number]; // [cx, cz] from IslandModel
  waterY: number;           // from IslandModel
  topY: number;             // from IslandModel
};

type WorldHotspot = (typeof HOTSPOTS)[number] & { worldPos: [number, number, number] };

export default function HotspotMeshes({ center, waterY, topY }: Props) {
  const { scene, camera } = useThree();

  const [items, setItems] = useState<WorldHotspot[]>([]);
  const [nearId, setNearId] = useState<string | null>(null);

  // Compute world positions and snap to terrain with a raycast
  useEffect(() => {
    const rc = new THREE.Raycaster();
    const up = topY + 10; // start ray a bit above the highest point

    const next: WorldHotspot[] = HOTSPOTS.map(h => {
      const [dx, dy, dz] = h.pos;
      const x = center[0] + dx;
      const z = center[1] + dz;

      // default just above water (fallback)
      let y = waterY + 0.4 + dy;

      // cast straight down to find land; pick first hit above the water plane
      rc.set(new THREE.Vector3(x, up, z), new THREE.Vector3(0, -1, 0));
      const hits = rc.intersectObjects(scene.children, true);
      const hit = hits.find(hh => hh.point.y > waterY + 0.05);

      if (hit) y = hit.point.y + 0.12; // float slightly above the ground

      return { ...h, worldPos: [x, y, z] as [number, number, number] };
    });

    setItems(next);
  }, [center, waterY, topY, scene]);

  // simple proximity highlight (optional; uses camera pos as proxy)
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
        <group key={h.id} position={h.worldPos}>
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
              {/* push text slightly forward, disable depth test so it never hides */}
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
      ))}
    </>
  );
}
