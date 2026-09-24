"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Stars } from "@react-three/drei";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import CelestialSystem, {
  type SpaceInteraction,
} from "./CelestialSystem";
import GalaxyField from "./GalaxyField";

function MovingStars() {
  const pointsRef = useRef<THREE.Points>(null);

  const { positions, baseZ, speeds } = useMemo(() => {
    const count = 2600;
    const positions = new Float32Array(count * 3);
    const baseZ = new Float32Array(count);
    const speeds = new Float32Array(count);

    for (let i = 0; i < count; i += 1) {
      const i3 = i * 3;
      const z = -90 + Math.random() * 97;

      positions[i3] = (Math.random() - 0.5) * 42;
      positions[i3 + 1] = (Math.random() - 0.5) * 25;
      positions[i3 + 2] = z;

      baseZ[i] = z;
      speeds[i] = 4.8 + Math.random() * 2.6;
    }

    return { positions, baseZ, speeds };
  }, []);

  useFrame((state) => {
    if (!pointsRef.current) return;

    const positionAttribute =
      pointsRef.current.geometry.attributes.position;

    const elapsed = state.clock.elapsedTime;

    for (let i = 0; i < positionAttribute.count; i += 1) {
      const zIndex = i * 3 + 2;

      // Compute position from the original depth + elapsed time.
      // This prevents the star field from accumulating numerical drift
      // and keeps the forward-flight loop continuous indefinitely.
      let z = -90 + ((baseZ[i] + 90 + elapsed * speeds[i]) % 97);

      if (z > 7) z -= 97;

      positionAttribute.array[zIndex] = z;
    }

    positionAttribute.needsUpdate = true;

    const targetX = state.pointer.x * 0.32;
    const targetY = state.pointer.y * 0.18;

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

    pointsRef.current.rotation.z = THREE.MathUtils.lerp(
      pointsRef.current.rotation.z,
      state.pointer.x * 0.018,
      0.03
    );

    pointsRef.current.rotation.x = THREE.MathUtils.lerp(
      pointsRef.current.rotation.x,
      -state.pointer.y * 0.012,
      0.03
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
        size={0.055}
        sizeAttenuation
        transparent
        opacity={0.42}
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

    state.camera.lookAt(0, -0.95, -3);
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
      <GalaxyField />
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

  useEffect(() => {
    const handleWheel = (event: WheelEvent) => {
      const impulse = THREE.MathUtils.clamp(
        event.deltaY * 0.0018,
        -1,
        1
      );

      interaction.current.scrollImpulse = THREE.MathUtils.clamp(
        interaction.current.scrollImpulse + impulse,
        -1.5,
        1.5
      );
    };

    window.addEventListener("wheel", handleWheel, {
      passive: true,
    });

    return () => {
      window.removeEventListener("wheel", handleWheel);
    };
  }, []);

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
