document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelector('.cards'),
          cardItems = document.querySelectorAll('.card');

    let firstCard = '',
        secondCard = '',
        steps = 0,
        handledCards = 0;

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
            firstCard = card
        } else {
            secondCard = card
        }

        if (firstCard && secondCard) {
            steps++
            checkCards()
        }
    }

    function checkCards() {
        if (firstCard.dataset.animal === secondCard.dataset.animal) {
            handledCards += 2
            firstCard = ''
            secondCard = ''
        } else {
            setTimeout(() => {
                removeCard(firstCard)
                removeCard(secondCard)
                firstCard = ''
                secondCard = ''
            }, 400)
            console.log('removes: ', firstCard, secondCard)
            
        }
    }

    function removeCard(card) {
        card.classList.remove('card_upend');
        card.querySelector('.card__back').style.opacity = 1
        card.querySelector('.card__front').style.opacity = 0
    }
    
})



