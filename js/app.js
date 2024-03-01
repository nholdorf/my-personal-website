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

/*----------------------------- Event Listeners -----------------------------*/
form.addEventListener("reset", init)


/*-------------------------------- Functions --------------------------------*/

init();

function init() {
    guessesEl.textContent = ""
    messageEl.textContent = "Please enter a number from 1 to 100"
    resetBtn.setAttribute("hidden, true")
    prevGuessMsg.textContent = ""
    guessList = []
    isWinner = false
    secretNum = Math.floor(Math.random() * 100 + 1)
}