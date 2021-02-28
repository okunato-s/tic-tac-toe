const msgDisplay = document.querySelector('h2');

let playingGame = true;
let turn = -1;
let currentPlayer = 'gray';
let board = ["", "", "", "", "", "", "", "", ""];

const winningMsg = () => `Player ${currentPlayer} has won!`;
const drawMsg = () => `It's a draw!`;
const playerTurn = () => `It's ${currentPlayer}'s turn`;

msgDisplay.innerHTML = playerTurn();

const winningMoves = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

function handleClick(clickedSpace, spaceIdx){
  board[spaceIdx] = currentPlayer;
  clickedSpace.style.backgroundColor = `${currentPlayer}`;
}

function turnChange (){
  currentPlayer = currentPlayer === 'gray' ? 'black' : 'gray';
  msgDisplay.innerHTML = playerTurn();
}

function checkIfWon() {
  let isWinner = false;
  // make a for each loop
  for (let i = 0; i <= 7; i++) {
      const winMov = winningMoves[i];
      let a = board[winMov[0]];
      let b = board[winMov[1]];
      let c = board[winMov[2]];
      if (a === '' || b === '' || c === '') {
          continue;
      }
      if (a === b && b === c) {
          isWinner = true;
          break
      }
  }

  if (isWinner) {
      msgDisplay.innerHTML = winningMsg();
      playingGame = false;
      return;
  }

  let isDraw = !board.includes("");
  if (isDraw) {
      msgDisplay.innerHTML = drawMsg();
      playingGame = false;
      return;
  }

  turnChange();
}

function spaceClick(evt) {
  const clickedSpace = evt.target;
  const clickedSpaceIdx = parseInt(clickedSpace.getAttribute('space-index'));

  if (board[clickedSpaceIdx] !== "" || !playingGame) {
      return;
  }

  handleClick(clickedSpace, clickedSpaceIdx);
  checkIfWon();
}

function replay() {
  playingGame = true;
  currentPlayer = 'gray';
  gameState = ["", "", "", "", "", "", "", "", ""];
  msgDisplay.innerHTML = playerTurn();
  document.querySelectorAll('.space').forEach(space => space.style.backgroundColor = "");
}

document.querySelectorAll('.space').forEach(space => space.addEventListener('click', spaceClick));
document.querySelector('button').addEventListener('click', replay); 