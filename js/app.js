

/*-------------------------------- Variables --------------------------------*/

let secretNum, guessList, isWinner

/*------------------------ Cached Element References ------------------------*/

const form = document.querySelector("form")
const guessInput = document.querySelector("#guess-input")
const guessesEl = document.querySelector("#prev-guesses")
const messageEl = document.querySelector("#message")
const titleEl = document.getElementById('title');
const resetBtn = document.querySelector("#reset-button")
const prevGuessMsg = document.querySelector("#prev-guesses-msg")

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

  titleEl.className = "";
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
    renderError("Hey Now! Please enter a number from 1 to 100.")
    return
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
    return
  } else if (lastGuess > secretNum || lastGuess < secretNum) {
    renderGuess(div, lastGuess)
  }
}

function renderWin(div) {
  messageEl.className = "winner"
  titleEl.className = 'animate__animated animate__bounce'
  div.className = "winner"
  guessesEl.appendChild(div)
  if (guessList.length === 1) {
    messageEl.textContent = `You're a Wizard Harry, you found the number in one guess!`
  } else {
    messageEl.textContent = `Whoa Nelly! You found the number '${secretNum}' in ${guessList.length} guesses!`
  }
  setTimeout(function(){
    kazoo.play();
  },1000);
}

function renderGuess(div, lastGuess) {
  if (lastGuess < secretNum) {
    messageEl.className = "low"
    div.className = "low"
    messageEl.textContent = `${lastGuess} is too low, Try again I dare you!`
  } else if (lastGuess > secretNum) {
    messageEl.className = "high"
    div.className = "high"
    messageEl.textContent = `${lastGuess} is too high, come on.. try again`
  }
  guessesEl.appendChild(div)
}

function renderError(error) {
  messageEl.className = "error"
  messageEl.textContent = error
}