"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Stars, Float } from "@react-three/drei";
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
  { radius: 2.25, tiltX: 1.14, tiltZ: -0.2, speed: 0.34, opacity: 0.11, color: "#8be8ff", phase: 0.2 },
  { radius: 2.85, tiltX: 0.86, tiltZ: 0.32, speed: -0.26, opacity: 0.15, color: "#55d9ff", phase: 1.1 },
  { radius: 3.45, tiltX: 1.34, tiltZ: 0.04, speed: 0.21, opacity: 0.09, color: "#7dbbff", phase: 2.0 },
  { radius: 4.05, tiltX: 0.68, tiltZ: -0.34, speed: -0.17, opacity: 0.13, color: "#c7f6ff", phase: 2.8 },
  { radius: 4.65, tiltX: 1.42, tiltZ: 0.22, speed: 0.12, opacity: 0.075, color: "#6aa8ff", phase: 3.7 },
  { radius: 5.15, tiltX: 0.52, tiltZ: -0.18, speed: -0.09, opacity: 0.055, color: "#9deaff", phase: 4.5 },
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
        <torusGeometry args={[config.radius, 0.01, 12, 256]} />
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
    const count = 3200;

    const positions = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    const phases = new Float32Array(count);
    const speeds = new Float32Array(count);
    const brightness = new Float32Array(count);

    for (let i = 0; i < count; i += 1) {
      const i3 = i * 3;

      positions[i3] = (Math.random() - 0.5) * 30;
      positions[i3 + 1] = (Math.random() - 0.5) * 19;
      positions[i3 + 2] = -90 + Math.random() * 97;

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

      const speed = 5.5 + speeds[i] * 3.5;
      z += delta * speed;

      if (z > 7) {
        z = -90;
      }

      positionAttribute.array[zIndex] = z;
    }

    positionAttribute.needsUpdate = true;
    materialRef.current.uniforms.uTime.value =
      state.clock.elapsedTime;
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

function OrbitalSystem() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!groupRef.current) return;

    const targetX = state.pointer.x * 0.65;
    const targetY = -2.25 + state.pointer.y * 0.26;

    groupRef.current.position.x = THREE.MathUtils.lerp(
      groupRef.current.position.x,
      targetX,
      0.045
    );

    groupRef.current.position.y = THREE.MathUtils.lerp(
      groupRef.current.position.y,
      targetY,
      0.045
    );

    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x,
      0.2 + state.pointer.y * 0.24,
      0.04
    );

    groupRef.current.rotation.y = THREE.MathUtils.lerp(
      groupRef.current.rotation.y,
      state.pointer.x * 0.34,
      0.04
    );
  });

  return (
    <group ref={groupRef} position={[0, -2.25, -4.8]}>
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
              emissiveIntensity={0.85}
            />
          </mesh>

          <mesh scale={1.13}>
            <sphereGeometry args={[0.52, 64, 64]} />
            <meshBasicMaterial
              color="#7ee7ff"
              transparent
              opacity={0.045}
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
        radius={115}
        depth={75}
        count={1500}
        factor={1.7}
        saturation={0}
        fade
        speed={0.1}
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
