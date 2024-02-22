const startButton = document.getElementById('start');
startButton.addEventListener('click', function() {
	gameControl.start();	
});

function createPlayer (name, team) {
	return {name, team};
};

const gameboard = (() => {
	let board = [];
	let rows = 3;
	let columns = 3;

	const clearBoard = () => {
		for(let i=0; i<rows; i++){
			board[i] = [];
			for(let j=0; j<columns; j++){
				board[i].push(' ');
			}
		}	
	}
	

	const printBoard = () => {
		for(let i=0; i<rows; i++){
			for(let j=0; j<columns; j++){
				console.log(board[i][j]);
			}
		}	
	}

	const setValue = (row, col, value) => {
		board[row][col] = value;
	}
	
	return { board, setValue,  printBoard, clearBoard };
})();


const gameControl = (() => {

	let turn = 'X';
	let gameover = false;


	const start = () => {
		display.clearResult();
		gameboard.clearBoard();	
		turn = 'X';
		gameover = false;
		gameboard.printBoard();
		displayTurn();
		display.createPlayers();
		display.displayGrid();
	}

	const displayTurn = () => {
		console.log(turn + "'s Turn: \n");
	}

	const play = (row, col) => {
			if(gameover){
				return;
			}
			gameboard.setValue(row, col, turn);				
			gameboard.printBoard();
			
			if(checkwin(gameboard.board) === true) {
				console.log(turn + "IS THE WINNER!");				
				gameover = true;
				display.declareResult(turn);
				return;
			}
			else if(checktie(gameboard.board) === true) {
				console.log("IT'S A TIE!");
				display.declareResult(0);
				gameover = true;
				return;
			} 
			else {
				turn = (turn ==='X')?'O':'X';
			}
			displayTurn();
	}

	return { start, play };

})();

const display = (() => {
	const result = document.querySelector('.status');
	let player2;
	let player1; 
	function displayGrid() {
		const grid = document.querySelector('.grid-container');
		grid.innerHTML = '';
		for(let i=0; i<3; i++) {
			let row = document.createElement('div');
			row.classList.add('row-container');
			for(let j=0; j<3; j++) {
				let cell = document.createElement('div');
				cell.classList.add('cell');
				cell.classList.add(`${i}${j}`);
				cell.addEventListener('click', function(e) {
					sendValue(e);
				})
				cell.innerHTML = gameboard.board[i][j];
				row.appendChild(cell);
			}
			grid.appendChild(row);
		}
	}
	function sendValue(e) {
		let str = e.target.classList[1];
		let arr = str.split('');
		if(e.target.innerHTML === ' ') {
			console.log(arr[0]);
			console.log(arr[1]);
			gameControl.play(arr[0], arr[1]);
			displayGrid();
		} else {
			alert('INVALID MOVE!');
		}
	}

	function createPlayers() {
		const submitButton = document.querySelector('.submit');
		const dialog = document.querySelector("dialog");
		dialog.showModal();
		const p1 = document.getElementById('player1');
		const p2 = document.getElementById('player2');
		submitButton.addEventListener('click', function(e) {
			e.preventDefault();
			player1 = createPlayer(p1.value, "X");
			player2 = createPlayer(p2.value, "O");
			dialog.close();
		});
	}
	
	function declareResult(res) {
		if(res === 'X') {
			result.innerHTML = player1.name + ' is the winner';
		} else if(res === 'O') {
			result.innerHTML = player2.name + ' is the winner';
		} else if(res === 0) {
			result.innerHTML = "It's a Tie!";
		}
		
	}
	
	function clearResult() {
		result.innerHTML = '';
	}

	return { displayGrid, createPlayers, declareResult, clearResult };
})();


function checkwin(board) {	
	for(let i = 0; i<3; i++){
		if(board[i][0] != ' ' && board[i][0] === board[i][1] && board[i][0] === board[i][2]){
            return true;
        }
        else if(board[0][i] != ' ' && board[0][i] === board[1][i] && board[0][i] === board[2][i]){
            return true;
        }
    }
    if(board[0][0] != ' ' && board[0][0] === board[1][1] && board[0][0] === board[2][2]){
        return true;
    }
    if(board[0][2] != ' ' && board[0][2] === board[1][1] && board[0][2] === board[2][0]){
        return true;
    }
    return false;
}

function checktie(board) {
	let count = 0;
	for(let i=0; i<3; i++) {
		for(let j=0; j<3; j++) {
			if(board[i][j] === ' '){
				count++;
			}	
		}
	}
	if (count == 0) {
		return true;
	} else {
		return false;
	}
}
