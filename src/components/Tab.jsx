import React from "react";

export default function Tab({ tabList, isContentDisplayed, selectedId }) {
  // Function to handle the glow effect based on the selected tab
  const calculateGlowPosition = () => {
    const index = tabList.findIndex((tab) => tab.id === selectedId);
    return index >= 0 ? `${index * 100}%` : "0%";
  };

  return (
    <React.Fragment>
      <div className="relative flex justify-around w-full">
        {tabList.map(({ id, name, onClick }) => (
          <React.Fragment key={id}>
            <input
              className="hidden"
              type="radio"
              name="tab"
              id={id}
              checked={selectedId === id}
              readOnly // Since we're not using onChange here, to avoid React warning
            />
            <label
              htmlFor={id}
              className="cursor-pointer px-2.5 text-base w-1/2 text-center text-white"
              onClick={onClick}
              style={{ padding: "10px", fontSize: "16px" }}
            >
              {name}
            </label>
          </React.Fragment>
        ))}
        <div
          className="absolute top-0 left-0 h-full w-1/2"
          style={{
            transform: `translateX(${calculateGlowPosition()})`,
            transition: "transform 0.3s ease-out",
            animation: "glow 800ms ease-out infinite alternate",
            borderColor: "white",
            boxShadow:
              "0 0 5px white, inset 0 0 5px rgb(169 169 169 / 0%), 0 0 5px #000",
            borderRadius: "10px",
          }}
          id="glow"
        ></div>
      </div>
      {isContentDisplayed &&
        tabList.map(({ id, Component }) => (
          <div key={`${id}-content`} className="mt-5" id={`${id}-content`}>
            <Component />
          </div>
        ))}
    </React.Fragment>
  );
}
