import React from "react";
import { useDispatch, useSelector } from "react-redux";
import m from "./Game2048.module.css";

const Game2048 = () => {
  const dispatch = useDispatch();
  const { board, score, bestScore } = useSelector((state) => state.game2048);

  const handleTileClick = (row, col) => {
    if (board[row][col] !== 0) {
      dispatch({
        type: "GAME2048_CLICK_TILE",
        payload: { row, col },
      });
    }
  };

  const handleNewGame = () => {
    dispatch({ type: "GAME2048_NEW_GAME" });
  };

  return (
    <div className={m.game2048}>
      <div className={m.gameHeader}>
        <div className={m.headerLeft}>
          <h1>2048</h1>
        </div>

        <div className={m.headerRight}>
          <div className={m.scores}>
            <div className={m.scoreBoard}>
              <div className={m.scoreLabel}>Score</div>
              <div className={m.scoreValue}>{score}</div>
            </div>
            <div className={m.scoreBoard}>
              <div className={m.scoreLabel}>Best</div>
              <div className={m.scoreValue}>{bestScore}</div>
            </div>
          </div>

          <button onClick={handleNewGame} className={m.newGameBtn}>
            New Game
          </button>
        </div>
      </div>

      <div className={m.gameBoard}>
        {board.map((row, rowIndex) => (
          <div key={rowIndex} className={m.boardRow}>
            {row.map((value, colIndex) => (
              <div
                key={`${rowIndex}-${colIndex}`}
                className={`${m.tile} ${
                  value === 0 ? m.tileEmpty : m[`tile${value}`]
                }`}
                onClick={() => handleTileClick(rowIndex, colIndex)}
              >
                {value !== 0 && value}
              </div>
            ))}
          </div>
        ))}
      </div>

      <div className={m.gameInstructions}>
        <p>Click on tiles to increase their value!</p>
      </div>
    </div>
  );
};

export default Game2048;
