const board = document.getElementById('board');
const cells = document.querySelectorAll('.cell');
const message = document.getElementById('message');
const resetButton = document.getElementById('reset');
let currentMarker = 'X';
let boardState = [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '];
let gameActive = true;

const winningCombination = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

function handleClick(event) {
    const index = event.target.dataset.index;

    // Check if cell is already filled or game is not active
    if (boardState[index] !== ' ' || !gameActive) {
        return;
    }
    // Update board state and cell content
    boardState[index] = currentMarker;
    event.target.textContent = currentMarker;

    // Check for win condition
    if (checkForWin()) {
        message.textContent =`Player ${currentMarker} wins!`;
        gameActive = false;
        return;
    }

    // Check for draw condition
    if (boardState.every(cell => cell !== ' ')) {
        message.textContent = "It's a draw!";
        gameActive = false;
        return;
    }

    // Switch marker
    currentMarker = currentMarker === 'X' ? 'O' : 'X';
}

function checkForWin() {
    return winningCombination.some(combination => {
        const [a, b, c] = combination;
        return boardState[a] !== ' ' && boardState[a] === boardState[b] && boardState[a] === boardState[c];
    });
}

function resetGame() {
    boardState = [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '];
    cells.forEach(cell => cell.textContent = ' ');
    message.textContent = '';
    currentMarker = 'X';
    gameActive = true;
}

cells.forEach(cell => cell.addEventListener('click', handleClick));
resetButton.addEventListener('click', resetGame);