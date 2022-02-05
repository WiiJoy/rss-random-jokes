document.addEventListener('DOMContentLoaded', () => {
    const STATUS = {
        'start': 'Enter your name and press NEW GAME',
        'game': `${player || 'Unknown'} is playing now`,
        'over': 'Game over! Press NEW GAME to start again!'
    }

    const cards = document.querySelector('.cards'),
          stepSpan = document.querySelector('.steps'),
          scoreSpan = document.querySelector('.score'),
          cardItems = document.querySelectorAll('.card');

    let firstCard = '',
        secondCard = '',
        steps = 0,
        handledCards = 0,
        score = 0,
        lock = false,
        player = '',
        game = false;

    shuffleCards()
    
    cards.addEventListener('click', (ev) => {
        if (ev.target.classList.contains('card__item') && !ev.target.parentNode.classList.contains('card_upend')) cardUpend(ev.target.parentNode);
    })

    function cardUpend(card) {

        if (lock) return

        const front = card.querySelector('.card__front'),
              back = card.querySelector('.card__back');

        card.classList.add('card_upend');
        back.style.opacity = 0
        front.style.opacity = 1

        if (!firstCard) {
            firstCard = card
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

    function checkCards() {
        if (firstCard.dataset.animal === secondCard.dataset.animal) {
            handledCards += 2
            score += 2
            scoreSpan.innerHTML = score
            firstCard = ''
            secondCard = ''
            lock = false
        } else {
            setTimeout(() => {
                removeCard(firstCard)
                removeCard(secondCard)
                score = score - 1 <= 0 ? 0 : score -1
                scoreSpan.innerHTML = score
                firstCard = ''
                secondCard = ''
                lock = false
            }, 400)
            console.log('removes: ', firstCard, secondCard)
        }
        
        if (handledCards === cardItems.length) console.log('Win!')
    }

    function removeCard(card) {
        card.classList.remove('card_upend');
        card.querySelector('.card__back').style.opacity = 1
        card.querySelector('.card__front').style.opacity = 0
    }

    function shuffleCards() {
        cardItems.forEach(item => {
            item.style.order = Math.round(Math.random() * 12)
        }) 
    }
    
})





