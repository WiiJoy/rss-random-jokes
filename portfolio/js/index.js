import i18Obj from './translate.js';

window.addEventListener('DOMContentLoaded', () => {
    const navMenu = document.querySelector('.header__nav'),
          menuItem = document.querySelectorAll('.menu__item'),
          hamburger = document.querySelector('.hamburger'),
          portfolioBtns = document.querySelector('.portfolio__buttons'),
          portfolioItems = document.querySelectorAll('.portfolio__item'),
          langs = document.querySelector('.header__lang'),
          textContents = document.querySelectorAll('[data-i18n]'),
          btnTheme = document.querySelector('.button__theme');

    const toLightElements = ['body', '.container_header', '.section_hero', '.section_contacts', '.header__logo', '.button', '.button_inactive', '.button_active', '.button_price', '.menu__link', '.footer__link', '.footer__social', '.lang__hover_inactive', '.divider', '.title_h2', '.contacts__input', '.hamburger', '.header__nav'];

    getLocalStorage();
    preloadImages();

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
    });

    langs.addEventListener('click', (ev) => {
        if (ev.target.classList.contains('lang__hover_inactive')) {

            let lang = ev.target.dataset.i18n;

            changeLang(lang)

            setLocalStorage('lang', lang)
        }
    });
    

    function changeLang(lang) {
        Array.from(langs.children).forEach(child => {
            child.dataset.i18n === lang ? child.classList.add('lang__hover') : child.classList.remove('lang__hover')
            
        });

        textContents.forEach(text => {
            if (text.hasAttribute('placeholder')) {
                text.placeholder = i18Obj[lang][text.dataset.i18n]
            } else {
                text.textContent = i18Obj[lang][text.dataset.i18n]
            }
        })
    }

    btnTheme.addEventListener('click', () => {
        changeTheme();
    });

    function changeTheme() {
        btnTheme.classList.toggle('light__theme')
        toLightElements.forEach((el) => {
            let currItems = document.querySelectorAll(el);
            currItems.forEach(item => {
                if (btnTheme.classList.contains('light__theme')) {
                    item.classList.add('light')
                    setLocalStorage('theme', 'light')
                } else {
                    item.classList.remove('light')
                    localStorage.removeItem('theme')
                } 
            })
        })
    }

    function preloadImages() {
        const seasons = ['winter', 'spring', 'summer', 'autumn'];

        seasons.forEach(season => {
            for (let i = 1; i <= 6; i++) {
                const img = new Image();
                img.src = `./assets/img/${season}/${i}.jpg`
            }
        })
    }

    function setLocalStorage(type, lang) {
        localStorage.setItem(type, lang)
    }

    function getLocalStorage() {
        if (localStorage.getItem('lang')) {
            changeLang(localStorage.getItem('lang'))
        }
        if (localStorage.getItem('theme')) {
            changeTheme();
        }
    }

    console.log('Общий балл: 75/75\n',
        '\n',
        'Смена изображений в секции Portfolio: 25/25\n',
        ' - при клике на соответствующую кнопку выводятся соответствующие изображения: 20/20\n',
        ' - кликнутая кнопка становится активной, все остальные неактивны: 5/5\n',
        '\n',
        'Перевод страницы на два языка: 25/25\n',
        ' - при клике на ru страница переводится на русский язык: 10/10\n',
        ' - при клике на en страница переводится на английский язык: 10/10\n',
        ' - изменение активного состояния кнопок языка при клике: 5/5\n',
        '\n',
        'Переключение светлой и темной темы (за основу взят второй макет, кнопка переключения в нижней правой части экрана): 25/25\n',
        ' - темная тема приложения сменяется светлой: 10/10\n',
        ' - светлая тема приложения сменяется темной: 10/10\n',
        ' - после смены темы интерактивные элементы продолжают быть интерактивными, нет слияния текстов с фоном: 5/5\n',
        'Дополнительный функционал: сохранение выбранной темы и языка при перезагрузке страницы: 5/5\n',
        'Дополнительный функционал: сложные эффекты кнопок при наведении (использован hover для кнопок на основе Box-shadow Button - pulse): 5/5'
    );
})



