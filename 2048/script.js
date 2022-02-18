document.addEventListener('DOMContentLoaded', () => {

    let gameData = [],
        score = null,
        isGameEnd = false,
        isGameProcess = true,
        currGameStatus = true,
        isProcess = false;
    
    startNewGame()

    
    function startNewGame() {
        currGameStatus = isGameProcess
        score = 0
        gameData = []

        for (let i = 0; i < 4; i++) {
			gameData[r] = [];
			for (let j = 0; j < 4; j++) {
				gameData[r][c] = 0;
			}
		}

        getRandomCell()
        getRandomCell()
    }

    function getRandomCell() {
        isProcess = false;

        while (!isProcess) {
            let row = Math.floor(Math.random()*4)
            let cell = Math.floor(Math.random()*4)

            if (gameData[row][cell] === 0) {
                let value = Math.random() > 0.5 ? 2 : 4
                gameData[row][cell] = value
            }
        }
    }

    function handleGameProcess() {
        for (let i = 0; i < 4; i++){
			for (let j = 0; j < 4; j++){
				let currCell = document.querySelector(`#c${i}${j}`);
				if (gameData[i][j] === 0) {
					currCell.innerHTML = '';
					currCell.className = 'game__cell';
				} else {
					currCell.innerHTML = gameData[i][j];
					currCell.className = `game__cell game__cell_${+gameData[i][j]}`;
				}
			}
		}
    }

    function handleLeftMove() {
        let startCondition = '' + gameData

        for (let i = 0; i < 4; i++) {
            handleLeftMoveRow(i)
        }

        let finalCondition = '' + gameData

        if (startCondition !== finalCondition) {
            getRandomCell()
            handleGameProcess()
        }


    }

    function handleLeftMoveRow(row) {
        for (let cell = 0; cell < 3; cell++){	
			var nextCell = getNextElementInRow(row, cell);
			if (nextCell !== -1) {
				if (gameData[row][cell] === 0) {
					gameData[row][cell] = gameData[row][nextCell];
					gameData[row][nextCell] = 0;
					cell--;
				} else if (gameData[row][cell] === gameData[row][nextCell]) {
					gameData[row][cell] *= 2;
					gameData[row][nextCell] = 0;
				}
			} else {
				break;
			}
		}
    }

    function getNextElementInRow(row, cell) {
        for (let i = cell + 1; i < 4; i++){
			if (this.mydata[row][i] !== 0) {
				return i;
			}
		}
		return -1;
    }

    


})