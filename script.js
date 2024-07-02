/* 
Tic-tac-toe
1. Store gameboard as an array inside of a Gameboard object
2. Store players in objects
3. Create object that controls the flow of the game
4. No/minimal global code - put everything inside factories
5. Use IIFE (module pattern) for gameboard, displayController
6. Logic that checks if game is over
 a. Looks for 3-in-a-rows
 b. Looks for ties
*/
// Define as object
const Gameboard = {
	// tic-tac-toe board with 3x3 grid
	board: ["", "", "", "", "", "", "", "", ""],
	// Player move
	playerMove: function (pos, player) {
		if (!Gameboard.board[pos]) {
			if (player === 1) {
				// if player1 move, add nought to cell
				Gameboard.board.splice(pos, 1, "O");
			} else if (player === 2) {
				// if player2 move, add cross to cell
				Gameboard.board.splice(pos, 1, "X");
			}
		} else {
			return "Invalid Move - Cell occupied";
		}
	},
};

// win/tie checker
const checkState = function () {
    // easy board reference
    const board = Gameboard.board;
	// win checker function
    const checkWin = function () {
        /* 
            The winchecker slices each possible 3-long group of cells out of the board
            It then checks to see if every cell is either a nought or a cross
            If all cells are noughts - 3 in a row, noughts win - and vice versa
        */
        // test functions
        const isNought = (val) => val === "O"; 
        const isCross = (val) => val === "X";
        // check rows ([0,1,2],[3,4,5],[6,7,8])
        const rows = [board.slice(0,3),board.slice(3,6),board.slice(6,9)];
        for (let i=0; i < rows.length; i++) {
            if (rows[i].every(isNought)) {
                return 1;
            } else if (rows[i].every(isCross)) {
                return 2;
            }
        }
        // check columns ([0,3,6],[1,4,7],[2,5,8])
        const columns = [[board[0],board[3],board[6]],[board[1],board[4],board[7]],[board[2],board[5],board[8]]];
        for (let i=0; i < columns.length; i++) {
            if (columns[i].every(isNought)) {
                return 1;
            } else if (columns[i].every(isCross)) {
                return 2;
            }
        }
        // check diagonals ([0,4,8],[2,4,6])
        const diagonals = [[board[0],board[4],board[8]],[board[2],board[4],board[6]]];
        for (let i=0; i < diagonals.length; i++) {
            if (diagonals[i].every(isNought)) {
                return 1;
            } else if (diagonals[i].every(isCross)) {
                return 2;
            }
        }
    }
	if (checkWin() === 1) {
		console.log("Noughts Win");
	} else if (checkWin() === 2) {
		console.log("Crosses Win");
	} else if (!board.includes("")) {
		// If board is full
		console.log("Board is full");
	} else {
        console.log("Game in progress...");
    }
};

/*
    // Constructor
    const User = function (name) {
        this.name = name;
        this.discordName = "@" + name;
    };

    // Factory function
    function createUser(name) {
        const discordName = "@" + name;
        return { name, discordName };
    }

    // IIFE (Module pattern)
    const calculator = (function () {
        const add = (a, b) => a + b;
        const sub = (a, b) => a - b;
        const mul = (a, b) => a * b;
        const div = (a, b) => a / b;
        return { add, sub, mul, div };
    })();
    
    calculator.add(3,5); // 8
    calculator.sub(6,2); // 4
    calculator.mul(14,5534); // 77476
*/
