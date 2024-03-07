import * as THREE from "three";

export async function loadTextures(features) {
  const textureLoader = new THREE.TextureLoader();
  const textureMap = {};

  // Use Promise.all to wait for all textures to load
  await Promise.all(
    features.map(async (feature) => {
      const { ISO_A2 } = feature.properties;
      const url = `https://raw.githubusercontent.com/ankitmehta94/Globe_Statistics/master/flags/${ISO_A2}.png`;

      try {
        // Use await to wait for the texture to load before proceeding
        const texture = await textureLoader.loadAsync(url);
        const material = new THREE.MeshBasicMaterial({ map: texture });
        textureMap[ISO_A2] = material;
      } catch (error) {
        console.error("Error loading texture for", ISO_A2, error);
      }
    })
  );

  return textureMap;
}
