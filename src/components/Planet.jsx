import React, { forwardRef, useRef } from "react";
import { useFrame } from "@react-three/fiber";

const Planet = forwardRef(({ position, textureMap, scale, emissiveColor, speed = 1, onClick }, ref) => {
  const meshRef = useRef();

  useFrame(() => {
    if (meshRef.current) {
      // Rotate the planet based on the speed value provided
      meshRef.current.rotation.y += speed * 0.01;  // Adjust the multiplier for desired rotation speed
    }
  });

  return (
    <mesh ref={meshRef} position={position} scale={scale} onClick={onClick}>
      <sphereGeometry args={[1, 32, 32]} />
      <meshStandardMaterial
        map={textureMap}
        emissive={emissiveColor || "black"}
        emissiveIntensity={0.3}
        roughness={0.5}
        metalness={0.5}
        emissiveMap={textureMap}
      />
    </mesh>
  );
});

Planet.displayName = "Planet";

export default Planet;