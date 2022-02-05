document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelector('.cards');

    cards.addEventListener('click', (ev) => {
        if (ev.target.classList.contains('card__item') && !ev.target.parentNode.classList.contains('card_upend')) cardUpend(ev.target);
    })

    
})

function cardUpend(card) {
        // if (card.parentNode.classList.contains('card_upend')) {
            // card.parentNode.classList.remove('card_upend');
            // card.parentNode.querySelector('.card__back').style.opacity = 1
            // card.parentNode.querySelector('.card__front').style.opacity = 0
        // } else {
            card.parentNode.classList.add('card_upend');
            card.parentNode.querySelector('.card__back').style.opacity = 0
            card.parentNode.querySelector('.card__front').style.opacity = 1
        // }
    }

