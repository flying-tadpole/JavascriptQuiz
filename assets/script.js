/*
flow of game
1) On load, page shows start button and scores
2) user presses start button
    - first question displays
    - first question options display
    - timer starts
3) user clicks on question option
    - time is added to timer
    - next question displays
- repeat 3 for as many questions as there are until LAST QUESTION
4) if timer runs out
    - game ends
    - "Out of Time" displays
    - score recorded
    - play again? option displays
5) ON LAST QUESTION: when user clicks on option
    - game over displayed
    - score recorded  
    - play again? option displays

-----

FUNCTIONS
init - run on load of page, calls getWins, getLosses
getWins - pulls saved win count from memory and displays on page
winGame - displays "good job" text, ++ win counter, enables start button, calls setWins 
setWins - saves win count in memory
getLosses - pulls saved loss count from memory and displays on page
loseGame - displays "out of time", ++ loss counter, enables start button, calls setLosses
setLosses - saves loss count in memory
startGame - runs when button pressed, sets beginning timer amount, disables start button, calls startTimer, calls nextQuestion
startTimer - starts countdown timer, checks for value of isWin, either ends when time runs out and calls loseGame or when isWin = true and calls winGame
nextQuestion - picks question from questions array, displays text on screen
checkAnswer - on user click, checks selected answer against correct answer. if true, time added to timer and nextQuestion called. if false, time subtracted from timer and nextQuestion called
resetScore - on button click, winCounter and lossCounter reset to 0
*/

var winCount = document.querySelector(".win")
var lossCount = document.querySelector(".lose")
var timerElement = document.getElementById("timerCount")
var startButton = document.getElementById("startButton")
var questionText = document.getElementById("questionText")
var questionOptions = document.getElementById("questionOptions")
var a = document.getElementById("choiceOne")
var b = document.getElementById("choiceTwo")
var c = document.getElementById("choiceThree")
var d = document.getElementById("choiceFour")
var resetButton = document.getElementById("resetButton")
// var options = document.querySelector(".options")

var currentQuestion = ""
var winCounter = 0
var lossCounter = 0
var timer
var timerCount
var isWin = false
var userChoice = ""
var rightChoice = ""

var questions = [
    {
    question: "Inside which HTML element do we put the Javascript?",
    a:"scripting",
    b:"js",
    c:"javascript",
    d: "script",
    correctChoice: "d"
    },
    {
    question: "How does a WHILE loop start?",
    a:"while (i <= 10; i++)",
    b:"while (i <= 10)",
    c:"while i = 1 to 10",
    d: "while i <= 10",
    correctChoice: "d"
    },
    // {
    // question: "Inside which HTML element do we put the Javascript?",
    // a:"scripting",
    // b:"js",
    // c:"javascript",
    // d: "script",
    // correctChoice: "d"
    // },
    // {
    // question: "Inside which HTML element do we put the Javascript?",
    // a:"scripting",
    // b:"js",
    // c:"javascript",
    // d: "script",
    // correctChoice: "d"
    // },
    // {
    // question: "Inside which HTML element do we put the Javascript?",
    // a:"scripting",
    // b:"js",
    // c:"javascript",
    // d: "script",
    // correctChoice: "d"
    // },
]

startButton.addEventListener("click", startGame);
resetButton.addEventListener("click", resetScore);
questionOptions.addEventListener("click", checkAnswer);

function init() {
    getWins();
    getLosses();
}

function getWins() {
    console.log("getting wins")
}

function winGame() {
    questionText.textContent = "Good job! Check your score to see how you did.";
    choiceOne.innerHTML = ""
    choiceTwo.innerHTML = ""
    choiceThree.innerHTML = ""
    choiceFour.innerHTML = ""
    winCounter++
    startButton.disabled = false;
    setWins()
}

function setWins() {
    console.log("setting wins")
}

function getLosses() {
    console.log("getting losses")
}

function loseGame() {
    questionText.textContent = "OUT OF TIME";
    choiceOne.innerHTML = ""
    choiceTwo.innerHTML = ""
    choiceThree.innerHTML = ""
    choiceFour.innerHTML = ""
    lossCounter++
    startButton.disabled = false;
    setLosses()
}

function setLosses() {
    console.log("setting losses")
}

function startGame() {
    console.log("start button pressed")
    timerCount = 10;
    startButton.disabled = true;
    startTimer();
    nextQuestion();
}

function startTimer() {
    // Sets timer
    console.log("timer started")
    timer = setInterval(function() {
      timerCount--;
      timerElement.textContent = timerCount;
      if (timerCount >= 0) {
        // Tests if win condition is met
        if (isWin && timerCount > 0) {
          // Clears interval and stops timer
          clearInterval(timer);
          winGame();
        }
      }
      // Tests if time has run out
      if (timerCount === 0) {
        // Clears interval
        clearInterval(timer);
        loseGame();
      }
    }, 1000);
}

function nextQuestion() {
    console.log("next question selected")
    currentQuestion = questions[Math.floor(Math.random() * questions.length)]
    questionText.innerHTML = currentQuestion.question
    choiceOne.innerHTML = currentQuestion.a
    choiceTwo.innerHTML = currentQuestion.b
    choiceThree.innerHTML = currentQuestion.c
    choiceFour.innerHTML = currentQuestion.d
}

function checkAnswer(event) {
    console.log("checking answer")
    console.log(questions.correctChoice)
    userChoice = event.target
    rightChoice = questions.correctChoice
    if (userChoice == rightChoice) {
        console.log("correct choice!")
    } else {
        console.log("wrong choice")
    }
    
}

function resetScore() {
    console.log("resetting score")
}

init();

