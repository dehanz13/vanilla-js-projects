function getQuote() {
  var quotes = [
    "Its not who I am underneath but what I do, that defines me.",
    "If you're going through hell, keep going",
    "With the new day comes new strength and new thoughts",
    "Win through actions, never through argument.",
    "It will be far more difficult to undo than do.",
    "We become what we think about.",
    "The highest reward for one's toil is not what he gets for it, but what he becomes by it.",
    "Its better to perform ones own duties imperfectly than to master the duties of another.",
  ];

  var authors = [
    "Batman Begins",
    "Winston Churchill",
    "Eleanore Roosevelt",
    "Robert Greene",
    "Alexander Hamilton",
    "Earl Nightingale",
    "John Ruskin",
    "Krishna",
  ];

  var randomNum = Math.floor(Math.random() * quotes.length);

  $(".quote-text").text(quotes[randomNum]);
  $(".quote-author").text(authors[randomNum]);
}

$("button").on("click", () => {
  getQuote();
});
