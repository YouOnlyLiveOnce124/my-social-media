import React, { useState, useEffect } from "react";
import "./Boat.css";

function Boat() {
  const [board, setBoard] = useState(
    Array(10)
      .fill()
      .map(() => Array(10).fill(0))
  );
  const [ships, setShips] = useState([]);
  const [hits, setHits] = useState([]);
  const [misses, setMisses] = useState([]);
  const [gameOver, setGameOver] = useState(false);
  const [message, setMessage] = useState(
    "Расставьте корабли. Кликните по клетке, чтобы разместить/удалить корабль."
  );

  // Размеры кораблей: 1x4, 2x3, 3x2, 4x1
  const shipSizes = [4, 3, 3, 2, 2, 2, 1, 1, 1, 1];
  const [currentShipIndex, setCurrentShipIndex] = useState(0);

  // Инициализация игры
  useEffect(() => {
    resetGame();
  }, []);

  const resetGame = () => {
    setBoard(
      Array(10)
        .fill()
        .map(() => Array(10).fill(0))
    );
    setShips([]);
    setHits([]);
    setMisses([]);
    setGameOver(false);
    setCurrentShipIndex(0);
    setMessage(
      "Расставьте корабли. Кликните по клетке, чтобы разместить/удалить корабль."
    );
  };

  const placeShip = (row, col) => {
    if (gameOver || currentShipIndex >= shipSizes.length) return;

    const newBoard = [...board];
    const shipSize = shipSizes[currentShipIndex];
    let canPlace = true;

    // Проверяем, можно ли разместить корабль
    for (let i = 0; i < shipSize; i++) {
      if (col + i >= 10 || newBoard[row][col + i] !== 0) {
        canPlace = false;
        break;
      }
    }

    // Размещаем корабль
    if (canPlace) {
      const newShip = [];
      for (let i = 0; i < shipSize; i++) {
        newBoard[row][col + i] = 1;
        newShip.push({ row, col: col + i });
      }
      setBoard(newBoard);
      setShips([...ships, newShip]);
      setCurrentShipIndex(currentShipIndex + 1);

      if (currentShipIndex + 1 >= shipSizes.length) {
        setMessage(
          "Все корабли расставлены! Начинайте игру - кликайте по клеткам противника."
        );
      } else {
        setMessage(
          `Разместите корабль размером ${shipSizes[currentShipIndex + 1]}.`
        );
      }
    }
  };

  const handleCellClick = (row, col) => {
    if (currentShipIndex < shipSizes.length) {
      placeShip(row, col);
      return;
    }

    if (gameOver || board[row][col] === 2 || board[row][col] === 3) return;

    const newBoard = [...board];
    let hit = false;

    // Проверяем попадание
    for (const ship of ships) {
      for (const cell of ship) {
        if (cell.row === row && cell.col === col) {
          hit = true;
          newBoard[row][col] = 2; // Попадание
          setHits([...hits, { row, col }]);
          break;
        }
      }
      if (hit) break;
    }

    if (!hit) {
      newBoard[row][col] = 3; // Промах
      setMisses([...misses, { row, col }]);
    }

    setBoard(newBoard);

    // Проверяем условие победы
    const allShipsSunk = ships.every((ship) =>
      ship.every((cell) => newBoard[cell.row][cell.col] === 2)
    );

    if (allShipsSunk) {
      setGameOver(true);
      setMessage("Поздравляем! Вы потопили все корабли!");
    } else {
      setMessage(hit ? "Попадание!" : "Промах!");
    }
  };

  return (
    <div className="app">
      <h1>Морской бой</h1>
      <p>{message}</p>

      <div className="board">
        {board.map((row, rowIndex) => (
          <div key={rowIndex} className="row">
            {row.map((cell, colIndex) => (
              <div
                key={colIndex}
                className={`cell ${
                  cell === 1 && currentShipIndex >= shipSizes.length
                    ? "ship"
                    : cell === 2
                    ? "hit"
                    : cell === 3
                    ? "miss"
                    : ""
                }`}
                onClick={() => handleCellClick(rowIndex, colIndex)}
              >
                {cell === 2 ? "💥" : cell === 3 ? "🌊" : ""}
              </div>
            ))}
          </div>
        ))}
      </div>

      <button onClick={resetGame} className="reset-button">
        Начать заново
      </button>
    </div>
  );
}

export default Boat;
