"use client";

import { useFrame, useLoader } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";

const EARTH_TEXTURE =
  "https://threejs.org/examples/textures/planets/earth_atmos_2048.jpg";
const EARTH_CLOUDS =
  "https://threejs.org/examples/textures/planets/earth_clouds_2048.png";
const EARTH_NORMAL =
  "https://threejs.org/examples/textures/planets/earth_normal_2048.jpg";
const EARTH_SPECULAR =
  "https://threejs.org/examples/textures/planets/earth_specular_2048.jpg";
const EARTH_LIGHTS =
  "https://threejs.org/examples/textures/planets/earth_lights_2048.png";
const MOON_TEXTURE =
  "https://threejs.org/examples/textures/planets/moon_1024.jpg";

export type SpaceInteraction = {
  scrollImpulse: number;
};

function SatelliteModel() {
  const beaconRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!beaconRef.current) return;

    const material = beaconRef.current.material as THREE.MeshBasicMaterial;

    material.opacity =
      0.32 + Math.max(0, Math.sin(state.clock.elapsedTime * 3.2)) * 0.5;
  });

  return (
    <group scale={0.36} rotation={[0.08, 0.18, -0.05]}>
      <mesh>
        <boxGeometry args={[1.05, 0.7, 0.7]} />
        <meshStandardMaterial
          color="#b9975a"
          metalness={0.72}
          roughness={0.28}
        />
      </mesh>

      <mesh position={[-0.58, 0.05, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.22, 0.22, 0.34, 32]} />
        <meshStandardMaterial
          color="#dfe3e7"
          metalness={0.6}
          roughness={0.28}
        />
      </mesh>

      <mesh position={[0, 0.55, 0]}>
        <boxGeometry args={[1.6, 0.055, 0.72]} />
        <meshStandardMaterial
          color="#123a72"
          metalness={0.28}
          roughness={0.32}
          emissive="#071d3c"
          emissiveIntensity={0.45}
        />
      </mesh>

      <mesh position={[0, -0.55, 0]}>
        <boxGeometry args={[1.6, 0.055, 0.72]} />
        <meshStandardMaterial
          color="#123a72"
          metalness={0.28}
          roughness={0.32}
          emissive="#071d3c"
          emissiveIntensity={0.45}
        />
      </mesh>

      <group position={[0.38, 0, -0.53]} rotation={[Math.PI / 2.25, 0, 0]}>
        <mesh>
          <sphereGeometry
            args={[0.2, 28, 16, 0, Math.PI * 2, 0, Math.PI / 2]}
          />
          <meshStandardMaterial
            color="#e3e5e8"
            metalness={0.42}
            roughness={0.34}
            side={THREE.DoubleSide}
          />
        </mesh>
        <mesh position={[0, 0.16, 0]}>
          <cylinderGeometry args={[0.012, 0.012, 0.36, 12]} />
          <meshStandardMaterial
            color="#e0e3e7"
            metalness={0.62}
            roughness={0.28}
          />
        </mesh>
      </group>

      <mesh ref={beaconRef} position={[0.45, 0.3, 0.35]}>
        <sphereGeometry args={[0.045, 12, 12]} />
        <meshBasicMaterial
          color="#ffd878"
          transparent
          opacity={0.42}
          toneMapped={false}
        />
      </mesh>

      <pointLight
        position={[0.45, 0.3, 0.35]}
        intensity={0.8}
        distance={1.8}
        color="#ffd878"
      />
    </group>
  );
}

function SatelliteOrbit({
  interaction,
}: {
  interaction: SpaceInteraction;
}) {
  const orbitRef = useRef<THREE.Group>(null);
  const satelliteRef = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (!orbitRef.current || !satelliteRef.current) return;

    const speed =
      0.38 +
      THREE.MathUtils.clamp(interaction.scrollImpulse, -1.5, 1.5) * 1.18;

    orbitRef.current.rotation.y += delta * speed;

    satelliteRef.current.rotation.x =
      Math.sin(state.clock.elapsedTime * 0.42) * 0.08;
    satelliteRef.current.rotation.z =
      Math.cos(state.clock.elapsedTime * 0.36) * 0.06;
  });

  return (
    <group ref={orbitRef} rotation={[0.82, 0.36, -0.26]}>
      <mesh>
        <torusGeometry args={[2.75, 0.006, 10, 256]} />
        <meshBasicMaterial
          color="#7edfff"
          transparent
          opacity={0.105}
          toneMapped={false}
        />
      </mesh>

      <group ref={satelliteRef} position={[2.75, 0, 0]}>
        <SatelliteModel />
      </group>
    </group>
  );
}

