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
    if (randomNumber === 1) {
        return 11; // Ace as 11 initially
    } else if (randomNumber > 10) {
        return 10; // Face cards as 10
    } else {
        return randomNumber;
    }
}

function startGame() {
    isAlive = true;
    hasBlackJack = false;
    let firstCard = getRandomCard();
    let secondCard = getRandomCard();
    cards = [firstCard, secondCard];
    sum = firstCard + secondCard;
    renderGame();
}

function renderGame() {
    cardsEl.textContent = "Cards: " + cards.join(" - ");
    sumEl.textContent = "Sum: " + sum;

    if (sum < 21) {
        message = "Do you want to draw a new card?";
    } else if (sum === 21) {
        message = "You've got Blackjack!";
        hasBlackJack = true;
        player.chips += 100; // Reward player for winning
        playerEl.textContent = `${player.name}: $${player.chips}`;
        victorySound.play(); // Play victory sound
    } else {
        message = "You're out of the game!";
        isAlive = false;
        player.chips = Math.max(0, player.chips - 50); // Reduce chips but not below 0
        playerEl.textContent = `${player.name}: $${player.chips}`;
        gameOverSound.play(); // Play game over sound
    }

    messageEl.textContent = message;
}

function newCard() {
    if (isAlive && !hasBlackJack) {
        let card = getRandomCard();
        cards.push(card);
        sum += card;

        // Handle Ace dynamically (convert 11 to 1 if needed)
        if (sum > 21 && cards.includes(11)) {
            sum -= 10; // Convert an Ace (11) to (1) if sum exceeds 21
            cards[cards.indexOf(11)] = 1; // Update the Ace value in the array
        }

        renderGame();
    }
}
