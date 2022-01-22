document.addEventListener('DOMContentLoaded', async function() {
    const quoteText = document.querySelector('.quote__text'),
          quoteAuthor = document.querySelector('.quote__author');
    
    let res = await getQuote();

    let quote = {
        text: res.text,
        author: res.author
    };

    console.log(quote);

    quoteText.innerHTML = quote.text;
    quoteAuthor.innerHTML = quote.author;
});

async function getQuote() {
    const url = 'https://favqs.com/api/qotd';
    const res = await fetch(url);
    const data = await res.json();
    console.log(data);
    console.log(data.quote.body, data.quote.author);

    return { text: data.quote.body, author: data.quote.author };
}

