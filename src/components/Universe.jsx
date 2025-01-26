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

  const [cameraTarget, setCameraTarget] = useState([914, 0, 630]); // Initial target (Earth's position)
  const orbitControlsRef = useRef();
  const cameraPosition = useRef([40, 30, -170]); // Starting camera position

  useEffect(() => {
    if (!orbitControlsRef.current) return;
    orbitControlsRef.current.enableZoom = false; // Disable zoom while moving the camera
  }, []);

  if (!mercuryTexture || !venusTexture || !earthTexture || !marsTexture || !jupiterTexture || !saturnTexture || !saturnRingsTexture || !uranusTexture || !neptuneTexture || !sunTexture) {
    return <div>Loading textures...</div>;
  }

  const planetData = [
    { name: "mercury", position: [10, 0, -25], texture: mercuryTexture, scale: [1.5, 1.5, 1.5], speed: 2 },
    { name: "venus", position: [20, 0, -35], texture: venusTexture, scale: [2.4, 2.4, 2.4], speed: 1.75 },
    { name: "earth", position: [30, 0, -45], texture: earthTexture, scale: [3, 3, 3], speed: 1.5 },
    { name: "mars", position: [40, 0, -55], texture: marsTexture, scale: [2.1, 2.1, 2.1], speed: 1.2 },
    { name: "jupiter", position: [60, 0, -75], texture: jupiterTexture, scale: [6, 6, 6], speed: 0.8 },
    { name: "saturn", position: [90, 0, -120], texture: saturnTexture, scale: [5.4, 5.4, 5.4], speed: 0.6 },
    { name: "uranus", position: [105, 0, -135], texture: uranusTexture, scale: [4.2, 4.2, 4.2], speed: 0.4 },
    { name: "neptune", position: [120, 0, -150], texture: neptuneTexture, scale: [3.9, 3.9, 3.9], speed: 0.3 },
  ];

  const handlePlanetClick = (planetName, position) => {
    setMessage(`You clicked on ${planetName}`);
    setLoading(true);
    setSelectedPlanet(planetName);
    setCameraTarget(position); // Set the new target position for the camera
  };

  const handleBackToStart = () => {
    setSelectedPlanet(null);
    setMessage("Click a planet!");
    setLoading(false);
    setCameraTarget([30, 0, -45]); // Reset camera target back to Earth
  };

  const PlanetOrbit = ({ planet }) => (
    <Planet
      position={planet.position}
      textureMap={planet.texture}
      scale={planet.scale}
      speed={planet.speed}  // Pass the speed to the Planet component
      onClick={() => handlePlanetClick(planet.name, planet.position)}
    />
  );

  const SaturnWithRings = ({ position, saturnRingsTexture }) => (
    <group position={position}>
      <Planet position={[0, 0, 0]} textureMap={saturnTexture} scale={[5.4, 5.4, 5.4]} speed={0.04} onClick={() => handlePlanetClick("saturn", position)} />
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
        <ringGeometry args={[6.3, 9.6, 64]} />
        <meshStandardMaterial
          map={saturnRingsTexture}
          transparent
          opacity={1}
          alphaTest={0.1}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  );

  // Mouse Wheel Event Listener
  const handleWheel = (event) => {
    console.log("Mouse wheel pressed at position:", event.clientX, event.clientY);
  };

  useEffect(() => {
    window.addEventListener("wheel", handleWheel);
    return () => {
      window.removeEventListener("wheel", handleWheel);
    };
  }, []);

  return (
    <div style={{ height: "100vh", width: "100vw", position: "relative" }}>
      <div className="rotating-background"></div>
      <Canvas
        style={{ height: "100%", width: "100%" }}
        camera={{ fov: 120, position: cameraPosition.current }}
      >
        <ambientLight intensity={0.4} />
        <directionalLight position={[10, 10, 10]} intensity={1} color="white" castShadow />
        
        <Planet position={[0, 0, 0]} textureMap={sunTexture} scale={[8, 8, 8]} emissiveColor="orange" speed={0} />

        {planetData.map((planet) => (
          planet.name === "saturn" ? (
            <SaturnWithRings key={planet.name} position={planet.position} saturnRingsTexture={saturnRingsTexture} />
          ) : (
            <PlanetOrbit key={planet.name} planet={planet} />
          )
        ))}

        {/* Adding CameraMovement component here */}
        <CameraMovement cameraTarget={cameraTarget} cameraPosition={cameraPosition} />

        <OrbitControls ref={orbitControlsRef} />
      </Canvas>

      {loading && (
        <div
          className="loading-screen"
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            color: "white",
          }}
        >
          <div>🚀 Zooming in...</div>
        </div>
      )}

      {!loading && selectedPlanet && (
        <div
          className="planet-content"
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            color: "white",
            textAlign: "center",
            backgroundColor: "rgba(0, 0, 0, 0.7)",
            padding: "20px",
            borderRadius: "10px",
          }}
        >
          <h2>{selectedPlanet} Content</h2>
          <p>Here is some interesting content about {selectedPlanet}!</p>
          <button
            onClick={handleBackToStart}
            style={{
              marginTop: "20px",
              padding: "10px 20px",
              fontSize: "16px",
              backgroundColor: "#333",
              color: "white",
              border: "none",
              borderRadius: "5px",
            }}
          >
            Back to the universe
          </button>
        </div>
      )}

      <div style={{ position: "absolute", top: 20, left: 20, color: "white", fontSize: "24px" }}>
        {message}
      </div>
    </div>
  );
}
