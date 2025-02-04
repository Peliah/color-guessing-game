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

// Game Elements
const colorBox = document.querySelector('[data-testid="colorBox"]');
const colorOptions = document.querySelectorAll('[data-testid="colorOption"]');
const gameStatus = document.querySelector('[data-testid="gameStatus"]');
const scoreValue = document.getElementById('scoreValue');
const newGameButton = document.querySelector('[data-testid="newGameButton"]');
const toast = document.getElementById('toast');
const toastGif = toast.querySelector('#toast-gif');
const toastMessage = toast.querySelector('.toast-message');
const toastClose = toast.querySelector('.toast-close');
const instructionsButton = document.querySelector('.instructions');
const modal = document.getElementById('modal');
const modalClose = modal.querySelector('.modal-close');

// Game Variables
let targetColor;
let score = 0;

// Predefined Colors (Grouped by Shades)
const colorGroups = [

    ["#FF6F61", "#FF8C7A", "#FFA893", "#FFC4AD", "#FFE0C7", "#FFECE0"],

    ["#6B5B95", "#7A6BA5", "#897BB5", "#988BC5", "#A79BD5", "#B6ABE5"],

    ["#88B04B", "#9ABD6B", "#ACCA8B", "#BED7AB", "#D0E4CB", "#E2F1EB"],

    ["#F7CAC9", "#F9D5D4", "#FBE0DF", "#FDEBEA", "#FFF6F5", "#FFFFFF"],

    ["#955251", "#A56362", "#B57473", "#C58584", "#D59695", "#E5A7A6"],

    ["#45B8AC", "#5DC0B6", "#75C8C0", "#8DD0CA", "#A5D8D4", "#BDE0DE"],

    ["#EFC050", "#F1C862", "#F3D074", "#F5D886", "#F7E098", "#F9E8AA"],

    ["#DD4124", "#E15438", "#E5674C", "#E97A60", "#ED8D74", "#F1A088"],

    ["#92A8D1", "#A2B4D9", "#B2C0E1", "#C2CCE9", "#D2D8F1", "#E2E4F9"],

    ["#B565A7", "#BD74AF", "#C583B7", "#CD92BF", "#D5A1C7", "#DDB0CF"]
];

function rgbToHex(rgb) {

    const [r, g, b] = rgb.match(/\d+/g).map(Number);


    const toHex = (c) => c.toString(16).padStart(2, '0');


    return `#${toHex(r)}${toHex(g)}${toHex(b)}`.toUpperCase();
}

// Initialize Game
function initGame() {

    scoreValue.textContent = score;
    const colorGroup = colorGroups[Math.floor(Math.random() * colorGroups.length)];
    targetColor = colorGroup[Math.floor(Math.random() * colorGroup.length)];
    colorBox.style.backgroundColor = targetColor;

    const options = [...colorGroup].sort(() => Math.random() - 0.5).slice(0, 6);
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
        showToast("Correct! 🎉", "assets/Happy Earth.gif");

        // Disable further guesses
        colorOptions.forEach(option => option.removeEventListener('click', handleGuess));

        setTimeout(initGame, 1500);
    } else {
        gameStatus.textContent = "Wrong! Try again. ❌";
        event.target.style.opacity = "0.5";
        event.target.style.pointerEvents = "none";
        showToast("Wrong! Try again. ❌", "assets/Headache.gif");
    }
}

function showToast(message, gifSrc) {
    toastGif.src = gifSrc;
    toastMessage.textContent = message;
    toast.classList.add('show');


    setTimeout(() => {
        hideToast();
    }, 1500);
}

function hideToast() {
    toast.classList.remove('show');
}

toastClose.addEventListener('click', hideToast);

newGameButton.addEventListener('click', () => {
    score = 0;
    initGame();
});

instructionsButton.addEventListener('click', () => {
    modal.classList.add('show');
});

modalClose.addEventListener('click', () => {
    modal.classList.remove('show');
});

modal.addEventListener('click', (event) => {
    if (event.target === modal) {
        modal.classList.remove('show');
    }
});

initGame();
