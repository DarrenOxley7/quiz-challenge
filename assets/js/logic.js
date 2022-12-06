//Global Variables
// sets time to complete the quiz - 15 secs per question
var timeRemaining = questions.length * 15;
// sets timer element on landing screen
var timerEl = document.getElementById("time");
var time = timeRemaining;
var questionsIndex = 0;
var Score = 0;
var userChoiceSelected = false;
// stores start button reference as variable
var startBtn = document.getElementById("start");
// refers to <a> tag that links to high scores
var allAnchors = document.querySelector("a");
//Global Variables End

//adds question to page
function showQuestion () {
    var questionTitle = document.getElementById("question-title");
    var questionObject = questions[questionsIndex];
    questionTitle.innerHTML = questionObject.question;
    createChoices(questionObject);
    userChoiceSelected = false;
}

//Creates buttons for each choice in choices array
function createChoices(questionObject) {
    var choicesEl = document.getElementById("choices");
        for (var choice of questionObject.choices) {
            var userInputBtn = document.createElement("button")
            var choiceBtn = choicesEl.appendChild(userInputBtn)
            choiceBtn.setAttribute ("value", choice)
            choiceBtn.textContent = choice;
        }
}

//add feedback


//Start button

startBtn.addEventListener ("click", function() {
    var startScreen = document.getElementById("start-screen");
    startScreen.classList.add ("hide");

    var questionsEl = document.getElementById("questions");
    questionsEl.classList.remove("hide");

    var timer = setInterval(function (){
        var timerEl =document.getElementById("time")
        timerEl.innerHTML = time - 1;
        time --;

        //stops timer if time runs out
        if (time < 1) {
            clearTimeout(timer);
            questionsEl.classList.add("hide")

            var endScreenEl = document.getElementById("end-screen")
            endScreenEl.classList.remove("hide")
            timerEl.innerHTML = 0;

            var finalScoreEl = document.getElementById("final-score")
                if (userChoiceSelected = true) {
                    finalScoreEl.textContent = "0"
                    Score= 0;
                }
        }
    }, 1000);
    showQuestion()
});



