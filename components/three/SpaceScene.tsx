"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Stars } from "@react-three/drei";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import CelestialSystem, {
  type SpaceInteraction,
} from "./CelestialSystem";

function MovingStars() {
  const pointsRef = useRef<THREE.Points>(null);

  const { positions, sizes } = useMemo(() => {
    const count = 2600;
    const positions = new Float32Array(count * 3);
    const sizes = new Float32Array(count);

    for (let i = 0; i < count; i += 1) {
      const i3 = i * 3;

      positions[i3] = (Math.random() - 0.5) * 42;
      positions[i3 + 1] = (Math.random() - 0.5) * 25;
      positions[i3 + 2] = -90 + Math.random() * 94;

      sizes[i] = 0.75 + Math.random() * 0.85;
    }

    return { positions, sizes };
  }, []);

  useFrame((state, delta) => {
    if (!pointsRef.current) return;

    const positionAttribute =
      pointsRef.current.geometry.attributes.position;
    const speed = 5.8;

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

    pointsRef.current.position.x = THREE.MathUtils.lerp(
      pointsRef.current.position.x,
      state.pointer.x * 0.22,
      0.035
    );

    pointsRef.current.position.y = THREE.MathUtils.lerp(
      pointsRef.current.position.y,
      state.pointer.y * 0.12,
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
        <bufferAttribute
          attach="attributes-aSize"
          count={sizes.length}
          array={sizes}
          itemSize={1}
        />
      </bufferGeometry>

      <pointsMaterial
        color="#ffffff"
        size={0.055}
        sizeAttenuation
        transparent
        opacity={0.46}
        depthWrite={false}
      />
    </points>
  );
}

function CameraRig() {
  useFrame((state) => {
    state.camera.position.x = THREE.MathUtils.lerp(
      state.camera.position.x,
      state.pointer.x * 0.28,
      0.025
    );

    state.camera.position.y = THREE.MathUtils.lerp(
      state.camera.position.y,
      state.pointer.y * 0.14,
      0.025
    );

    state.camera.position.z = THREE.MathUtils.lerp(
      state.camera.position.z,
      7.8,
      0.025
    );

    state.camera.lookAt(0, -1.05, -2.95);
  });

  return null;
}

function SpaceObjects({
  interaction,
}: {
  interaction: SpaceInteraction;
}) {
  return (
    <>
      <MovingStars />

      <Stars
        radius={110}
        depth={70}
        count={6000}
        factor={2.1}
        saturation={0}
        fade
        speed={0.09}
      />

      <CelestialSystem interaction={interaction} />

      <pointLight
        position={[-4, 3, 5]}
        intensity={7}
        distance={28}
        color="#fff1dc"
      />

      <pointLight
        position={[2, 0.5, 2]}
        intensity={2.4}
        distance={20}
        color="#8edfff"
      />

      <directionalLight
        position={[-6, 4, 7]}
        intensity={1.7}
        color="#ffffff"
      />
    </>
  );
}

export default function SpaceScene() {
  const interaction = useRef<SpaceInteraction>({
    scrollImpulse: 0,
  });

  useFrame((_, delta) => {
    interaction.current.scrollImpulse *= Math.pow(0.08, delta);
  });

  return (
    <div className="absolute inset-0">
      <Canvas
        camera={{
          position: [0, 0, 8],
          fov: 48,
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

        <SpaceObjects interaction={interaction.current} />
        <CameraRig />
      </Canvas>
    </div>
  );
}
