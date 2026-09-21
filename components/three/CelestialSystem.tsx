"use client";

import { useFrame, useLoader } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";

const EARTH_TEXTURE =
  "https://threejs.org/examples/textures/planets/earth_atmos_2048.jpg";
const EARTH_CLOUDS =
  "https://threejs.org/examples/textures/planets/earth_clouds_1024.png";
const EARTH_NORMAL =
  "https://threejs.org/examples/textures/planets/earth_normal_2048.jpg";
const MOON_TEXTURE =
  "https://threejs.org/examples/textures/planets/moon_1024.jpg";

export type SpaceInteraction = {
  scrollImpulse: number;
};

function SatelliteModel() {
  return (
    <group scale={0.22} rotation={[0.1, 0.25, -0.08]}>
      {/* INSAT-3DS-inspired gold thermal body */}
      <mesh>
        <boxGeometry args={[1.15, 0.68, 0.68]} />
        <meshStandardMaterial
          color="#b38a4a"
          metalness={0.72}
          roughness={0.28}
        />
      </mesh>

      {/* White instrument modules */}
      <mesh position={[-0.58, 0.08, 0]}>
        <cylinderGeometry args={[0.22, 0.22, 0.5, 24]} />
        <meshStandardMaterial
          color="#d9dde2"
          metalness={0.45}
          roughness={0.42}
        />
      </mesh>

      <mesh position={[-0.58, -0.16, 0]}>
        <cylinderGeometry args={[0.15, 0.15, 0.26, 24]} />
        <meshStandardMaterial
          color="#7b8188"
          metalness={0.65}
          roughness={0.35}
        />
      </mesh>

      {/* Solar panels */}
      <mesh position={[0.02, 0.5, 0]}>
        <boxGeometry args={[1.5, 0.05, 0.8]} />
        <meshStandardMaterial
          color="#163d6b"
          metalness={0.32}
          roughness={0.38}
        />
      </mesh>

      <mesh position={[0.02, -0.5, 0]}>
        <boxGeometry args={[1.5, 0.05, 0.8]} />
        <meshStandardMaterial
          color="#163d6b"
          metalness={0.32}
          roughness={0.38}
        />
      </mesh>

      {/* Central mast */}
      <mesh position={[0.34, 0, 0.48]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.035, 0.035, 0.62, 16]} />
        <meshStandardMaterial
          color="#d5d8dc"
          metalness={0.72}
          roughness={0.3}
        />
      </mesh>

      {/* Small high-gain dish */}
      <group position={[0.36, 0, -0.56]} rotation={[Math.PI / 2.4, 0, 0]}>
        <mesh>
          <sphereGeometry
            args={[0.17, 24, 12, 0, Math.PI * 2, 0, Math.PI / 2]}
          />
          <meshStandardMaterial
            color="#d7d9dd"
            metalness={0.4}
            roughness={0.45}
            side={THREE.DoubleSide}
          />
        </mesh>

        <mesh position={[0, 0.14, 0]}>
          <cylinderGeometry args={[0.012, 0.012, 0.34, 12]} />
          <meshStandardMaterial
            color="#dadde1"
            metalness={0.65}
            roughness={0.32}
          />
        </mesh>
      </group>

      {/* Simple antenna */}
      <mesh position={[0.3, 0.16, 0.46]}>
        <cylinderGeometry args={[0.012, 0.012, 0.38, 10]} />
        <meshStandardMaterial
          color="#c8ccd0"
          metalness={0.7}
          roughness={0.3}
        />
      </mesh>
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

  useFrame((_, delta) => {
    if (!orbitRef.current || !satelliteRef.current) return;

    interaction.scrollImpulse *= Math.pow(0.07, delta);

    const speed =
      0.48 + THREE.MathUtils.clamp(interaction.scrollImpulse, -1.5, 1.5) * 1.55;

    orbitRef.current.rotation.y += delta * speed;

    satelliteRef.current.rotation.z += delta * 0.18;
  });

  return (
    <group
      ref={orbitRef}
      rotation={[0.86, 0.38, -0.32]}
    >
      <mesh>
        <torusGeometry args={[1.65, 0.006, 10, 192]} />
        <meshBasicMaterial
          color="#72d9ff"
          transparent
          opacity={0.12}
          toneMapped={false}
        />
      </mesh>

      <group position={[1.65, 0, 0]} ref={satelliteRef}>
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
  const moonRef = useRef<THREE.Group>(null);
  const moonTexture = useLoader(THREE.TextureLoader, MOON_TEXTURE);

  useFrame((_, delta) => {
    if (!orbitRef.current || !moonRef.current) return;

    const speed =
      0.24 + THREE.MathUtils.clamp(interaction.scrollImpulse, -1.2, 1.2) * 0.72;

    orbitRef.current.rotation.y += delta * speed;
    moonRef.current.rotation.y += delta * 0.08;
  });

  moonTexture.colorSpace = THREE.SRGBColorSpace;

  return (
    <group ref={orbitRef} rotation={[0.38, -0.22, 0.18]}>
      <mesh>
        <torusGeometry args={[2.18, 0.004, 8, 224]} />
        <meshBasicMaterial
          color="#d7f6ff"
          transparent
          opacity={0.075}
          toneMapped={false}
        />
      </mesh>

      <Float
        speed={0.65}
        rotationIntensity={0.07}
        floatIntensity={0.06}
      >
        <group ref={moonRef} position={[2.18, 0, 0]}>
          <mesh>
            <sphereGeometry args={[0.34, 48, 48]} />
            <meshStandardMaterial
              map={moonTexture}
              color="#d5d5d5"
              roughness={0.92}
              metalness={0}
            />
          </mesh>

          <mesh scale={1.045}>
            <sphereGeometry args={[0.34, 32, 32]} />
            <meshBasicMaterial
              color="#b7d5e0"
              transparent
              opacity={0.025}
              side={THREE.BackSide}
              depthWrite={false}
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
  const earthTexture = useLoader(THREE.TextureLoader, EARTH_TEXTURE);
  const cloudsTexture = useLoader(THREE.TextureLoader, EARTH_CLOUDS);
  const normalTexture = useLoader(THREE.TextureLoader, EARTH_NORMAL);

  earthTexture.colorSpace = THREE.SRGBColorSpace;
  cloudsTexture.colorSpace = THREE.SRGBColorSpace;

  useFrame((state, delta) => {
    if (!systemRef.current || !earthRef.current || !cloudsRef.current) {
      return;
    }

    const impulse = THREE.MathUtils.clamp(
      interaction.scrollImpulse,
      -1.5,
      1.5
    );

    const earthSpin = 0.13 + impulse * 0.52;

    earthRef.current.rotation.y += delta * earthSpin;
    cloudsRef.current.rotation.y += delta * (earthSpin * 1.07);

    const targetTiltX = -0.07 + state.pointer.y * 0.11;
    const targetTiltY = state.pointer.x * 0.19;

    systemRef.current.rotation.x = THREE.MathUtils.lerp(
      systemRef.current.rotation.x,
      targetTiltX,
      0.035
    );

    systemRef.current.rotation.y = THREE.MathUtils.lerp(
      systemRef.current.rotation.y,
      targetTiltY,
      0.035
    );

    systemRef.current.position.x = THREE.MathUtils.lerp(
      systemRef.current.position.x,
      state.pointer.x * 0.24,
      0.035
    );

    systemRef.current.position.y = THREE.MathUtils.lerp(
      systemRef.current.position.y,
      -0.78 + state.pointer.y * 0.12,
      0.035
    );
  });

  return (
    <group ref={systemRef} position={[0, -0.78, -3.25]}>
      <Float
        speed={0.38}
        rotationIntensity={0.025}
        floatIntensity={0.08}
      >
        <group>
          {/* Earth */}
          <mesh ref={earthRef}>
            <sphereGeometry args={[1.08, 96, 96]} />
            <meshPhongMaterial
              map={earthTexture}
              normalMap={normalTexture}
              normalScale={new THREE.Vector2(0.55, 0.55)}
              color="#dfe8f2"
              specular={new THREE.Color("#40617b")}
              shininess={18}
            />
          </mesh>

          {/* Slow cloud layer */}
          <mesh ref={cloudsRef} scale={1.012}>
            <sphereGeometry args={[1.08, 64, 64]} />
            <meshPhongMaterial
              map={cloudsTexture}
              transparent
              opacity={0.42}
              depthWrite={false}
              shininess={5}
            />
          </mesh>

          {/* Blue atmospheric limb */}
          <mesh scale={1.075}>
            <sphereGeometry args={[1.08, 64, 64]} />
            <meshBasicMaterial
              color="#73d9ff"
              transparent
              opacity={0.085}
              side={THREE.BackSide}
              depthWrite={false}
              blending={THREE.AdditiveBlending}
            />
          </mesh>
        </group>
      </Float>

      <MoonSystem interaction={interaction} />
      <SatelliteOrbit interaction={interaction} />
    </group>
  );
}
