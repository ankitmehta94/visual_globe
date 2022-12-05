import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import GDP_PER_CAPITA from "../data/GDP_PER_CAPITA.json";
import * as THREE from "three";

const Globe = dynamic(import("react-globe.gl"), { ssr: false });

console.log(THREE);
const App = () => {
  const [countries, setCountries] = useState({ features: [] });

  useEffect(() => {
    // load data
    fetch(
      "https://raw.githubusercontent.com/ankitmehta94/Globe_Statistics/master/data.geojson"
    )
      .then((res) => res.json())
      .then(setCountries);
  }, []);

  return (
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
      polygonAltitude={(datum) => {
        const gdp_object =
          Object.values(GDP_PER_CAPITA).find(
            (element) => element["Country Code"] === datum.properties.ISO_A3
          ) || {};
        return gdp_object["normalized_gdp"] || 0.1;
      }}
    />
  );
};

export default App;
