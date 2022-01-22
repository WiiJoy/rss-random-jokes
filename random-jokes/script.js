document.addEventListener('DOMContentLoaded', () => {
    const quoteText = document.querySelector('.quote__text'),
          quoteAuthor = document.querySelector('.quote__author'),
          btn = document.querySelector('.button');
    
    getQuote(quoteText, quoteAuthor);

    btn.addEventListener('click', function() {
        getQuote(quoteText, quoteAuthor);
    });
});

async function getQuote(text, author) {
    const url = 'https://favqs.com/api/qotd';
    const res = await fetch(url);
    const data = await res.json();
    console.log(data);
    console.log(data.quote.body, data.quote.author);

    text.innerHTML = data.quote.body;
    author.innerHTML = data.quote.author;
}

