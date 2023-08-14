var winCount = document.querySelector(".win")
var lossCount = document.querySelector(".lose")
var timerElement = document.getElementById("timerCount")
var startButton = document.getElementById("startButton")
var questionText = document.getElementById("questionText")
var questionOptions = document.getElementById("questionOptions")
var choiceOne = document.getElementById("choiceOne")
var choiceTwo = document.getElementById("choiceTwo")
var choiceThree = document.getElementById("choiceThree")
var choiceFour = document.getElementById("choiceFour")
var resetButton = document.getElementById("resetButton")
// var options = document.querySelector(".options")

var currentQuestion = ""
var winCounter = 0
var lossCounter = 0
var timer
var timerCount
var isWin = false

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
    correctChoice: "b"
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

    // for (var i = 0; i < currentQuestion.length; i++) {
    //     options.innerHTML = currentQuestion.answers
    //     console.log(i)
    // }
        
    // choiceOne.innerHTML = currentQuestion.answers.a
    // choiceTwo.innerHTML = currentQuestion.answers.b
    // choiceThree.innerHTML = currentQuestion.answers.c
    // choiceFour.innerHTML = currentQuestion.answers.d
    // console.log(currentQuestion.answers.a)
    // console.log(currentQuestion.answers.b)
    // console.log(currentQuestion.answers.c)
    // console.log(currentQuestion.answers.d)
}

function checkAnswer() {
    console.log("checking answer")
    
}

function resetScore() {
    console.log("resetting score")
}

init();

