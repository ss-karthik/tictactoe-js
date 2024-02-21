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
		gameboard.clearBoard();	
		turn = 'X';
		gameover = false;
		const player1 = createPlayer("p1", "X");
		const player2 = createPlayer("p2", "O");
		gameboard.printBoard();
		displayTurn();
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
				return;
			}
			else if(checktie(gameboard.board) === true) {
				console.log("IT'S A TIE!");
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
	function displayGrid() {
		const grid = document.querySelector('.grid-container');
		grid.innerHTML = '';
		for(let i=0; i<3; i++) {
			let row = document.createElement('div');
			row.classList.add('row-container');
			for(let j=0; j<3; j++) {
				let cell = document.createElement('div');
				cell.classList.add('cell');
				cell.classList.add(i);
				cell.classList.add(j);
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
		let row = parseInt(e.target.classList[1]);
		let col = parseInt(e.target.classList[2]);
		if(e.target.innerHTML === ' ') {
			console.log(row);
			console.log(col);
			gameControl.play(row, col);
			displayGrid();
		} else {
			alert('INVALID MOVE!');
		}
	}
	function declare() {
		
	}

	return { displayGrid };
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
