const initialState = {
  board: [
    [2, 0, 0, 0],
    [0, 4, 0, 0],
    [0, 0, 8, 0],
    [0, 0, 0, 16],
  ],
  score: 0,
  bestScore: 0,
  gameOver: false,
  won: false,
};

const gameReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GAME2048_NEW_GAME":
      return initialState;

    case "GAME2048_CLICK_TILE":
      const { row, col } = action.payload;
      const clickedValue = state.board[row][col];

      if (clickedValue === 0) return state;

      const newBoard = state.board.map((r) => [...r]);
      let scoreIncrease = 0;
      let moved = false;

      // Сначала проверяем соседей ДО увеличения
      const neighbors = [
        [-1, 0],
        [1, 0],
        [0, -1],
        [0, 1],
      ];
      let merged = false;

      for (const [dx, dy] of neighbors) {
        const newRow = row + dx;
        const newCol = col + dy;

        if (newRow >= 0 && newRow < 4 && newCol >= 0 && newCol < 4) {
          if (newBoard[newRow][newCol] === clickedValue) {
            // ОБЪЕДИНЯЕМ с соседом
            newBoard[newRow][newCol] = clickedValue * 2;
            newBoard[row][col] = 0;
            scoreIncrease = clickedValue * 2;
            merged = true;
            moved = true;
            break;
          }
        }
      }

      // Если не было объединения, то просто увеличиваем значение
      if (!merged) {
        newBoard[row][col] = clickedValue + 2;
        scoreIncrease = 2;
        moved = true;
      }

      // ВСЕГДА добавляем новую плитку после любого клика
      if (moved) {
        const emptyCells = [];
        newBoard.forEach((r, rowIdx) => {
          r.forEach((cell, colIdx) => {
            if (cell === 0) emptyCells.push([rowIdx, colIdx]);
          });
        });

        if (emptyCells.length > 0) {
          const [randRow, randCol] = emptyCells[
            Math.floor(Math.random() * emptyCells.length)
          ];
          newBoard[randRow][randCol] = Math.random() < 0.9 ? 2 : 4;
        }
      }

      return {
        ...state,
        board: newBoard,
        score: state.score + scoreIncrease,
        bestScore: Math.max(state.bestScore, state.score + scoreIncrease),
      };

    default:
      return state;
  }
};

// Проверка победы
const checkWin = (board) => {
  return board.some((row) => row.some((cell) => cell === 2048));
};

// Проверка конца игры
const checkGameOver = (board) => {
  // Проверяем есть ли пустые клетки
  if (board.some((row) => row.some((cell) => cell === 0))) return false;

  // Проверяем возможные объединения
  for (let row = 0; row < 4; row++) {
    for (let col = 0; col < 4; col++) {
      const value = board[row][col];
      const neighbors = [
        [-1, 0],
        [1, 0],
        [0, -1],
        [0, 1],
      ];

      for (const [dx, dy] of neighbors) {
        const newRow = row + dx;
        const newCol = col + dy;

        if (newRow >= 0 && newRow < 4 && newCol >= 0 && newCol < 4) {
          if (board[newRow][newCol] === value) {
            return false; // Есть возможные ходы
          }
        }
      }
    }
  }

  return true; // Нет возможных ходов
};

export default gameReducer;
