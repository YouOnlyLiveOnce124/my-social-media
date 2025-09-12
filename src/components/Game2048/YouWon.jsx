import React from "react";
import m from "./Game2048.module.css";

const YouWon = ({ onContinue }) => {
  return (
    <div className={m.gameOverlay}>
      <div className={`${m.gameMessage} ${m.wonMessage}`}>
        <h2>You Win!</h2>
        <p>You reached 2048!</p>
        <button onClick={onContinue} className={m.continueBtn}>
          Continue Playing
        </button>
      </div>
    </div>
  );
};

export default YouWon;
