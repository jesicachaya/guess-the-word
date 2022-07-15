//The unordered list where the player’s guessed letters will appear.
const guessedLettersElement = document.querySelector(".guessed-letters");
//The button with the text “Guess!” in it.
const guessLetterButton = document.querySelector(".guess");
//The text input where the player will guess a letter.
const letterInput = document.querySelector(".letter")
//The empty paragraph where the word in progress will appear.
const wordInProgress = document.querySelector(".word-in-progress");
//The paragraph where the remaining guesses will display.
const remainingGuessesElement = document.querySelector(".remaining");
//The span inside the paragraph where the remaining guesses will display.
const remainingGuessesSpan = document.querySelector(".remaining span");
//The empty paragraph where messages will appear when the player guesses a letter.
const message = document.querySelector(".message");
//The hidden button that will appear prompting the player to play again.
const playAgainButton = document.querySelector(".play-again");

const word = "magnolia";
const guessedLetters = [];

//A function to add placeholders for each letter.
const placeholders = function (word) {
    const placeholderLetters = [];
    for (const letter of word) {
        console.log(letter);
        placeholderLetters.push("●");
    }
    wordInProgress.innerText = placeholderLetters.join("");
}

placeholders(word);

guessLetterButton.addEventListener("click", function(e) {
    e.preventDefault();
    const guess = letterInput.value;
    //console.log(guess);
    letterInput.value = "";
    message.innerText = "";
    const goodGuess = validateInput(guess);
    
    if (goodGuess) {
        makeGuess(goodGuess);
    }
})

const validateInput = function(input) {
    const acceptedLetter = /[a-zA-Z]/;
    if (input === "") {
        message.innerText = `Please enter a letter guess.`;
    }
    else if (input.length > 1) {
        message.innerText = `Please enter a single letter.`;
    }
    else if (!input.match(acceptedLetter)) {
        message.innerText = "Please enter a letter from A to Z.";
    }
    else {
        return input;
    }
}

const makeGuess = function (guess) {
    guess = guess.toUpperCase();
    if (guessedLetters.includes(guess)) {
        message.innerText = `You already guessed that letter. Please enter a new guess.`
    } else {
        guessedLetters.push(guess);
        //console.log(guessedLetters);
        showGuessedLetters();
        updateWordInProgress(guessedLetters);
    }
}

const showGuessedLetters = function () {
    guessedLettersElement.innerHTML = "";
    for (const letter of guessedLetters) {
        const li = document.createElement("li");
        li.innerText = letter;
        guessedLettersElement.append(li);
    } 
}

const updateWordInProgress = function(guessedLetters) {
    const wordUpper = word.toUpperCase();
    const wordArray = wordUpper.split("");
    const revealWord = [];
    //console.log(wordArray);
    for (const letter of wordArray) {
        if (guessedLetters.includes(letter)) {
            revealWord.push(letter.toUpperCase());
        } else {
            revealWord.push("●");
        }
    }
    wordInProgress.innerText = revealWord.join("");
    checkIfWin();
}

const checkIfWin = function() {
    if (word.toUpperCase() === wordInProgress.innerText) {
        message.classList.add("win");
        message.innerHTML = `<p class="hightlight">You guessed correct the word! Congrats!</p>`;
        console.log(message.innerHTML);
    }
}