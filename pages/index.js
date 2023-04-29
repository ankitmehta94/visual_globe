import React, { useEffect, useState, useRef } from "react";
import dynamic from "next/dynamic";
import DATA from "../data/DATA.json";
import * as THREE from "three";
const Globe = dynamic(import("react-globe.gl"), { ssr: false });

const GDP = "GDP";
const GDP_PER_CAPITA = "GDP_PER_CAPITA";
const NORMALIZED_GDP = "NORMALIZED_GDP";
const NORMALIZED_GDP_PER_CAPITA = "NORMALIZED_GDP_PER_CAPITA";

const DISPLAY_DATA = {
  [GDP]: { altitude: NORMALIZED_GDP, label: GDP },
  [GDP_PER_CAPITA]: {
    altitude: NORMALIZED_GDP_PER_CAPITA,
    label: GDP_PER_CAPITA,
  },
};

const App = () => {
  const [countries, setCountries] = useState({ features: [] });
  const [dataType, setDataType] = useState(GDP_PER_CAPITA);
  const [year, setYear] = useState(1960);
  const referalToSetInterval = useRef();

  const play = () => {
    referalToSetInterval.current = setInterval(() => {
      setYear((year) => {
        if (year < 2021) {
          return year + 1;
        } else {
          return 1960;
        }
      });
    }, 500);
  };
  const pause = () => {
    clearInterval(referalToSetInterval.current);
  };
  useEffect(() => {
    // load data
    fetch(
      "https://raw.githubusercontent.com/ankitmehta94/Globe_Statistics/master/data.geojson"
    )
      .then((res) => res.json())
      .then(setCountries);
  }, []);
  const display = DISPLAY_DATA[dataType];
  return (
    <>
      <Globe
        globeImageUrl="https://unpkg.com/three-globe@2.24.10/example/img/earth-blue-marble.jpg"
        polygonsData={countries.features}
        polygonCapMaterial={(datum) => {
          const texture = new THREE.TextureLoader().load(
            `https://raw.githubusercontent.com/ankitmehta94/Globe_Statistics/master/flags/${datum.properties.ISO_A2}.png`
          );
          const material = new THREE.MeshBasicMaterial({ map: texture });
          return material;
        }}
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
            console.log(DATA[datum.properties.ISO_A3][year][display.altitude]);
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
          <span onClick={play}>Play</span>
          <span onClick={pause}>Pause</span>
          <span>{year}</span>
        </div>
      </div>
    </>
  );
};

export default App;
