import React, { useRef, useState } from "react";
import { Canvas, useLoader } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { TextureLoader } from "three";

// Planet component
function Planet({ position, textureMap, scale, emissiveColor, onClick }) {
  const planetRef = useRef();

  return (
    <mesh ref={planetRef} position={position} scale={scale} onClick={onClick}>
      <sphereGeometry args={[1, 32, 32]} />
      <meshStandardMaterial
        map={textureMap}         // Use the texture for diffuse
        emissive={emissiveColor}  // Emissive lighting effect
        emissiveIntensity={0.3}   // Emissive intensity to control the strength of the emission
        roughness={0.5}           // Roughness of the material
        metalness={0.5}           // Metallicity of the material
        emissiveMap={textureMap}  // Optional: You could also use the texture map itself as emissiveMap
      />
    </mesh>
  );
}


export default function Universe() {
  const [message, setMessage] = useState("Click a planet!");

  const handlePlanetClick = (planetName) => {
    setMessage(`You clicked on ${planetName}`);
    console.log(`Planet clicked: ${planetName}`);
  };

  // Load textures for each planet
  const earthTexture = useLoader(TextureLoader, "./textures/8k_earth_daymap.jpg");
  const marsTexture = useLoader(TextureLoader, "./textures/2k_mars.jpg");
  const sunTexture = useLoader(TextureLoader, "./textures/8k_sun.jpg");

  return (
    <div style={{ height: "100vh", width: "100vw", position: "relative" }}>
      <Canvas
        camera={{ position: [0, 0, 15], fov: 75 }}
        style={{ height: "100%", width: "100%" }}
      >
        <ambientLight intensity={0.4} />
        
        {/* Simulate sunlight */}
        <directionalLight 
          position={[10, 10, 10]} 
          intensity={1} 
          color="white" 
          castShadow
        />

        {/* Planets */}
        <Planet
          position={[5, 1, -7]}
          textureMap={earthTexture}  // Using the texture for Earth
          scale={[3, 3, 3]}
          emissiveColor=""           // No emissive color for Earth
          onClick={() => handlePlanetClick("Earth")}  // Handle click for Earth
        />
        <Planet
          position={[-6, -3, 4]}
          textureMap={marsTexture}  // Using the texture for Mars
          scale={[2, 2, 2]}
          emissiveColor="darkred"   // Emissive color for Mars
          onClick={() => handlePlanetClick("Mars")}  // Handle click for Mars
        />
        <Planet
          position={[0, 6, 5]}
          textureMap={sunTexture}   // Using the texture for Sun
          scale={[6, 6, 6]}
          emissiveColor="orange"    // Emissive color for Sun
          onClick={() => handlePlanetClick("Sun")}  // Handle click for Sun
        />

        {/* Orbit controls */}
        <OrbitControls />
      </Canvas>

      <div
        style={{
          position: "absolute",
          top: 20,
          left: 20,
          color: "white",
          fontSize: "24px",
        }}
      >
        {message}
      </div>

      {/* Rotating background */}
      <div className="rotating-background" />
    </div>
  );
}
