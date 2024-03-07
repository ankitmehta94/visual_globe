import React, { useState, useMemo, useCallback, useEffect } from "react";
import {
  GDP_PER_CAPITA,
  LOW_YEAR,
  GDP,
  GDP_NAME,
  GDP_PER_CAPITA_NAME,
} from "../data/constants";
import GEODATA from "../data/GEODATA.json";
import Controls from "./components/Controls";
import { Earth } from "./components/Earth";
import { loadTextures } from "./utils/texture";

const App = () => {
  const [textureMap, setTextureMap] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
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
    setIsLoading(false);
  }, []);
  if (isLoading) {
    return (
      <div className="bg-black w-full h-screen flex justify-center items-center text-white">
        Loading...
      </div>
    );
  }
  return (
    <>
      <Earth
        tabList={TAB_LIST}
        setIsLoading={setIsLoading}
        dataType={dataType}
        textureMap={textureMap}
        year={year}
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
// Make the labels into charts
