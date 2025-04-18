import "./style.css";
import { Player } from "./classes";
import display from "./display";


const placeShipPlayer = (async(player, name, length) => {
    // Direction
    let direction = "horizontal";
    window.addEventListener("keydown", (e) => {
        if (e.key !== "q" && e.key !== "e") return;
        if (direction === "horizontal") direction = "vertical";
        else direction = "horizontal";
    })
    
    // Get coords
    function transformTargetCoords(e) {
        let [x, y] = e.target.dataset.id;
        x = parseInt(x);
        y = parseInt(y);
        return [x, y]
    }

    function handleMouse(e) {
        if (e.target.className !== "square") return;
        const [x, y] = transformTargetCoords(e);
        try {
            display.displayCreateShip(name, length, x, y, direction);
        } catch (error) {
            //console.log(error)
        }
    }
    const boardDiv = document.querySelector(".board");

    boardDiv.addEventListener("mouseover", handleMouse);

    function createClickEvent() {
        return new Promise(function(resolve) {
            boardDiv.addEventListener("click", (e) => {
                if (e.target.className !== "square") return;
                boardDiv.removeEventListener("mouseover", handleMouse);
                resolve(e);
            })
        });
    }
    
    const placeShip = await createClickEvent();
    const [x, y] = transformTargetCoords(placeShip)

    try {
        player.gameboard.placeShip(name, x, y, length, direction);
        display.displayBoard(player.gameboard.board, player.type);
        return true;
    } catch(error) {
        //console.log(error)
        return false;
    }
})

const placeAllShipsPlayer = (async(player, ships) => {
    display.createShips();
    let shipNames = [... Object.keys(ships)];
    while (shipNames.length !== 0) {
        let ship = shipNames[0];
        display.createMessage(ship)
        const shipPlaced = await placeShipPlayer(player, ship, ships[ship]);
        if (shipPlaced) shipNames.shift();
    }
    display.deleteCreateShips();
})


const placeAllShipsComputer = ((gameboard, name, length) => {
    let x = Math.floor(Math.random() * 10);
    let y = Math.floor(Math.random() * 10);
    let direction = Math.floor(Math.random() * 2);
    if (direction === 0) direction = "horizontal";
    else direction = "vertical";

    try {
        gameboard.placeShip(name, x, y, length, direction);
        return;
    } catch {
        placeAllShipsComputer(gameboard, name, length);
    }
});

const playRound = ((e, player1, player2) => {
    if (!player1.turn) return;
    // Remove sunk message
    display.removeDisplaySunk();

    // Get x and y
    const id = e.target.dataset.id;
    let x, y;
    try {
        [x, y] = id.split("");
    } catch {
        return;
    }

    // Try to attack (if position isn't already taken)
    try {
        if (attack(x, y, player2.gameboard, player2, player1)) return true
    } catch (error) {
        console.log(error)
        return;
    }

    //player1.turnSwitch();
    //player2.turnSwitch();

    // Computer's turn
    [x, y] = attackComputer(player1.gameboard.board);
    if (attack(x, y, player1.gameboard, player1, player2)) return true;

    //player1.turnSwitch();
    //player2.turnSwitch();
});

const attack = ((x, y, gameboard, attackReceiver, attackGiver) => {
    const isSunk = gameboard.receiveAttack(x, y);
    display.displayBoard(gameboard.board, attackReceiver.type);
    if (isSunk) {
        display.displaySunk(attackGiver.type, attackReceiver.type);
        if (checkAllSunk(gameboard, attackGiver)) return true;
    };
});

const attackComputer = ((gameboard) => {
    let x = Math.floor(Math.random(0, 1) * 10);
    let y = Math.floor(Math.random(0, 1) * 10);
    
    const position = gameboard[x][y];
    if (position === "X" || position === ".") {
        [x, y] = attackComputer(gameboard);
    }
    return [x, y];
});

const checkAllSunk = ((gameboard, attackGiver) => {
    const gameOver = gameboard.getAllSunk();
    if (gameOver) {
        display.displayGameOver(attackGiver.type);
        const playBoard = document.querySelector(".computer");
        return true
    }
});


// Go through the 2 players and place ships according to their type
const startGame = (async(players) => {
    for (const player of players) {
        if (player.type === "player") {
            await placeAllShipsPlayer(player, ships);
            display.createBoard(player.gameboard.board, player.type);
    
        } else {
            for (const [name, length] of Object.entries(ships)) {
                placeAllShipsComputer(player.gameboard, name, length);
            }
            display.createBoard(player.gameboard.board, player.type);
        }
    }
    //Play round
    const playBoard = document.querySelector(".computer");
    let gameOver;
    playBoard.addEventListener("click", (e) => {
        if (!gameOver) gameOver = playRound(e, players[0], players[1]);
    });
})

const ships = {"C": 5, "B": 4, "D": 3, "S": 3, "P": 2};

// Create 2 players
const player1 = new Player("player", true);
const player2 = new Player("computer", false);
const players = [player1, player2];

startGame(players);