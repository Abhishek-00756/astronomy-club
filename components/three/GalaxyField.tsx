"use client";

import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

const VERTEX_SHADER = `
varying vec2 vUv;

void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

const FRAGMENT_SHADER = `
precision highp float;

uniform float uTime;
uniform vec2 uMouse;
uniform float uIntensity;
uniform float uDensity;
uniform float uSpeed;

varying vec2 vUv;

#define PI 3.14159265359
#define LAYERS 4

float hash21(vec2 p) {
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}

float starGlow(vec2 p, float flare) {
  float d = max(length(p), 0.0001);

  float glow = 0.024 / d;

  float rayA = pow(
    max(0.0, 1.0 - abs(p.x * p.y * 1250.0)),
    6.0
  );

  p = mat2(
    0.7071, -0.7071,
    0.7071,  0.7071
  ) * p;

  float rayB = pow(
    max(0.0, 1.0 - abs(p.x * p.y * 900.0)),
    7.0
  );

  glow += flare * (rayA + rayB * 0.32);
  glow *= smoothstep(1.15, 0.02, d);

  return glow;
}

vec3 galaxyLayer(vec2 uv, float layer, float time) {
  vec3 color = vec3(0.0);

  vec2 grid = fract(uv) - 0.5;
  vec2 id = floor(uv);

  for (int y = -1; y <= 1; y++) {
    for (int x = -1; x <= 1; x++) {
      vec2 offset = vec2(float(x), float(y));
      vec2 cell = id + offset;

      float seed = hash21(cell + layer * 37.17);
      float seed2 = hash21(cell + layer * 91.73);

      float size = fract(seed * 451.17);
      float brightness = 0.18 + size * 0.95;

      float twinkle =
        0.78 +
        0.22 * sin(
          time * (0.65 + seed2 * 1.4) +
          seed * 6.28318
        );

      vec2 drift = vec2(
        sin(time * 0.16 + seed * 9.0),
        cos(time * 0.12 + seed2 * 11.0)
      ) * 0.035;

      vec2 local = grid - offset - drift;

      float flare = smoothstep(0.78, 1.0, size);
      float star = starGlow(local, flare);

      vec3 starColor = mix(
        vec3(0.68, 0.84, 1.0),
        vec3(1.0, 0.96, 0.82),
        seed2
      );

      color += star * brightness * twinkle * starColor;
    }
  }

  return color;
}

void main() {
  vec2 aspectUv = (vUv - 0.5);
  aspectUv.x *= 1.65;

  vec2 mouseOffset = (uMouse - 0.5);
  mouseOffset.x *= 1.65;

  // React Bits-style pointer response:
  // the stars subtly bend/flow away from the cursor while the whole
  // field shifts with it. The motion is intentionally restrained.
  aspectUv += mouseOffset * 0.055;

  vec2 fromMouse = aspectUv - mouseOffset * 0.35;
  float mouseDistance = length(fromMouse);
  float mouseInfluence = exp(-mouseDistance * mouseDistance * 4.2);

  vec2 mouseDirection = normalize(fromMouse + vec2(0.0001));
  aspectUv += mouseDirection * mouseInfluence * 0.075;
  aspectUv += vec2(-mouseDirection.y, mouseDirection.x) *
    mouseInfluence * 0.035;

  float radius = length(aspectUv);
  float angle = atan(aspectUv.y, aspectUv.x);

  // Gentle continuous rotation gives the field a living, drifting quality.
  angle += uTime * uSpeed * 0.055;
  angle += mouseInfluence * 0.12;

  vec2 rotated = vec2(cos(angle), sin(angle)) * radius;
  rotated += vec2(0.0);

  vec3 color = vec3(0.0);

  for (int i = 0; i < LAYERS; i++) {
    float fi = float(i);
    float depth = fract(fi * 0.27 + uTime * uSpeed * 0.025);

    float scale = mix(
      17.0 * uDensity,
      0.65 * uDensity,
      depth
    );

    float fade = smoothstep(0.0, 0.8, depth) *
      smoothstep(1.0, 0.72, depth);

    vec2 layerUv = rotated * scale;
    layerUv += vec2(fi * 81.37, fi * 43.21);

    color += galaxyLayer(layerUv, fi, uTime) * fade;
  }

  // Concentrate a small amount of energy toward the middle,
  // without creating a solid glowing blob.
  float core = exp(-radius * radius * 6.0);
  color += vec3(0.30, 0.58, 0.75) * core * 0.035;

  color *= uIntensity;

  float vignette = smoothstep(1.35, 0.15, radius);
  float alpha = clamp(vignette * 0.78, 0.0, 0.78);

  gl_FragColor = vec4(color, alpha);
}
`;

export default function GalaxyField() {
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  useFrame((state) => {
    if (!materialRef.current) return;

    materialRef.current.uniforms.uTime.value =
      state.clock.elapsedTime;

    materialRef.current.uniforms.uMouse.value.lerp(
      new THREE.Vector2(
        state.pointer.x * 0.5 + 0.5,
        state.pointer.y * 0.5 + 0.5
      ),
      0.035
    );
  });

  return (
    <mesh
      position={[0, 0, -13]}
      scale={[24, 14.5, 1]}
      renderOrder={-20}
    >
      <planeGeometry args={[2, 2]} />

      <shaderMaterial
        ref={materialRef}
        vertexShader={VERTEX_SHADER}
        fragmentShader={FRAGMENT_SHADER}
        transparent
        depthWrite={false}
        depthTest={false}
        blending={THREE.AdditiveBlending}
        uniforms={{
          uTime: { value: 0 },
          uMouse: {
            value: new THREE.Vector2(0.5, 0.5),
          },
          uIntensity: { value: 0.56 },
          uDensity: { value: 0.9 },
          uSpeed: { value: 0.8 },
        }}
      />
    </mesh>
  );
}
