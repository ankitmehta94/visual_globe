import React from "react";
import Tab from "./Tab";
import { Play, PauseCircle } from "react-feather";
import { LOW_YEAR, NUMBER_OF_YEARS } from "../data/constants";
import styles from "../styles/Controls.module.css";

export default function Controls({
  isPlaying,
  year,
  tabList,
  dataType,
  play,
  pause,
}) {
  return (
    <div className={styles["overlay"]}>
      <span className={styles["year"]}>{year}</span>
      <Tab isContentDisplayed={false} tabList={tabList} selectedId={dataType} />
      <div>
        <div className={styles["controls"]}>
          {isPlaying ? (
            <PauseCircle onClick={pause} />
          ) : (
            <Play onClick={play} />
          )}

          <div className={styles["box"]}>
            <div
              className={styles["pencil"]}
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
  );
}
