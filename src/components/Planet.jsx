import React, { forwardRef, useRef } from "react";
import { useFrame } from "@react-three/fiber";

const Planet = forwardRef(({ position, textureMap, scale, emissiveColor, speed = 1, onClick, orbitRadius }, ref) => {
  const meshRef = useRef();
  const orbitAngle = useRef(0);
  
  useFrame(() => {
    if (meshRef.current) {
      // Self rotation
      meshRef.current.rotation.y += speed * 0.00000001;
      
      // Orbital rotation around the sun (only if not clicked)
      if (orbitRadius && ref && ref.current && !ref.current.isSelected) {
        orbitAngle.current += speed * 0.005;
        const x = Math.cos(orbitAngle.current) * orbitRadius;
        const z = Math.sin(orbitAngle.current) * orbitRadius;
        meshRef.current.position.x = x;
        meshRef.current.position.z = z;
      }
    }
  });

  React.useImperativeHandle(ref, () => ({
    isSelected: false,
    orbitAngle,
    orbitRadius
  }));

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