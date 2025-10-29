import React, { useEffect, useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';

export default function KirbyAvatar({
  yawRef,
  targetHeight = 1.2,
}: {
  yawRef: React.MutableRefObject<number>;
  targetHeight?: number;
}) {
  const { scene } = useGLTF('/models/kirby.glb');
  const group = useRef<THREE.Group>(null);

  useEffect(() => {
    scene.traverse((o: any) => {
      if ((o as any).isCamera || (o as any).isLight) o.parent?.remove(o);
    });
  }, [scene]);

  const { scale, yOffset } = useMemo(() => {
    const clone = scene.clone(true);
    const box = new THREE.Box3().setFromObject(clone);
    const size = box.getSize(new THREE.Vector3());
    const s = targetHeight / Math.max(size.y, 1e-6);
    const yOff = -box.min.y * s;
    return { scale: s, yOffset: yOff };
  }, [scene, targetHeight]);

  useFrame(() => {
    if (group.current) group.current.rotation.y = yawRef.current;
  });

  return (
    <group ref={group} position={[0, yOffset, 0]} scale={scale}>
      <primitive object={scene} />
    </group>
  );
}
useGLTF.preload('/models/kirby.glb');
