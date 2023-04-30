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
import { Play, PauseCircle } from "react-feather";
import * as THREE from "three";
const Globe = dynamic(import("react-globe.gl"), { ssr: false });

const GDP = "GDP";
const GDP_PER_CAPITA = "GDP_PER_CAPITA";
const NORMALIZED_GDP = "NORMALIZED_GDP";
const NORMALIZED_GDP_PER_CAPITA = "NORMALIZED_GDP_PER_CAPITA";

const LOW_YEAR = 1960;
const HIGH_YEAR = 2021;

const NUMBER_OF_YEARS = HIGH_YEAR - LOW_YEAR;
const DISPLAY_DATA = {
  [GDP]: { altitude: NORMALIZED_GDP, label: GDP },
  [GDP_PER_CAPITA]: {
    altitude: NORMALIZED_GDP_PER_CAPITA,
    label: GDP_PER_CAPITA,
  },
};

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
  const [year, setYear] = useState(1960);
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
  useEffect(() => {
    // play();
  }, []);
  const display = DISPLAY_DATA[dataType];
  return (
    <>
      <Globe
        globeImageUrl="https://unpkg.com/three-globe@2.24.10/example/img/earth-blue-marble.jpg"
        polygonsData={GEODATA.features}
        polygonCapMaterial={(datum) => textureMap[datum.properties.ISO_A2]}
        polygonSideColor={() => "rgba(0, 200, 0, 0.1)"}
        polygonStrokeColor={() => "#111"}
        polygonLabel={(datum) => {
          const label =
            DATA[datum.properties.ISO_A3][year][display.label] || "";
          return `
        GDP PER CAPITA: ${label}
      `;
        }}
        polygonAltitude={(datum) => {
          if (DATA[datum.properties.ISO_A3]) {
            return DATA[datum.properties.ISO_A3][year][display.altitude] || 0;
          } else return 0;
        }}
      />
      <div className="overlay">
        CURRENTLY WORK IN PROGRESS
        <div>
          <button onClick={() => setDataType(GDP)}>GDP</button>
          <button onClick={() => setDataType(GDP_PER_CAPITA)}>
            GDP PER CAPITA
          </button>
        </div>
        <div>
          <div className="controls">
            {isPlaying ? (
              <PauseCircle onClick={pause} />
            ) : (
              <Play onClick={play} />
            )}

            <div className="box">
              <div
                className="pencil"
                style={{
                  left: `${((year - LOW_YEAR) * 100) / NUMBER_OF_YEARS}%`,
                }}
              >
                |
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
