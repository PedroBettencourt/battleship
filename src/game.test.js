import {Ship, Gameboard, Player} from "./classes.js";

describe("Gameboard", () => {
    const gameboard = new Gameboard();
    test("Board", () => {
        expect(gameboard.board)
        .toEqual([[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],
                  [0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0]]);   
    });

    test("Place ship", () => {
        gameboard.placeShip("B", 2, 3, 4, "vertical");
        expect(gameboard.board)
        .toEqual([[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,"B",0,0,0,0,0,0],[0,0,0,"B",0,0,0,0,0,0],[0,0,0,"B",0,0,0,0,0,0],
                  [0,0,0,"B",0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0]]);
    });

    test("Place ship 2", () => {
        expect(() => gameboard.placeShip("D", 2, 3, 3, "horizontal"))
        .toThrow(Error);
        
        expect(gameboard.board)
        .toEqual([[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,"B",0,0,0,0,0,0],[0,0,0,"B",0,0,0,0,0,0],[0,0,0,"B",0,0,0,0,0,0],
                  [0,0,0,"B",0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0]]);
    });

    test("Hit ship", () => {
        gameboard.receiveAttack(3, 3);
        expect(gameboard.board)
        .toEqual([[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,"B",0,0,0,0,0,0],[0,0,0,"X",0,0,0,0,0,0],[0,0,0,"B",0,0,0,0,0,0],
                  [0,0,0,"B",0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0]]);
    });

    test("Miss hit", () => {
        gameboard.receiveAttack(1, 1);
        expect(gameboard.board)
        .toEqual([[0,0,0,0,0,0,0,0,0,0],[0,".",0,0,0,0,0,0,0,0],[0,0,0,"B",0,0,0,0,0,0],[0,0,0,"X",0,0,0,0,0,0],[0,0,0,"B",0,0,0,0,0,0],
                  [0,0,0,"B",0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0]]);
    });

    test("Hit twice", () => {
        expect(() => gameboard.receiveAttack(1, 1))
        .toThrow(Error);
    })

    test ("Sink the ship", () => {
        gameboard.receiveAttack(2, 3);
        gameboard.receiveAttack(4, 3);
        expect(gameboard.receiveAttack(5, 3)).toBeTruthy();
    })
})