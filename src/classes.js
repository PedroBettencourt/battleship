class Ship {
    constructor(name) {
        this.name = name;
        this.length = this.lengthName();
        this.hits = 0;
        this.sunk = false;
    }

    hit() {
        this.hits++;
    }

    isSunk() {
        if (this.length === this.hits) this.sunk = true;
    }

    lengthName() {
        let length;
        if (this.name === "C") length = 5;
        if (this.name === "B") length = 4;
        if (this.name === "D") length = 3;
        if (this.name === "S") length = 3;
        if (this.name === "P") length = 2;
        return length;
    }
}

class Gameboard {
    constructor() {
        this.board = new Array(10).fill(0).map(() => new Array(10).fill(0))
        this.ships = [];
    }

    placeShip(name, x, y, length, direction) {
        // Checks if board can place the ship
        for (let i = 0; i < length; i++) {
            if (direction === "horizontal") {
                if (this.board[x][y + i] !== 0) {
                    throw new Error("Horizontal position already occupied!");
                }
            } else {
                if (this.board[x + i][y] !== 0) {
                    throw new Error("Vertical position already occupied!");
                }
            }
        }

        // Create ship
        const ship = new Ship(name);
        this.ships.push(ship);
        
        // Place ship on game board
        for (let i = 0; i < length; i++) {
            if (direction === "horizontal") this.board[x][y + i] = ship.name;
            else this.board[x + i][y] = ship.name;
        }
    }

    receiveAttack(x, y) {
        const position = this.board[x][y];
        // Already played
        if (position[1] === "X" || position === ".") {
            throw new Error("Position already tried!");
        }
        
        // Missed attack
        if (position === 0) {
            this.board[x][y] = ".";
            return;
        }
        
        // Attack hits a ship
        this.board[x][y] += "X";
        const ship = this.ships.find(e => e.name === position);
        ship.hit();
        ship.isSunk();
        if (ship.sunk) {
            return true;
        }
    }

    getAllSunk() {
        const notSunk = this.ships.some(ship => ship.sunk === false);
        if (!notSunk) {
            return true;
        }
    }
}

class Player {
    constructor(type, turn = false) {
        this.type = type;
        this.gameboard = new Gameboard();
        this.turn = turn;
    }

    turnSwitch() {
        if (this.turn === false) this.turn = true;
        else this.turn = false;
    }
}

export {Ship, Gameboard, Player};