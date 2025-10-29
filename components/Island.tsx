'use client';

import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Html, OrbitControls, useGLTF } from '@react-three/drei';
import {
  Physics,
  RigidBody,
  CapsuleCollider,
  MeshCollider,
  useRapier,
} from '@react-three/rapier';
import { Suspense, useEffect, useMemo, useRef, useState } from 'react';
import * as THREE from 'three';

/* -------------------- Island (render + collider + normalization) -------------------- */
function IslandModel({
  onReady,
  targetSize = 6,
}: {
  onReady?: (topY: number) => void;
  targetSize?: number;
}) {
  const { scene } = useGLTF('/models/island.glb');

  // Clean up cameras/lights that might ship with the GLB
  scene.traverse((o: any) => {
    if ((o as any).isCamera || (o as any).isLight) o.parent?.remove(o);
  });

  // Center, put bottom on y=0, scale to target size
  const norm = useMemo(() => {
    const box = new THREE.Box3().setFromObject(scene);
    const size = box.getSize(new THREE.Vector3());
    const center = box.getCenter(new THREE.Vector3());
    const scale = targetSize / Math.max(size.x || 1, size.z || 1);
    const pos = new THREE.Vector3(-center.x * scale, -box.min.y * scale, -center.z * scale);
    const topY = (size.y || 1) * scale;
    return { scale, pos, topY };
  }, [scene, targetSize]);

  useEffect(() => { onReady?.(norm.topY); }, [norm.topY, onReady]);

  return (
    <RigidBody type="fixed" colliders={false}>
      {/* IMPORTANT: MeshCollider wraps the geometry it bakes from */}
      <MeshCollider type="trimesh">
        <group scale={norm.scale} position={norm.pos as any}>
          <primitive object={scene} />
        </group>
      </MeshCollider>
    </RigidBody>
  );
}
useGLTF.preload('/models/island.glb');

/* -------------------- Keyboard state -------------------- */
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

/* -------------------- Player (OrbitControls handles rotation) -------------------- */
function Player({
  spawnY,
  controlsRef,
  onInteract,
}: {
  spawnY: number;                            // we mount only after we have this
  controlsRef: React.RefObject<any>;
  onInteract: (nearest: string | null) => void;
}) {
  const body = useRef<any>(null);
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

  useFrame(() => {
    if (!body.current) return;

    const t = body.current.translation();

    // Keep OrbitControls target on the player so you can rotate around with mouse
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

    // Interactions
    let nearest: string | null = null;
    let minD = 1.0;
    for (const a of interactTargets) {
      const d = a.pos.distanceTo(new THREE.Vector3(t.x, 0, t.z));
      if (d < minD) { minD = d; nearest = a.id; }
    }
    setNear(nearest);
    if (nearest && keys.e) onInteract(nearest);
  });

  // IMPORTANT: give the initial spawn via the `position` prop.
  const spawnPos = useMemo(() => [0, spawnY + 0.6, 2] as [number, number, number], [spawnY]);

  return (
    <RigidBody
      ref={body}
      colliders={false}
      mass={60}
      position={spawnPos}                     // ← initial spawn here, not in an effect
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

/* -------------------- Main scene -------------------- */
export default function Island() {
  const [panel, setPanel] = useState<string | null>(null);
  const [spawnY, setSpawnY] = useState<number | null>(null); // wait for island height
  const controls = useRef<any>(null);

  return (
    <div style={{ height: '100vh' }}>
      <Canvas
        camera={{ position: [0, 2.2, 6], fov: 50 }}
        dpr={[1, 1.5]}
        gl={{ antialias: false, powerPreference: 'high-performance', preserveDrawingBuffer: false }}
      >
        <color attach="background" args={['#0b0f1a']} />
        <ambientLight intensity={0.25} />
        <hemisphereLight intensity={0.8} groundColor="#222" />
        <directionalLight position={[6, 8, 6]} intensity={1.6} />

        <Suspense fallback={null}>
          <Physics gravity={[0, -12, 0]}>
            <IslandModel onReady={(topY) => setSpawnY(Math.max(2, topY + 0.3))} />
            {spawnY !== null && (
              <Player
                key={`spawn-${spawnY}`}          // ensure a clean mount when spawnY changes
                spawnY={spawnY}
                controlsRef={controls}
                onInteract={(id) => {
                  if (id === 'resume') setPanel('/resume');
                  if (id === 'articles') setPanel('/articles');
                  if (id === 'projects') setPanel('/projects');
                }}
              />
            )}

            {/* Safety floor (debug) */}
            <RigidBody type="fixed">
              <mesh position={[0, -0.05, 0]}>
                <boxGeometry args={[50, 0.1, 50]} />
                <meshStandardMaterial color="#1e293b" />
              </mesh>
            </RigidBody>
          </Physics>
        </Suspense>

        <OrbitControls
          ref={controls}
          enablePan={false}
          enableDamping
          dampingFactor={0.08}
          minDistance={2.5}
          maxDistance={10}
        />
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
