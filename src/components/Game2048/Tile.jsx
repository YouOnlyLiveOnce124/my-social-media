import React from "react";
import m from "./Game2048.module.css";

const Tile = ({ value, onClick }) => {
  const getTileClass = () => {
    if (value === 0) return `${m.tile} ${m.tileEmpty}`;
    return `${m.tile} ${m[`tile${value}`]}`;
  };

  return (
    <div className={getTileClass()} onClick={() => value !== 0 && onClick()}>
      {value !== 0 && value}
    </div>
  );
};

export default Tile;
