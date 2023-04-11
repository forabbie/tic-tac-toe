let result = document.querySelector(".result");
const board = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

let history = [{ board: board.map((row) => [...row]), turn: "X" }]; // deep copy of board

let currentMove = 0;
let gameOver = false;
let currentPlayer = "X";

const player = document.getElementById("toggle-player");

player.addEventListener("click", function () {
  chooseFirstPlayer();
});

function chooseFirstPlayer() {
  currentPlayer = currentPlayer === "X" ? "O" : "X";
  result.innerHTML = `Player ${currentPlayer}'s turn`;
}

function renderBoard() {
  const tileWrapper = document.querySelector("#board");
  tileWrapper.innerHTML = "";
  for (let i = 0; i < 3; i++) {
    const row = document.createElement("div");
    row.classList.add("row");
    // console.log("col", i);
    for (let j = 0; j < 3; j++) {
      // console.log("col", j);
      const cell = document.createElement("span");
      cell.classList.add("cell");
      cell.textContent = board[i][j];
      cell.addEventListener("click", () => {
        if (!gameOver && board[i][j] === null) {
          board[i][j] = currentPlayer;
          history = history.slice(0, currentMove + 1);
          history.push({
            board: board.map((row) => [...row]),
            turn: currentPlayer,
          });
          currentMove++;
          renderBoard();
          checkGameOver();
          if (!gameOver) {
            currentPlayer = currentPlayer === "X" ? "O" : "X";
            result.innerHTML = `Player ${currentPlayer}'s turn`;
          }
          console.log("board", board);
          player.disabled = true;
        }
      });
      row.appendChild(cell);
    }
    tileWrapper.appendChild(row);
  }
}

function checkWinner() {
  for (let i = 0; i < 3; i++) {
    // Check rows
    if (
      board[i][0] === board[i][1] &&
      board[i][1] === board[i][2] &&
      board[i][0] !== null
    ) {
      return board[i][0];
    }
    // Check columns
    if (
      board[0][i] === board[1][i] &&
      board[1][i] === board[2][i] &&
      board[0][i] !== null
    ) {
      return board[0][i];
    }
  }

  // Check diagonals
  if (
    board[0][0] === board[1][1] &&
    board[1][1] === board[2][2] &&
    board[0][0] !== null
  ) {
    return board[0][0];
  }
  if (
    board[0][2] === board[1][1] &&
    board[1][1] === board[2][0] &&
    board[0][2] !== null
  ) {
    return board[0][2];
  }

  // No winner
  return null;
}
function checkGameOver() {
  const winner = checkWinner();
  if (winner) {
    gameOver = true;
    showGameHistory();
    result.innerHTML = `Player ${winner} Won`;
    player.disabled = false;
    return winner;
  }
  if (board.flat().every((cell) => cell !== null)) {
    gameOver = true;
    showGameHistory();
    player.disabled = false;
    return "Tie";
  }
  return null;
}

function showGameHistory() {
  const prevBtn = document.querySelector("#prevBtn");
  prevBtn.disabled = currentMove === 0;
  const nextBtn = document.querySelector("#nextBtn");
  nextBtn.disabled = currentMove === history.length - 1;
  const tileWrapper = document.querySelector("#board");
  tileWrapper.innerHTML = "";
  const currentBoard = history[currentMove].board;
  for (let i = 0; i < 3; i++) {
    const row = document.createElement("div");
    row.classList.add("row");
    for (let j = 0; j < 3; j++) {
      const cell = document.createElement("span");
      cell.classList.add("cell");
      cell.textContent = currentBoard[i][j];
      row.appendChild(cell);
    }
    tileWrapper.appendChild(row);
  }
}

const prevBtn = document.querySelector("#prevBtn");
prevBtn.addEventListener("click", () => {
  currentMove--;
  showGameHistory();
});

const nextBtn = document.querySelector("#nextBtn");
nextBtn.addEventListener("click", () => {
  currentMove++;
  showGameHistory();
});

const resetBtn = document.querySelector("#resetBtn");
resetBtn.addEventListener("click", () => {
  board.forEach((row, i) => {
    row.forEach((_, j) => {
      board[i][j] = null;
    });
  });
  history = [{ board: board.map((row) => [...row]), turn: "X" }]; // deep copy of board
  currentMove = 0;
  gameOver = false;
  currentPlayer = "X";
  renderBoard();
  prevBtn.disabled = true;
  nextBtn.disabled = true;
  player.disabled = false;
});

renderBoard();

const toggle = document.querySelector("#toggle");
