import React from "react";
import Tab from "./Tab";
import { Play, PauseCircle } from "react-feather";
import { LOW_YEAR, NUMBER_OF_YEARS } from "../../data/constants";

export default function Controls({
  isPlaying,
  year,
  tabList,
  dataType,
  play,
  pause,
}) {
  return (
    <div className="flex flex-col items-center fixed md:top-[80dvh] top-[72dvh] left-[50vw] translate-x-[-50%] gap-8 w-[80vw] z-30">
      <Tab isContentDisplayed={false} tabList={tabList} selectedId={dataType} />
      <div className="w-full flex flex-row items-center gap-2">
        {isPlaying ? (
          <PauseCircle onClick={pause} className="text-white" />
        ) : (
          <Play onClick={play} className="text-white" />
        )}

        <div className="w-full h-10 border border-white rounded">
          <div
            className="relative text-white text-lg h-full w-[4px] bg-white"
            style={{
              left: `${((year - LOW_YEAR) * 100) / NUMBER_OF_YEARS}%`,
            }}
          >
            <span className="relative ml-[-20px] top-[40px]">{year}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
