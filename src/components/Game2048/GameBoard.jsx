import React from "react";
import m from "./Game2048.module.css";

const GameBoard = ({ board, onTileClick }) => {
  return (
    <div className={m.gameBoard}>
      {board.map((row, rowIndex) => (
        <div key={rowIndex} className={m.boardRow}>
          {row.map((value, colIndex) => (
            <div
              key={`${rowIndex}-${colIndex}`}
              className={`${m.tile} ${
                value === 0 ? m.tileEmpty : m[`tile${value}`]
              }`}
              onClick={() => onTileClick(rowIndex, colIndex)}
              title={value === 0 ? "" : `Click to merge (${value})`}
            >
              {value !== 0 && value}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default GameBoard;
