"use client";

import { Canvas, useFrame } from '@react-three/fiber';
import { Suspense, useRef } from 'react';
import { Group, Mesh } from 'three';

function FloatingMandala() {
  const meshRef = useRef<Mesh>(null);
  const groupRef = useRef<Group>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.z += 0.005;
    }
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.002;
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, -5]}>
      <mesh ref={meshRef}>
        <torusGeometry args={[2, 0.1, 16, 100]} />
        <meshBasicMaterial color="#FF9933" transparent opacity={0.1} />
      </mesh>
      <mesh rotation={[0, 0, Math.PI / 4]}>
        <torusGeometry args={[1.5, 0.05, 16, 100]} />
        <meshBasicMaterial color="#FFD700" transparent opacity={0.15} />
      </mesh>
      <mesh rotation={[0, 0, Math.PI / 2]}>
        <torusGeometry args={[1, 0.03, 16, 100]} />
        <meshBasicMaterial color="#138808" transparent opacity={0.1} />
      </mesh>
    </group>
  );
}

function FloatingParticles() {
  const particlesRef = useRef<Group>(null);

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.children.forEach((child, index) => {
        const mesh = child as Mesh;
        mesh.position.y += Math.sin(state.clock.elapsedTime + index) * 0.001;
        mesh.rotation.x += 0.01;
        mesh.rotation.y += 0.01;
      });
    }
  });

  return (
    <group ref={particlesRef}>
      {Array.from({ length: 20 }).map((_, i) => (
        <mesh
          key={i}
          position={[
            (Math.random() - 0.5) * 20,
            (Math.random() - 0.5) * 20,
            (Math.random() - 0.5) * 10
          ]}
        >
          <sphereGeometry args={[0.05, 8, 8]} />
          <meshBasicMaterial
            color={['#FF9933', '#FFD700', '#138808', '#4B0082'][Math.floor(Math.random() * 4)]}
            transparent
            opacity={0.6}
          />
        </mesh>
      ))}
    </group>
  );
}

export function AnimatedBackground() {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
        <Suspense fallback={null}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} />
          <FloatingMandala />
          <FloatingParticles />
        </Suspense>
      </Canvas>
      
      {/* Traditional pattern overlay */}
      <div className="absolute inset-0 opacity-5">
        <div 
          className="w-full h-full"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23FF9933' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3Ccircle cx='10' cy='10' r='2'/%3E%3Ccircle cx='50' cy='10' r='2'/%3E%3Ccircle cx='10' cy='50' r='2'/%3E%3Ccircle cx='50' cy='50' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: '60px 60px'
          }}
        />
      </div>
    </div>
  );
}