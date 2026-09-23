"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Stars } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";

function Astronaut() {
  const groupRef = useRef<THREE.Group>(null);
  const { viewport } = useThree();

  useFrame((state) => {
    if (!groupRef.current) return;

    const narrow = viewport.width < 7;
    const baseX = narrow ? 0.85 : 2.05;
    const baseY = narrow ? -1.55 : -0.52;
    const targetX = baseX + state.pointer.x * (narrow ? 0.16 : 0.32);
    const targetY = baseY + state.pointer.y * (narrow ? 0.08 : 0.16);

    groupRef.current.position.x = THREE.MathUtils.lerp(
      groupRef.current.position.x,
      targetX,
      0.035
    );

    groupRef.current.position.y = THREE.MathUtils.lerp(
      groupRef.current.position.y,
      targetY,
      0.035
    );

    groupRef.current.rotation.y = THREE.MathUtils.lerp(
      groupRef.current.rotation.y,
      targetX * 0.65,
      0.04
    );

    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x,
      -targetY * 0.45,
      0.04
    );

    groupRef.current.rotation.z = THREE.MathUtils.lerp(
      groupRef.current.rotation.z,
      state.pointer.x * 0.06,
      0.025
    );
  });

  return (
    <group ref={groupRef} position={[2.05, -0.52, -0.6]} rotation={[0.02, -0.18, 0.05]} scale={0.98}>
      {/* Helmet */}
      <Float speed={0.8} rotationIntensity={0.04} floatIntensity={0.28}>
        <group position={[0, 1.25, 0]}>
          <mesh>
            <sphereGeometry args={[0.57, 48, 48]} />
            <meshStandardMaterial
              color="#e8ecef"
              roughness={0.48}
              metalness={0.12}
            />
          </mesh>

          {/* Visor */}
          <mesh position={[0, 0.02, 0.49]} scale={[0.78, 0.72, 0.36]}>
            <sphereGeometry args={[0.44, 48, 32]} />
            <meshStandardMaterial
              color="#07111b"
              roughness={0.16}
              metalness={0.58}
              emissive="#0a2437"
              emissiveIntensity={0.45}
            />
          </mesh>

          {/* Helmet rim */}
          <mesh position={[0, -0.08, 0.14]} rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[0.49, 0.035, 16, 48]} />
            <meshStandardMaterial
              color="#b9c2c8"
              roughness={0.34}
              metalness={0.36}
            />
          </mesh>

          {/* Side communication pods */}
          <mesh position={[-0.55, 0.02, 0.02]}>
            <cylinderGeometry args={[0.11, 0.11, 0.2, 20]} />
            <meshStandardMaterial
              color="#aeb8bf"
              roughness={0.42}
              metalness={0.3}
            />
          </mesh>

          <mesh position={[0.55, 0.02, 0.02]}>
            <cylinderGeometry args={[0.11, 0.11, 0.2, 20]} />
            <meshStandardMaterial
              color="#aeb8bf"
              roughness={0.42}
              metalness={0.3}
            />
          </mesh>
        </group>
      </Float>

      {/* Torso */}
      <mesh position={[0, 0.35, 0]}>
        <boxGeometry args={[1.05, 1.45, 0.62]} />
        <meshStandardMaterial
          color="#d9dee2"
          roughness={0.58}
          metalness={0.08}
        />
      </mesh>

      {/* Chest panel */}
      <mesh position={[0, 0.42, 0.34]}>
        <boxGeometry args={[0.52, 0.48, 0.055]} />
        <meshStandardMaterial
          color="#202a32"
          roughness={0.4}
          metalness={0.48}
        />
      </mesh>

      <mesh position={[0, 0.56, 0.38]}>
        <boxGeometry args={[0.1, 0.08, 0.03]} />
        <meshBasicMaterial color="#67ddff" />
      </mesh>

      <mesh position={[0.16, 0.56, 0.38]}>
        <boxGeometry args={[0.1, 0.08, 0.03]} />
        <meshBasicMaterial color="#f4c86a" />
      </mesh>

      {/* Backpack */}
      <mesh position={[0, 0.45, -0.46]}>
        <boxGeometry args={[0.72, 1.18, 0.32]} />
        <meshStandardMaterial
          color="#c4cbd0"
          roughness={0.58}
          metalness={0.1}
        />
      </mesh>

      {/* Arms */}
      <group position={[-0.78, 0.45, 0]}>
        <mesh rotation={[0, 0, -0.18]}>
          <capsuleGeometry args={[0.18, 0.68, 8, 20]} />
          <meshStandardMaterial
            color="#d8dde1"
            roughness={0.58}
            metalness={0.08}
          />
        </mesh>

        <mesh position={[-0.1, -0.58, 0]}>
          <sphereGeometry args={[0.2, 28, 28]} />
          <meshStandardMaterial
            color="#c0c8cd"
            roughness={0.6}
            metalness={0.12}
          />
        </mesh>

        <mesh position={[-0.12, -0.77, 0]}>
          <boxGeometry args={[0.32, 0.3, 0.28]} />
          <meshStandardMaterial
            color="#e0e4e7"
            roughness={0.55}
            metalness={0.08}
          />
        </mesh>
      </group>

      <group position={[0.78, 0.45, 0]}>
        <mesh rotation={[0, 0, 0.18]}>
          <capsuleGeometry args={[0.18, 0.68, 8, 20]} />
          <meshStandardMaterial
            color="#d8dde1"
            roughness={0.58}
            metalness={0.08}
          />
        </mesh>

        <mesh position={[0.1, -0.58, 0]}>
          <sphereGeometry args={[0.2, 28, 28]} />
          <meshStandardMaterial
            color="#c0c8cd"
            roughness={0.6}
            metalness={0.12}
          />
        </mesh>

        <mesh position={[0.12, -0.77, 0]}>
          <boxGeometry args={[0.32, 0.3, 0.28]} />
          <meshStandardMaterial
            color="#e0e4e7"
            roughness={0.55}
            metalness={0.08}
          />
        </mesh>
      </group>

      {/* Hips */}
      <mesh position={[0, -0.55, 0]}>
        <boxGeometry args={[0.78, 0.42, 0.55]} />
        <meshStandardMaterial
          color="#cbd2d7"
          roughness={0.6}
          metalness={0.08}
        />
      </mesh>

      {/* Legs */}
      <group position={[-0.34, -1.25, 0]}>
        <mesh>
          <capsuleGeometry args={[0.22, 0.72, 8, 20]} />
          <meshStandardMaterial
            color="#d5dade"
            roughness={0.6}
            metalness={0.08}
          />
        </mesh>

        <mesh position={[0, -0.62, 0.08]} scale={[1.05, 0.5, 1.35]}>
          <sphereGeometry args={[0.25, 28, 28]} />
          <meshStandardMaterial
            color="#c1c8cd"
            roughness={0.6}
            metalness={0.08}
          />
        </mesh>
      </group>

      <group position={[0.34, -1.25, 0]}>
        <mesh>
          <capsuleGeometry args={[0.22, 0.72, 8, 20]} />
          <meshStandardMaterial
            color="#d5dade"
            roughness={0.6}
            metalness={0.08}
          />
        </mesh>

        <mesh position={[0, -0.62, 0.08]} scale={[1.05, 0.5, 1.35]}>
          <sphereGeometry args={[0.25, 28, 28]} />
          <meshStandardMaterial
            color="#c1c8cd"
            roughness={0.6}
            metalness={0.08}
          />
        </mesh>
      </group>
    </group>
  );
}

export default function AstronautScene() {
  return (
    <div className="absolute inset-0">
      <Canvas
        camera={{ position: [0, 0.15, 7], fov: 42 }}
        dpr={[1, 1.75]}
        gl={{ antialias: true, powerPreference: "high-performance" }}
      >
        <color attach="background" args={["#05070A"]} />
        <fog attach="fog" args={["#05070A", 10, 30]} />

        <ambientLight intensity={0.28} />

        <directionalLight
          position={[-4, 5, 5]}
          intensity={3.2}
          color="#f4f8ff"
        />

        <pointLight
          position={[3, 1, 3]}
          intensity={1.8}
          distance={12}
          color="#66dfff"
        />

        <Stars
          radius={45}
          depth={20}
          count={650}
          factor={1.3}
          saturation={0}
          fade
          speed={0.08}
        />

        <Astronaut />
      </Canvas>
    </div>
  );
}
