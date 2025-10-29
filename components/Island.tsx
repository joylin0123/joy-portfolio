'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { Html, OrbitControls, Environment, useGLTF } from '@react-three/drei';
import { JSX, useRef, useState } from 'react';
import * as THREE from 'three';

function IslandModel(props: JSX.IntrinsicElements['group']) {
  const { scene } = useGLTF('/models/island.glb');
  return <primitive object={scene} {...props} />;
}

useGLTF.preload('/models/island.glb');

function Hotspot({
  position = [0,0,0],
  label,
  onClick,
}: { position: [number,number,number], label: string, onClick: () => void }) {
  const ref = useRef<THREE.Mesh>(null!);
  useFrame(({ clock }) => {
    if (!ref.current) return;
    ref.current.position.y = position[1] + Math.sin(clock.getElapsedTime()*2)*0.03;
  });
  return (
    <group position={position as any} onClick={onClick}>
      <mesh ref={ref}>
        <sphereGeometry args={[0.08, 32, 32]} />
        <meshStandardMaterial emissive="#66ccff" emissiveIntensity={2} color="#111" />
      </mesh>
      <Html distanceFactor={8} position={[0,0.25,0]} center>
        <div style={{
          padding: '4px 8px', borderRadius: 999,
          background: 'rgba(0,0,0,0.55)', border: '1px solid rgba(255,255,255,0.15)',
          fontSize: 12
        }}>
          {label}
        </div>
      </Html>
    </group>
  );
}

function Panel({
  url, onClose,
  position = [0,1,0]
}: { url: string; onClose: () => void; position?: [number,number,number] }) {
  // Use Html to embed a DOM panel that stays legible.
  return (
    <Html position={position} transform distanceFactor={4}>
      <div style={{
        width: 640, height: 380, background: 'rgba(20,24,36,0.9)',
        border: '1px solid rgba(255,255,255,0.15)', borderRadius: 16, overflow: 'hidden'
      }}>
        <div style={{display:'flex', justifyContent:'space-between', padding:'8px 12px', fontSize: 12, background:'rgba(255,255,255,0.04)'}}>
          <span>{url}</span>
          <button onClick={onClose} style={{opacity:.8}}>Close</button>
        </div>
        <iframe src={url} style={{width:'100%', height:'calc(100% - 34px)', border:'none'}} />
      </div>
    </Html>
  );
}

export default function Island() {
  const [panel, setPanel] = useState<string | null>(null);
  return (
    <div style={{ height: '75vh' }}>
      <Canvas
            camera={{ position: [0, 1.6, 4.5], fov: 50 }}
            dpr={[1, 1.5]}                             
            gl={{ powerPreference: 'high-performance' }}    // ask for faster context
            onCreated={({ gl }) => {
              gl.domElement.addEventListener('webglcontextlost', (e) => e.preventDefault());
            }}
          >
        <ambientLight intensity={0.6} />
        <directionalLight position={[5,5,5]} intensity={1.2} />
        <IslandModel position={[0,-0.5,0]} />

        <Hotspot label="Resume"   position={[ -0.8, 0.2,  0.2]} onClick={() => setPanel('/resume')} />
        <Hotspot label="Articles" position={[  0.7, 0.25, 0.0]} onClick={() => setPanel('/articles')} />
        <Hotspot label="Projects" position={[  0.1, 0.15,-0.7]} onClick={() => setPanel('/projects')} />

        {panel && <Panel url={panel} onClose={() => setPanel(null)} position={[0,1.2,0]} />}

        <OrbitControls enablePan={false} minDistance={3} maxDistance={8} />
      </Canvas>
    </div>
  );
}
