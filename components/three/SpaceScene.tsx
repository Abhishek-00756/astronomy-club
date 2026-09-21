"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Stars, Float } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";

function OrbitalSystem() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!groupRef.current) return;

    groupRef.current.rotation.y =
      state.clock.elapsedTime * 0.06;

    groupRef.current.rotation.z =
      Math.sin(state.clock.elapsedTime * 0.2) * 0.03;
  });

  return (
    <group
  ref={groupRef}
  position={[0, -3.2, -3.5]}
  rotation={[0.25, 0, 0]}
>
      {/* Main orbit */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[4.5, 0.012, 16, 256]} />
        <meshBasicMaterial
          color="#55d9ff"
          transparent
          opacity={0.28}
        />
      </mesh>

      {/* Secondary orbit */}
      <mesh rotation={[Math.PI / 2.15, 0.4, 0.15]}>
        <torusGeometry args={[3.2, 0.008, 16, 256]} />
        <meshBasicMaterial
          color="#8ae8ff"
          transparent
          opacity={0.16}
        />
      </mesh>

      {/* Central object */}
      <Float
        speed={0.8}
        rotationIntensity={0.15}
        floatIntensity={0.3}
      >
        <mesh position={[0, 0, 0]}>
          <sphereGeometry args={[0.48, 64, 64]} />

          <meshStandardMaterial
            color="#050505"
            roughness={0.35}
            metalness={0.8}
            emissive="#0b2633"
            emissiveIntensity={0.5}
          />
        </mesh>
      </Float>
    </group>
  );
}

function CameraRig() {
  useFrame((state) => {
    const targetX = state.pointer.x * 0.35;
    const targetY = state.pointer.y * 0.18;

    state.camera.position.x = THREE.MathUtils.lerp(
      state.camera.position.x,
      targetX,
      0.025
    );

    state.camera.position.y = THREE.MathUtils.lerp(
      state.camera.position.y,
      targetY,
      0.025
    );

    state.camera.lookAt(0, -0.4, -1);
  });

  return null;
}

function SpaceObjects() {
  return (
    <>
      <Stars
  radius={120}
  depth={80}
  count={6000}
  factor={3.2}
  saturation={0}
  fade
  speed={0.15}
/>

      <OrbitalSystem />

      {/* Soft distant light */}
      <pointLight
        position={[0, 2, -4]}
        intensity={7}
        distance={20}
        color="#8deaff"
      />

      <pointLight
        position={[-4, 1, 1]}
        intensity={3}
        distance={15}
        color="#3b7cff"
      />
    </>
  );
}

export default function SpaceScene() {
  return (
    <div className="absolute inset-0">
      <Canvas
        camera={{
          position: [0, 0, 8],
          fov: 50,
          near: 0.1,
          far: 200,
        }}
        dpr={[1, 1.75]}
      >
        <color attach="background" args={["#05070A"]} />

        <ambientLight intensity={0.25} />

        <SpaceObjects />

        <CameraRig />
      </Canvas>
    </div>
  );
}