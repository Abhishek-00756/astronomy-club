"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Stars } from "@react-three/drei";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import CelestialSystem, {
  type SpaceInteraction,
} from "./CelestialSystem";

const WARP_VERTEX_SHADER = `
uniform float uTime;

attribute float aSize;
attribute float aPhase;
attribute float aSpeed;
attribute float aBrightness;

varying float vBrightness;

void main() {
  vec3 p = position;

  float progress = clamp((p.z + 90.0) / 97.0, 0.0, 1.0);
  float spread = 0.58 + progress * 1.55;

  p.x *= spread;
  p.y *= spread;

  float driftX = sin(uTime * 0.22 + aPhase) * (0.03 + progress * 0.08);
  float driftY = cos(uTime * 0.18 + aPhase) * (0.02 + progress * 0.05);

  p.x += driftX;
  p.y += driftY;

  vec4 mvPosition = modelViewMatrix * vec4(p, 1.0);

  float twinkle =
    0.84 +
    0.22 * sin(uTime * (0.7 + aSpeed * 0.22) + aPhase);

  gl_PointSize =
    aSize *
    twinkle *
    (50.0 / max(-mvPosition.z, 1.0));

  vBrightness = aBrightness * twinkle;

  gl_Position = projectionMatrix * mvPosition;
}
`;

const WARP_FRAGMENT_SHADER = `
varying float vBrightness;

void main() {
  vec2 uv = gl_PointCoord - 0.5;
  float distanceFromCenter = length(uv);

  float core = smoothstep(0.16, 0.0, distanceFromCenter);
  float glow = exp(-distanceFromCenter * distanceFromCenter * 18.0);
  float alpha = (core * 0.9 + glow * 0.7) * vBrightness;

  if (alpha < 0.01) discard;

  vec3 color = mix(
    vec3(0.72, 0.9, 1.0),
    vec3(1.0, 1.0, 1.0),
    core
  );

  gl_FragColor = vec4(color, alpha);
}
`;

function WarpStars() {
  const pointsRef = useRef<THREE.Points>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  const {
    positions,
    sizes,
    phases,
    speeds,
    brightness,
  } = useMemo(() => {
    const count = 2600;

    const positions = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    const phases = new Float32Array(count);
    const speeds = new Float32Array(count);
    const brightness = new Float32Array(count);

    for (let i = 0; i < count; i += 1) {
      const i3 = i * 3;

      positions[i3] = (Math.random() - 0.5) * 42;
      positions[i3 + 1] = (Math.random() - 0.5) * 25;
      positions[i3 + 2] = -90 + Math.random() * 94;

      sizes[i] = 0.55 + Math.random() * 1.45;
      phases[i] = Math.random() * Math.PI * 2;
      speeds[i] = 0.55 + Math.random() * 1.25;
      brightness[i] = 0.55 + Math.random() * 0.85;
    }

    return {
      positions,
      sizes,
      phases,
      speeds,
      brightness,
    };
  }, []);

  useFrame((state, delta) => {
    if (!pointsRef.current || !materialRef.current) return;

    const positionAttribute =
      pointsRef.current.geometry.attributes.position;

    for (let i = 0; i < positionAttribute.count; i += 1) {
      const zIndex = i * 3 + 2;
      let z = positionAttribute.array[zIndex] as number;

      z += delta * 5.8;

      if (z > 7) {
        z = -90;
      }

      positionAttribute.array[zIndex] = z;
    }

    positionAttribute.needsUpdate = true;
    materialRef.current.uniforms.uTime.value =
      state.clock.elapsedTime;

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
        <bufferAttribute
          attach="attributes-aPhase"
          count={phases.length}
          array={phases}
          itemSize={1}
        />
        <bufferAttribute
          attach="attributes-aSpeed"
          count={speeds.length}
          array={speeds}
          itemSize={1}
        />
        <bufferAttribute
          attach="attributes-aBrightness"
          count={brightness.length}
          array={brightness}
          itemSize={1}
        />
      </bufferGeometry>

      <shaderMaterial
        ref={materialRef}
        vertexShader={WARP_VERTEX_SHADER}
        fragmentShader={WARP_FRAGMENT_SHADER}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        uniforms={{
          uTime: { value: 0 },
        }}
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

    state.camera.lookAt(0, -0.72, -2.7);
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

      <CelestialSystem interaction={interaction} />

      <pointLight
        position={[0, 1.8, 1]}
        intensity={5}
        distance={24}
        color="#b8ebff"
      />

      <pointLight
        position={[-4, -1, 3]}
        intensity={2.2}
        distance={18}
        color="#3d7dff"
      />

      <directionalLight
        position={[-5, 4, 6]}
        intensity={1.9}
        color="#fff3d4"
      />
    </>
  );
}

export default function SpaceScene() {
  const interaction = useRef<SpaceInteraction>({
    scrollImpulse: 0,
  });

  const handleWheel = (event: React.WheelEvent<HTMLDivElement>) => {
    const impulse = THREE.MathUtils.clamp(
      event.deltaY * 0.0018,
      -1,
      1
    );

    interaction.current.scrollImpulse += impulse;
    interaction.current.scrollImpulse = THREE.MathUtils.clamp(
      interaction.current.scrollImpulse,
      -1.5,
      1.5
    );
  };

  return (
    <div
      className="absolute inset-0"
      onWheel={handleWheel}
    >
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
