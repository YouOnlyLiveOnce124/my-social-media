import React from "react";
import m from "./Game2048.module.css";

const ScoreBoard = ({ label, score }) => {
  return (
    <div className={m.scoreBoard}>
      <div className={m.scoreLabel}>{label}</div>
      <div className={m.scoreValue}>{score}</div>
    </div>
  );
};

export default ScoreBoard;
