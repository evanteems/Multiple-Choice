// all id elements go here!!

const start = document.getElementById("start");

const quiz = document.getElementById("Quiz");

const question = document.getElementById("question");

const Img = document.getElementById("img");

const choiceA = document.getElementById("A");

const choiceB = document.getElementById("B");

const choiceC = document.getElementById("C");

const counter = document.getElementById("counter");

const timeGuage = document.getElementById("timeGuage");

const progress = document.getElementById("theprogress");

const scoreDiv = document.getElementById("score");

let answerisWrong = 0

// questions begin here!!
let questions = [

    {
        question : "How many Tags are in a html?",

        choiceA : "Correct!",

        choiceB : "Wrong!",

        choiceC : "Wrong!",

        correct : "A"

    },{
        question : "What does <br /> stand for?",

        choiceA : "Wrong!",

        choiceB : "Wrong!",

        choiceC : "Correct!",

        correct : "C"

    },{
        question : "</ head> Is this an opening tag or a closed tag?",

        choiceA : "Wrong!",

        choiceB : "Correct!",

        choiceC : "Wrong!",

        correct : "B"

    },{
        question : "What does HTML stand for?",

        choiceA : "Wrong!",

        choiceB : "Correct!",

        choiceC : "Wrong!",

        correct : "B"

    },{
        question : "Which of the following is an example of an empty element?",

        choiceA : "Correct!",

        choiceB : "Wrong!",

        ChoiceC : "Wrong!",

        correct : "A"

    },{
        question : "What does JS stand for?",

        choiceA : "Wrong!",

        choiceB : "Wrong!",

        choiceC : "Correct!",

        correct : "C"
    }
];

const lastQuestion = questions.length - 1;

let runningQuestion = 0;

let count = 0;

const questionTime = 10;
const guageWidth = 150;
const guageUnit = guageWidth / questionTime;
let TIMER;
let score = 0

// Rendering a Question

function renderQuestion() {
    let q = questions[runningQuestion];

    question.innerHTML = "<p>"+ q.question +"<p>";

    choiceA.innerHTML = q.choiceA;

    choiceB.innerHTML = q.choiceB;

    choiceC.innerHTML = q.choiceC;
};

start.addEventListener("click",startQuiz);
// Starting the Quiz!
function startQuiz() {
    start.style.display = "none";
    renderQuestion();
    quiz.style.display = "block";
    renderProgress();
    renderCounter();
    TIMER = setInterval(renderCounter,1000);
};

// Progress

function renderProgress() {
    for(let qIndex = 0; qIndex <= lastQuestion; qIndex++) {
        theprogress.innerHTML += "div class='prog' id="+ qIndex +"></div>";

    }
};

function renderCounter() {
    if(count <= questionTime) {
        counter.innerHTML = count;
        timeGuage.style.width = count * guageUnit + "px";
        count++
    }else{
        count = 0;
        anserisWrong();
        if(runningQuestion < lastQuestion){
            runningQuestion++;
            renderQuestion();
        }else{
            clearInterval(TIMER);
            scoreRender();
        };
    };
};

// Check on Answers!!
function checkAnswer(answer) {
    if( answer == questions[runningQuestion].correct) {
        score++;
        answeriscorrect();
    }else{
        anserisWrong();
    };
    count = 0;
    if(runningQuestion < lastQuestion) {
        runningQuestion++;
        renderQuestion();
    }else{
        clearInterval(TIMER);
        scoreRender();
    };
};

// When the answer is correct!
function answeriscorrect() {
    document.getElementById(runningQuestion);
};

// When the Answer is Incorrect!
function answerisIncorrect() {
    document.getElementById(runningQuestion);
};

// Rendering the Score
function scoreRender() {
    scoreDiv.style.display = "block";

    const scorePerCent = Math.round(100 * score/questions.length);

    scoreDiv.innerHTML += "<p>"+ scorePerCent +"%</p>";
};
