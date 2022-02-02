document.addEventListener('DOMContentLoaded', () => {
    const quoteText = document.querySelector('.quote__text'),
          quoteAuthor = document.querySelector('.quote__author'),
          btn = document.querySelector('.button'),
          blur = document.querySelector('.blur'),
          langTools = document.querySelector('.langs'),
          langItem = document.querySelectorAll('.lang');
    
    let langQuotes = 'en'

    getQuote(quoteText, quoteAuthor, blur, langQuotes);

    btn.addEventListener('click', function() {
        getQuote(quoteText, quoteAuthor, blur, langQuotes);
    });

    langTools.addEventListener('click', (ev) => {
        if (ev.target.dataset.lang) {
            langItem.forEach(item => item.classList.remove('lang_active'))
            langQuotes = ev.target.dataset.lang
            ev.target.classList.add('lang_active')
    
            getQuote(quoteText, quoteAuthor, blur, langQuotes);
        }
    })
});

async function getQuote(text, author, img, lang) {

    let res = null
    let data = null

    text.style.opacity = 0
    author.style.opacity = 0
    if (lang === 'en') {
        res = await fetch('https://favqs.com/api/qotd');
        data = await res.json();
        
        setTimeout(() => {
            text.innerHTML = data.quote.body;
            author.innerHTML = data.quote.author;
            text.style.opacity = 1
            author.style.opacity = 1
        }, 300)
    } else {
        res = await fetch('./assets/json/quotes.json');
        let dataObj = await res.json()
        data = dataObj[Math.floor(Math.random() * dataObj.length)];
        setTimeout(() => {
            text.innerHTML = data.text;
            author.innerHTML = data.author;
            text.style.opacity = 1
            author.style.opacity = 1
        }, 300)
    }
    
    img.style.opacity = 0
    img.style.backgroundImage = `url('./assets/img/${Math.round(Math.random() * 19 + 1)}.jpeg')`;
    img.style.opacity = 1
}
