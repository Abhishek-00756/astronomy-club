"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Stars } from "@react-three/drei";
import { useMemo, useRef } from "react";
import * as THREE from "three";

type OrbitConfig = {
  radius: number;
  tiltX: number;
  tiltZ: number;
  speed: number;
  opacity: number;
  color: string;
  phase: number;
};

const ORBITS: OrbitConfig[] = [
  { radius: 2.25, tiltX: 1.14, tiltZ: -0.2, speed: 0.34, opacity: 0.2, color: "#8be8ff", phase: 0.2 },
  { radius: 2.85, tiltX: 0.86, tiltZ: 0.32, speed: -0.26, opacity: 0.28, color: "#55d9ff", phase: 1.1 },
  { radius: 3.45, tiltX: 1.34, tiltZ: 0.04, speed: 0.21, opacity: 0.16, color: "#7dbbff", phase: 2.0 },
  { radius: 4.05, tiltX: 0.68, tiltZ: -0.34, speed: -0.17, opacity: 0.24, color: "#c7f6ff", phase: 2.8 },
  { radius: 4.65, tiltX: 1.42, tiltZ: 0.22, speed: 0.12, opacity: 0.13, color: "#6aa8ff", phase: 3.7 },
  { radius: 5.15, tiltX: 0.52, tiltZ: -0.18, speed: -0.09, opacity: 0.1, color: "#9deaff", phase: 4.5 },
];

function OrbitingBody({
  radius,
  phase,
  color,
}: {
  radius: number;
  phase: number;
  color: string;
}) {
  const bodyRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!bodyRef.current) return;

    const angle = phase + state.clock.elapsedTime * (0.55 + radius * 0.035);

    bodyRef.current.position.set(
      Math.cos(angle) * radius,
      Math.sin(angle) * radius * 0.38,
      0
    );

    bodyRef.current.rotation.z = angle;
  });

  return (
    <group ref={bodyRef}>
      <mesh>
        <sphereGeometry args={[0.045, 12, 12]} />
        <meshBasicMaterial color={color} transparent opacity={0.9} />
      </mesh>

      <mesh scale={2.8}>
        <sphereGeometry args={[0.045, 12, 12]} />
        <meshBasicMaterial
          color={color}
          transparent
          opacity={0.12}
        />
      </mesh>
    </group>
  );
}

function OrbitRing({ config }: { config: OrbitConfig }) {
  const ringRef = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (!ringRef.current) return;

    ringRef.current.rotation.y += delta * config.speed;

    ringRef.current.rotation.z =
      config.tiltZ +
      Math.sin(state.clock.elapsedTime * 0.18 + config.phase) * 0.015;
  });

  return (
    <group
      ref={ringRef}
      rotation={[config.tiltX, 0, config.tiltZ]}
    >
      <mesh>
        <torusGeometry args={[config.radius, 0.012, 12, 256]} />
        <meshBasicMaterial
          color={config.color}
          transparent
          opacity={config.opacity}
          toneMapped={false}
        />
      </mesh>

      <OrbitingBody
        radius={config.radius}
        phase={config.phase}
        color={config.color}
      />
    </group>
  );
}

function WarpStars() {
  const pointsRef = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const count = 2600;
    const data = new Float32Array(count * 3);

    for (let i = 0; i < count; i += 1) {
      const i3 = i * 3;

      data[i3] = (Math.random() - 0.5) * 42;
      data[i3 + 1] = (Math.random() - 0.5) * 25;
      data[i3 + 2] = -90 + Math.random() * 94;
    }

    return data;
  }, []);

  useFrame((state, delta) => {
    if (!pointsRef.current) return;

    const positionAttribute =
      pointsRef.current.geometry.attributes.position;

    const speed = 5.8 + state.pointer.y * 0.7;

    for (let i = 0; i < positionAttribute.count; i += 1) {
      const zIndex = i * 3 + 2;
      let z = positionAttribute.array[zIndex] as number;

      z += delta * speed;

      if (z > 7) {
        z = -90;
      }

      positionAttribute.array[zIndex] = z;
    }

    positionAttribute.needsUpdate = true;

    const targetX = state.pointer.x * 0.22;
    const targetY = state.pointer.y * 0.12;

    pointsRef.current.position.x = THREE.MathUtils.lerp(
      pointsRef.current.position.x,
      targetX,
      0.035
    );

    pointsRef.current.position.y = THREE.MathUtils.lerp(
      pointsRef.current.position.y,
      targetY,
      0.035
    );
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>

      <pointsMaterial
        color="#ffffff"
        size={0.06}
        sizeAttenuation
        transparent
        opacity={0.75}
        depthWrite={false}
      />
    </points>
  );
}

function OrbitalSystem() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!groupRef.current) return;

    const targetX = state.pointer.x * 0.46;
    const targetY = -2.2 + state.pointer.y * 0.18;

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

    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x,
      0.14 + state.pointer.y * 0.16,
      0.035
    );

    groupRef.current.rotation.y = THREE.MathUtils.lerp(
      groupRef.current.rotation.y,
      state.pointer.x * 0.24,
      0.035
    );
  });

  return (
    <group ref={groupRef} position={[0, -2.2, -4.8]}>
      {ORBITS.map((orbit) => (
        <OrbitRing key={orbit.radius} config={orbit} />
      ))}

      <Float
        speed={0.7}
        rotationIntensity={0.08}
        floatIntensity={0.25}
      >
        <group position={[0, 0, 0]}>
          <mesh>
            <sphereGeometry args={[0.52, 64, 64]} />
            <meshStandardMaterial
              color="#030609"
              roughness={0.32}
              metalness={0.85}
              emissive="#0b3242"
              emissiveIntensity={0.75}
            />
          </mesh>

          <mesh scale={1.13}>
            <sphereGeometry args={[0.52, 64, 64]} />
            <meshBasicMaterial
              color="#7ee7ff"
              transparent
              opacity={0.06}
              side={THREE.BackSide}
              depthWrite={false}
            />
          </mesh>
        </group>
      </Float>
    </group>
  );
}

function CameraRig() {
  useFrame((state) => {
    const targetX = state.pointer.x * 0.34;
    const targetY = state.pointer.y * 0.17;

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

    state.camera.lookAt(0, -1.05, -2.8);
  });

  return null;
}

function SpaceObjects() {
  return (
    <>
      <WarpStars />

      <Stars
        radius={110}
        depth={70}
        count={1400}
        factor={1.5}
        saturation={0}
        fade
        speed={0.08}
      />

      <OrbitalSystem />

      <pointLight
        position={[0, 1.5, -3]}
        intensity={7}
        distance={22}
        color="#8deaff"
      />

      <pointLight
        position={[-4, -1, 2]}
        intensity={2.5}
        distance={18}
        color="#3d7dff"
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
        gl={{
          antialias: true,
          powerPreference: "high-performance",
        }}
      >
        <color attach="background" args={["#05070A"]} />
        <fog attach="fog" args={["#05070A", 38, 120]} />

        <ambientLight intensity={0.24} />

        <SpaceObjects />
        <CameraRig />
      </Canvas>
    </div>
  );
}
