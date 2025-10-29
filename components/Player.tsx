import * as THREE from 'three';
import { useFrame, useThree } from '@react-three/fiber';
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { useRapier, RigidBody, CapsuleCollider, RapierRigidBody } from '@react-three/rapier';
import { Html } from '@react-three/drei';

/** -------------------- Player (first-person controller) -------------------- */

// Simple keyboard state
const keys = { w: false, a: false, s: false, d: false, space: false, e: false };
const onKeyDown = (e: KeyboardEvent) => {
  const k = e.key.toLowerCase();
  if (k in keys) (keys as any)[k] = true;
  if (e.code === 'Space') keys.space = true;
  if (k === 'e') keys.e = true;
};
const onKeyUp = (e: KeyboardEvent) => {
  const k = e.key.toLowerCase();
  if (k in keys) (keys as any)[k] = false;
  if (e.code === 'Space') keys.space = false;
  if (k === 'e') keys.e = false;
};

export default function Player({
  spawnY,
  controlsRef,
  onInteract,
}: {
  spawnY: number;
  controlsRef: React.RefObject<any>;
  onInteract: (nearest: string | null) => void;
}) {
  const body = useRef<RapierRigidBody>(null);
  const { camera } = useThree();
  const { rapier, world } = useRapier();

  const height = 1.6, radius = 0.35, speed = 3.4, jumpVel = 5.2;

  const [near, setNear] = useState<string | null>(null);
  const interactTargets = useMemo(
    () => [
      { id: 'resume',   pos: new THREE.Vector3(-0.8, 0.2,  0.2) },
      { id: 'articles', pos: new THREE.Vector3( 0.7, 0.2,  0.0) },
      { id: 'projects', pos: new THREE.Vector3( 0.1, 0.2, -0.7) },
    ],
    []
  );

  useEffect(() => {
    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('keyup', onKeyUp);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('keyup', onKeyUp);
    };
  }, []);

  // spawn above island
  useLayoutEffect(() => {
    if (body.current) {
      body.current.setTranslation({ x: 0, y: spawnY + 0.6, z: 2 }, true);
      body.current.setLinvel({ x: 0, y: 0, z: 0 }, true);
    }
  }, [spawnY]);

  useFrame(() => {
    if (!body.current) return;

    const t = body.current.translation();

    // let OrbitControls handle rotation; we just follow the player
    if (controlsRef.current) {
      controlsRef.current.target.set(t.x, t.y + 0.9, t.z);
      controlsRef.current.update();
    }

    // Move relative to camera facing
    const forward = new THREE.Vector3();
    camera.getWorldDirection(forward); forward.y = 0; forward.normalize();
    const right = new THREE.Vector3().crossVectors(forward, new THREE.Vector3(0,1,0)).negate();

    const dir = new THREE.Vector3();
    if (keys.w) dir.add(forward);
    if (keys.s) dir.sub(forward);
    if (keys.a) dir.sub(right);
    if (keys.d) dir.add(right);
    if (dir.lengthSq() > 0) dir.normalize().multiplyScalar(speed);

    const vel = body.current.linvel();
    body.current.setLinvel({ x: dir.x, y: vel.y, z: dir.z }, true);

    // Ground check
    const Ray = rapier.Ray;
    const ray = new Ray({ x: t.x, y: t.y, z: t.z }, { x: 0, y: -1, z: 0 });
    const hit = world.castRay(ray, 0.25 + radius + 0.05, true);
    const grounded = !!hit && hit.toi < 0.3;
    if (grounded && keys.space) body.current.setLinvel({ x: vel.x, y: jumpVel, z: vel.z }, true);

    // Proximity
    let nearest: string | null = null;
    let minD = 1.0;
    for (const a of interactTargets) {
      const d = a.pos.distanceTo(new THREE.Vector3(t.x, 0, t.z));
      if (d < minD) { minD = d; nearest = a.id; }
    }
    setNear(nearest);
    if (nearest && keys.e) onInteract(nearest);
  });

  return (
    <RigidBody
      ref={body}
      colliders={false}
      mass={60}
      enabledRotations={[false, false, false]}
      linearDamping={0.2}
      friction={0.0}
    >
      <CapsuleCollider args={[height / 2, radius]} />
      <mesh visible={false}>
        <capsuleGeometry args={[radius, height, 8, 16]} />
        <meshNormalMaterial />
      </mesh>
      <Html occlude style={{ pointerEvents: 'none' }}>
        <div style={{ position:'absolute', top:-28, left:-20, fontSize:12 }}>
          {near ? `Press E to open ${near}` : ''}
        </div>
      </Html>
    </RigidBody>
  );
}
