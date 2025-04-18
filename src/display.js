export default (() => {

    const createMessage = ((name) => {
        // Text on top
        const message = document.querySelector(".sunk");
        message.textContent = `Place ${name} ship`;

    })

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

        // Remove text on top
        const message = document.querySelector(".sunk");
        message.textContent = "";
    })

    const displayCreateShip = ((name, length, x, y, direction) => {
        const squaresDiv = document.querySelectorAll(".square");
        squaresDiv.forEach(square => {
            if (square.textContent === name ) square.textContent = "";
        })

        try {
            if (direction === "horizontal") {
                for (let i = 0; i < length; i++) {
                    const squareDiv = document.querySelector(`.square[data-id="${x}${y + i}"]`);
                    if (squareDiv.textContent === "") squareDiv.textContent = name;
                    else throw new Error("Impossible to place ship there!");
                }
            } else {
                for (let i = 0; i < length; i++) {
                    const squareDiv = document.querySelector(`.square[data-id="${x + i}${y}"]`);
                    if (squareDiv.textContent === "") squareDiv.textContent = name;
                    else throw new Error("Impossible to place ship there!");
                }
            }
        } catch (error) {
            throw new Error("Impossible to place ship there");
        }
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
            });
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
            if (element[1] === "X") return element[1]
            return element;
        };

        if (element === ".") return element;
        if (element[1] === "X") return element[1]
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

    return {createMessage, createShips, deleteCreateShips, displayCreateShip, createBoard, displayBoard, displaySunk, removeDisplaySunk, displayGameOver}
})()