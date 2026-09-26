"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Stars } from "@react-three/drei";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import CelestialSystem, { type SpaceInteraction } from "./CelestialSystem";
import GalaxyField from "./GalaxyField";

function MovingStars() {
  const pointsRef = useRef<THREE.Points>(null);

  const { positions, baseZ, speeds } = useMemo(() => {
    const count = 1050;
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
    const points = pointsRef.current;
    if (!points) return;

    const attribute = points.geometry.attributes.position;
    const elapsed = state.clock.elapsedTime;

    for (let i = 0; i < attribute.count; i += 1) {
      const zIndex = i * 3 + 2;
      let z = -90 + ((baseZ[i] + 90 + elapsed * speeds[i]) % 97);
      if (z > 7) z -= 97;
      attribute.array[zIndex] = z;
    }

    attribute.needsUpdate = true;

    points.position.x = THREE.MathUtils.lerp(
      points.position.x,
      state.pointer.x * 0.32,
      0.035,
    );

    points.position.y = THREE.MathUtils.lerp(
      points.position.y,
      state.pointer.y * 0.18,
      0.035,
    );

    points.rotation.z = THREE.MathUtils.lerp(
      points.rotation.z,
      state.pointer.x * 0.018,
      0.03,
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
      state.pointer.x * 0.10,
      0.025,
    );

    state.camera.position.y = THREE.MathUtils.lerp(
      state.camera.position.y,
      state.pointer.y * 0.06,
      0.025,
    );

    state.camera.position.z = THREE.MathUtils.lerp(
      state.camera.position.z,
      7.8,
      0.025,
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
        count={1500}
        factor={1.8}
        saturation={0}
        fade
        speed={0.07}
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
  const [visible, setVisible] = useState(true);
  const hostRef = useRef<HTMLDivElement | null>(null);
  const interaction = useRef<SpaceInteraction>({ scrollImpulse: 0 });

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    const observer = new IntersectionObserver(
      ([entry]) => setVisible(Boolean(entry?.isIntersecting)),
      { rootMargin: "160px" },
    );

    observer.observe(host);

    const handleWheel = (event: WheelEvent) => {
      interaction.current.scrollImpulse = THREE.MathUtils.clamp(
        interaction.current.scrollImpulse + THREE.MathUtils.clamp(
          event.deltaY * 0.0018,
          -1,
          1,
        ),
        -1.5,
        1.5,
      );
    };

    window.addEventListener("wheel", handleWheel, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("wheel", handleWheel);
    };
  }, []);

  return (
    <div ref={hostRef} className="absolute inset-0">
      {visible && (
        <Canvas
          camera={{
            position: [0, 0, 8],
            fov: 48,
            near: 0.1,
            far: 200,
          }}
          dpr={[1, 1.25]}
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
      )}
    </div>
  );
}
