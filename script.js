function createPlayer (name, team) {
	return {name, team};
};

const gameboard = (() => {
	let board = [];
	let rows = 3;
	let columns = 3;

	for(let i=0; i<rows; i++){
		board[i] = [];
		for(let j=0; j<columns; j++){
			board[i].push(' ');
		}
	}

	const printBoard = () => {
		for(let i=0; i<rows; i++){
			for(let j=0; j<columns; j++){
				console.log(board[i][j] + ' ');
			}
			console.log('\n');
		}	
	}

	const setValue = (row, col, value) => {
		board[row][col] = value;
	}
	
	return { setValue,  printBoard };
})();


const gameControl = (() => {
	
})();
