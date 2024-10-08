const cells = document.querySelectorAll('.cell');
const gameStatus = document.getElementById('gameStatus');
const resetButton = document.getElementById('resetButton');
const winModal = document.getElementById('winModal');
const winMessage = document.getElementById('winMessage');
const closeModalButton = document.getElementById('closeModal');

let currentPlayer = 'X';
let board = ['', '', '', '', '', '', '', '', ''];
let isGameActive = true;

const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

function handleCellClick(event) {
  const cell = event.target;
  const index = cell.getAttribute('data-index');

  if (board[index] === '' && isGameActive) {
    board[index] = currentPlayer;
    cell.classList.add(currentPlayer.toLowerCase());
    cell.innerText = currentPlayer;
    checkWinner();
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    gameStatus.innerText = isGameActive ? `Player ${currentPlayer}'s turn` : '';
  }
}

function checkWinner() {
  let winner = null;

  for (let combo of winningCombinations) {
    const [a, b, c] = combo;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      winner = board[a];
      break;
    }
  }

  if (winner) {
    gameStatus.innerText = `Player ${winner} wins!`;
    showWinModal(winner);
    isGameActive = false;
  } else if (!board.includes('')) {
    gameStatus.innerText = 'It\'s a tie!';
    isGameActive = false;
  }
}

function showWinModal(winner) {
  winMessage.innerText = `Player ${winner} wins!`;
  winModal.style.display = 'flex';
}

function resetGame() {
  board = ['', '', '', '', '', '', '', '', ''];
  isGameActive = true;
  currentPlayer = 'X';
  gameStatus.innerText = `Player X's turn`;
  cells.forEach(cell => {
    cell.innerText = '';
    cell.classList.remove('x', 'o');
  });
  winModal.style.display = 'none';
}

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
resetButton.addEventListener('click', resetGame);
closeModalButton.addEventListener('click', resetGame);
