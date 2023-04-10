// let cells = ["", "", "", "", "", "", "", "", ""];
// let currentPlayer = "X";
let result = document.querySelector(".result");
// let btns = document.querySelectorAll(".btn");
// let conditions = [
//   [0, 1, 2],
//   [3, 4, 5],
//   [6, 7, 8],
//   [0, 3, 6],
//   [1, 4, 7],
//   [2, 5, 8],
//   [0, 4, 8],
//   [2, 4, 6],
// ];

// const ticTacToe = (element, index) => {
//   element.value = currentPlayer;
//   element.disabled = true;
//   cells[index] = currentPlayer;
//   currentPlayer = currentPlayer == "X" ? "O" : "X";
//   result.innerHTML = `Player ${currentPlayer} Turn`;

//   for (let i = 0; i < conditions.length; i++) {
//     let condition = conditions[i];
//     let a = cells[condition[0]];
//     let b = cells[condition[1]];
//     let c = cells[condition[2]];

//     if (a == "" || b == "" || c == "") {
//       continue;
//     }
//     if (a == b && b == c) {
//       result.innerHTML = `Player ${a} Won`;
//       btns.forEach((btn) => (btn.disabled = true));
//     }
//   }
// };

// function reset() {
//   cells = ["", "", "", "", "", "", "", "", ""];
//   btns.forEach((btn) => {
//     btn.value;
//   });
//   currentPlayer = "X";
//   result.innerHTML = "Player X Turn";
//   btns.forEach((btn) => (btn.disabled = false));
// }
// document.querySelector("#reset").addEventListener("click", reset);
// btns.forEach((btn, i) => {
//   btn.addEventListener("click", () => ticTacToe(btn, 1));
// });

const board = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

let history = [{ board: board.map((row) => [...row]), turn: "X" }]; // deep copy of board

let currentMove = 0;
let gameOver = false;
let currentPlayer = "X";
// let turn = "X";

const player = document.getElementById("toggle-player");

player.addEventListener("click", function () {
  chooseFirstPlayer();
});

function chooseFirstPlayer() {
  // let firstPlayer = prompt("Choose 'X' or 'O' as the first player:");
  // while (firstPlayer !== "X" && firstPlayer !== "O") {
  //   firstPlayer = prompt(
  //     "Invalid choice. Choose 'X' or 'O' as the first player:"
  //   );
  // }
  // console.log("clicked player");
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

// const updateBackground = (event) => {
//   document.body.classList.toggle("on");
// };

// toggle.addEventListener(
//   "click",
//   () => document.body.classList.toggle("on"),
//   false
// );

// function playTurn(rowIndex, colIndex) {
//   if (board[rowIndex][colIndex] !== null || checkGameOver()) {
//     return;
//   }

//   board[rowIndex][colIndex] = currentPlayer;

//   // Toggle between 'X' and 'O' as the current player
//   currentPlayer = currentPlayer === "X" ? "O" : "X";
// }
/*
const gameBoard = document.querySelector("#game-board");
const previousButton = document.querySelector("#previous-btn");
const nextButton = document.querySelector("#next-btn");
const resetButton = document.querySelector("#reset-btn");

let boardState = [
  ["", "", ""],
  ["", "", ""],
  ["", "", ""],
];

let player = "X";
let movesHistory = [];
let currentMoveIndex = 0;

function renderBoard() {
  gameBoard.innerHTML = "";
  for (let i = 0; i < boardState.length; i++) {
    const row = document.createElement("tr");
    for (let j = 0; j < boardState[i].length; j++) {
      const cell = document.createElement("td");
      cell.dataset.row = i;
      cell.dataset.col = j;
      cell.textContent = boardState[i][j];
      row.appendChild(cell);
    }
    gameBoard.appendChild(row);
  }
}

function switchPlayer() {
  player = player === "X" ? "O" : "X";
}

function handleCellClick(event) {
  const clickedCell = event.target;
  const row = clickedCell.dataset.row;
  const col = clickedCell.dataset.col;
  if (boardState[row][col] === "") {
    boardState[row][col] = player;
    movesHistory.splice(currentMoveIndex + 1);
    movesHistory.push(JSON.stringify(boardState));
    currentMoveIndex = movesHistory.length - 1;
    renderBoard();
    checkWinner();
    switchPlayer();
  }
}

function checkWinner() {
  const rows = boardState;
  const cols = [[], [], []];
  const diagonals = [[], []];
  for (let i = 0; i < boardState.length; i++) {
    for (let j = 0; j < boardState[i].length; j++) {
      cols[j].push(boardState[i][j]);
      if (i === j) {
        diagonals[0].push(boardState[i][j]);
      }
      if (i + j === boardState.length - 1) {
        diagonals[1].push(boardState[i][j]);
      }
    }
  }
  const lines = [...rows, ...cols, ...diagonals];
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (line.every((cell) => cell === "X")) {
      endGame("X");
    } else if (line.every((cell) => cell === "O")) {
      endGame("O");
    }
  }
  if (!boardState.flat().includes("")) {
    endGame("draw");
  }
}

function endGame(winner) {
  const message = winner === "draw" ? "It's a draw!" : `${winner} wins!`;
  alert(message);
  previousButton.classList.remove("disabled");
  nextButton.classList.remove("disabled");
}

function handlePreviousClick() {
  if (currentMoveIndex > 0) {
    currentMoveIndex--;
    boardState = JSON.parse(movesHistory[currentMoveIndex]);
    renderBoard();
    checkButtonsState();
  }
}

function handleNextClick() {
  if (currentMoveIndex < movesHistory.length - 1) {
    currentMoveIndex++;
    boardState = JSON.parse(movesHistory[currentMoveIndex]);
    renderBoard();
    checkButtonsState();
  }
}

function handleResetClick() {
  boardState = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ];
  player = "X";
  movesHistory = [];
  currentMoveIndex = 0;
  renderBoard();
  checkButtonsState();
}

function checkButtonsState() {
  if (currentMoveIndex === 0) {
    previousButton.classList.add("disabled");
  } else {
    previousButton.classList.remove("disabled");
  }
  if (currentMoveIndex === movesHistory.length - 1) {
    nextButton.classList.add("disabled");
  } else {
    nextButton.classList.remove("disabled");
  }
}

renderBoard();
gameBoard.addEventListener("click", handleCellClick);
previousButton.addEventListener("click", handlePreviousClick);
nextButton.addEventListener("click", handleNextClick);
resetButton.addEventListener("click", handleResetClick);
checkButtonsState();
*/
