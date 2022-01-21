import i18Obj from './translate.js';

window.addEventListener('DOMContentLoaded', () => {
    const navMenu = document.querySelector('.header__nav'),
          menuItem = document.querySelectorAll('.menu__item'),
          hamburger = document.querySelector('.hamburger'),
          portfolioBtns = document.querySelector('.portfolio__buttons'),
          portfolioItems = document.querySelectorAll('.portfolio__item');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('hamburger_active');
        navMenu.classList.toggle('header__nav_active');
    });

    menuItem.forEach(item => {
        item.addEventListener('click', () => {
            hamburger.classList.toggle('hamburger_active');
            navMenu.classList.toggle('header__nav_active');
        })
    });

    portfolioBtns.addEventListener('click', (ev) => {
        if (ev.target.classList.contains('button_inactive')) {
            Array.from(portfolioBtns.children).forEach(child => child.classList.remove('button_active'));
            ev.target.classList.add('button_active')
            portfolioItems.forEach((item, i) => {
                item.src = `./assets/img/${ev.target.dataset.season}/${i + 1}.jpg`;
            })
        }
    })

    console.log('Общий балл: 75/75\n',
        '\n',
        'Верстка соответствует макету. Ширина экрана 768px: 48/48\n',
        ' - блок <header>: 6/6\n',
        ' - секция hero: 6/6\n',
        ' - секция skills: 6/6\n',
        ' - секция portfolio: 6/6\n',
        ' - секция video: 6/6\n',
        ' - секция price: 6/6\n',
        ' - секция contacts: 6/6\n',
        ' - блок <footer>: 6/6\n',
        '\n',
        'Ни на одном из разрешений до 320px включительно не появляется горизонтальная полоса прокрутки: 15/15\n',
        ' - при ширине страницы от 1440рх до 768рх: 5/5\n',
        ' - при ширине страницы от 768рх до 480рх: 5/5\n',
        ' - при ширине страницы от 480рх до 320рх: 5/5\n',
        '\n',
        'На ширине экрана 768рх и меньше реализовано адаптивное меню: 22/22\n',
        ' - при ширине страницы 768рх панель навигации скрывается, появляется бургер-иконка: 2/2\n',
        ' - при нажатии на бургер-иконку справа плавно появляется адаптивное меню, бургер-иконка изменяется на крестик: 2/2\n',
        ' - высота адаптивного меню занимает всю высоту экрана. При ширине экрана 768-620рх вёрстка меню соответствует макету, когда экран становится уже, меню занимает всю ширину экрана: 2/4\n',
        ' - при нажатии на крестик адаптивное меню плавно скрывается уезжая за правую часть экрана, крестик превращается в бургер-иконку: 4/4\n',
        ' - бургер-иконка, которая при клике превращается в крестик, создана при помощи css-анимаций без использования изображений: 2/2\n',
        ' - ссылки в адаптивном меню работают, обеспечивая плавную прокрутку по якорям: 2/2\n',
        ' - при клике по ссылке в адаптивном меню адаптивное меню плавно скрывается, крестик превращается в бургер-иконку: 4/4'
    );
})



