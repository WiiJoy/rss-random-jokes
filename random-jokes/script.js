document.addEventListener('DOMContentLoaded', () => {
    const quoteText = document.querySelector('.quote__text'),
          quoteAuthor = document.querySelector('.quote__author'),
          btn = document.querySelector('.button'),
          main = document.querySelector('.main');
    
    getQuote(quoteText, quoteAuthor, main);
    main.style.background = `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`;

    btn.addEventListener('click', function() {
        getQuote(quoteText, quoteAuthor);
        main.style.background = `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`;
    });
});

async function getQuote(text, author, main) {
    const url = 'https://favqs.com/api/qotd';
    const res = await fetch(url);
    const data = await res.json();
    console.log(data);
    console.log(data.quote.body, data.quote.author);

    text.innerHTML = data.quote.body;
    author.innerHTML = data.quote.author;
}

