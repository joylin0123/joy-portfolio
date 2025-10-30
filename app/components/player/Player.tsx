import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Html } from '@react-three/drei';
import { CapsuleCollider, RigidBody, useRapier } from '@react-three/rapier';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import KirbyAvatar from '../avatar/KirbyAvatar';
import { keys, onDown, onUp } from './keyboard';
import { HOTSPOTS, INTERACT_RADIUS } from '../world/hotspots';

const WATER_LEVEL = 0.15;      // y-height of water surface in your model
const STEP_HEIGHT = 0.6;       // max ledge height we auto-step up
const PROBE_AHEAD = 0.6;       // how far ahead to look for a step (meters)

type Props = {
  spawn: [number, number, number];
  waterLevel: number;
  cameraRef: React.RefObject<THREE.PerspectiveCamera>;
  canvasRef: React.RefObject<HTMLCanvasElement>;
  onInteract: (nearest: string | null) => void;
};


export default function Player({
  spawn: [_, spawnY],
  cameraRef,
  canvasRef,
  onInteract,
}: Props) {
  const body = useRef<any>(null);
  const { rapier, world } = useRapier();

  // physics size
  const height = 0.8;
  const radius = 0.20;

  // movement
  const walkSpeed = 5.2;
  const swimSpeed = 2.6;       // slower in water
  const jumpVel   = 7.0;       // stronger jump so ledge is reachable

  // mouse-look
  const yaw = useRef(0), pitch = useRef(0);
  const locked = useRef(false);
  const SENS = 0.0025, PITCH_MIN = -0.9, PITCH_MAX = 0.9;

  // interact demo points (adjust to your map)
  const [near, setNear] = useState<string|null>(null);
  const interactTargets = useMemo(
    () => HOTSPOTS.map(h => ({ id: h.id, pos: new THREE.Vector3(...h.pos) })),
    []
  );

  useEffect(() => {
    window.addEventListener('keydown', onDown);
    window.addEventListener('keyup', onUp);
    return () => { window.removeEventListener('keydown', onDown); window.removeEventListener('keyup', onUp); };
  }, []);

  // pointer lock wiring
  useEffect(() => {
    const el = canvasRef.current;
    if (!el) return;
    const handleClick = () => el.requestPointerLock();
    const handleMove = (e: MouseEvent) => {
      if (!locked.current) return;
      yaw.current   -= e.movementX * SENS;
      pitch.current -= e.movementY * SENS;
      pitch.current = Math.max(PITCH_MIN, Math.min(PITCH_MAX, pitch.current));
    };
    const handleLockChange = () => { locked.current = document.pointerLockElement === el; };
    el.addEventListener('click', handleClick);
    document.addEventListener('mousemove', handleMove);
    document.addEventListener('pointerlockchange', handleLockChange);
    return () => {
      el.removeEventListener('click', handleClick);
      document.removeEventListener('mousemove', handleMove);
      document.removeEventListener('pointerlockchange', handleLockChange);
    };
  }, [canvasRef]);

  // spawn on land center
  const spawnPos = useMemo(() => [0, spawnY + 0.6, 0] as [number, number, number], [spawnY]);

  useFrame((_, dt) => {
    if (!body.current || !cameraRef.current) return;

    const t = body.current.translation();

    // basis from yaw
    const forward = new THREE.Vector3(Math.sin(yaw.current), 0, Math.cos(yaw.current)).normalize();
    const right   = new THREE.Vector3().crossVectors(forward, new THREE.Vector3(0,1,0)).negate();

    // WASD
    const dir = new THREE.Vector3();
    if (keys.w) dir.add(forward);
    if (keys.s) dir.sub(forward);
    if (keys.d) dir.add(right);
    if (keys.a) dir.sub(right);
    if (dir.lengthSq() > 0) dir.normalize();

    const vel = body.current.linvel();

    // detect water vs land
    const inWater = t.y < WATER_LEVEL + 0.05;

    // --- movement + jump ---
    if (inWater) {
      // swim: slow horizontal, buoyancy + space = strong upward kick
      const target = dir.multiplyScalar(swimSpeed);
      body.current.setLinvel({ x: target.x, y: vel.y, z: target.z }, true);

      // buoyancy toward the surface
      const buoy = (WATER_LEVEL + 0.25 - t.y) * 8.0; // proportional
      const vy   = THREE.MathUtils.clamp(vel.y + buoy * dt, -3.0, 4.0);
      body.current.setLinvel({ x: vel.x, y: vy, z: vel.z }, true);

      if (keys.space) body.current.setLinvel({ x: vel.x, y: 5.0, z: vel.z }, true);
    } else {
      // on ground or in air
      const speed = walkSpeed;
      const hv = dir.multiplyScalar(speed);
      body.current.setLinvel({ x: hv.x, y: vel.y, z: hv.z }, true);

      // ground check (longer ray so it still works near edges)
      const Ray = rapier.Ray;
      const ray = new Ray({ x:t.x, y:t.y, z:t.z }, { x:0, y:-1, z:0 });
      const hit = world.castRay(ray, radius + 0.8, true);
      const grounded = !!hit && hit.timeOfImpact < 0.6;

      // jump
      if (grounded && keys.space) {
        body.current.setLinvel({ x: vel.x, y: jumpVel, z: vel.z }, true);
      }

      // step-up assist: look a little ahead; if there’s ground just above us (≤ STEP_HEIGHT),
      // snap up so small ledges are walkable.
      const probeOrigin = { x: t.x + forward.x * PROBE_AHEAD, y: t.y + 1.0, z: t.z + forward.z * PROBE_AHEAD };
      const probe = new Ray(probeOrigin, { x:0, y:-1, z:0 });
      const hit2 = world.castRay(probe, 2.0, true);
      if (hit2) {
        const groundY = probeOrigin.y - hit2.timeOfImpact;
        const delta   = groundY - t.y;
        if (delta > 0.08 && delta < STEP_HEIGHT) {
          body.current.setTranslation({ x: t.x, y: groundY + 0.02, z: t.z }, true);
        }
      }
    }

    // camera (mouse-look third-person)
    const r = 7.5;
    const head = 0.9;
    const cosP = Math.cos(pitch.current), sinP = Math.sin(pitch.current);
    const offset = new THREE.Vector3(
      r * Math.sin(yaw.current) * cosP,
      r * sinP + 1.6,
      r * Math.cos(yaw.current) * cosP
    );
    const camPos = new THREE.Vector3(t.x, t.y + head, t.z).add(offset);
    cameraRef.current.position.lerp(camPos, 1 - Math.pow(0.001, dt));
    cameraRef.current.lookAt(t.x, t.y + head, t.z);

    let nearest: string|null = null, minD = INTERACT_RADIUS;
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
      friction={0.0}
    >
      <CapsuleCollider args={[height / 2, radius]} />
      <KirbyAvatar yawRef={yaw} targetHeight={height} />
    </RigidBody>
  );
}
