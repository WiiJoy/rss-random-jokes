document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelector('.cards');

    cards.addEventListener('click', (ev) => {
        if (ev.target.classList.contains('card__item')) cardUpend(ev.target);
    })

    
})

function cardUpend(card) {
        console.log('upend')
        card.parentNode.classList.toggle('card_upend');
    }

