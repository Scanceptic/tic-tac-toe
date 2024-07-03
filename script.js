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
/* 
    You can either make loads of functions inside a function and call it once immediately,
    pushing all those functions to the outside but preventing any further access to the outer function
    OR you can make loads of functions inside a function, and then return all those functions at the end,
    meaning all those functions are available on the outside but you can also access the outer function
*/
/* 
Everything publically exposed on the object can be changed from the outside
e.g.
const Format = (function() {
    let timesRun = 0;

    return {
        timesRun
    }
})();
Format.timesRun = 10;
would work
*/
/* 
	The factory functions basically keep a bunch of variables hidden inside (such as gameboard - cannot be directly changed)
	These variables can only be changed using functions that are returned - allowing them to be globally
*/
// Define Gameboard as object
const Gameboard = (() => {
	// declared using let to allow easier changing of values
	let gameboard = [
		["", "", ""],
		["", "", ""],
		["", "", ""],
	];
	const getGameboard = () => {
		return gameboard;
	};
	const resetGameboard = () => {
		gameboard = [
			["", "", ""],
			["", "", ""],
			["", "", ""],
		];
		Player.playerTurn = 1;
		console.log("Board Reset!");
	};
	const setGameboard = (row, col, player) => {
		gameboard[row][col] = player;
	};

	return { getGameboard, resetGameboard, setGameboard };
})();

// Define game as object
// Contains gamewin/tie logic
const Game = (() => {
	const checkState = () => {
		const board = Gameboard.getGameboard();
		const isNoughtOrCross = (val) => val === "O" || val === "X";
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
			const rows = [board[0], board[1], board[2]];
			for (let i = 0; i < rows.length; i++) {
				console.log("Rows check");
				if (rows[i].every(isNought)) {
					console.log(rows[i]);
					return 1;
				} else if (rows[i].every(isCross)) {
					return 2;
				}
			}
			// check columns ([0,3,6],[1,4,7],[2,5,8])
			const columns = [
				[board[0], board[3], board[6]],
				[board[1], board[4], board[7]],
				[board[2], board[5], board[8]],
			];
			for (let i = 0; i < columns.length; i++) {
				console.log("Columns check");
				if (columns[i].every(isNought)) {
					return 1;
				} else if (columns[i].every(isCross)) {
					return 2;
				}
			}
			// check diagonals ([0,4,8],[2,4,6])
			const diagonals = [
				[board[0], board[4], board[8]],
				[board[2], board[4], board[6]],
			];
			for (let i = 0; i < diagonals.length; i++) {
				console.log("Diagonals check");
				if (diagonals[i].every(isNought)) {
					return 1;
				} else if (diagonals[i].every(isCross)) {
					return 2;
				}
			}
		};
		const result = checkWin();
		if (result === 1) {
			console.log("Noughts Win");
			return true;
		} else if (result === 2) {
			console.log("Crosses Win");
			return true;
		} else if (board.every(isNoughtOrCross) === true) {
			// If board is full
			console.log("Board is full - Draw");
			return true;
		} else {
			console.log("Game in progress...");
			return false;
		}
	};

	return { checkState };
})();

// Define player as object
// contains player info, turn order logic
const Player = (() => {
	let player1 = "O";
	let player2 = "X";
	let playerTurn = 1;

	const playerMove = (row, col) => {
		if (Gameboard.getGameboard()[row][col] === "") {
			if (playerTurn === 1) {
				Gameboard.setGameboard(row, col, player1);
				console.log(
					`Player ${playerTurn} played row ${row + 1}, column ${col + 1}`
				);
				playerTurn = 2;
				console.log(`Player ${playerTurn}'s turn`);
			} else if (playerTurn === 2) {
				Gameboard.setGameboard(row, col, player2);
				console.log(
					`Player ${playerTurn} played row ${row + 1}, column ${col + 1}`
				);
				playerTurn = 1;
				console.log(`Player ${playerTurn}'s turn`);
			} else if (playerTurn === 0) {
				console.log(
					"No Moves Possible, Game is Over! Reset Board to Start Again"
				);
			}
			if (Game.checkState()) {
				playerTurn = 0;
			}
		} else {
			console.log("Cell is occupied - Invalid Move");
		}
	};

	return { playerMove };
})();

const displayController = (() => {
	
	
	const renderGame = () => {

	}
})