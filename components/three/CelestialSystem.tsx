"use client";

import { useFrame, useLoader } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";

const EARTH_TEXTURE =
  "https://assets.science.nasa.gov/content/dam/science/esd/eo/images/bmng/bmng-base/january/world.200401.3x5400x2700.jpg";
const EARTH_CLOUDS =
  "https://threejs.org/examples/textures/planets/earth_clouds_1024.png";
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
      0.35 + Math.max(0, Math.sin(state.clock.elapsedTime * 3.2)) * 0.5;
  });

  return (
    <group scale={0.56} rotation={[0.08, 0.18, -0.05]}>
      <mesh>
        <boxGeometry args={[1.05, 0.7, 0.7]} />
        <meshStandardMaterial
          color="#b99658"
          metalness={0.72}
          roughness={0.26}
        />
      </mesh>

      <mesh position={[-0.58, 0.05, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.22, 0.22, 0.34, 32]} />
        <meshStandardMaterial
          color="#e3e7eb"
          metalness={0.62}
          roughness={0.26}
        />
      </mesh>

      <mesh position={[0, 0.55, 0]}>
        <boxGeometry args={[1.6, 0.055, 0.72]} />
        <meshStandardMaterial
          color="#0f3c78"
          metalness={0.32}
          roughness={0.3}
          emissive="#071e40"
          emissiveIntensity={0.45}
        />
      </mesh>

      <mesh position={[0, -0.55, 0]}>
        <boxGeometry args={[1.6, 0.055, 0.72]} />
        <meshStandardMaterial
          color="#0f3c78"
          metalness={0.32}
          roughness={0.3}
          emissive="#071e40"
          emissiveIntensity={0.45}
        />
      </mesh>

      <group
        position={[0.38, 0, -0.53]}
        rotation={[Math.PI / 2.25, 0, 0]}
      >
        <mesh>
          <sphereGeometry
            args={[0.2, 28, 16, 0, Math.PI * 2, 0, Math.PI / 2]}
          />
          <meshStandardMaterial
            color="#e7eaed"
            metalness={0.42}
            roughness={0.32}
            side={THREE.DoubleSide}
          />
        </mesh>

        <mesh position={[0, 0.16, 0]}>
          <cylinderGeometry args={[0.012, 0.012, 0.36, 12]} />
          <meshStandardMaterial
            color="#e1e5e9"
            metalness={0.62}
            roughness={0.28}
          />
        </mesh>
      </group>

      <mesh ref={beaconRef} position={[0.45, 0.3, 0.35]}>
        <sphereGeometry args={[0.05, 16, 16]} />
        <meshBasicMaterial
          color="#ffe08a"
          transparent
          opacity={0.45}
          toneMapped={false}
        />
      </mesh>

      <pointLight
        position={[0.45, 0.3, 0.35]}
        intensity={0.9}
        distance={2.4}
        color="#ffd26b"
      />
    </group>
  );
}

function SatelliteOrbit({ interaction }: { interaction: SpaceInteraction }) {
  const orbitRef = useRef<THREE.Group>(null);
  const satelliteRef = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (!orbitRef.current || !satelliteRef.current) return;

    const speed =
      0.34 +
      THREE.MathUtils.clamp(interaction.scrollImpulse, -1.5, 1.5) * 1.12;

    orbitRef.current.rotation.y += delta * speed;

    satelliteRef.current.rotation.x =
      Math.sin(state.clock.elapsedTime * 0.42) * 0.08;

    satelliteRef.current.rotation.z =
      Math.cos(state.clock.elapsedTime * 0.36) * 0.06;
  });

  return (
    <group ref={orbitRef} rotation={[0.78, 0.38, -0.28]}>
      <mesh>
        <torusGeometry args={[3.62, 0.006, 10, 256]} />
        <meshBasicMaterial
          color="#7edfff"
          transparent
          opacity={0.085}
          toneMapped={false}
        />
      </mesh>

      <group ref={satelliteRef} position={[3.62, 0, 0]}>
        <SatelliteModel />
      </group>
    </group>
  );
}

