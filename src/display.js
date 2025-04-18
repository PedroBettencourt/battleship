export default (() => {

    const createShips = (() => {
        const boardDiv = document.createElement("div");
        boardDiv.className = "board";
        boardDiv.className += " player";
        for (let i = 0; i < 10; i++) {
            for (let j = 0; j < 10; j++) {
                const square = document.createElement("div");
                square.className = "square"
                square.dataset.id = `${i}${j}`;
                boardDiv.appendChild(square);
            }
        }
        const boardsDiv = document.querySelector(".boards");
        boardsDiv.appendChild(boardDiv);
    })

    const deleteCreateShips = (() => {
        const boardDiv = document.querySelector(".board");
        boardDiv.remove();
    })

    const createBoard = ((board, playerType) => {
        const boardDiv = document.createElement("div");
        boardDiv.className = "board ";
        boardDiv.className += playerType;

        board.forEach((row, i) => {
            row.forEach((element, j) => {
                const square = document.createElement("div");
                square.className = "square";
                square.dataset.id = `${i}${j}`;
                square.textContent = displayElement(element, playerType);
                boardDiv.appendChild(square);
            })
        });
        const boards = document.querySelector(".boards");
        boards.appendChild(boardDiv);
    })

    const displayBoard = ((board, playerType) => {
        const squares = document.querySelectorAll(`.${playerType} .square`);
        squares.forEach((square) => {
            const [x, y] = square.dataset.id.split("");
            const element = board[x][y];
            square.textContent = displayElement(element, playerType);
        });
    })

    const displayElement = ((element, playerType) => {
        if (playerType === "player") {
            if (element === 0) return "";
            return element;
        };

        if (element === "." || element === "X") return element;
        return "";
    })

    const displaySunk = ((player1, player2) => {
        const sunkDiv = document.querySelector(".sunk");
        player1 = player1.charAt(0).toUpperCase() + player1.slice(1);
        player2 = player2.charAt(0).toUpperCase() + player2.slice(1);
        sunkDiv.textContent = `${player1} has sunk ${player2}'s ship!`;
    })

    const removeDisplaySunk = (() => {
        const sunkDiv = document.querySelector(".sunk");
        sunkDiv.textContent = "";
    })

    const displayGameOver = ((player) => {
        const sunkDiv = document.querySelector(".sunk");
        player = player.charAt(0).toUpperCase() + player.slice(1);
        sunkDiv.textContent = `${player} has won!`;
    })

    return {createShips, deleteCreateShips, createBoard, displayBoard, displaySunk, removeDisplaySunk, displayGameOver}
})()