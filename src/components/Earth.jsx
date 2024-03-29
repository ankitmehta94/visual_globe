import Globe from "react-globe.gl";
import DATA from "../../data/DATA.json";
import { useRef, useEffect } from "react";
import ReactDOMServer from "react-dom/server";
import GEODATA from "../../data/GEODATA.json";
import { DISPLAY_DATA } from "../../data/constants";
import { Label } from "./Label";

export const Earth = ({ dataType, textureMap, year, tabList }) => {
  const globe = useRef();
  const display = DISPLAY_DATA[dataType];

  useEffect(() => {
    if (globe.current) {
      globe.current.pointOfView({
        lat: 41,
        lng: -95,
        altitude: zoomDictionary[getDeviceType()],
      });
    }
  }, [textureMap]);
  return (
    <Globe
      ref={globe}
      globeImageUrl="https://unpkg.com/three-globe@2.24.10/example/img/earth-blue-marble.jpg"
      polygonsData={GEODATA.features}
      polygonCapMaterial={(datum) => textureMap[datum.properties.ISO_A2]}
      polygonSideColor={() => "rgba(0, 200, 0, 0.1)"}
      polygonStrokeColor={() => "#111"}
      polygonLabel={(datum) => {
        const money = DATA[datum.properties.ISO_A3][year][display.label] || "";
        const name = tabList.find(({ id }) => id === dataType).name;
        return ReactDOMServer.renderToString(
          <Label
            country={datum.properties.BRK_NAME}
            amount={money}
            year={year}
            label={name}
          />
        );
      }}
      polygonAltitude={(datum) => {
        if (DATA[datum.properties.ISO_A3]) {
          return DATA[datum.properties.ISO_A3][year][display.altitude] || 0;
        } else return 0;
      }}
    />
  );
};

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
  mobile: 7,
};
