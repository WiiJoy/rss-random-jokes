window.addEventListener('DOMContentLoaded', () => {
    const navMenu = document.querySelector('.header__nav'),
          menuItem = document.querySelectorAll('.menu__item'),
          hamburger = document.querySelector('.hamburger');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('hamburger_active');
        navMenu.classList.toggle('header__nav_active');
    });

    menuItem.forEach(item => {
        item.addEventListener('click', () => {
            hamburger.classList.toggle('hamburger_active');
            navMenu.classList.toggle('header__nav_active');
        })
    })


    console.log('Общий балл: 100/100\n',
        '\n',
        'Верстка валидная: 10/10\n',
        '\n',
        'Верстка семантическая: 20/20\n',
        ' - <header>, <main>, <footer>: 2/2\n',
        ' - шесть элементов <section> (по количеству секций): 2/2\n',
        ' - только один заголовок <h1>: 2/2\n',
        ' - пять заголовков <h2>: 2/2\n',
        ' - один элемент <nav>: 2/2\n',
        ' - два списка ul > li > a (панель навигации, ссылки на соцсети): 2/2\n',
        ' - десять кнопок <button>: 2/2\n',
        ' - два инпута: <input type="email"> и <input type="tel">: 2/2\n',
        ' - один элемент <textarea>: 2/2\n',
        ' - три атрибута placeholder: 2/2\n',
        '\n',
        'Верстка соответствует макету: 48/48\n',
        ' - блок <header>: 6/6\n',
        ' - секция hero: 6/6\n',
        ' - секция skills: 6/6\n',
        ' - секция portfolio: 6/6\n',
        ' - секция video: 6/6\n',
        ' - секция price: 6/6\n',
        ' - секция contacts: 6/6\n',
        ' - блок <footer>: 6/6\n',
        '\n',
        'Требования к CSS: 12/12\n',
        ' - использование флексов или гридов для сетки: 2/2\n',
        ' - при уменьшении масштаба верстка по центру, без смещения в сторону: 2/2\n',
        ' - фоновый цвет на всю ширину страницы: 2/2\n',
        ' - иконки в svg: 2/2\n',
        ' - изображения в jpeg: 2/2\n',
        ' - favicon: 2/2\n',
        '\n',
        'Интерактивность через CSS: 20/20\n',
        ' - плавная прокрутка по якорям: 5/5\n',
        ' - ссылки на гитхаб автора и страницу курса: 5/5\n',
        ' - hover-эффекты: 5/5\n',
        ' - плавность hover-эффектов: 5/5\n'
    );
})



