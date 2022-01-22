document.addEventListener('DOMContentLoaded', () => {
    const quoteText = document.querySelector('.quote__text'),
          quoteAuthor = document.querySelector('.quote__author'),
          btn = document.querySelector('.button'),
          main = document.querySelector('.main'),
          img = document.querySelector('.quote__image');
    
    let color = randomColor();

    getQuote(quoteText, quoteAuthor, img);
    main.style.background = color;

    btn.addEventListener('click', function() {
        color = randomColor();
        getQuote(quoteText, quoteAuthor, img);
        main.style.background = color;
    });
});

async function getQuote(text, author, img) {
    const res = await fetch('https://favqs.com/api/qotd');
    const data = await res.json();
    console.log(data);
    console.log(data.quote.body, data.quote.author);

    text.innerHTML = data.quote.body;
    author.innerHTML = data.quote.author;

    getImage(author.innerHTML, img);
}

async function getImage(author, img) {
    const key = 'DSAe9oxwGIf74LcAJdtRp7K_rURwb-189PCdIE_9r4M';
    const urlReq = `https://api.unsplash.com/photos/random?orientation=landscape&query=${author}&client_id=${key}`;
    const res = await fetch(urlReq);
    const data = await res.json();
    console.log(data);

    img.src = data.urls.regular;
}

function randomColor() {
    return `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`;
}
