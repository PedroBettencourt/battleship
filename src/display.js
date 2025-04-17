export default (() => {
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
        document.body.appendChild(boardDiv);
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

    return {createBoard, displayBoard}
})()