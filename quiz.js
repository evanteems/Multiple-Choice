// all id elements go here!!

const start = document.getElementById("start");

const quiz = document.getElementById("Quiz");

const questions = document.getElementById("questions");

const Img = document.getElementById("img");

const choiceA = document.getElementById("A");

const choiceB = document.getElementById("B");

const choiceC = document.getElementById("C");

const counter = document.getElementById("counter");

const timeGuage = document.getElementById("timeGuage");

const progress = document.getElementById("theprogress");

const scoreDiv = document.getElementById("score");

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
        question : "Which of the following is an example of an empty element"
    }
]