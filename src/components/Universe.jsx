import React, { useState, useRef, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import useTextures from "./useTextures";
import Planet from "./Planet";
import * as THREE from "three";

// CameraMovement Component
function CameraMovement({ cameraTarget, cameraPosition }) {
  useFrame(() => {
    if (!cameraTarget) return;

    // Lerp (linear interpolation) the camera position towards the target, increase the lerp speed
    cameraPosition.current = cameraPosition.current.map((v, i) =>
      THREE.MathUtils.lerp(v, cameraTarget[i], 10) // Increased speed here
    );
  });

  return null;
}

export default function Universe() {
  const [message, setMessage] = useState("Click a planet!");
  const { mercuryTexture, venusTexture, earthTexture, marsTexture, jupiterTexture, saturnTexture, saturnRingsTexture, uranusTexture, neptuneTexture, sunTexture } = useTextures();
  const [loading, setLoading] = useState(false);
  const [selectedPlanet, setSelectedPlanet] = useState(null);
  const planetRefs = useRef([]);
  const [cameraTarget, setCameraTarget] = useState([40, 30, -170]); // Initial target (Earth's position)
  const orbitControlsRef = useRef();
  const cameraPosition = useRef([40, 30, -170]); // Starting camera position

  useEffect(() => {
    document.body.style.background = "url('./../public/8k_stars.jpg') no-repeat center center";
    document.body.style.backgroundSize = "cover";
    if (!orbitControlsRef.current) return;
    orbitControlsRef.current.enableZoom = false; // Disable zoom while moving the camera
  }, []);

  const planetData = [
    { name: "mercury", orbitRadius: 25, texture: mercuryTexture, scale: [1.5, 1.5, 1.5], speed: 2 },
    { name: "venus", orbitRadius: 35, texture: venusTexture, scale: [2.4, 2.4, 2.4], speed: 1.75 },
    { name: "earth", orbitRadius: 45, texture: earthTexture, scale: [3, 3, 3], speed: 1.5 },
    { name: "mars", orbitRadius: 55, texture: marsTexture, scale: [2.1, 2.1, 2.1], speed: 1.2 },
    { name: "jupiter", orbitRadius: 75, texture: jupiterTexture, scale: [6, 6, 6], speed: 0.8 },
    { name: "saturn", orbitRadius: 95, texture: saturnTexture, scale: [5.4, 5.4, 5.4], speed: 0.6 },
    { name: "uranus", orbitRadius: 115, texture: uranusTexture, scale: [4.2, 4.2, 4.2], speed: 0.4 },
    { name: "neptune", orbitRadius: 135, texture: neptuneTexture, scale: [3.9, 3.9, 3.9], speed: 0.3 },
  ];

  const handlePlanetClick = (planetName, planet) => {
    setMessage(`You clicked on ${planetName}`);
    setLoading(true);
    setSelectedPlanet(planetName);
    
    // Get current position of the planet
    const x = Math.cos(planet.current.orbitAngle.current) * planet.current.orbitRadius;
    const z = Math.sin(planet.current.orbitAngle.current) * planet.current.orbitRadius;
    
    // Set this planet as the new center
    planet.current.isSelected = true;
    setCameraTarget([x, 0, z]);
  };

  const renderScene = () => (
    <Canvas>
      <OrbitControls ref={orbitControlsRef} enableZoom={true} enablePan={true} enableRotate={true} />
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <CameraMovement cameraTarget={cameraTarget} cameraPosition={cameraPosition} />
      
      {/* Sun */}
      <mesh>
        <sphereGeometry args={[10, 32, 32]} />
        <meshStandardMaterial map={sunTexture} />
      </mesh>

      {/* Planets */}
      {planetData.map((planet, index) => (
        <PlanetOrbit key={planet.name} planet={planet} index={index} />
      ))}
    </Canvas>
  );

  const handleBackToStart = () => {
    setSelectedPlanet(null);
    setMessage("Click a planet!");
    setLoading(false);
    
    // Reset all planets' isSelected state
    planetRefs.current.forEach(ref => {
      if (ref.current) {
        ref.current.isSelected = false;
      }
    });
    
    // Return to sun-centric view
    setCameraTarget([30, 0, -45]);
  };

  const PlanetOrbit = ({ planet, index }) => {
    const planetRef = useRef();
    // Store ref in planetRefs array
    planetRefs.current[index] = planetRef;
    
    return (
    <>
      <Planet
        ref={planetRef}
        position={[0, 0, 0]}
        textureMap={planet.texture}
        scale={planet.scale}
        speed={planet.speed}
        orbitRadius={planet.orbitRadius}
        onClick={() => handlePlanetClick(planet.name, planetRef)}
      />
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[planet.orbitRadius - 0.2, planet.orbitRadius + 0.2, 128]} />
        <meshBasicMaterial color="#333333" transparent opacity={0.3} side={THREE.DoubleSide} />
      </mesh>
    </>
  );

  if (!mercuryTexture || !venusTexture || !earthTexture || !marsTexture || !jupiterTexture || !saturnTexture || !saturnRingsTexture || !uranusTexture || !neptuneTexture || !sunTexture) {
    return <div>Loading textures...</div>;
  }

  return (
    <>
      <div className="rotating-background" />
      {loading && <div className="loading-overlay">Loading...</div>}
      {message && <div className="message-overlay">{message}</div>}
      {selectedPlanet && (
        <button className="back-button" onClick={handleBackToStart}>
          Back to Solar System
        </button>
      )}
      {renderScene()}
    </>
  );
  }

  const SaturnWithRings = ({ orbitRadius }) => (
    <group>
      <Planet
        position={[0, 0, 0]}
        textureMap={saturnTexture}
        scale={[5.4, 5.4, 5.4]}
        speed={0.6}
        orbitRadius={orbitRadius}
        onClick={() => handlePlanetClick("saturn", [orbitRadius, 0, 0])}
      />
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[6.3, 9.6, 64]} />
        <meshStandardMaterial
          map={saturnRingsTexture}
          transparent
          opacity={1}
          alphaTest={0.1}
          side={THREE.DoubleSide}
        />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[orbitRadius - 0.2, orbitRadius + 0.2, 128]} />
        <meshBasicMaterial color="#333333" transparent opacity={0.3} side={THREE.DoubleSide} />
      </mesh>
    </group>
  );

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <div style={{ position: "absolute", top: "20px", left: "20px", color: "white", zIndex: 1 }}>
        {message}
      </div>
      {selectedPlanet && (
        <button
          onClick={handleBackToStart}
          style={{
            position: "absolute",
            top: "60px",
            left: "20px",
            zIndex: 1,
            padding: "10px",
            cursor: "pointer",
          }}
        >
          Back to Start
        </button>
      )}
      <Canvas camera={{ position: cameraPosition.current }}>
        <CameraMovement cameraTarget={cameraTarget} cameraPosition={cameraPosition} />
        <OrbitControls ref={orbitControlsRef} enablePan={false} />
        <ambientLight intensity={0.5} />
        <pointLight position={[0, 0, 0]} intensity={1} />
        
        {/* Sun */}
        <Planet position={[0, 0, 0]} textureMap={sunTexture} scale={[12, 12, 12]} emissiveColor="yellow" speed={0.1} />

        {/* Planet Orbits */}
        {planetData.map((planet, index) => (
          <PlanetOrbit key={planet.name} planet={planet} index={index} />
        ))}

        {/* Saturn with Rings */}
        <SaturnWithRings orbitRadius={95} />
      </Canvas>
    </div>
  );
}