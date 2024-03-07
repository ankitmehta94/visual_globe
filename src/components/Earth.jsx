import Globe from "react-globe.gl";
import DATA from "../../data/DATA.json";
import { useRef, useEffect, useState } from "react";
import ReactDOMServer from "react-dom/server";
import GEODATA from "../../data/GEODATA.json";
import { DISPLAY_DATA } from "../../data/constants";
import { Label } from "./Label";
import { convertData } from "../utils/chart";
import { Chart } from "./Chart";
import { Modal } from "./Modal";

export const Earth = ({ dataType, textureMap, year, tabList }) => {
  const globe = useRef();
  const display = DISPLAY_DATA[dataType];
  const [modalData, setModalData] = useState(false);

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
    <>
      <Globe
        ref={globe}
        globeImageUrl="https://unpkg.com/three-globe@2.24.10/example/img/earth-blue-marble.jpg"
        polygonsData={GEODATA.features}
        polygonCapMaterial={(datum) => textureMap[datum.properties.ISO_A2]}
        polygonSideColor={() => "rgba(0, 200, 0, 0.1)"}
        polygonStrokeColor={() => "#111"}
        polygonLabel={(datum) => {
          const money =
            DATA[datum.properties.ISO_A3][year][display.label] || "";
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
        onPolygonClick={(datum) => {
          const moneyList = convertData(
            DATA[datum.properties.ISO_A3],
            dataType
          );
          setModalData({ moneyList, name: datum.properties.BRK_NAME });
        }}
        polygonAltitude={(datum) => {
          if (DATA[datum.properties.ISO_A3]) {
            return DATA[datum.properties.ISO_A3][year][display.altitude] || 0;
          } else return 0;
        }}
      />
      {console.log(modalData)}
      {modalData && (
        <Modal setShowModal={setModalData}>
          <Chart
            width={1000}
            height={1000}
            money={modalData.moneyList}
            text={modalData.name}
          />
        </Modal>
      )}
    </>
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
