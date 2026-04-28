//select game elements
const gameboard = document.querySelector('.gameboard');
const cards = document.querySelectorAll('.card');
const turnCount = document.querySelector('#turn-count');
const winPanel = document.querySelector('#win-panel');

let flippedCards = [];
let matchedPairs = 0;
let turns = 0;

//randomize cards
for (let i = 0; i < cards.length; i++) {
    const randomNumber = Math.floor(Math.random() * cards.length);
    gameboard.insertBefore(cards[i], gameboard.children[randomNumber]);
}

//add click event to cards
cards.forEach(function(card) {
    card.addEventListener("click", function() {
        flipCard(card);
    });
});

function flipCard(card) {
    //stop the player form clicking matched cards
    if(card.classList.contains("matched") ||
    card.classList.contains("flipped") ||
    flippedCards.length === 2) {
        return;
    }

    card.classList.add("flipped");
    flippedCards.push(card);

    if(flippedCards.length === 2) {
        turns++;
        turnCount.textContent = turns;

        setTimeout(checkForMatch, 800);
    }
}

function checkForMatch() {
    const card1 = flippedCards[0];
    const card2 = flippedCards[1];

    const animal1 = card1.querySelector("img").getAttribute("src");
    const animal2 = card2.querySelector("img").getAttribute("src");

    if (animal1 === animal2) {
        card1.classList.add("matched");
        card2.classList.add("matched");
        matchedPairs++;
    } else {
        card1.classList.remove("flipped");
        card2.classList.remove("flipped");
    }

    flippedCards = [];

    if (matchedPairs === cards.length / 2) {
        winPanel.classList.add("show");
    }
}