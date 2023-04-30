import React from "react";
import styles from "../styles/Tab.module.css";

export default function Tab({ tabList, isContentDisplayed, selectedId }) {
  return (
    <React.Fragment>
      <div className={styles["tabs"]}>
        {tabList.map(({ id, name, onClick }) => (
          <React.Fragment key={id}>
            <input
              className={styles["tabInput"]}
              type="radio"
              name={id}
              id={id}
              checked={selectedId === id}
            />
            <label className={styles["tab"]} for={id} onClick={onClick}>
              {name}
            </label>
          </React.Fragment>
        ))}
        <div className={styles["glow"]}></div>
      </div>
      {isContentDisplayed &&
        tabList.map(({ Component }) => (
          <div
            key={`${id}-content`}
            className={styles["tab-content"]}
            id={`${id}-content`}
          >
            <Component />
          </div>
        ))}
    </React.Fragment>
  );
}
