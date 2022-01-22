document.addEventListener('DOMContentLoaded', () => {
    getQuote();
});

async function getQuote() {
    const url = 'https://favqs.com/api/qotd';
    const res = await fetch(url);
    const data = await res.json();
    console.log(data);
}

