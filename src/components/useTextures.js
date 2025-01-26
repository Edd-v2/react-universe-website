import { useLoader } from "@react-three/fiber";
import { TextureLoader } from "three";

const useTextures = () => {
  const mercuryTexture = useLoader(TextureLoader, "./textures/8k_mercury.jpg");
  const venusTexture = useLoader(TextureLoader, "./textures/8k_venus_surface.jpg");
  const earthTexture = useLoader(TextureLoader, "./textures/8k_earth_daymap.jpg");
  const marsTexture = useLoader(TextureLoader, "./textures/2k_mars.jpg");
  const jupiterTexture = useLoader(TextureLoader, "./textures/8k_jupiter.jpg");
  const saturnTexture = useLoader(TextureLoader, "./textures/8k_saturn.jpg");
  const saturnRingsTexture = useLoader(TextureLoader, "./textures/8k_saturn_ring_alpha.png");
  const uranusTexture = useLoader(TextureLoader, "./textures/2k_uranus.jpg");
  const neptuneTexture = useLoader(TextureLoader, "./textures/2k_neptune.jpg");
  const sunTexture = useLoader(TextureLoader, "./textures/8k_sun.jpg");

  return {
    mercuryTexture,
    venusTexture,
    earthTexture,
    marsTexture,
    jupiterTexture,
    saturnTexture,
    saturnRingsTexture,
    uranusTexture,
    neptuneTexture,
    sunTexture,
  };
};

export default useTextures;
