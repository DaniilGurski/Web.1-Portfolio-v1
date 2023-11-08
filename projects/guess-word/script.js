const inputContainer = document.querySelector(".input-container");
const wordContainer = document.querySelector(".word-container");
const wordLettersContainer = document.querySelector(".word-letters-container");

const guessCountElement = document.querySelector(".guess-count-span");
const gameResultWindow = document.querySelector(".game-result-window");

const wordList = ["pencil", "papper", "flag", "potato", "car", "camp", "tree", "year"];
let chosenWord = "";

let letterDivMap = {};
let guessCount = 7;
guessCountElement.innerText = guessCount;



function randomNumber(max) {
    return Math.floor(Math.random() * max); 
}


function setLetters(chosenWord) {
    const wordLetters = chosenWord.split("");
    const wordLetterContainer = document.querySelector(".word-letters-container");

    for (const letter of wordLetters) {
        const letterWrapper = document.createElement("div");
        letterWrapper.innerHTML = letter;

        if (letter in letterDivMap === false) {
            letterDivMap[letter] = [];
        }

        letterDivMap[letter].push(letterWrapper);
        wordLetterContainer.appendChild(letterWrapper);
    }
}


function pickWord() {
    const randomIndex = randomNumber(wordList.length); 
    chosenWord = wordList[randomIndex];
    
    setLetters(chosenWord);
}


function fillWithAlphabet() {
    const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');

    for (let iter = 0; iter < 26; iter++) {
        const letterButton = document.createElement("button");
        
        letterButton.innerText = alphabet[iter];
        letterButton.classList.add("letter-button");
        
        inputContainer.appendChild(letterButton);
    }

    pickWord();
} 


function gameReset() {
    guessCount = 7;
    guessCountElement.innerText = guessCount;

    letterDivMap = {};

    gameResultWindow.classList.remove("result-window-flex");
    
    while (wordLettersContainer.firstChild) {
        wordLettersContainer.removeChild(wordLettersContainer.firstChild)
    }

    const disabledButtons = document.querySelectorAll(".disabled-letter-button");
    for (let button of disabledButtons) {
        button.classList.remove("disabled-letter-button")
    }

    pickWord();
}


// Handeling letter-button press.

function showResultWindow(message) {
    const gameResultText = document.querySelector(".game-result-text");
    const playAgainButton = document.querySelector(".play-again-button");
    const wordRevealElement = document.querySelector(".word-reveal");

    // if lost - show the p element with chosen word (set in revealWord function)
    wordRevealElement.classList.toggle("none-display", guessCount > 0);
    
    gameResultText.innerHTML = message;
    gameResultWindow.classList.add("result-window-flex");

    playAgainButton.addEventListener("click", () => {
        gameReset();
    })
}


function revealWord() {
    const wordRevealElement = document.querySelector(".word-reveal");
    wordRevealElement.innerText = `The word was "${chosenWord}" !`;
}


function decreaseGuessCount() {
    guessCount -= 1;
    guessCountElement.innerText = guessCount;

    if (guessCount === 0) {
        showResultWindow("You lost :(")
        revealWord();
    }
}


function isWordGuessed() {
    if (Object.keys(letterDivMap).length === 0) {
        showResultWindow("Word guessed !");
    } 
}



function showLetter(keyLetter) {
    for (const mappedDiv of letterDivMap[keyLetter]) {
        mappedDiv.classList.add("show-word-letter");
    }
    delete letterDivMap[keyLetter];
    isWordGuessed();
}


function isCorrectLetter(letterButton) {
    const keyletter = letterButton.innerText;

    if (keyletter in letterDivMap) {
        showLetter(keyletter);
    } else {
        decreaseGuessCount();
    }

    letterButton.classList.add("disabled-letter-button");
}


function buttonClick(event) {
    let target = event.target;
    
    if (target.classList.contains("letter-button") === false) {
        return;
    }

    isCorrectLetter(target); 
}


fillWithAlphabet();
inputContainer.addEventListener("click", buttonClick);

// Third of september ...