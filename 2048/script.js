document.addEventListener('DOMContentLoaded', () => {

    const scoreItem = document.querySelector('.score'),
          input = document.querySelector('.modal__input__input'),
          gameStatus = document.querySelector('.modal__status'),
          recordsTable = document.querySelector('.modal__records__body'),
          btn = document.querySelector('.modal__button'),
          modal = document.querySelector('.modal'),
          btnRules = document.querySelector('.btn_rules'),
          rules = document.querySelector('.rules'),
          rulesIcons = document.querySelector('.rules__icons'),
          field = document.querySelector('.game__field'),
          continueModal = document.querySelector('.continue'),
          continueBtns = document.querySelector('.continue__btns');

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
        playerName = '',
        isOpen = false,
        checkWas2048 = false;

    const images = ['2', '4', '8', '16', '32', '64', '128', '256', '512', '1024', '2048', '4096', '8192']
    
    preloadImages()
    getLocalStorage()
    renderGames()
    renderStatus()

    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            createNullElements(i, j)
        }
    }

    renderScore()

    // Регистрация хода с клавиатуры
    document.addEventListener('keydown', (ev) => {

        if (currGameStatus !== 'game' && isProcess === false && isStep === true) return
    
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

    document.addEventListener('touchmove', (ev) => {
        if (currGameStatus !== 'game') return
        ev.preventDefault()
    }, { passive: false })
    
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
        }
    })

    input.addEventListener('input', (ev) => {
        playerName = ev.target.value
        renderStatus()
    })

    btn.addEventListener('click', () => {
        clearGameData()
        startNewGame()

        modal.style.opacity = 0

        setTimeout(() => {
            modal.style.display = 'none'
            currGameStatus = 'game'
        }, 300)
    })

    // Обработка клика по кнопке правил с открытием блока правил
    btnRules.addEventListener('click', () => {
        if (isOpen) return

        rules.style.display = 'block';
        setTimeout(() => {
            rules.style.opacity = 1
            isOpen = !isOpen
        }, 300)

    })

    // Обработка клика на любой части документа для закрытия правил
    document.body.addEventListener('click', () => {
        if (!isOpen) return

        rules.style.opacity = 0
        setTimeout(() => {
            rules.style.display = 'none';
            isOpen = !isOpen
        }, 300)
    })

    // Клик по кнопкам модального окна с выбором продолжить последнюю игру или начать новую
    continueBtns.addEventListener('click', (ev) => {
        if (ev.target.dataset.button === 'continue') {
            handleGameProcess()

            modal.style.opacity = 0
            continueModal.style.opacity = 0

            setTimeout(() => {
                modal.style.display = 'none'
                continueModal.style.display = 'none'
                currGameStatus = 'game'
            }, 300)
        } 
        
        if (ev.target.dataset.button === 'new') {
            currGameStatus = !checkWas2048 ? 'end' : 'win'

            handleRecords()
            renderStatus()
            clearGameData()
            renderScore()

            continueModal.style.opacity = 0

            setTimeout(() => {
                continueModal.style.display = 'none'
            }, 300)
        }
    })

    
    function startNewGame() {

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
    }

    // Обработка хода влево
    function handleLeftMove() {
        if (currGameStatus !== 'game') return
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
        if (currGameStatus !== 'game') return
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
        if (currGameStatus !== 'game') return
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
        if (currGameStatus !== 'game') return
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
                
                handleGameProcess()
                setLocalStorage('gameData', {
                    'player': playerName,
                    'data': gameData,
                    'score': score,
                    'checkWas2048': checkWas2048
                })

                checkStatus()

                isStep = false
            }, 150)
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
            localStorage.removeItem('gameData')
            handleRecords()
            renderStatus()

            modal.style.display = 'flex'

            setTimeout(() => {
                modal.style.opacity = 1
            }, 300)
        }

        check2048()

        if (checkWin()) {
            currGameStatus = 'win'
            localStorage.removeItem('gameData')
            handleRecords()
            renderStatus()

            modal.style.display = 'flex'

            setTimeout(() => {
                modal.style.opacity = 1
            }, 300)
        }
    }

    // Создание ячейки игрового поля
    function createNullElements(r, c) {

        let divCell = document.createElement('div')
        divCell.className = 'game__cell'
        divCell.id = `cell${r}${c}`

        let divCellItem = document.createElement('div')
        divCellItem.className = `game__cell__item`
        divCell.append(divCellItem)
        field.append(divCell)

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

        setLocalStorage('records', records)
    }

    function renderStatus() {
        switch (currGameStatus) {
            case 'ready':
                gameStatus.innerHTML = `${playerName || 'Player'}, press NEW GAME to start!`
                break
            case 'end':
                gameStatus.innerHTML = `${playerName || 'Player'}, you lose with result: ${score}! <br> Press NEW GAME to play again!`
                break
            case 'win': {
                gameStatus.innerHTML = `${playerName || 'Player'}, you win with result: ${score}! <br> Press NEW GAME to play again!`
                break
            }
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
    function setLocalStorage(key, value) {
        localStorage.setItem(key, JSON.stringify(value))
    }

    // Считывание результатов из localStorage
    function getLocalStorage() {
        if (localStorage.getItem('records')) records = (JSON.parse(localStorage.getItem('records'))).sort((a, b) => b.score - a.score)

        if (localStorage.getItem('gameData')) {
            let res = JSON.parse(localStorage.getItem('gameData'))

            playerName = res.player
            gameData = res.data
            score = res.score
            checkWas2048 = res.checkWas2048
            input.value = res.player

            continueModal.style.display = 'flex'
            setTimeout(() => {
                continueModal.style.opacity = 1
            }, 300)
        }
    }

    function preloadImages() {
        for (let i = 0; i < images.length; i++) {
            const img = new Image();
            img.src = `./assets/svg/cards/${images[i]}.svg`;
            img.classList.add('rules__item')
            rulesIcons.append(img)
        }
    }

    function clearGameData() {
        score = 0
        gameData = []
        checkWas2048 = false
        localStorage.removeItem('gameData')
    }

    function check2048() {
        if (checkWas2048) return

        let is2048 = false

        for (let row of gameData) {
            if (row.includes(2048)) is2048 = true
        }

        if (!is2048) return

        checkWas2048 = true

        setLocalStorage('gameData', {
            'player': playerName,
            'data': gameData,
            'score': score,
            'checkWas2048': checkWas2048
        })

        currGameStatus = 'wait'

        continueModal.firstChild.innerHTML = "You have reached the Deathly Hallows!<br>What's next?"

        continueModal.style.display = 'flex'
        setTimeout(() => {
            continueModal.style.opacity = 1
        }, 300)
    }

    function checkWin() {
        let isWin = false

        for (let row of gameData) {
            if (row.includes(16384)) isWin = true
        }

        return isWin
    }

    console.log('Вёрстка +10\n - реализован интерфейс игры +5 (есть!)\n - в футере приложения есть ссылка на гитхаб автора приложения, год создания приложения, логотип курса со ссылкой на курс +5 (есть!)\nЛогика игры. Ходы, перемещения фигур, другие действия игрока подчиняются определённым свойственным игре правилам +10\nРеализовано завершение игры при достижении игровой цели +10 (логика максимально приближена к реальности с поправкой на картинки вместо чисел)\nПо окончанию игры выводится её результат, например, количество ходов, время игры, набранные баллы, выигрыш или поражение и т.д +10 (есть!)\nРезультаты последних 10 игр сохраняются в local storage. Есть таблица рекордов, в которой сохраняются результаты предыдущих 10 игр +10 (есть!)\nАнимации или звуки, или настройки игры. Баллы начисляются за любой из перечисленных пунктов +10 (есть возможность установки имени игрока, есть простая анимация перемещения карт - плавное исчезание и плавное появление на новом месте)\nОчень высокое качество оформления приложения и/или дополнительный не предусмотренный в задании функционал, улучшающий качество приложения +10 (добавлена поддержка touch-событий, т.е. игра полноценно играется с телефона)')
    
})
