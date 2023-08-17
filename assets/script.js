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

// selecting elements
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
var choicesList = document.querySelector(".choicesList")
var resetButton = document.getElementById("resetButton")
var choiceResponse = document.getElementById("choiceResponse")

// creating global scope variables
var currentQuestion = ""
var winCounter = 0
var lossCounter = 0
var timer
var timerCount
var isWin = false
var userChoice = ""
var rightChoice = ""
var questionsAsked = ""

//array of possible questions
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
    question: "Which type of language is JavaScript?",
    a:"Object-Oriented",
    b:"Object-Based",
    c:"Assembly-Language",
    d: "High-Level",
    correctChoice: "b",
    asked: false
    },
    {
    question: "'function' and 'var' are known as:",
    a:"Keywords",
    b:"Data types",
    c:"Declaration statements",
    d: "Prototypes",
    correctChoice: "c",
    asked: false
    },
    {
    question: "Which of the following variables takes precedence over the others if the names are the same?",
    a:"Global variable",
    b:"Local variable",
    c:"Neither",
    d: "The one that is typed first in the function",
    correctChoice: "b",
    asked: false
    },
]

//adding event listeners
startButton.addEventListener("click", startGame);
resetButton.addEventListener("click", resetScore);
questionOptions.addEventListener("click", checkAnswer);

//called on page load
function init() {
    questionText.innerHTML = "Press Start to Play"
    choicesList.hidden = true
    choiceResponse.hidden = true
    timerText.hidden = true
    getWins();
    getLosses();
}

// called when game is won, updates score
function winGame() {
    questionText.textContent = "Good job! Play again?";
    choicesList.hidden = true
    choiceResponse.hidden = true
    winCounter++
    console.log("this is winCounter from winGame", winCounter)
    questions.asked = false
    startButton.disabled = false;
    setWins()
    getWins()
}

// saves wins to local storage
function setWins() {
    console.log("setting wins")
    localStorage.setItem('winCount', winCounter)
    console.log("this is wincounter from setWins", winCounter)
}

// gets wins from local storage and displays on page
function getWins() {
    console.log("getting wins")
    var storedWins = localStorage.getItem('winCount')
    if (storedWins === null) {
        winCounter = 0
    } else {
        winCounter = storedWins
    }
    winCount.innerHTML = winCounter
    console.log("this is wincounter from getWins", winCounter)
}

// called when game is lost. updates loss count
function loseGame() {
    questionText.textContent = "OUT OF TIME. Play again?";
    choicesList.hidden = true
    choiceResponse.hidden = true
    lossCounter++
    questions.asked = false
    startButton.disabled = false;
    setLosses()
    getLosses()
}

// saves losses to local storage
function setLosses() {
    console.log("setting losses")
    localStorage.setItem('lossCount', lossCounter)
    console.log("this is losscounter from setlosses", lossCounter)
}

// gets losses from storage and displays on page
function getLosses() {
    console.log("getting losses")
    var storedLosses = localStorage.getItem('lossCount')
    if (storedLosses === null) {
        lossCounter = 0
    } else {
        lossCounter = storedLosses
    }
    lossCount.innerHTML = lossCounter
    console.log("this is losscounter from getlosses", lossCounter)
}

// starts game when button is pressed
function startGame() {
    console.log("start button pressed")
    isWin = false
    timerCount = 15
    startButton.disabled = true;
    choicesList.hidden = false
    choiceResponse.hidden = false
    timerText.hidden = false
    startTimer();
    nextQuestion();
}

// starts timer and tests for end of game
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

// pulls question from array, checks to see if question has been asked yet in this round
function nextQuestion() {
    console.log("next question selected")
    currentQuestion = questions[Math.floor(Math.random() * questions.length)]
    console.log("this is the currentQuestion", currentQuestion)
    if (!currentQuestion.asked) {
        currentQuestion.asked = true
        questionText.innerHTML = currentQuestion.question
        a.innerHTML = currentQuestion.a
        b.innerHTML = currentQuestion.b
        c.innerHTML = currentQuestion.c
        d.innerHTML = currentQuestion.d
    } else {
        currentQuestion = questions[Math.floor(Math.random() * questions.length)]
        console.log("the question had to be rerolled")
        console.log("this is the currentQuestion", currentQuestion)
        questionText.innerHTML = currentQuestion.question
        a.innerHTML = currentQuestion.a
        b.innerHTML = currentQuestion.b
        c.innerHTML = currentQuestion.c
        d.innerHTML = currentQuestion.d
    }
}

// checks user answer against correct answer. adds/subtracts from timer depending on answer
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

// resets saved score
function resetScore() {
    console.log("resetting score")
    winCounter = 0
    lossCounter = 0
    setWins()
    setLosses()
    getWins()
    getLosses()
}

// call init on page load
init();