import React, { useRef } from 'react';
import { Box, Plane, Text, useGLTF, Float, MeshReflectorMaterial } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// A beautifully pre-modeled Macbook from the Poimandres (R3F creators) open source collection
const Macbook = ({ setView, ...props }) => {
  const gltf = useGLTF('https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/macbook/model.gltf');
  return (
    <group {...props} onClick={(e) => { e.stopPropagation(); setView('projects'); }} onPointerOver={() => document.body.style.cursor='pointer'} onPointerOut={() => document.body.style.cursor='auto'}>
      <Float rotationIntensity={0.2} floatIntensity={1} speed={2}>
        <primitive object={gltf.scene} />
      </Float>
      <Text position={[0, 1.5, 0]} fontSize={0.3} color="#ffffff" anchorX="center" anchorY="middle">
        Projects
      </Text>
    </group>
  );
};

// Simple stylized Arcade/Contact section
const ContactArcade = ({ setView, ...props }) => {
  const meshRef = useRef();
  
  useFrame((state) => {
    if(meshRef.current){
       meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime) * 0.2;
    }
  });

  return (
    <group {...props} onClick={(e) => { e.stopPropagation(); setView('contact'); }} onPointerOver={() => document.body.style.cursor='pointer'} onPointerOut={() => document.body.style.cursor='auto'}>
      <Float rotationIntensity={0.5} floatIntensity={2} speed={1.5}>
        <group ref={meshRef}>
          {/* Main Body */}
          <Box args={[1.5, 2.5, 1]} position={[0, 0, 0]} castShadow receiveShadow>
            <meshStandardMaterial color="#111" roughness={0.2} metalness={0.8} />
          </Box>
          {/* Glowing Neon Screen */}
          <Box args={[1.2, 0.8, 0.1]} position={[0, 0.5, 0.51]}>
            <meshStandardMaterial color="#ff0055" emissive="#ff0055" emissiveIntensity={2} toneMapped={false} />
          </Box>
          {/* Floating Letters */}
          <Text position={[0, -0.2, 0.55]} fontSize={0.2} color="white">
            Hire Me
          </Text>
        </group>
      </Float>
      <Text position={[0, 2, 0]} fontSize={0.3} color="#ffffff" anchorX="center" anchorY="middle">
        Contact
      </Text>
    </group>
  );
};

// Stylized About Section (Whiteboard/Glass panel)
const AboutPanel = ({ setView, ...props }) => {
  return (
    <group {...props} onClick={(e) => { e.stopPropagation(); setView('about'); }} onPointerOver={() => document.body.style.cursor='pointer'} onPointerOut={() => document.body.style.cursor='auto'}>
      <Float rotationIntensity={0.1} floatIntensity={0.5} speed={1}>
        <Box args={[3, 2, 0.1]} castShadow receiveShadow>
          <meshPhysicalMaterial 
            color="#ffffff" 
            transmission={0.9} 
            opacity={1} 
            metalness={0.1} 
            roughness={0.1} 
            ior={1.5} 
            thickness={0.5} 
          />
        </Box>
        <Text position={[0, 0.2, 0.1]} fontSize={0.4} color="#001b3a" fontWeight="bold">
          HELLO WORLD
        </Text>
        <Text position={[0, -0.3, 0.1]} fontSize={0.2} color="#001b3a">
           Click to read more
        </Text>
      </Float>
      <Text position={[0, 1.8, 0]} fontSize={0.3} color="#ffffff" anchorX="center" anchorY="middle">
        About Me
      </Text>
    </group>
  );
};

export const RoomScene = ({ setView }) => {
  return (
    <group>
      {/* High-end glossy floor using MeshReflectorMaterial */}
      <Plane args={[50, 50]} rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, 0]}>
        <MeshReflectorMaterial
          blur={[300, 100]}
          resolution={1024}
          mixBlur={1}
          mixStrength={80}
          roughness={1}
          depthScale={1.2}
          minDepthThreshold={0.4}
          maxDepthThreshold={1.4}
          color="#050510"
          metalness={0.8}
        />
      </Plane>

      {/* Center piece / Decoration */}
      <Box args={[2, 0.1, 2]} position={[0, -1.95, 0]}>
         <meshStandardMaterial color="#333" />
      </Box>

      {/* Sections distributed around the room */}
      {/* Target points correspond to CameraRig.jsx logic */}
      
      {/* Projects - Left */}
      <Macbook position={[-5, 0, 0]} rotation={[0, Math.PI / 4, 0]} setView={setView} />

      {/* About - Right */}
      <AboutPanel position={[5, 0, 0]} rotation={[0, -Math.PI / 4, 0]} setView={setView} />

      {/* Contact - Back */}
      <ContactArcade position={[0, -0.5, -5]} setView={setView} />

    </group>
  );
};

// Preload the Macbook to avoid stutter
useGLTF.preload('https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/macbook/model.gltf');
