const board = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

const winningMessageElement = document.getElementById("winningMessage");
const prevBtn = document.querySelector("#prevBtn");
const nextBtn = document.querySelector("#nextBtn");

let result = document.querySelector(".result");
let history = [{ board: board.map((row) => [...row]), turn: "X" }];
let currentMove = 0;
let gameOver = false;
let currentPlayer = "X";

const chooseFirstPlayer = () => {
  currentPlayer = currentPlayer === "X" ? "O" : "X";
  result.innerHTML = `Player ${currentPlayer}'s turn`;
};

const player = document.getElementById("toggle-player");
player.addEventListener("click", function () {
  chooseFirstPlayer();
});

const resetBtn = document.querySelector("#resetBtn");
resetBtn.addEventListener("click", () => resetGame());

const closeButton = document.getElementById("closeButton");
closeButton.addEventListener("click", () =>
  winningMessageElement.classList.remove("show")
);

const showGameHistory = () => {
  prevBtn.disabled = currentMove === 0;
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
};

prevBtn.addEventListener("click", () => {
  currentMove--;
  showGameHistory();
});

nextBtn.addEventListener("click", () => {
  currentMove++;
  showGameHistory();
});

const checkWinner = () => {
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
};

const checkGameOver = () => {
  const winningMessageTextElement = document.querySelector(
    "#winningMessageText"
  );
  winningMessageElement.classList.remove("show");
  const winner = checkWinner();
  if (winner) {
    gameOver = true;
    showGameHistory();
    result.innerHTML = `Player ${winner} Won`;
    player.disabled = false;
    winningMessageTextElement.textContent = `Player ${winner} Won`;
    winningMessageElement.classList.add("show");
    prevBtn.classList.remove("d-none");
    nextBtn.classList.remove("d-none");
    return winner;
  }
  if (board.flat().every((cell) => cell !== null)) {
    gameOver = true;
    showGameHistory();
    player.disabled = false;
    result.innerHTML = `Draw`;
    winningMessageTextElement.textContent = `Draw`;
    winningMessageElement.classList.add("show");
    prevBtn.classList.remove("d-none");
    nextBtn.classList.remove("d-none");
    return "Draw";
  }
  return null;
};

const renderBoard = () => {
  const tileWrapper = document.querySelector("#board");
  tileWrapper.innerHTML = "";
  result.innerHTML = `Player ${currentPlayer}'s turn`;
  for (let i = 0; i < 3; i++) {
    const row = document.createElement("div");
    row.classList.add("row");
    for (let j = 0; j < 3; j++) {
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
          player.disabled = true;
        }
      });
      row.appendChild(cell);
    }
    tileWrapper.appendChild(row);
  }
};

renderBoard();

const resetGame = () => {
  board.forEach((row) => {
    row.fill(null);
  });
  history = [{ board: board.map((row) => [...row]), turn: "X" }];
  currentMove = 0;
  gameOver = false;
  player.checked = true;
  currentPlayer = "X";
  renderBoard();
  prevBtn.classList.add("d-none");
  nextBtn.classList.add("d-none");
  prevBtn.disabled = true;
  nextBtn.disabled = true;
  player.disabled = false;
};
