import { Billboard, Text, Float, Sparkles } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useRef } from 'react';
import { HOTSPOTS } from './hotspots';

export default function HotspotMeshes({
  center = [0, 0],
  topY = 2,
}: {
  center?: [number, number];
  topY?: number;
}) {
  return (
    <group>
      {HOTSPOTS.map((h) => {
        const [cx, cz] = center;
        const x = (h.offset?.[0] ?? 0) + cx;
        const z = (h.offset?.[1] ?? 0) + cz;
        const y = topY + (h.y ?? 0.02 );
        return (
          <Hotspot3D
            key={h.id}
            label={h.label ?? h.id ?? 'Resume'}
            position={[x, y, z]}
          />
        );
      })}
    </group>
  );
}

function Hotspot3D({
  position,
  label = 'Resume',
}: {
  position: [number, number, number];
  label?: string;
}) {
  const group = useRef<THREE.Group>(null!);
  const ringMat = useRef<THREE.MeshStandardMaterial>(null!);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (group.current) group.current.position.y = position[1] + Math.sin(t * 1.2) * 0.05;
    if (ringMat.current) ringMat.current.emissiveIntensity = 0.7 + Math.sin(t * 3) * 0.4;
  });

  return (
    <group ref={group} position={position}>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]}>
        <ringGeometry args={[0.42, 0.6, 48]} />
        <meshStandardMaterial
          ref={ringMat}
          color="#0ea5a7"
          emissive="#34d399"
          emissiveIntensity={1.2}
          transparent
          opacity={0.9}
        />
      </mesh>

      <mesh position={[0, 0.25, 0]}>
        <cylinderGeometry args={[0.07, 0.09, 0.5, 6]} />
        <meshStandardMaterial color="#8b5a2b" roughness={1} />
      </mesh>

      <Billboard follow position={[0, 0.45, 0]}>
        <Float speed={1} floatIntensity={0.4} rotationIntensity={0.1}>
          <mesh>
            <circleGeometry args={[0.6, 48]} />
            <meshBasicMaterial color="#0ea5a7" transparent opacity={0.12} />
          </mesh>

          <mesh position={[0, 0, 0.02]}>
            <boxGeometry args={[1.6, 0.5, 0.06]} />
            <meshStandardMaterial color="#0b1322" metalness={0.1} roughness={0.85} />
          </mesh>

          <Text
            position={[0, 0, 0.06]}
            fontSize={0.26}
            letterSpacing={0.02}
            outlineWidth={0.02}
            outlineColor="#34d399"
            anchorX="center"
            anchorY="middle"
          >
            {label}
          </Text>

          <Sparkles count={8} scale={0.9} size={2} speed={0.2} color="#a7f3d0" />
        </Float>
      </Billboard>

      <pointLight color="#34d399" intensity={1.2} distance={3.5} decay={2} position={[0, 0.5, 0]} />
    </group>
  );
}
