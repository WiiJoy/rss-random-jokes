document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelector('.cards'),
          cardItem = document.querySelectorAll('.card');

    let firstCard = '',
        secondCard = '',
        steps = 0;

    cards.addEventListener('click', (ev) => {
        if (ev.target.classList.contains('card__item') && !ev.target.parentNode.classList.contains('card_upend')) cardUpend(ev.target.parentNode);
    })

    function cardUpend(card) {
            // card.parentNode.classList.remove('card_upend');
            // card.parentNode.querySelector('.card__back').style.opacity = 1
            // card.parentNode.querySelector('.card__front').style.opacity = 0
        const front = card.querySelector('.card__front'),
              back = card.querySelector('.card__back');

        card.classList.add('card_upend');
        back.style.opacity = 0
        front.style.opacity = 1

        if (!firstCard) {
            firstCard = card.dataset.animal
        } else {
            secondCard = card.dataset.animal
        }

        if (firstCard && secondCard) {
            steps++
            checkCards()
        }
    }

    function checkCards() {
        if (firstCard === secondCard) {
            console.log('win cards')
        } else {
            console.log('loose cards')
        }
    }
    
})



