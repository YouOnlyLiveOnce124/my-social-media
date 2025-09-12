import React from "react";
import m from "./Game2048.module.css";

const GameOver = ({ onRestart }) => {
  return (
    <div className={m.gameOverlay}>
      <div className={m.gameMessage}>
        <h2>Game Over!</h2>
        <p>No more moves available.</p>
        <button onClick={onRestart} className={m.restartBtn}>
          Try Again
        </button>
      </div>
    </div>
  );
};

export default GameOver;
