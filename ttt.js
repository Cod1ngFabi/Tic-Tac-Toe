const statusDisplay = document.querySelector('.game-status');

let gameActive = true;
let currentPlayer = "X";
let gameState = ["", "", "", "", "", "", "", "", ""];

const winningMessage = () => `Player ${currentPlayer} has won!`;
const drawMessage = () => `It is a draw!`;
const currentPlayerTurn = () => `It is the ${currentPlayer}'s turn!`;

statusDisplay.innerHTML = currentPlayerTurn();

document.querySelectorAll('.cell').forEach(cell => cell.addEventListener('click', handleCellClick));
document.querySelector('.game-restart').addEventListener('click', handleRestartGame);

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [6, 4, 2],
];



function handleCellPlayed(clickedCell, clickedCellIndex) {
    clickedCell.innerHTML = currentPlayer;
    gameState[clickedCellIndex] = currentPlayer;

}



function handlePlayerChange() {
    if (currentPlayer === "X") {
        currentPlayer = "O";
    } else if (currentPlayer === "O") {
        currentPlayer = "X";
    } else {
        alert("Error");
    }
    statusDisplay.innerHTML = currentPlayerTurn();
}



function handleResultValidation() {

    let roundWon = false;
    for (let i = 0; i <= 7; i++) {
        const winCondition = winningConditions[i];
        let a = gameState[winCondition[0]];
        let b = gameState[winCondition[1]];
        let c = gameState[winCondition[2]];

        if (a === "" || b === "" || c === "") {
            continue;
        } else if (a === b && b === c) {
            roundWon = true;
            break;
        }
    }
    if (roundWon) {
        gameActive = false;
        statusDisplay.innerHTML = winningMessage();
        return;
    }
    let roundDraw = !gameState.includes("");
    if (roundDraw) {
        statusDisplay.innerHTML = drawMessage();
        gameActive = false;
        return;
    }
    handlePlayerChange();
}


function handleCellClick(clickedCellEvent) {

    const clickedCell = clickedCellEvent.target;
    const clickedCellIndex = parseInt(clickedCell.getAttribute('data-cell-index'));

    if (gameState[clickedCellIndex] !== "" || !gameActive) {
        return;
    } else {
        handleCellPlayed(clickedCell, clickedCellIndex);
        handleResultValidation();
    }

}


function handleRestartGame() {
    gameActive = true;
    currentPlayer = "X";
    gameState = ["", "", "", "", "", "", "", "", ""];
    statusDisplay.innerHTML = currentPlayerTurn();
    document.querySelectorAll('.cell').forEach(cell => cell.innerHTML = "");
}