document.addEventListener('DOMContentLoaded', () => {
    
    const cards = document.querySelector('.cards'),
          stepSpan = document.querySelector('.steps'),
          scoreSpan = document.querySelector('.score'),
          btn = document.querySelector('.btn_start'),
          nameInput = document.querySelector('.tools__input'),
          statusTool = document.querySelector('.status'),
          last = document.querySelector('.last__wrapper'),
          best = document.querySelector('.best__wrapper'),
          nickname = document.querySelector('.player'),
          tools = document.querySelector('.tools'),
          btnLvl = document.querySelector('.difficult__btns'),
          soundBtn = document.querySelector('.sound'),
          soundImg = document.querySelector('.sound__img'),
          btnRules = document.querySelector('.btn_rules'),
          rules = document.querySelector('.rules');

    let firstCard = '',
        secondCard = '',
        steps = 0,
        handledCards = 0,
        score = 0,
        lock = false,
        player = '',
        status = 'start'
        lastGames = [],
        bestGames = [
            {name: '-', score: 0, steps: 0},
            {name: '-', score: 0, steps: 0},
            {name: '-', score: 0, steps: 0}
        ],
        difLevel = 'easy',
        isMuted = false,
        isOpen = false;

    const animals = {
        'easy': ['owl', 'dragon', 'panda', 'cat', 'hedgehog', 'fox'],
        'hard': ['owl', 'dragon', 'panda', 'cat', 'hedgehog', 'fox', 'chicken', 'snake', 'bird', 'fish'],
        'very-hard': ['owl', 'dragon', 'panda', 'cat', 'hedgehog', 'fox', 'chicken', 'snake', 'bird', 'fish', 'chipmunk', 'rooster', 'monkey', 'lion', 'horse'],
        'ultra-hard': ['owl', 'dragon', 'panda', 'cat', 'hedgehog', 'fox', 'chicken', 'snake', 'bird', 'fish', 'chipmunk', 'rooster', 'monkey', 'lion', 'horse', 'rabbit', 'cow', 'pig', 'unicorn', 'dog', 'shrimp']
    }

    const sounds = ['success', 'unsuccess', 'upend', 'victory']
    
    preloadAudio()
    preloadImages()
    changeStatus('start')
    getLocalStorage()
    renderGames()
    renderName()
    renderCards()

    // Обработка кликов по кнопке звука, включение-отключение
    soundBtn.addEventListener('click', () => {
        soundBtn.style.opacity = 0
        if (!isMuted) {
            setTimeout(() => {
                soundImg.src = './assets/svg/icons/soundoff.svg'
                soundBtn.style.opacity = 1
            }, 300)
        } else {
            setTimeout(() => {
                soundImg.src = './assets/svg/icons/soundon.svg'
                soundBtn.style.opacity = 1
            }, 300)
        }

        isMuted = !isMuted
    })
    
    // Обработка клика по кнопкам выбора сложности
    btnLvl.addEventListener('click', (ev) => {
        if (ev.target.classList.contains('btn_level')) {
            setActiveButton(ev.target)
        }
    })

    // Обработка клика по кнопке запуска игры
    btn.addEventListener('click', () => {
        if (btn.classList.contains('btn_disabled')) return
        lock = true
        resetCards()
        setTimeout(() => {
            shuffleCards()
        }, 150)

        btn.classList.add('btn_disabled')
        tools.style.opacity = 0
        
        changeStatus('game')
        setTimeout(() => {
            tools.style.zIndex = -1
            lock = false
        }, 450)
        
    })

    // Обработка ввода в инпуте
    nameInput.addEventListener('input', (ev) => {
        player = ev.target.value
        renderName()
    })

    // Обработка клика по карте
    cards.addEventListener('click', (ev) => {
        if (ev.target.classList.contains('card__item') && !ev.target.parentNode.classList.contains('card_upend')) cardUpend(ev.target.parentNode);
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

    // Переворачивание карты
    function cardUpend(card) {
        if (lock || status !== 'game') return

        const front = card.querySelector('.card__front'),
              back = card.querySelector('.card__back');

        card.classList.add('card_upend');
        front.style.display = 'block';
        setTimeout(() => {
            back.style.display = 'none'
        }, 250)

        if (!firstCard) {
            firstCard = card
            playSound('upend')
        } else {
            secondCard = card
            lock = true
        }

        if (firstCard && secondCard) {
            steps++
            stepSpan.innerHTML = steps
            checkCards()
        }
    }

    // Проверка двух карт
    function checkCards() {
        if (firstCard.dataset.animal === secondCard.dataset.animal) {
            playSound('success')
            handledCards += 2
            score += 2
            scoreSpan.innerHTML = score
            firstCard = ''
            secondCard = ''
            
            setTimeout(() => lock = false, 1000)
        } else {
            setTimeout(() => playSound('unsuccess'), 200)
            setTimeout(() => {
                removeCard(firstCard)
                removeCard(secondCard)
                score = score - 1 <= 0 ? 0 : score -1
                scoreSpan.innerHTML = score
                firstCard = ''
                secondCard = ''
                lock = false
            }, 1000)
        }
        
        if (handledCards === animals[difLevel].length * 2) {
            changeStatus('over')
            btn.classList.remove('btn_disabled')

            tools.style.zIndex = 6

            setTimeout(() => {
                playSound('victory')
                tools.style.opacity = 1
            }, 1500)

            if (lastGames.length === 10) {
                lastGames.pop()
            }
    
            lastGames.unshift({name: player || 'Unknown', score: score, steps: steps})

            if (bestGames[2].score < score) {
                bestGames.pop()
                bestGames.push({name: player || 'Unknown', score: score, steps: steps})
                bestGames = bestGames.sort((a, b) => b.score - a.score)
            }
    
            renderGames()

            setLocalStorage('lastGames', lastGames)
            setLocalStorage('bestGames', bestGames)
        }
    }

    // Переворачивание карты рубашкой вверх
    function removeCard(card) {
        card.classList.remove('card_upend');
        card.querySelector('.card__back').style.display = 'block'
        setTimeout(() => {
            card.querySelector('.card__front').style.display = 'none'
        }, 250)
    }

    // Перемешивание карт
    function shuffleCards() {
        Array.from(cards.children).forEach(item => {
            item.style.order = Math.round(Math.random() * animals[difLevel].length)
        }) 
    }

    // Изменение статуса, часть функционала в текущей реализации уже не используется
    function changeStatus(newStatus) {
        status = newStatus;
        switch (newStatus) {
            case 'start':
                statusTool.innerHTML = 'Press NEW GAME to start'
                break
            case 'game':
                statusTool.innerHTML = `${player || 'Unknown'} is playing now`
                nameInput.setAttribute('disabled', 'disabled')
                nameInput.classList.toggle('tools__input_disabled')
                break
            case 'over':
                statusTool.innerHTML = `Your SCORE: ${score}! <br> Press NEW GAME to start again!`
                statusTool.classList.add('status__result')
                nameInput.removeAttribute('disabled')
                nameInput.classList.toggle('tools__input_disabled')
                break
        }
    }

    // Сброс поля карт со всеми служебными данными
    function resetCards() {
        lock = true

        Array.from(cards.children).forEach(item => {
            removeCard(item)
        })

        firstCard = '',
        secondCard = '',
        steps = 0,
        handledCards = 0,
        score = 0;
        stepSpan.innerHTML = steps
        scoreSpan.innerHTML = score
    }

    // Построение таблиц рекордов и последних игр
    function renderGames() {
        last.innerHTML = ''
        if (!lastGames.length) {
            last.innerHTML = 'No last games'
        } else {
            lastGames.forEach((item) => {
                last.append(createItem(item))
            })
        }

        best.innerHTML = ''
        bestGames.forEach((item) => {
            best.append(createItem(item))
        })
    }

    // Построение записи таблицы рекордов
    function createItem(obj) {
        const divMain = document.createElement('div')
        const divName = document.createElement('div')
        const divScore = document.createElement('div')
        const divSteps = document.createElement('div')

        divName.innerHTML = obj.name
        divScore.innerHTML = obj.score
        divSteps.innerHTML = obj.steps

        divMain.classList.add('history__item')
        divName.classList.add('item_player')
        divScore.classList.add('item_score')
        divSteps.classList.add('item_steps')

        divMain.append(divName)
        divMain.append(divScore)
        divMain.append(divSteps)

        return divMain
    }

    // Запись результатов в localStorage
    function setLocalStorage(key, value) {
        localStorage.setItem(key, JSON.stringify(value))
    }

    // Считывание результатов из localStorage
    function getLocalStorage() {
        if (localStorage.getItem('lastGames')) lastGames = JSON.parse(localStorage.getItem('lastGames'))
        if (localStorage.getItem('bestGames')) bestGames = (JSON.parse(localStorage.getItem('bestGames'))).sort((a, b) => b.score - a.score)
    }

    // Отображение введенного пользователем значения из инпута
    function renderName() {
        nickname.innerHTML = player || 'Unknown'
    }

    // Построение карты
    function createCards(animal) {
        const animalCard = `<div class="card" data-animal="${animal}" style="order: ${Math.round(Math.random() * animals[difLevel].length)};">
        <img src="./assets/svg/cards/${animal}.svg" alt="${animal}" class="card__item card__front" style="display: none;">
        <img src="./assets/svg/cards/back.svg" alt="back-side" class="card__item card__back">
    </div>`
        cards.insertAdjacentHTML('beforeend', animalCard)
    }

    // Установка активной кнопки уровня сложности
    function setActiveButton(button) {
        Array.from(btnLvl.children).forEach(child => child.classList.remove('btn_active'));
        button.classList.add('btn_active')
        difLevel = button.dataset.level
        renderCards()
    }

    // Построение поля карт по заданным параметрам в зависимости от выбранной сложности
    function renderCards() {
        cards.innerHTML = ''
        animals[difLevel].forEach(animal => {
            createCards(animal)
            createCards(animal)
        })

        switch (difLevel) {
            case 'easy':
                cards.style.height = '380px'
                cards.style.width = '500px'
                break
            case 'hard':
                cards.style.height = '390px'
                cards.style.width = '400px'
                break
            case 'very-hard':
                cards.style.height = '400px'
                cards.style.width = '630px'
                break
            case 'ultra-hard':
                cards.style.height = '400px'
                cards.style.width = '875px'
                break
        }

        if (difLevel !== 'easy') {

            for (let card of cards.childNodes) {
                card.style.width = '70px'
                card.style.height = '90px'
            }

            let cardItems = document.querySelectorAll('.card__item')

            for (let cardItem of cardItems) {
                cardItem.style.padding = '10px'
            }
        }
    }

    // Воспроизведение звуковых эффектов
    function playSound(event) {

        if (isMuted) return

        const sound = new Audio()
        sound.src = `./assets/sounds/${event}.wav`
        sound.autoplay = true
    }

    // Предзагрузка звуков
    function preloadAudio() {
        for (let item of sounds) {
          const soundItem = new Audio();
          soundItem.src = `./assets/sounds/${item}.wav`;
          soundItem.autoplay = false
        }
    }

    // Предзагрузка изображений карт
    function preloadImages() {
        for (let item of animals['ultra-hard']) {
          const image = new Image();
          image.src = `./assets/svg/cards/${item}.svg`;
        }
    }
})

console.log('Вёрстка +10\n - реализован интерфейс игры +5\n - в футере приложения есть ссылка на гитхаб автора приложения, год создания приложения, логотип курса со ссылкой на курс +5\nЛогика игры. Карточки, по которым кликнул игрок, переворачиваются согласно правилам игры +10\nИгра завершается, когда открыты все карточки +10\nПо окончанию игры выводится её результат - количество ходов, которые понадобились для завершения игры +10\nРезультаты последних 10 игр сохраняются в local storage. Есть таблица рекордов, в которой сохраняются результаты предыдущих 10 игр +10\nПо клику на карточку – она переворачивается плавно, если пара не совпадает – обе карточки так же плавно переварачиваются рубашкой вверх +10\nОчень высокое качество оформления приложения и/или дополнительный не предусмотренный в задании функционал, улучшающий качество приложения +10')