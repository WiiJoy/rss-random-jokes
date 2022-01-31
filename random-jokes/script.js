document.addEventListener('DOMContentLoaded', () => {
    const quoteText = document.querySelector('.quote__text'),
          quoteAuthor = document.querySelector('.quote__author'),
          btn = document.querySelector('.button'),
          blur = document.querySelector('.blur');
    
    getQuote(quoteText, quoteAuthor, blur);

    btn.addEventListener('click', function() {
        getQuote(quoteText, quoteAuthor, blur);
    });
});

async function getQuote(text, author, img) {
    const res = await fetch('https://favqs.com/api/qotd');
    const data = await res.json();

    text.innerHTML = data.quote.body;
    author.innerHTML = data.quote.author;

    getImage(author.innerHTML, img);
}

async function getImage(author, img) {
    const key = 'DSAe9oxwGIf74LcAJdtRp7K_rURwb-189PCdIE_9r4M';
    const urlReq = `https://api.unsplash.com/photos/random?orientation=landscape&query=${author}&client_id=${key}`;
    const res = await fetch(urlReq);
    const data = await res.json();

    img.style.backgroundImage = `url(${data.urls.small})`;
}
