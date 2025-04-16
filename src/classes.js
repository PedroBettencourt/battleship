class Ship {
    constructor(length, hits = 0, sunk = false) {
        this.length = length;
        this.hits = hits;
        this.sunk = sunk;
    }

    hit() {
        this.hits++;
    }

    isSunk() {
        if (this.length === this.hits) this.sunk = true;
    }
}

class Gameboard {
    constructor() {
        this.board = new Array(10).fill(0).map(() => new Array(10).fill(0))
        this.ships = [];
    }

    placeShip(x, y, length, direction) {
        // Checks if board can place the ship
        for (let i = 0; i < length; i++) {
            if (direction === "horizontal") {
                if (this.board[x][y + i] !== 0) {
                    throw new Error("Position already occupied!");
                }
            } else {
                if (this.board[x + i][y] !== 0) {
                    throw new Error("Position already occupied!");
                }
            }
        }

        // Create ship
        const ship = new Ship(length);
        this.ships.push(ship);
        
        // Place ship on game board
        for (let i = 0; i < ship.length; i++) {
            if (direction === "horizontal") this.board[x][y + i] = ship.length;
            else this.board[x + i][y] = ship.length;
        }
    }

    receiveAttack(x, y) {
        const position = this.board[x][y];
        // Already played
        if (position === "X" || position === ".") {
            throw new Error("Position already tried!");
        }
        
        // Missed attack
        if (position === 0) {
            this.board[x][y] = ".";
            return;
        }
        
        // Attack hits a ship
        this.board[x][y] = "X";
        const ship = this.ships.find(e => e.length === position);
        ship.hit();
        
        if (this.getAllSunk()) return true;
        return false;
    }

    getAllSunk() {
        this.ships.forEach(ship => ship.isSunk());
        const notSunk = this.ships.some(ship => ship.sunk === false);
        if (!notSunk) {
            console.log("Game is over!");
            return true;
        }
    }
}

class Player {
    constructor(type) {
        this.type = type;
        this.gameboard = new Gameboard();
    }
}

export {Ship, Gameboard, Player};