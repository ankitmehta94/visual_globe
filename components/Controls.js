import React from "react";
import Tab from "./Tab";
import { Play, PauseCircle } from "react-feather";
import { LOW_YEAR, NUMBER_OF_YEARS } from "../data/constants";

export default function Controls({
  isPlaying,
  year,
  tabList,
  dataType,
  play,
  pause,
}) {
  return (
    <div className="flex flex-col items-center fixed md:top-[87dvh] top-[75dvh] left-[50vw] translate-x-[-50%] gap-8 w-[80vw]">
      <span className="text-lg">{year}</span>
      <Tab isContentDisplayed={false} tabList={tabList} selectedId={dataType} />
      <div className="w-full flex flex-row">
        {isPlaying ? <PauseCircle onClick={pause} /> : <Play onClick={play} />}

        <div className="w-full h-5 border border-white rounded">
          <div
            className="relative top-[-6px] text-white text-lg"
            style={{
              left: `${((year - LOW_YEAR) * 100) / NUMBER_OF_YEARS}%`,
            }}
          >
            |
          </div>
        </div>
      </div>
    </div>
  );
}
