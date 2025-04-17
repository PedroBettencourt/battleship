import "./style.css";
import { Player } from "./classes";
import display from "./display";

const player1 = new Player("player");
const player2 = new Player("computer");

player1.gameboard.placeShip(0, 0, 3, "vertical");
player1.gameboard.placeShip(1, 1, 2, "horizontal");
player1.gameboard.placeShip(3, 4, 4, "vertical");
player1.gameboard.placeShip(6, 6, 3, "horizontal");
player1.gameboard.placeShip(9, 1, 5, "horizontal");

player2.gameboard.placeShip(0, 0, 3, "horizontal");
player2.gameboard.placeShip(1, 1, 2, "vertical");
player2.gameboard.placeShip(3, 4, 4, "horizontal");
player2.gameboard.placeShip(6, 6, 3, "vertical");
player2.gameboard.placeShip(4, 1, 5, "vertical");

const board1 = player1.gameboard.board;
const board2 = player2.gameboard.board;
display.createBoard(board1, player1.type);
display.createBoard(board2, player2.type);

const playBoard = document.querySelector(".computer");
playBoard.addEventListener("click", (e) => {
    const id = e.target.dataset.id;
    const [x, y] = id.split("");
    player2.gameboard.receiveAttack(x, y);
    display.displayBoard(player2.gameboard.board, player2.type);
    console.log(player2.gameboard.board)
})