function MoonSystem({
  interaction,
}: {
  interaction: SpaceInteraction;
}) {
  const orbitRef = useRef<THREE.Group>(null);
  const moonRef = useRef<THREE.Mesh>(null);
  const moonTexture = useLoader(THREE.TextureLoader, MOON_TEXTURE);

  useFrame((_, delta) => {
    if (!orbitRef.current || !moonRef.current) return;

    const speed =
      0.17 +
      THREE.MathUtils.clamp(interaction.scrollImpulse, -1.2, 1.2) * 0.56;

    orbitRef.current.rotation.y += delta * speed;
    moonRef.current.rotation.y += delta * 0.08;
  });

  moonTexture.colorSpace = THREE.SRGBColorSpace;

  return (
    <group ref={orbitRef} rotation={[0.38, -0.22, 0.16]}>
      <mesh>
        <torusGeometry args={[3.45, 0.0035, 8, 224]} />
        <meshBasicMaterial
          color="#e7f9ff"
          transparent
          opacity={0.055}
          toneMapped={false}
        />
      </mesh>

      <Float speed={0.55} rotationIntensity={0.045} floatIntensity={0.04}>
        <group position={[3.45, 0, 0]}>
          <mesh ref={moonRef}>
            <sphereGeometry args={[0.5, 64, 64]} />
            <meshStandardMaterial
              map={moonTexture}
              color="#ececec"
              roughness={0.94}
              metalness={0}
            />
          </mesh>

          <mesh scale={1.055}>
            <sphereGeometry args={[0.5, 40, 40]} />
            <meshBasicMaterial
              color="#d8f3ff"
              transparent
              opacity={0.035}
              side={THREE.BackSide}
              depthWrite={false}
              blending={THREE.AdditiveBlending}
            />
          </mesh>
        </group>
      </Float>
    </group>
  );
}

export default function CelestialSystem({
  interaction,
}: {
  interaction: SpaceInteraction;
}) {
  const systemRef = useRef<THREE.Group>(null);
  const earthRef = useRef<THREE.Mesh>(null);
  const cloudsRef = useRef<THREE.Mesh>(null);
  const nightRef = useRef<THREE.Mesh>(null);

  const earthTexture = useLoader(THREE.TextureLoader, EARTH_TEXTURE);
  const cloudsTexture = useLoader(THREE.TextureLoader, EARTH_CLOUDS);
  const normalTexture = useLoader(THREE.TextureLoader, EARTH_NORMAL);
  const specularTexture = useLoader(THREE.TextureLoader, EARTH_SPECULAR);
  const lightsTexture = useLoader(THREE.TextureLoader, EARTH_LIGHTS);

  earthTexture.colorSpace = THREE.SRGBColorSpace;
  cloudsTexture.colorSpace = THREE.SRGBColorSpace;
  lightsTexture.colorSpace = THREE.SRGBColorSpace;

  useFrame((state, delta) => {
    if (
      !systemRef.current ||
      !earthRef.current ||
      !cloudsRef.current ||
      !nightRef.current
    ) {
      return;
    }

    const impulse = THREE.MathUtils.clamp(
      interaction.scrollImpulse,
      -1.5,
      1.5
    );

    const earthSpin = 0.11 + impulse * 0.42;

    earthRef.current.rotation.y += delta * earthSpin;
    cloudsRef.current.rotation.y += delta * earthSpin * 1.035;
    nightRef.current.rotation.y += delta * earthSpin;

    systemRef.current.position.x = THREE.MathUtils.lerp(
      systemRef.current.position.x,
      state.pointer.x * 0.3,
      0.035
    );

    systemRef.current.position.y = THREE.MathUtils.lerp(
      systemRef.current.position.y,
      -1.15 + state.pointer.y * 0.15,
      0.035
    );

    systemRef.current.rotation.x = THREE.MathUtils.lerp(
      systemRef.current.rotation.x,
      -0.04 + state.pointer.y * 0.09,
      0.035
    );

    systemRef.current.rotation.y = THREE.MathUtils.lerp(
      systemRef.current.rotation.y,
      state.pointer.x * 0.16,
      0.035
    );
  });

  return (
    <group ref={systemRef} position={[0, -1.15, -3.65]}>
      <Float speed={0.24} rotationIntensity={0.012} floatIntensity={0.05}>
        <group>
          {/* High-detail Earth surface */}
          <mesh ref={earthRef}>
            <sphereGeometry args={[1.58, 112, 112]} />
            <meshPhongMaterial
              map={earthTexture}
              normalMap={normalTexture}
              normalScale={new THREE.Vector2(0.34, 0.34)}
              specularMap={specularTexture}
              specular={new THREE.Color("#6f879c")}
              shininess={42}
              color="#f4f8fc"
            />
          </mesh>

          {/* Night-side city lights */}
          <mesh ref={nightRef} scale={1.008}>
            <sphereGeometry args={[1.58, 96, 96]} />
            <meshBasicMaterial
              map={lightsTexture}
              transparent
              opacity={0.26}
              depthWrite={false}
              blending={THREE.AdditiveBlending}
              toneMapped={false}
            />
          </mesh>

          {/* Independent cloud shell */}
          <mesh ref={cloudsRef} scale={1.015}>
            <sphereGeometry args={[1.58, 96, 96]} />
            <meshPhongMaterial
              map={cloudsTexture}
              transparent
              opacity={0.28}
              depthWrite={false}
              color="#ffffff"
              shininess={8}
            />
          </mesh>

          {/* Main atmospheric limb */}
          <mesh scale={1.075}>
            <sphereGeometry args={[1.58, 80, 80]} />
            <meshBasicMaterial
              color="#72d8ff"
              transparent
              opacity={0.11}
              side={THREE.BackSide}
              depthWrite={false}
              blending={THREE.AdditiveBlending}
              toneMapped={false}
            />
          </mesh>

          {/* Wider, softer atmosphere */}
          <mesh scale={1.12}>
            <sphereGeometry args={[1.58, 64, 64]} />
            <meshBasicMaterial
              color="#5fc7ff"
              transparent
              opacity={0.022}
              side={THREE.BackSide}
              depthWrite={false}
              blending={THREE.AdditiveBlending}
              toneMapped={false}
            />
          </mesh>
        </group>
      </Float>

      <MoonSystem interaction={interaction} />
      <SatelliteOrbit interaction={interaction} />
    </group>
  );
}
