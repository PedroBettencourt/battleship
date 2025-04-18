import "./style.css";
import { Player } from "./classes";
import display from "./display";

const createBoardPlayer = (async(player) => {
    display.createShips();
    let shipNames = [... Object.keys(ships)];
    while(shipNames.length !== 0) {
        const ship = shipNames[0];
        let resultShipPlacement;
        try {
            resultShipPlacement = await createShipPlayer(ship, ships[ship]);
        } catch(error) {
            console.log(error)
        }

        if (!resultShipPlacement) continue;
        if (placeShipPlayer(resultShipPlacement, player, ship, ships[ship])) {
            shipNames.shift();
            display.displayBoard(player.gameboard.board, player.type);
            
            if (shipNames.length === 0) display.deleteCreateShips();
        }
    }
});

const createShipPlayer = ((name, length) => {
    // Show where the ship will be placed
    

    // Click board to place ship
    const boardDiv = document.querySelector(".board");

    //boardDiv.addEventListener("mouseover", (e) )

    return new Promise(function (resolve, reject) {
        boardDiv.addEventListener("click", (e) => {
            // Remove hover event listener
            squaresDiv.forEach(
                square => square.removeEventListener("mouseover", createShipHover)
            );
            
            if (e.target.className != "square") reject(new Error("Outside the board"));
            resolve(e.target);
        })
    });
});

//  const createShipHover = ((square, name, length) => {
//     console.log(square)
//     const id = square.dataset.id;
//     let [x, y] = id.split("");
//     x = parseInt(x);
//     y = parseInt(y);
//     try {
//         display.displayCreateShip(name, length, x, y, "horizontal");
//     } catch (error) {
//         //console.error(error)
//     }
// });

const placeShipPlayer = ((position, player, name, length) => {
    let [x, y] = position.dataset.id.split("");
    x = parseInt(x);
    y = parseInt(y);

    let direction = Math.floor(Math.random() * 2);
    if (direction === 0) direction = "horizontal";
    else direction = "vertical";

    try {
        player.gameboard.placeShip(name, x, y, length, direction);
        return true;
    } catch(error) {
        console.log(error)
        return false;
    }
})

const placeShipRandom = ((gameboard, name, length) => {
    let x = Math.floor(Math.random() * 10);
    let y = Math.floor(Math.random() * 10);
    let direction = Math.floor(Math.random() * 2);
    if (direction === 0) direction = "horizontal";
    else direction = "vertical";

    try {
        gameboard.placeShip(name, x, y, length, direction);
        return;
    } catch {
        placeShipRandom(gameboard, name, length);
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
            await createBoardPlayer(player);
            display.createBoard(player.gameboard.board, player.type);
    
        } else {
            for (const [name, length] of Object.entries(ships)) {
                placeShipRandom(player.gameboard, name, length);
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