function MoonSystem({ interaction }: { interaction: SpaceInteraction }) {
  const orbitRef = useRef<THREE.Group>(null);
  const moonRef = useRef<THREE.Mesh>(null);
  const moonTexture = useLoader(THREE.TextureLoader, MOON_TEXTURE);

  useFrame((_, delta) => {
    if (!orbitRef.current || !moonRef.current) return;

    const speed =
      0.15 +
      THREE.MathUtils.clamp(interaction.scrollImpulse, -1.2, 1.2) * 0.52;

    orbitRef.current.rotation.y += delta * speed;
    moonRef.current.rotation.y += delta * 0.08;
  });

  moonTexture.colorSpace = THREE.SRGBColorSpace;

  return (
    <group ref={orbitRef} rotation={[0.36, -0.2, 0.16]}>
      <mesh>
        <torusGeometry args={[4.25, 0.0035, 8, 224]} />
        <meshBasicMaterial
          color="#e7f9ff"
          transparent
          opacity={0.045}
          toneMapped={false}
        />
      </mesh>

      <Float speed={0.5} rotationIntensity={0.04} floatIntensity={0.035}>
        <group position={[4.25, 0, 0]}>
          <mesh ref={moonRef}>
            <sphereGeometry args={[0.48, 64, 64]} />
            <meshStandardMaterial
              map={moonTexture}
              color="#ededed"
              roughness={0.95}
              metalness={0}
            />
          </mesh>

          <mesh scale={1.055}>
            <sphereGeometry args={[0.48, 40, 40]} />
            <meshBasicMaterial
              color="#d8f3ff"
              transparent
              opacity={0.03}
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
  const specularTexture = useLoader(
    THREE.TextureLoader,
    EARTH_SPECULAR
  );
  const lightsTexture = useLoader(
    THREE.TextureLoader,
    EARTH_LIGHTS
  );

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

    const earthSpin = 0.105 + impulse * 0.4;

    earthRef.current.rotation.y += delta * earthSpin;
    cloudsRef.current.rotation.y += delta * earthSpin * 1.03;
    nightRef.current.rotation.y += delta * earthSpin;

    systemRef.current.position.x = THREE.MathUtils.lerp(
      systemRef.current.position.x,
      state.pointer.x * 0.34,
      0.032
    );

    systemRef.current.position.y = THREE.MathUtils.lerp(
      systemRef.current.position.y,
      -1.85 + state.pointer.y * 0.12,
      0.032
    );

    systemRef.current.rotation.x = THREE.MathUtils.lerp(
      systemRef.current.rotation.x,
      -0.05 + state.pointer.y * 0.08,
      0.032
    );

    systemRef.current.rotation.y = THREE.MathUtils.lerp(
      systemRef.current.rotation.y,
      state.pointer.x * 0.16,
      0.032
    );
  });

  return (
    <group ref={systemRef} position={[0, -2.85, -3.95]}>
      <Float speed={0.2} rotationIntensity={0.01} floatIntensity={0.035}>
        <group rotation={[0, -0.7, 0.02]}>
          <mesh ref={earthRef}>
            <sphereGeometry args={[2.18, 128, 128]} />
            <meshPhongMaterial
              map={earthTexture}
              normalMap={normalTexture}
              normalScale={new THREE.Vector2(0.3, 0.3)}
              specularMap={specularTexture}
              specular={new THREE.Color("#5c768a")}
              shininess={38}
              color="#f2f5f7"
            />
          </mesh>

          <mesh ref={nightRef} scale={1.006}>
            <sphereGeometry args={[2.18, 112, 112]} />
            <meshBasicMaterial
              map={lightsTexture}
              transparent
              opacity={0.14}
              depthWrite={false}
              blending={THREE.AdditiveBlending}
              toneMapped={false}
            />
          </mesh>

          <mesh ref={cloudsRef} scale={1.014}>
            <sphereGeometry args={[1.92, 112, 112]} />
            <meshPhongMaterial
              map={cloudsTexture}
              transparent
              opacity={0.23}
              depthWrite={false}
              color="#ffffff"
              shininess={10}
            />
          </mesh>

          <mesh scale={1.045}>
            <sphereGeometry args={[2.18, 96, 96]} />
            <meshBasicMaterial
              color="#70d8ff"
              transparent
              opacity={0.065}
              side={THREE.BackSide}
              depthWrite={false}
              blending={THREE.AdditiveBlending}
              toneMapped={false}
            />
          </mesh>

          <mesh scale={1.09}>
            <sphereGeometry args={[2.18, 72, 72]} />
            <meshBasicMaterial
              color="#5bc8ff"
              transparent
              opacity={0.012}
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
