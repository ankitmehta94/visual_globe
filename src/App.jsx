import React, {
  useEffect,
  useState,
  useRef,
  useMemo,
  useCallback,
} from "react";
import DATA from "../data/DATA.json";
import GEODATA from "../data/GEODATA.json";
import {
  DISPLAY_DATA,
  GDP_PER_CAPITA,
  LOW_YEAR,
  GDP,
  GDP_NAME,
  GDP_PER_CAPITA_NAME,
} from "../data/constants";
import * as THREE from "three";
import Controls from "./components/Controls";
import Globe from "react-globe.gl";

const App = () => {
  const [textureMap, setTextureMap] = useState(false);
  //   useEffect(() => {
  //     // Async operations for loading textures
  //     // This ensures they're only executed client-side
  //     // const loader = new THREE.ImageBitmapLoader();
  //     const textureLoader = new THREE.TextureLoader();
  //     textureLoader.setCrossOrigin("anonymous");
  //     const loadTextures = async () => {
  //       const textureMap = {};
  //       for (const feature of GEODATA.features) {
  //         const { ISO_A2 } = feature.properties;
  //         const url = `./static/flags/${ISO_A2}.png`;
  //         try {
  //           const texture = await textureLoader.loadAsync(url);
  //           //   const texture = new THREE.CanvasTexture(imageBitmap);
  //           texture.colorSpace = THREE.SRGBColorSpace;
  //           console.log(texture, "texture");
  //           const material = new THREE.MeshBasicMaterial({
  //             map: texture,
  //             color: 0xffffff,
  //             side: THREE.DoubleSide,
  //           });
  //           console.log(material, "material");
  //           textureMap[ISO_A2] = material;
  //         } catch (error) {
  //           console.error("Error loading image for", ISO_A2, error);
  //         }
  //       }
  //       setTextureMap(textureMap);
  //     };

  //     loadTextures();
  //   }, []);
  const globe = useRef();
  const [dataType, setDataType] = useState(GDP_PER_CAPITA);
  const [year, setYear] = useState(LOW_YEAR);
  const [isPlaying, setIsPlaying] = useState(false);
  const [interval, setInervalValue] = useState();

  const play = useCallback(() => {
    setIsPlaying(true);
    setInervalValue(
      setInterval(() => {
        setYear((year) => {
          if (year < 2021) {
            return year + 1;
          } else {
            return 1960;
          }
        });
      }, 500)
    );
  }, []);
  const pause = () => {
    setIsPlaying(false);
    console.log(interval);
    clearInterval(interval);
  };
  const TAB_LIST = useMemo(
    () => [
      {
        id: GDP,
        name: GDP_NAME,
        Component: () => null,
        onClick: () => setDataType(GDP),
      },
      {
        id: GDP_PER_CAPITA,
        name: GDP_PER_CAPITA_NAME,
        Component: () => null,
        onClick: () => setDataType(GDP_PER_CAPITA),
      },
    ],
    []
  );

  useEffect(() => {
    const loadAndSetTextures = async () => {
      const loadedTextures = await loadTextures(GEODATA.features);
      setTextureMap(loadedTextures);
    };

    loadAndSetTextures();
    play();
  }, []);
  useEffect(() => {
    if (globe.current) {
      globe.current.pointOfView({
        lat: 41,
        lng: -95,
        altitude: zoomDictionary[getDeviceType()],
      });
    }
  }, [textureMap]);
  const display = DISPLAY_DATA[dataType];
  if (!textureMap) {
    return <div>Loading...</div>;
  }
  return (
    <>
      <Globe
        ref={globe}
        // pointOfView={pointOfView}
        globeImageUrl="https://unpkg.com/three-globe@2.24.10/example/img/earth-blue-marble.jpg"
        polygonsData={GEODATA.features}
        polygonCapMaterial={(datum) => textureMap[datum.properties.ISO_A2]}
        polygonSideColor={() => "rgba(0, 200, 0, 0.1)"}
        polygonStrokeColor={() => "#111"}
        polygonLabel={(datum) => {
          const label =
            DATA[datum.properties.ISO_A3][year][display.label] || "";
          return `
          ${display.name}: ${label}
        `;
        }}
        polygonAltitude={(datum) => {
          if (DATA[datum.properties.ISO_A3]) {
            return DATA[datum.properties.ISO_A3][year][display.altitude] || 0;
          } else return 0;
        }}
      />
      <Controls
        isPlaying={isPlaying}
        tabList={TAB_LIST}
        dataType={dataType}
        year={year}
        play={play}
        pause={pause}
      />
    </>
  );
};

export default App;

// To-Do List:
// Reformat Component into its own file
async function loadTextures(features) {
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

function getDeviceType() {
  const width = window.innerWidth;

  if (width > 1024) {
    return "desktop";
  } else if (width > 768 && width <= 1024) {
    return "tablet";
  } else {
    return "mobile";
  }
}

const zoomDictionary = {
  desktop: 4,
  tablet: 7,
  mobile: 10,
};
