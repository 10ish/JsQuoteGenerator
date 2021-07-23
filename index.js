// Quote API
const quoteContainer = document.getElementById("quote-container");
const quote = document.getElementById("quote");
const author = document.getElementById("author");
const tweetBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("refresh");
const loader = document.getElementById("loader");

let apiQuotes = [];

//Show Loader if loading 
function load(){
loader.hidden = false;
quoteContainer.hidden = true;
}
//Hide loader on complete
function complete(){
loader.hidden = true;
quoteContainer.hidden = false;
}

function getRandomQuote() {
    //Showing loader while fetching a new quote
    load();
    const randomQuote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    

    if (randomQuote.author === null) {
        author.textContent = "Unknown"
    } else {
        author.textContent = randomQuote.author;
    }
if (randomQuote.text.length > 50){
    quote.classList.add("quote-long");
}
else {
    quote.classList.remove("quote-long");
}
//Hiding loader after getting the quote
quote.textContent = randomQuote.text;
complete();
}


async function getQuotes() {
    load();
    const apiUrl = "https://type.fit/api/quotes";
    try {
        const quotesFetched = await fetch(apiUrl);
        apiQuotes = await quotesFetched.json();
        getRandomQuote();


    } catch (err) {
        //Catch error here 
        alert("Sorry! Something went wrong. Error : " + err);
    }


}
// To tweet a quote 
function tweetQuote(){
const tweetUrl = `https://twitter.com/intent/tweet?text=${quote.textContent}  - ${author.textContent}`;
   window.open(tweetUrl, '_blank');
}
//Event Listeners 
newQuoteBtn.addEventListener('click', getRandomQuote);
tweetBtn.addEventListener('click', tweetQuote);

//On page load
getQuotes()
getRandomQuote();