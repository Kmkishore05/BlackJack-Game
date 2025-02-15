let player = {
    name: "Player",
    chips: 1000
};

let cards = [];
let sum = 0;
let hasBlackJack = false;
let isAlive = false;
let message = "";

let messageEl = document.getElementById("message-el");
let sumEl = document.getElementById("sum-el");
let cardsEl = document.getElementById("cards-el");
let playerEl = document.getElementById("player-el");

// Load sound effects
let gameOverSound = new Audio("gameover.mp3"); // Add your game over sound file
let victorySound = new Audio("victory.mp3");   // Add your victory sound file

playerEl.textContent = `${player.name}: $${player.chips}`;

function getRandomCard() {
    let randomNumber = Math.floor(Math.random() * 13) + 1;
    return randomNumber === 1 ? 11 : randomNumber > 10 ? 10 : randomNumber;
}

function startGame() {
    isAlive = true;
    hasBlackJack = false; // Reset blackjack status
    let firstCard = getRandomCard();
    let secondCard = getRandomCard();
    cards = [firstCard, secondCard];
    sum = firstCard + secondCard;
    renderGame();
}

function renderGame() {
    cardsEl.textContent = "Cards: ";
    for (let i = 0; i < cards.length; i++) {
        cardsEl.textContent += cards[i] + " ";
    }

    sumEl.textContent = "Sum: " + sum;

    if (sum < 21) {
        message = "Do you want to draw a new card?";
    } else if (sum === 21) {
        message = "You've got Blackjack!";
        hasBlackJack = true;
        victorySound.play(); // Play victory sound
    } else {
        message = "You're out of the game!";
        isAlive = false;
        player.chips = Math.max(0, player.chips - 50); // Reduce chips but not below 0
        playerEl.textContent = `${player.name}: $${player.chips}`; // Update chips display
        gameOverSound.play(); // Play game over sound
    }

    messageEl.textContent = message;
}

function newCard() {
    if (isAlive && !hasBlackJack) {
        let card = getRandomCard();
        sum += card;
        cards.push(card);
        renderGame();
    }
}
