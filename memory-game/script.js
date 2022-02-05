document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelector('.cards');

    cards.addEventListener('click', (ev) => {
        if (ev.target.classList.contains('card__item')) cardUpend(ev.target);
    })

    
})

function cardUpend(card) {
        console.log('upend')
        card.parentNode.classList.toggle('card_upend');
        card.parentNode.querySelector('.card__back').style.opacity = 0
        card.parentNode.querySelector('.card__front').style.opacity = 1
    }

