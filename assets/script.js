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
var timerText = document.getElementById("timerText")
var timerElement = document.getElementById("timerCount")
var startButton = document.getElementById("startButton")
var questionText = document.getElementById("questionText")
var questionOptions = document.getElementById("questionOptions")
var a = document.getElementById("a")
var b = document.getElementById("b")
var c = document.getElementById("c")
var d = document.getElementById("d")
var resetButton = document.getElementById("resetButton")
var choiceResponse = document.getElementById("choiceResponse")
// var options = document.querySelector(".options")

var currentQuestion = ""
var winCounter = 0
var lossCounter = 0
var timer
var timerCount
var isWin = false
var userChoice = ""
var rightChoice = ""
var questionsAsked = 0
var storedLosses = localStorage.getItem('lossCount')
var storedWins = localStorage.getItem('winCount')

var questions = [
    {
    question: "Inside which HTML element do we put the Javascript?",
    a:"scripting",
    b:"js",
    c:"javascript",
    d: "script",
    correctChoice: "d",
    asked: false
    },
    {
    question: "How does a WHILE loop start?",
    a:"while (i <= 10; i++)",
    b:"while (i <= 10)",
    c:"while i = 1 to 10",
    d: "while i <= 10",
    correctChoice: "b",
    asked: false
    },
    {
    question: "A is correct",
    a:"asdfasdfasdf",
    b:"jasdfasdfasdfs",
    c:"jaasdfasdfasdfvascript",
    d: "scasdfasdfasdfript",
    correctChoice: "a",
    asked: false
    },
    {
    question: "B is correct",
    a:"scrasdfasdfasdfipting",
    b:"jsasdfasdfasdf",
    c:"javascripasdfasdfasdft",
    d: "sasdfasdfasdfcript",
    correctChoice: "b",
    asked: false
    },
    {
    question: "C is correct",
    a:"scriptinasdfasdfasdfg",
    b:"jsasdfasdfasdf",
    c:"jasdfasdfasdfavascript",
    d: "scasdfasdfasdfript",
    correctChoice: "c",
    asked: false
    },
]

startButton.addEventListener("click", startGame);
resetButton.addEventListener("click", resetScore);
questionOptions.addEventListener("click", checkAnswer);

function init() {
    questionText.innerHTML = "Press Start to Play"
    console.log("stored wins", storedWins)
    console.log("stored losses", storedLosses)
    getWins();
    getLosses();
}

function winGame() {
    questionText.textContent = "Good job!";
    a.innerHTML = ""
    b.innerHTML = ""
    c.innerHTML = ""
    d.innerHTML = ""
    winCounter++
    questions.asked = false
    startButton.disabled = false;
    setWins()
    getWins()
}

function setWins() {
    console.log("setting wins")
    localStorage.setItem('winCount', winCounter)
}

function getWins() {
    console.log("getting wins")
    if (storedWins === null) {
        winCounter = 0
    } else {
        winCounter = storedWins
    }
    winCount.innerHTML = winCounter
}

function loseGame() {
    questionText.textContent = "OUT OF TIME. Play again?";
    a.innerHTML = ""
    b.innerHTML = ""
    c.innerHTML = ""
    d.innerHTML = ""
    lossCounter++
    startButton.disabled = false;
    setLosses()
    getLosses()
}

function setLosses() {
    console.log("setting losses")
    localStorage.setItem('lossCount', lossCounter)
}

function getLosses() {
    console.log("getting losses")
    if (storedLosses === null) {
        lossCounter = 0
    } else {
        lossCounter = storedLosses
    }
    lossCount.innerHTML = lossCounter
}

function startGame() {
    console.log("start button pressed")
    isWin = false
    timerCount = 15
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
      if (timerCount <= 0) {
        // Clears interval
        clearInterval(timer);
        timerCount = 0
        loseGame();
      }
    }, 1000);
}

function nextQuestion() {
    console.log("next question selected")
    currentQuestion = questions[Math.floor(Math.random() * questions.length)]
    if (!currentQuestion.asked) {
        currentQuestion.asked = true
        questionText.innerHTML = currentQuestion.question
        a.innerHTML = currentQuestion.a
        b.innerHTML = currentQuestion.b
        c.innerHTML = currentQuestion.c
        d.innerHTML = currentQuestion.d
    } else {
        currentQuestion = questions[Math.floor(Math.random() * questions.length)]
    }
}

function checkAnswer(event) {
    console.log("checking answer")
    console.log("this is the correct answer:", currentQuestion.correctChoice)
    userChoice = event.target
    console.log("this is the user choice:", userChoice.id)
    if (userChoice.id == currentQuestion.correctChoice) {
        console.log("correct choice!")
        timerCount += 5
        choiceResponse.innerHTML = "Correct"
        questionsAsked ++
            if (questionsAsked < questions.length) {
                nextQuestion()
            } else {
                isWin = true
            }
    } else {
        console.log("wrong choice")
        timerCount -= 5
        choiceResponse.innerHTML = "Incorrect, try again."
    }
}

function resetScore() {
    console.log("resetting score")
    winCounter = 0
    lossCounter = 0
    getLosses()
    getWins()
}

init();
// winGame();
// loseGame();