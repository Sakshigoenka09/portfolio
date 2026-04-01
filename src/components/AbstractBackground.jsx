import React, { useRef, useMemo, useCallback } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

const PARTICLE_COUNT = 400;
const REPULSE_RADIUS = 3;
const REPULSE_STRENGTH = 0.08;

const Particles = () => {
  const pointsRef = useRef();
  const linesRef = useRef();
  const lightRef = useRef();
  const { viewport } = useThree();

  // Generate random particle positions & velocities once
  const [positions, basePositions, velocities] = useMemo(() => {
    const pos = new Float32Array(PARTICLE_COUNT * 3);
    const basePos = new Float32Array(PARTICLE_COUNT * 3);
    const vel = new Float32Array(PARTICLE_COUNT * 3);
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const x = (Math.random() - 0.5) * 25;
      const y = (Math.random() - 0.5) * 25;
      const z = (Math.random() - 0.5) * 10 - 2;
      pos[i * 3] = x;
      pos[i * 3 + 1] = y;
      pos[i * 3 + 2] = z;
      basePos[i * 3] = x;
      basePos[i * 3 + 1] = y;
      basePos[i * 3 + 2] = z;
      vel[i * 3] = 0;
      vel[i * 3 + 1] = 0;
      vel[i * 3 + 2] = 0;
    }
    return [pos, basePos, vel];
  }, []);

  // Pre-allocate line geometry (max connections)
  const maxLines = 600;
  const linePositions = useMemo(() => new Float32Array(maxLines * 6), []);

  useFrame((state) => {
    if (!pointsRef.current) return;
    const posArr = pointsRef.current.geometry.attributes.position.array;

    // Convert mouse to world-space coordinates
    const mouseX = (state.mouse.x * viewport.width) / 2;
    const mouseY = (state.mouse.y * viewport.height) / 2;

    // Update each particle
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const ix = i * 3;
      const iy = i * 3 + 1;
      const iz = i * 3 + 2;

      // Distance from cursor
      const dx = posArr[ix] - mouseX;
      const dy = posArr[iy] - mouseY;
      const dist = Math.sqrt(dx * dx + dy * dy);

      // Repulse particles away from cursor
      if (dist < REPULSE_RADIUS && dist > 0.01) {
        const force = (REPULSE_RADIUS - dist) / REPULSE_RADIUS * REPULSE_STRENGTH;
        velocities[ix] += (dx / dist) * force;
        velocities[iy] += (dy / dist) * force;
      }

      // Spring force back to original (base) position
      velocities[ix] += (basePositions[ix] - posArr[ix]) * 0.005;
      velocities[iy] += (basePositions[iy] - posArr[iy]) * 0.005;

      // Damping
      velocities[ix] *= 0.95;
      velocities[iy] *= 0.95;

      // Apply velocity
      posArr[ix] += velocities[ix];
      posArr[iy] += velocities[iy];
    }
    pointsRef.current.geometry.attributes.position.needsUpdate = true;

    // Draw lines between nearby particles
    let lineIndex = 0;
    const connectDist = 2.5;
    for (let i = 0; i < PARTICLE_COUNT && lineIndex < maxLines; i++) {
      for (let j = i + 1; j < PARTICLE_COUNT && lineIndex < maxLines; j++) {
        const dx = posArr[i * 3] - posArr[j * 3];
        const dy = posArr[i * 3 + 1] - posArr[j * 3 + 1];
        const dz = posArr[i * 3 + 2] - posArr[j * 3 + 2];
        const d = dx * dx + dy * dy + dz * dz;
        if (d < connectDist * connectDist) {
          linePositions[lineIndex * 6] = posArr[i * 3];
          linePositions[lineIndex * 6 + 1] = posArr[i * 3 + 1];
          linePositions[lineIndex * 6 + 2] = posArr[i * 3 + 2];
          linePositions[lineIndex * 6 + 3] = posArr[j * 3];
          linePositions[lineIndex * 6 + 4] = posArr[j * 3 + 1];
          linePositions[lineIndex * 6 + 5] = posArr[j * 3 + 2];
          lineIndex++;
        }
      }
    }

    if (linesRef.current) {
      linesRef.current.geometry.setAttribute(
        'position',
        new THREE.BufferAttribute(linePositions.slice(0, lineIndex * 6), 3)
      );
      linesRef.current.geometry.attributes.position.needsUpdate = true;
      linesRef.current.geometry.setDrawRange(0, lineIndex * 2);
    }

    // Cursor glow
    if (lightRef.current) {
      lightRef.current.position.x = THREE.MathUtils.lerp(lightRef.current.position.x, mouseX, 0.1);
      lightRef.current.position.y = THREE.MathUtils.lerp(lightRef.current.position.y, mouseY, 0.1);
    }
  });

  return (
    <>
      <pointLight ref={lightRef} position={[0, 0, 5]} intensity={8} color="#9f7aea" distance={15} />

      {/* Particles */}
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" count={PARTICLE_COUNT} array={positions} itemSize={3} />
        </bufferGeometry>
        <pointsMaterial size={0.07} color="#c4b5fd" transparent opacity={0.9} sizeAttenuation depthWrite={false} />
      </points>

      {/* Connection Lines */}
      <lineSegments ref={linesRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" count={0} array={linePositions} itemSize={3} />
        </bufferGeometry>
        <lineBasicMaterial color="#9f7aea" transparent opacity={0.15} />
      </lineSegments>
    </>
  );
};

export const AbstractBackground = () => {
  return (
    <>
      <ambientLight intensity={0.3} />
      <Particles />
    </>
  );
};
