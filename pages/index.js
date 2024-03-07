import React, {
  useEffect,
  useState,
  useRef,
  useMemo,
  useCallback,
} from "react";
import dynamic from "next/dynamic";
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
import Controls from "../components/Controls";
const Globe = dynamic(import("react-globe.gl"), { ssr: false });

const textureMap = {};
GEODATA.features.forEach(async ({ properties: { ISO_A2 } }) => {
  const url = `https://raw.githubusercontent.com/ankitmehta94/Globe_Statistics/master/flags/${ISO_A2}.png`;
  const loader = new THREE.ImageLoader();
  const imageBitmap = await loader.loadAsync(
    url,
    () => {},
    () => {
      console.error("Error loading image");
    }
  );
  const texture = new THREE.CanvasTexture(imageBitmap);
  const material = new THREE.MeshBasicMaterial({ map: texture });
  textureMap[ISO_A2] = material;
});
const App = () => {
  const [dataType, setDataType] = useState(GDP_PER_CAPITA);
  const [year, setYear] = useState(LOW_YEAR);
  const [isPlaying, setIsPlaying] = useState(false);
  const referalToSetInterval = useRef();

  const play = useCallback(() => {
    setIsPlaying(true);
    referalToSetInterval.current = setInterval(() => {
      setYear((year) => {
        if (year < 2021) {
          return year + 1;
        } else {
          return 1960;
        }
      });
    }, 500);
  }, []);
  const pause = () => {
    setIsPlaying(false);
    console.log(referalToSetInterval.current);
    clearInterval(referalToSetInterval.current);
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
    // play();
  }, []);
  const display = DISPLAY_DATA[dataType];
  return (
    <>
      <Globe
        globeImageUrl="https://unpkg.com/three-globe@2.24.10/example/img/earth-blue-marble.jpg"
        polygonsData={GEODATA.features}
        killolygonCapMaterial={(datum) => textureMap[datum.properties.ISO_A2]}
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
// - Fix the issue of flags not showing up
// - Add Tailwind
// - Fix the problem of not playing on load
// - Adjust zoom level on the items mentioned abov
