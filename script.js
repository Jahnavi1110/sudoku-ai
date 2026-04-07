let board = [];

function createEmptyBoard() {
    board = Array.from({ length: 9 }, () => Array(9).fill(0));
}

function isValid(board, row, col, num) {
    for (let x = 0; x < 9; x++) {
        if (board[row][x] === num || board[x][col] === num)
            return false;
    }

    let startRow = row - row % 3;
    let startCol = col - col % 3;

    for (let i = 0; i < 3; i++)
        for (let j = 0; j < 3; j++)
            if (board[startRow + i][startCol + j] === num)
                return false;

    return true;
}

function solve(board) {
    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            if (board[row][col] === 0) {
                for (let num = 1; num <= 9; num++) {
                    if (isValid(board, row, col, num)) {
                        board[row][col] = num;

                        if (solve(board)) return true;

                        board[row][col] = 0;
                    }
                }
                return false;
            }
        }
    }
    return true;
}

function generateSudoku() {
    createEmptyBoard();
    solve(board);

    let difficulty = document.getElementById("difficulty").value;

    for (let i = 0; i < difficulty; i++) {
        let row = Math.floor(Math.random() * 9);
        let col = Math.floor(Math.random() * 9);
        board[row][col] = 0;
    }

    drawBoard();
}

function drawBoard() {
    const boardDiv = document.getElementById("board");
    boardDiv.innerHTML = "";

    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            let cell = document.createElement("input");
            cell.value = board[row][col] !== 0 ? board[row][col] : "";
            cell.disabled = board[row][col] !== 0;
            cell.id = `${row}-${col}`;
            boardDiv.appendChild(cell);
        }
    }
}

function solveSudoku() {
    let tempBoard = getBoardFromUI();
    solve(tempBoard);
    board = tempBoard;
    drawBoard();
}

function getBoardFromUI() {
    let temp = Array.from({ length: 9 }, () => Array(9).fill(0));

    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            let val = document.getElementById(`${row}-${col}`).value;
            temp[row][col] = val ? parseInt(val) : 0;
        }
    }
    return temp;
}

function giveHint() {
    let tempBoard = getBoardFromUI();
    solve(tempBoard);

    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            let cell = document.getElementById(`${row}-${col}`);
            if (!cell.value) {
                cell.value = tempBoard[row][col];
                return;
            }
        }
    }
}
