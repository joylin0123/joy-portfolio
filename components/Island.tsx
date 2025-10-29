'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { Html, useGLTF } from '@react-three/drei';
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
  targetSize = 48,
}: {
  onReady?: (topY: number) => void;
  targetSize?: number;
}) {
  const { scene } = useGLTF('/models/island.glb');
  scene.traverse((o: any) => {
    if ((o as any).isCamera || (o as any).isLight) o.parent?.remove(o);
  });

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
      {/* Collider must wrap the geometry it bakes from */}
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
const keys = { w:false, a:false, s:false, d:false, space:false, e:false };
const down = (e: KeyboardEvent) => {
  const k = e.key.toLowerCase();
  if (k in keys) (keys as any)[k] = true;
  if (e.code === 'Space') keys.space = true;
};
const up = (e: KeyboardEvent) => {
  const k = e.key.toLowerCase();
  if (k in keys) (keys as any)[k] = false;
  if (e.code === 'Space') keys.space = false;
};

/* -------------------- Player: smaller capsule + chase camera -------------------- */
function Player({
  spawnY,
  onInteract,
  cameraRef,
}: {
  spawnY: number;
  onInteract: (nearest: string | null) => void;
  cameraRef: React.RefObject<THREE.PerspectiveCamera>;
}) {
  const body = useRef<any>(null);
  const { rapier, world } = useRapier();
  const cam = cameraRef;

  const height = 1.2;    
  const radius = 0.3;
  const walkSpeed = 4.0;  // slightly faster because island is larger
  const turnSpeed = 2.2;
  const jumpVel = 5.2;

  const yaw = useRef(0);

  const [near, setNear] = useState<string|null>(null);
  const interactTargets = useMemo(() => ([
    { id:'resume',   pos: new THREE.Vector3(-2.4, 0.2,  0.5) },
    { id:'articles', pos: new THREE.Vector3( 2.1, 0.2,  0.6) },
    { id:'projects', pos: new THREE.Vector3( 0.2, 0.2, -2.2) },
  ]), []);

  useEffect(() => {
    window.addEventListener('keydown', down);
    window.addEventListener('keyup', up);
    return () => {
      window.removeEventListener('keydown', down);
      window.removeEventListener('keyup', up);
    };
  }, []);

    //   const spawnPos = useMemo(() => [0, spawnY + 0.6, 4] as [number, number, number], [spawnY]);
    // was: [0, spawnY + 0.6, 4]
const spawnPos = useMemo(
  () => [0, spawnY + 0.6, 0] as [number, number, number],
  [spawnY]
);


  useFrame((_, dt) => {
    if (!body.current) return;
    const t = body.current.translation();

    // keyboard yaw
    if (keys.a) yaw.current += turnSpeed * dt;
    if (keys.d) yaw.current -= turnSpeed * dt;

    // forward from yaw
    const forward = new THREE.Vector3(Math.sin(yaw.current), 0, Math.cos(yaw.current)).normalize();

    // move
    let vx = 0, vz = 0;
    if (keys.w) { vx += forward.x * walkSpeed; vz += forward.z * walkSpeed; }
    if (keys.s) { vx -= forward.x * walkSpeed; vz -= forward.z * walkSpeed; }
    const vel = body.current.linvel();
    body.current.setLinvel({ x: vx, y: vel.y, z: vz }, true);

    // ground check
    const Ray = rapier.Ray;
    const ray = new Ray({ x:t.x, y:t.y, z:t.z }, { x:0, y:-1, z:0 });
    const hit = world.castRay(ray, 0.25 + radius + 0.05, true);
    const grounded = !!hit && hit.toi < 0.3;
    if (grounded && keys.space) body.current.setLinvel({ x: vel.x, y: jumpVel, z: vel.z }, true);

    // ⬇️ Camera farther back & a bit higher so avatar isn't huge
    const boom = new THREE.Vector3(0, 1.6, 7.5); // [right, up, back]
    const rotY = new THREE.Matrix4().makeRotationY(-yaw.current);
    const worldOffset = boom.clone().applyMatrix4(rotY);
    const camPos = new THREE.Vector3(t.x, t.y, t.z).add(worldOffset);
    if (cam.current) {
      cam.current.position.lerp(camPos, 1 - Math.pow(0.001, dt));
      cam.current.lookAt(t.x, t.y + 0.9, t.z);
    }

    // interactions
    let nearest: string|null = null, minD = 1.2;
    for (const a of interactTargets) {
      const d = a.pos.distanceTo(new THREE.Vector3(t.x, 0, t.z));
      if (d < minD) { minD = d; nearest = a.id; }
    }
    setNear(nearest);
    if (nearest && (keys as any).e) onInteract(nearest);
  });

  return (
    <RigidBody
      ref={body}
      colliders={false}
      mass={60}
      position={spawnPos}
      enabledRotations={[false, false, false]}
      linearDamping={0.2}
      friction={0.0}
    >
      <CapsuleCollider args={[height / 2, radius]} />
      {/* visible avatar (now smaller) */}
      <mesh rotation={[0, yaw.current, 0]}>
        <capsuleGeometry args={[radius, height, 12, 24]} />
        <meshStandardMaterial color="#f5f5f5" />
      </mesh>

      <Html occlude style={{ pointerEvents:'none' }}>
        <div style={{ position:'absolute', top:-28, left:-20, fontSize:12 }}>
          {near ? `Press E to open ${near}` : ''}
        </div>
      </Html>
    </RigidBody>
  );
}

/* -------------------- Main scene -------------------- */
export default function Island() {
  const [panel, setPanel] = useState<string|null>(null);
  const [spawnY, setSpawnY] = useState<number|null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera>(null);

  return (
    <div style={{ height: '100vh' }}>
      <Canvas
        camera={{ position: [0, 4, 12], fov: 55 }}  // ⬅️ start farther back & slightly wider FOV
        dpr={[1, 1.5]}
        gl={{ antialias:false, powerPreference:'high-performance', preserveDrawingBuffer:false }}
        onCreated={({ camera }) => { cameraRef.current = camera as THREE.PerspectiveCamera; }}
      >
        <color attach="background" args={['#0b0f1a']} />
        <ambientLight intensity={0.35} />
        <hemisphereLight intensity={0.9} groundColor="#213" />
        <directionalLight position={[6, 10, 6]} intensity={1.6} />

        <Suspense fallback={null}>
          <Physics gravity={[0, -12, 0]}>
            <IslandModel onReady={(topY) => setSpawnY(Math.max(2, topY + 0.3))} />
            {spawnY !== null && (
              <Player
                key={`spawn-${spawnY}`}
                spawnY={spawnY}
                onInteract={(id) => {
                  if (id === 'resume') setPanel('/resume');
                  if (id === 'articles') setPanel('/articles');
                  if (id === 'projects') setPanel('/projects');
                }}
                cameraRef={cameraRef}
              />
            )}

            {/* safety floor (debug) */}
            <RigidBody type="fixed">
              <mesh position={[0, -0.05, 0]}>
                <boxGeometry args={[120, 0.1, 120]} />
                <meshStandardMaterial color="#153247" />
              </mesh>
            </RigidBody>
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
