
let field = Array(9).fill(null);
let currentPlayer = "X";
let gameOver = false;

const board = document.getElementById("board");
const statusText = document.getElementById("status");

function renderBoard() {
    board.innerHTML = "";
    field.forEach((cell, index) => {
        const cellDiv = document.createElement("div");
        cellDiv.classList.add("cell");
        cellDiv.textContent = cell;
        cellDiv.addEventListener("click", () => makeMove(index));
        board.appendChild(cellDiv);
    });
}

function makeMove(index) {
    if (field[index] || gameOver) return;

    field[index] = currentPlayer;
    renderBoard();

    const winner = checkWinner();
    if (winner) {
        statusText.textContent = `Spieler ${winner} hat gewonnen!`;
        gameOver = true;
    } else if (!field.includes(null)) {
        statusText.textContent = "Unentschieden!";
        gameOver = true;
    } else {
        currentPlayer = currentPlayer === "X" ? "O" : "X";
        statusText.textContent = `Spieler ${currentPlayer} ist dran`;

        if (currentPlayer === "O") {
            setTimeout(botMove, 500); // Kleines Delay für realistisches Gefühl
        }
    }
}

function botMove() {
    if (gameOver) return;

    // Simple KI: Wähle ein zufälliges freies Feld
    let freeIndices = field
        .map((val, idx) => val === null ? idx : null)
        .filter(idx => idx !== null);

    if (freeIndices.length > 0) {
        const randomIndex = freeIndices[Math.floor(Math.random() * freeIndices.length)];
        makeMove(randomIndex);
    }
}

function checkWinner() {
    const winCombos = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    for (const combo of winCombos) {
        const [a, b, c] = combo;
        if (field[a] && field[a] === field[b] && field[a] === field[c]) {
            return field[a];
        }
    }
    return null;
}

function resetGame() {
    field = Array(9).fill(null);
    currentPlayer = "X";
    gameOver = false;
    statusText.textContent = `Spieler ${currentPlayer} ist dran`;
    renderBoard();
}

renderBoard();