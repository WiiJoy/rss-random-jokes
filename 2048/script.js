document.addEventListener('DOMContentLoaded', () => {

    const scoreItem = document.querySelector('.score')

    let gameData = [],
        score = 0,
        isGameEnd = false,
        isGameProcess = true,
        currGameStatus = true,
        isProcess = false;
    
    startNewGame()
    renderScore()

    document.addEventListener('keydown', (ev) => {

        if (!isProcess) return
    
        if (ev.keyCode === 37) {
            handleLeftMove();
        }
        else if (ev.keyCode === 38) {
            handleTopMove();
        }
        else if (ev.keyCode === 39) {
            handleRightMove();	
        }
        else if (ev.keyCode === 40) {
            handleBottomMove();
        }
    })

    
    function startNewGame() {
        currGameStatus = isGameProcess
        score = 0
        gameData = []

        for (let i = 0; i < 4; i++) {
			gameData[i] = [];
			for (let j = 0; j < 4; j++) {
				gameData[i][j] = 0;
			}
		}

        getRandomCell()
        getRandomCell()

        handleGameProcess()
    }

    function getRandomCell() {
        isProcess = false;

        while (!isProcess) {
            let row = Math.floor(Math.random()*4)
            let cell = Math.floor(Math.random()*4)

            if (gameData[row][cell] === 0) {
                let value = Math.random() > 0.6 ? 2 : 4
                gameData[row][cell] = value
                isProcess = true
            }

            
        }
    }

    function handleGameProcess() {
        for (let i = 0; i < 4; i++) {
			for (let j = 0; j < 4; j++) {
				let currCell = document.querySelector(`#cell${i}${j}`);
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

    // Обработка хода влево
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
			let nextCell = getNextElementInRow(row, cell);
			if (nextCell !== -1) {
				if (gameData[row][cell] === 0) {
					gameData[row][cell] = gameData[row][nextCell];
					gameData[row][nextCell] = 0;
					cell--;
				} else if (gameData[row][cell] === gameData[row][nextCell]) {
					gameData[row][cell] *= 2;
					gameData[row][nextCell] = 0;
                    renderScore(gameData[row][cell])
				}
			} else {
				break;
			}
		}
    }

    function getNextElementInRow(row, cell) {
        for (let i = cell + 1; i < 4; i++){
			if (gameData[row][i] !== 0) {
				return i;
			}
		}
		return -1;
    }

    // Обработка хода вправо
    function handleRightMove() {
        let startCondition = '' + gameData

        for (let i = 0; i < 4; i++) {
            handleRightMoveRow(i)
        }

        let finalCondition = '' + gameData

        if (startCondition !== finalCondition) {
            getRandomCell()
            handleGameProcess()
        }
    }

    function handleRightMoveRow(row) {
        for (let cell = 3; cell > 0; cell--) {	
			let nextCell = getNextRightElementInRow(row, cell);
			if (nextCell !== -1) {
				if (gameData[row][cell] === 0) {
					gameData[row][cell] = gameData[row][nextCell] ;
					gameData[row][nextCell] = 0;
					cell++;
				} else if (gameData[row][cell] === gameData[row][nextCell]) {
					gameData[row][cell] *= 2;
					gameData[row][nextCell] = 0;
                    renderScore(gameData[row][cell])
				}
			} else {
				break;
			}
		}
    }

    function getNextRightElementInRow(row, cell) {
        for (let i = cell - 1; i >= 0; i--){
			if (gameData[row][i] !== 0) {
				return i;
			}
		}
		return -1;
    }

    // Обработка хода вверх
    function handleTopMove() {
        let startCondition = '' + gameData;

		for (let i = 0; i < 4; i++) {
			handleTopMoveRow(i);
		}

		let finalCondition = '' + gameData

		if (startCondition !== finalCondition) {
			getRandomCell()
            handleGameProcess()
		}
    }

    function handleTopMoveRow(row) {
        for (let cell = 0; cell < 3; cell++){	
			let nextCell = getNextTopElement(row, cell);
			if (nextCell !== -1) {
				if (gameData[cell][row] === 0) {
					gameData[cell][row] = gameData[nextCell][row] ;
					gameData[nextCell][row] = 0;
					cell++;
				} else if (gameData[cell][row] == gameData[nextCell][row]) {
					gameData[cell][row] *= 2;
					gameData[nextCell][row] = 0;
                    renderScore(gameData[row][cell])
				}
			} else {
				break;
			}
		}
    }

    function getNextTopElement(row, cell) {
        for (let i = cell + 1; i < 4; i++) {
			if (gameData[i][row] !== 0) {
				return i;
			}
		}
		return -1;
    }


    // Обработка хода вниз
    function handleBottomMove() {
        let startCondition = '' + gameData;

		for (let i = 0; i < 4; i++) {
			handleBottomMoveRow(i);
		}

		let finalCondition = '' + gameData

		if (startCondition !== finalCondition) {
			getRandomCell()
            handleGameProcess()
		}
    }

    function handleBottomMoveRow(row) {
        for (let cell = 3; cell > 0; cell--){	
			let nextCell = getNextBottomElement(row, cell);
			if (nextCell !== -1) {
				if (gameData[cell][row] === 0) {
					gameData[cell][row] = gameData[nextCell][row] ;
					gameData[nextCell][row] = 0;
					cell++;
				} else if (gameData[cell][row] === gameData[nextCell][row]) {
					gameData[cell][row] *= 2;
					gameData[nextCell][row] = 0;
                    renderScore(gameData[row][cell])
				}
			} else {
				break;
			}
		}
    }

    function getNextBottomElement(row, cell) {
        for (let i = cell - 1; i >= 0; i--) {
			if (gameData[i][row] !== 0) {
				return i;
			}
		}
		return -1;
    }

    function renderScore(value = 0) {
        score += value
        scoreItem.innerHTML = score
    }
    


})