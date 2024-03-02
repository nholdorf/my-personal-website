/*-------------------------------- Constants --------------------------------*/



/*-------------------------------- Variables --------------------------------*/
let secretNum, guessList, isWinner


/*------------------------ Cached Element References ------------------------*/
const form = document.querySelector("form")
const guessInput = document.querySelector("#guess-input")
const guessesEl = document.querySelector("#prev-guesses")
const messageEl = document.querySelector("#message")
const resetBtn = document.querySelector("#reset-button")
const prevGuessMsg = document.querySelector("#prev-guesses-msg")

console.dir(form)
/*----------------------------- Event Listeners -----------------------------*/

form.addEventListener("reset", init)

form.addEventListener("submit", function (evt) {
    evt.preventDefault()
    if (isWinner === false) {
        checkGuess(parseInt(guessInput.value))
    }
}) 




/*-------------------------------- Functions --------------------------------*/

init()

function init() {
    messageEl.className = ""
    guessesEl.textContent = ""
    messageEl.textContent = "Please enter a number from 1 to 100"
    resetBtn.setAttribute("hidden", true)
    prevGuessMsg.textContent = ""
    guessList = []
    isWinner = false
    secretNum = Math.floor(Math.random() * 100 + 1)
    render()
}

function checkGuess(guess) {
    guessInput.value = ""
    if (isNaN(guess) || guess < 1 || guess > 100) {
        renderError("Whoa Nelly! Please entere a number from 1 to 100.")
    } else if (guess === secretNum) {
        isWinner = true
    }
    guessList.push(guess)
    render()
}

function render() {
    const lastGuess = guessList[guessList.length - 1]
    const div = document.createElement("div")
    div.textContent = lastGuess

    if (guessList.length === 1) {
        prevGuessMsg.textContent = "Previous Guesses:"
        resetBtn.removeAttribute("hidden")
    }

    if (isWinner) {
        renderWin(div)
    } else if (lastGuess > secretNum || lastGuess < secretNum) {
        renderGuess(div, lastGuess)
    }
}

function renderError(error) {
    messageEl.className = "error"
    messageEl.textContent = error
}

function renderWin(div) {
    messageEl.className = "winner"
    div.className = "winner"
    guessesEl.appendChild(div)
    if (guessList.length === 1) {
        messageEl.textContent = 'You got it in one! HOLY COW!!!'
    } else {
        messageEl.textContent = 'Youre a wizard Harry!!!!! You found the number ${secretNum} in ${guessList.length} guesses!'
    }
}
