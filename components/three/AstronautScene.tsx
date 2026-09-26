"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, Stars, useGLTF } from "@react-three/drei";
import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";

function Astronaut() {
  const groupRef = useRef<THREE.Group>(null);
  const { viewport } = useThree();
  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const onPointerMove = (event: PointerEvent) => {
      mouse.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = (event.clientY / window.innerHeight) * 2 - 1;
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    return () => window.removeEventListener("pointermove", onPointerMove);
  }, []);
  const { scene } = useGLTF("/models/astronaut.glb");

  const model = useMemo(() => {
    const clone = scene.clone(true);

    // Normalize the downloaded model so the site layout does not depend
    // on the source model's original unit scale or origin.
    const box = new THREE.Box3().setFromObject(clone);
    const size = box.getSize(new THREE.Vector3());
    const center = box.getCenter(new THREE.Vector3());

    const maxDimension = Math.max(size.x, size.y, size.z) || 1;
    const scale = 3.1 / maxDimension;

    clone.scale.setScalar(scale);
    clone.position.set(
      -center.x * scale,
      -center.y * scale,
      -center.z * scale
    );

    return clone;
  }, [scene]);

  useFrame((state) => {
    if (!groupRef.current) return;

    const narrow = viewport.width < 7;
    const baseX = narrow ? 1.0 : 2.2;
    const baseY = narrow ? -0.65 : 0.0;

    const mouseX = mouse.current.x;
    const mouseY = mouse.current.y;

    const idleX = Math.sin(state.clock.elapsedTime * 0.55) * (narrow ? 0.035 : 0.08);
    const idleY = Math.sin(state.clock.elapsedTime * 0.8) * (narrow ? 0.075 : 0.14);

    const targetX =
      baseX + mouseX * (narrow ? 0.38 : 0.7) + idleX;
    const targetY =
      baseY - mouseY * (narrow ? 0.24 : 0.42) + idleY;

    groupRef.current.position.x = THREE.MathUtils.lerp(
      groupRef.current.position.x,
      targetX,
      0.055
    );

    groupRef.current.position.y = THREE.MathUtils.lerp(
      groupRef.current.position.y,
      targetY,
      0.055
    );

    groupRef.current.rotation.y = THREE.MathUtils.lerp(
      groupRef.current.rotation.y,
      -0.18 + mouseX * (narrow ? 0.72 : 1.05),
      0.06
    );

    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x,
      -mouseY * (narrow ? 0.34 : 0.52),
      0.06
    );

    groupRef.current.rotation.z = THREE.MathUtils.lerp(
      groupRef.current.rotation.z,
      mouseX * (narrow ? 0.1 : 0.16) +
        Math.sin(state.clock.elapsedTime * 0.45) * 0.018,
      0.045
    );
  });

  return (
    <group
      ref={groupRef}
      position={[2.2, 0, -0.8]}
      rotation={[0, -0.18, 0.03]}
    >
      <Float
        speed={0.85}
        rotationIntensity={0.045}
        floatIntensity={0.32}
      >
        <primitive object={model} />
      </Float>
    </group>
  );
}

function SpaceLighting() {
  return (
    <>
      <ambientLight intensity={0.32} />

      <directionalLight
        position={[-4, 5, 6]}
        intensity={3.6}
        color="#f7fbff"
      />

      <pointLight
        position={[3, 1, 3]}
        intensity={1.7}
        distance={13}
        color="#76dcff"
      />

      <pointLight
        position={[-3, 0, 1]}
        intensity={0.7}
        distance={9}
        color="#d9e7ff"
      />
    </>
  );
}

export default function AstronautScene() {
  const [visible, setVisible] = useState(true);
  const hostRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    const observer = new IntersectionObserver(
      ([entry]) => setVisible(Boolean(entry?.isIntersecting)),
      { rootMargin: "120px" },
    );

    observer.observe(host);

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={hostRef} className="absolute inset-0 pointer-events-none">
      {visible && (
      <Canvas
        camera={{ position: [0, 0.1, 7], fov: 40 }}
        dpr={[1, 1.35]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
      >

        <SpaceLighting />

        <Stars
          radius={42}
          depth={18}
          count={350}
          factor={1.25}
          saturation={0}
          fade
          speed={0.06}
        />

        <Suspense fallback={null}>
          <Astronaut />
        </Suspense>
      </Canvas>
      )}
    </div>
  );
}
