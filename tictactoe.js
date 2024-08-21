const board = document.getElementById('board');
const cells = document.querySelectorAll('.cell');
const restartButton = document.getElementById('restartButton');
const gameStatus = document.getElementById('gameStatus');
let currentPlayer = 'x';
let gameActive = true;
const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

const handleCellClick = (event) => {
    const cell = event.target;
    const index = cell.getAttribute('data-index');

    if (cell.classList.contains('x') || cell.classList.contains('o') || !gameActive) {
        return;
    }

    cell.classList.add(currentPlayer);
    cell.textContent = currentPlayer.toUpperCase();

    if (checkWinner(currentPlayer)) {
        gameStatus.textContent = `${currentPlayer.toUpperCase()} gana!`;
        gameActive = false;
        return;
    }

    if (isDraw()) {
        gameStatus.textContent = 'Empate!';
        gameActive = false;
        return;
    }

    currentPlayer = currentPlayer === 'x' ? 'o' : 'x';
    gameStatus.textContent = `Turno de ${currentPlayer.toUpperCase()}`;
};

const checkWinner = (player) => {
    return winningConditions.some(condition => {
        return condition.every(index => {
            return cells[index].classList.contains(player);
        });
    });
};

const isDraw = () => {
    return [...cells].every(cell => {
        return cell.classList.contains('x') || cell.classList.contains('o');
    });
};

const restartGame = () => {
    currentPlayer = 'x';
    gameActive = true;
    cells.forEach(cell => {
        cell.classList.remove('x');
        cell.classList.remove('o');
        cell.textContent = '';
    });
    gameStatus.textContent = `Turno de ${currentPlayer.toUpperCase()}`;
};

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
restartButton.addEventListener('click', restartGame);

gameStatus.textContent = `Turno de ${currentPlayer.toUpperCase()}`;
