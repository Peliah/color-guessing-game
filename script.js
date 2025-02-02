/*
  Property of Peliah
  GitHub: https://github.com/Peliah
  Description: Script for the Neobrutalism-style Color Game.
*/

window.addEventListener('load', () => {
    setTimeout(() => {
        document.querySelector('.loading-animation').style.display = 'none';
    }, 1000);
});

const colorBox = document.querySelector('[data-testid="colorBox"]');
const colorOptions = document.querySelectorAll('[data-testid="colorOption"]');
const gameStatus = document.querySelector('[data-testid="gameStatus"]');
const scoreValue = document.getElementById('scoreValue');
const newGameButton = document.querySelector('[data-testid="newGameButton"]');
const toast = document.getElementById('toast');
const toastMessage = toast.querySelector('.toast-message');
const toastClose = toast.querySelector('.toast-close');

let targetColor;
let score = 0;

// Predefined Colors
const colors = [
    "#FF6F61", "#6B5B95", "#88B04B", "#F7CAC9", "#92A8D1", "#955251",
    "#B565A7", "#009B77", "#DD4124", "#D65076", "#45B8AC", "#EFC050"
];

// Helper Function: Convert RGB to Hex
function rgbToHex(rgb) {
    // Extract the RGB values from the string
    const [r, g, b] = rgb.match(/\d+/g).map(Number);

    // Convert each component to a 2-digit hex value
    const toHex = (c) => c.toString(16).padStart(2, '0');

    // Combine into a hex color string
    return `#${toHex(r)}${toHex(g)}${toHex(b)}`.toUpperCase();
}

// Initialize Game
function initGame() {
    scoreValue.textContent = score;

    targetColor = colors[Math.floor(Math.random() * colors.length)];
    colorBox.style.backgroundColor = targetColor;

    const options = [...colors].sort(() => Math.random() - 0.5).slice(0, 6);
    if (!options.includes(targetColor)) {
        options[Math.floor(Math.random() * 6)] = targetColor;
    }

    colorOptions.forEach((option, index) => {
        option.style.backgroundColor = options[index];
        option.style.opacity = "1";
        option.style.pointerEvents = "auto";
        option.removeEventListener('click', handleGuess);
        option.addEventListener('click', handleGuess);
    });

    // Reset Game Status
    gameStatus.textContent = "Make your guess!";
}

// Handle Guess
function handleGuess(event) {
    const selectedColor = event.target.style.backgroundColor;
    const selectedColorHex = rgbToHex(selectedColor)
    if (selectedColorHex === targetColor) {
        gameStatus.textContent = "Correct! 🎉";
        score++;
        scoreValue.textContent = score;
        showToast("Correct! 🎉");

        // Disable further guesses
        colorOptions.forEach(option => option.removeEventListener('click', handleGuess));

        // Start a new game after a short delay
        setTimeout(initGame, 1500);
    } else {
        gameStatus.textContent = "Wrong! Try again. ❌";
        event.target.style.opacity = "0.5";
        event.target.style.pointerEvents = "none";
        showToast("Wrong! Try again. ❌");
    }
}

function showToast(message) {
    toastMessage.textContent = message;
    toast.classList.add('show');

    setTimeout(() => {
        hideToast();
    }, 3000);
}

function hideToast() {
    toast.classList.remove('show');
}

toastClose.addEventListener('click', hideToast);

newGameButton.addEventListener('click', () => {
    score = 0;
    initGame();
});

initGame();