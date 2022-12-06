//Global Variables
// sets time to complete the quiz - 10 secs per question
var timeRemaining = questions.length * 10;
// sets timer element on landing screen
var timerEl = document.getElementById("time");
var time = timeRemaining;
var questionsIndex = 0;
var score = 0;
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
function givesFeedback(correctChoice) {
    // references feedback HTML element
    var feedbackEl = document.getElementById("feedback");
    var noAudioElementFound = document.getElementById("feedback-audio") === null;
    if (noAudioElementFound) {
        var audioElement = document.createElement("audio");
        console.log(audioElement);
        audioElement.setAttribute("id", "feedback-audio");
    } else {
        var audioElement = document.getElementById("feedback-audio");
    }
    if (correctChoice) {
        feedbackEl.innerText = "Correct!";
        console.log(document.getElementById("feedback-audio"));
        audioElement.setAttribute("src", "assets/sfx/correct.wav");
        audioElement.play();
    } else {
        feedbackEl.innerText = "Incorrect!";
        audioElement.setAttribute("src", "assets/sfx/incorrect.wav");
        audioElement.play();
    }
    feedbackEl.classList.remove("hide");
    setTimeout(function () {
        feedbackEl.classList.add("hide");
    }, 9000);
}


//Start button

startBtn.addEventListener ("click", function() {
    var startScreen = document.getElementById("start-screen");
    startScreen.classList.add ("hide");

    var questionsEl = document.getElementById("questions");
    questionsEl.classList.remove("hide");

    var timer = setInterval(function (){
        var timerEl = document.getElementById("time")
        timerEl.innerHTML = time - 1;
        time --;

        //stops timer if time runs out
        if (time <= 0) {
            clearTimeout(timer);
            questionsEl.classList.add("hide")

            var endScreenEl = document.getElementById("end-screen")
            endScreenEl.classList.remove("hide")
            timerEl.innerHTML = 0;

            var finalScoreEl = document.getElementById("final-score")
                if (userChoiceSelected) {
                    finalScoreEl.textContent = score;
                }
                else {
                    finalScoreEl.textContent = "0";
                    score = 0;
                }
        }
    }, 1000);
    //shows the first question
    showQuestion()
});



var choicesEl = document.getElementById("choices");
choicesEl, addEventListener ("click", function(event){
var questionObject = questions[questionsIndex];
var buttonClicked = (event.target.tagName.toUpperCase() === "button") &&
event.path[1].className == "choices";
var correctChoice = event.target.value === questionObject.answer;
var isLastQuestion = questionsIndex === questions.length - 1;
if (isLastQuestion && buttonClicked && correctChoice) {
    userChoiceSelected = true;
    choicesEl.innerHTML = '';
    score = time;
    givesFeedback(correctChoice)
    time = 0;
}
else if (isLastQuestion && buttonClicked && !correctChoice) {
    userChoiceSelected = true;
    choicesEl.innerHTML = ``;
    time -= 10;
    score = time;
    givesFeedback(correctChoice)
    time = 0;
}
else if (buttonClicked && correctChoice) {
    userChoiceSelected = true;
    choicesEl.innerHTML = ``;
    score = time;
    givesFeedback(correctChoice)
    questionsIndex++;
    showQuestion()
}
else if(buttonClicked && !correctChoice) {
    userChoiceSelected = true;
    time -= 10;
    choicesEl.innerHTML = ``;
    score = time;
    givesFeedback(correctChoice)
    questionsIndex++;
    showQuestion();
}
if (score < 0) {
    score = 0;
}
})
