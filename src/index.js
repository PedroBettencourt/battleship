import { Player } from "./classes";
import { displayBoard } from "./display";

const player1 = new Player();
const player2 = new Player();

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
console.log(board1);
//displayBoard(board1);