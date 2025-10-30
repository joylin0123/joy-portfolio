import React, { useEffect, useMemo } from 'react';
import { useGLTF } from '@react-three/drei';
import { MeshCollider, RigidBody } from '@react-three/rapier';
import * as THREE from 'three';

export type IslandReadyInfo = {
  topY: number;
  waterY: number;
  landCenter: [number, number];
};

export default function IslandModel({
  onReady,
  targetSize = 72,
}: {
  onReady?: (topY: number) => void;
  targetSize?: number;
}) {
  const gltf = useGLTF('models/island.glb') as any;
  const scene: THREE.Object3D | undefined = gltf?.scene;

  const norm = useMemo(() => {
    if (!scene) return { scale: 1, pos: new THREE.Vector3(), topY: 1 };
    const box = new THREE.Box3().setFromObject(scene);
    const size = box.getSize(new THREE.Vector3());
    const center = box.getCenter(new THREE.Vector3());
    const scale = targetSize / Math.max(size.x || 1, size.z || 1);
    const pos = new THREE.Vector3(-center.x * scale, -box.min.y * scale, -center.z * scale);
    const topY = (size.y || 1) * scale;
    return { scale, pos, topY };
  }, [scene, targetSize]);

  useEffect(() => { onReady?.(norm.topY); }, [norm.topY, onReady]);

  // Build collider-only group by copying meshes we want (skip likely water plane)
  const colliderGroup = useMemo<THREE.Group | null>(() => {
    if (!scene) return null;

    const group = new THREE.Group();
    const tmpBox = new THREE.Box3();
    const tmp = new THREE.Vector3();

    // 1) find the flattest, largest-area mesh (likely the water slab)
    let waterCandidate: THREE.Mesh | null = null;
    let bestScore = -Infinity;
    const globBox = new THREE.Box3().setFromObject(scene);
    const globH = globBox.getSize(new THREE.Vector3()).y;
    const THIN = Math.max(globH * 0.02, 0.01); // “very thin” relative to model height

    scene.updateWorldMatrix(true, true);
    scene.traverse((o: any) => {
      if (!o?.isMesh) return;
      tmpBox.setFromObject(o);
      const s = tmpBox.getSize(tmp);
      const thicknessY = s.y;
      const areaXZ = s.x * s.z;
      const name = `${o.name || ''} ${(o.material?.name || '')}`.toLowerCase();
      const namedWater = name.includes('water') || name.includes('ocean') || name.includes('sea');

      // score huge, thin slabs highest
      const score = (namedWater ? 2 : 0) + (thicknessY < THIN ? 1 : 0) + Math.log10(areaXZ + 1e-6);
      if (score > bestScore) { bestScore = score; waterCandidate = o; }
    });

    // 2) copy all meshes except that waterCandidate
    scene.traverse((o: any) => {
      if (!o?.isMesh) return;
      if (waterCandidate && (o === waterCandidate)) return;

      const geo = (o.geometry as THREE.BufferGeometry) || null;
      if (!geo) return;

      const mesh = new THREE.Mesh(geo.clone(), new THREE.MeshBasicMaterial());
      mesh.position.copy(o.position);
      mesh.quaternion.copy(o.quaternion);
      mesh.scale.copy(o.scale);
      group.add(mesh);
    });

    // Fallback: if we removed everything by mistake, keep at least one mesh
    if (group.children.length === 0) {
      const fallback = new THREE.Group();
      scene.traverse((o: any) => {
        if (!o?.isMesh) return;
        const m = new THREE.Mesh(
          (o.geometry as THREE.BufferGeometry).clone(),
          new THREE.MeshBasicMaterial()
        );
        m.position.copy(o.position);
        m.quaternion.copy(o.quaternion);
        m.scale.copy(o.scale);
        fallback.add(m);
      });
      return fallback;
    }

    return group;
  }, [scene]);

  return (
    <>
      {/* Visible island (with water) */}
      <group scale={norm.scale} position={norm.pos as any}>
        {scene && <primitive object={scene} />}
      </group>

      {/* Land collider */}
      {colliderGroup && (
        <RigidBody type="fixed" colliders={false}>
          <MeshCollider type="trimesh">
            <group scale={norm.scale} position={norm.pos as any}>
              {scene && <primitive object={scene} />}
            </group>
          </MeshCollider>
        </RigidBody>
      )}
    </>
  );
}
useGLTF.preload('/models/island.glb');
