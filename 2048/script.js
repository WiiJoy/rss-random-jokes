document.addEventListener('DOMContentLoaded', () => {

    const scoreItem = document.querySelector('.score')
          cellItems = document.querySelectorAll('.game__cell')

    let gameData = [],
        score = 0,
        isGameEnd = false,
        isGameProcess = true,
        currGameStatus = true,
        isProcess = false;
        notFirstStep = false;
        isStep = false,
        touchXStart = 0,
        touchXEnd = 0,
        touchYStart = 0,
        touchYEnd = 0;
    
    createNullElements()
    startNewGame()
    renderScore()

    document.addEventListener('keydown', (ev) => {

        if (!isProcess || isStep) return
    
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

    // Регистрация хода с клавиатуры
    document.addEventListener('keydown', (ev) => {

        if (!isProcess || isStep) return
    
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

    // Регистрация хода с тача
    // Регистрация начального положения тача
    document.addEventListener('touchstart', (ev) => {
        touchXStart = ev.touches[0].pageX
        touchYStart = ev.touches[0].pageY
    })
    
    //Регистрация конечного положения тача
    document.addEventListener('touchend', (ev) => {
        touchXEnd = ev.touches[0].pageX
        touchYEnd = ev.touches[0].pageY

        // Вычисление разницы по осям
        let diffX = touchXEnd - touchXStart
        let diffY = touchYEnd - touchYStart

        if (Math.abs(diffX) > Math.abs(diffY) && diffX > 0) {
            handleRightMove()
        } else if (Math.abs(diffX) > Math.abs(diffY) && diffX < 0) {
            handleLeftMove()
        } else if (Math.abs(diffX) < Math.abs(diffY) && diffY > 0) {
            handleTopMove()
        } else if (Math.abs(diffX) < Math.abs(diffY) && diffY < 0) {
            handleBottomMove()
        } else {
            console.log('one dot touch')
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
                let value = Math.random() > 0.1 ? 2 : 4
                gameData[row][cell] = value
                isProcess = true
            }
        }
    }

    function handleGameProcess() {
        for (let i = 0; i < 4; i++) {
			for (let j = 0; j < 4; j++) {
				let currCell = document.querySelector(`#cell${i}${j}`);

                if (currCell.firstChild && currCell.firstChild.className === `game__cell__item game__cell_${+gameData[i][j]}`) continue
                if (gameData[i][j] === 0 && !currCell.firstChild && notFirstStep) continue

                currCell.firstChild.style.opacity = 0

                let div = document.createElement('div')
				
                setTimeout(() => {

                    if (gameData[i][j] === 0) {
                        currCell.innerHTML = ''
                        div.className = `game__cell__item`
                    } else {
                        currCell.innerHTML = ''
                        div.className = `game__cell__item game__cell_${+gameData[i][j]}`
                    }

                    currCell.append(div)

                    currCell.style.opacity = 1
                }, 300)
			}
		}
        notFirstStep = true

        console.log('gameData: ', gameData)
    }

    // Обработка хода влево
    function handleLeftMove() {
        console.log('left move')
        let startCondition = '' + gameData

        for (let i = 0; i < 4; i++) {
            handleLeftMoveRow(i)
        }

        let finalCondition = '' + gameData

        if (startCondition !== finalCondition) {
            isStep = true
            handleGameProcess()
            
            setTimeout(() => {
                getRandomCell()
                checkStatus()
                handleGameProcess()
                isStep = false
            }, 300)
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
        console.log('right move')
        let startCondition = '' + gameData

        for (let i = 0; i < 4; i++) {
            handleRightMoveRow(i)
        }

        let finalCondition = '' + gameData

        if (startCondition !== finalCondition) {
            isStep = true
            handleGameProcess()
            
            setTimeout(() => {
                getRandomCell()
                checkStatus()
                handleGameProcess()
                isStep = false
            }, 300)
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
        console.log('top move')
        let startCondition = '' + gameData;

		for (let i = 0; i < 4; i++) {
			handleTopMoveRow(i);
		}

		let finalCondition = '' + gameData

		if (startCondition !== finalCondition) {
            isStep = true
			handleGameProcess()
            
            setTimeout(() => {
                getRandomCell()
                checkStatus()
                handleGameProcess()
                isStep = false
            }, 300)
		}
    }

    function handleTopMoveRow(row) {
        for (let cell = 0; cell < 3; cell++){	
			let nextCell = getNextTopElement(row, cell);
			if (nextCell !== -1) {
				if (gameData[cell][row] === 0) {
					gameData[cell][row] = gameData[nextCell][row] ;
					gameData[nextCell][row] = 0;
					cell--;
				} else if (gameData[cell][row] === gameData[nextCell][row]) {
					gameData[cell][row] *= 2;
					gameData[nextCell][row] = 0;
                    renderScore(gameData[cell][row])
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
        console.log('bottom move')
        let startCondition = '' + gameData;

		for (let i = 0; i < 4; i++) {
			handleBottomMoveRow(i);
		}

		let finalCondition = '' + gameData

		if (startCondition !== finalCondition) {
            isStep = true
			handleGameProcess()
            
            setTimeout(() => {
                getRandomCell()
                checkStatus()
                handleGameProcess()
                isStep = false
            }, 300)
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
                    renderScore(gameData[cell][row])
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

    // Проверяем поле на возможность ходов
    function checkIsGameEnd() {
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 4; j++) {

                // Проверка наличия пустых ячеек, если есть - игра не окончена
                if (gameData[i][j] === 0) {
                    return false
                }
                
                // Проверка одинаковых значений в соседних ячейках строки
                if (i < 3) {
                    if (gameData[i][j] === gameData[i + 1][j]) return false
                }

                // Проверка одинаковых значений в соседних ячейках столбца
                if (j < 3) {
                    if (gameData[i][j] === gameData[i][j + 1]) return false
                }
            }
        }

        // Если ни одно условие из цикла не вернет false, возвращать true - игра окончена, ходов нет
        return true
    }

    function checkStatus() {
        if (checkIsGameEnd()) {
            currGameStatus = isGameEnd
            console.log('game end')
        }
    }

    function createNullElements() {
        for (let cell of cellItems) {
            let div = document.createElement('div')
            div.className = `game__cell__item`
            cell.append(div)
        }
    }
    


})