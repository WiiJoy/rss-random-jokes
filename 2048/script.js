document.addEventListener('DOMContentLoaded', () => {

    const scoreItem = document.querySelector('.score'),
          cellItems = document.querySelectorAll('.game__cell'),
          input = document.querySelector('.modal__input__input'),
          gameStatus = document.querySelector('.modal__status'),
          recordsTable = document.querySelector('.modal__records__body'),
          btn = document.querySelector('.modal__button'),
          modal = document.querySelector('.modal');

    let gameData = [],
        score = 0,
        currGameStatus = 'ready',
        isProcess = false;
        notFirstStep = false;
        isStep = false,
        touchXStart = 0,
        touchXEnd = 0,
        touchYStart = 0,
        touchYEnd = 0,
        records = [],
        playerName = '';
    
    getLocalStorage()
    renderGames()
    renderStatus()
    createNullElements()
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

        if ((!isProcess || isStep) && currGameStatus !== 'game') return
    
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
        if ((!isProcess || isStep) && currGameStatus !== 'game') return

        touchXStart = ev.touches[0].pageX
        touchYStart = ev.touches[0].pageY
    })
    
    //Регистрация конечного положения тача
    document.addEventListener('touchend', (ev) => {
        if ((!isProcess || isStep) && currGameStatus !== 'game') return

        touchXEnd = ev.changedTouches[0].pageX
        touchYEnd = ev.changedTouches[0].pageY

        // Вычисление разницы по осям
        let diffX = touchXEnd - touchXStart
        let diffY = touchYEnd - touchYStart

        if (Math.abs(diffX) > Math.abs(diffY) && diffX > 0) {
            handleRightMove()
        } else if (Math.abs(diffX) > Math.abs(diffY) && diffX < 0) {
            handleLeftMove()
        } else if (Math.abs(diffX) < Math.abs(diffY) && diffY > 0) {
            handleBottomMove()
        } else if (Math.abs(diffX) < Math.abs(diffY) && diffY < 0) {
            handleTopMove()
        } else {
            console.log('one dot touch')
        }
    })

    input.addEventListener('input', (ev) => {
        console.log(ev.target.value)
        playerName = ev.target.value
        renderStatus()
    })

    btn.addEventListener('click', () => {
        startNewGame()

        modal.style.opacity = 0

        setTimeout(() => {
            modal.style.display = 'none'
            currGameStatus = 'game'
        }, 300)
    })

    
    function startNewGame() {
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

                div.style.opacity = 0
				
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
                    currCell.firstChild.style.opacity = 1
                }, 300)
			}
		}
        notFirstStep = true

        console.log('gameData: ', gameData)
    }

    // Обработка хода влево
    function handleLeftMove() {
        console.log('left move')
        makeStep('left')
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
        makeStep('right')
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
        makeStep('top')
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
        makeStep('bottom')
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

    function makeStep(side) {

        let startCondition = '' + gameData;

        for (let i = 0; i < 4; i++) {
			switch (side) {
                case 'left':
                    handleLeftMoveRow(i)
                    break
                case 'right':
                    handleRightMoveRow(i)
                    break
                case 'top':
                    handleTopMoveRow(i);
                    break
                case 'bottom':
                    handleBottomMoveRow(i);
                    break
            }
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
            currGameStatus = 'end'
            handleRecords()
            renderStatus()

            modal.style.display = 'flex'

            setTimeout(() => {
                modal.style.opacity = 1
            }, 300)
        }
    }

    function createNullElements() {
        for (let cell of cellItems) {
            let div = document.createElement('div')
            div.className = `game__cell__item`
            cell.append(div)
        }
    }

    function handleRecords() {
        if (records[9] && records[9] >= score) return

        if (records.length === 10) records.pop()

        records.push({
            player: playerName || 'Player',
            score: score
        })
        records = records.sort((a, b) => b.score - a.score)

        renderGames()

        setLocalStorage()
    }

    function renderStatus() {
        console.log('start render status')
        switch (currGameStatus) {
            case 'ready':
                console.log('change status: ', playerName)
                gameStatus.innerHTML = `${playerName || 'Player'}, press NEW GAME to start!`
                break
            case 'end':
                gameStatus.innerHTML = `${playerName || 'Player'}, your result: ${score}! <br> Press NEW GAME to play again!`
                break
        }
    }

    // Построение таблицы рекордов
    function renderGames() {
        recordsTable.innerHTML = ''
        if (!records.length) {
            recordsTable.innerHTML = 'No records'
        } else {
            records.forEach((item) => {
                recordsTable.append(createItem(item))
            })
        }
    }

    function createItem(obj) {
        const divWrapper = document.createElement('div')
        const divName = document.createElement('div')
        const divScore = document.createElement('div')

        divName.innerHTML = obj.player
        divScore.innerHTML = obj.score

        divWrapper.classList.add('records__wrapper')
        divName.classList.add('records__name')
        divScore.classList.add('records__score')

        divWrapper.append(divName)
        divWrapper.append(divScore)

        return divWrapper
    }

    // Запись результатов в localStorage
    function setLocalStorage() {
        localStorage.setItem('records', JSON.stringify(records))
    }

    // Считывание результатов из localStorage
    function getLocalStorage() {
        if (localStorage.getItem('records')) records = (JSON.parse(localStorage.getItem('records'))).sort((a, b) => b.score - a.score)
    }
    
})