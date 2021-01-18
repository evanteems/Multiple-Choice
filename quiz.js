// all id elements go here!!
let timeRemaining = 250;
let startQuizBtn = document.getElementById( "start-button" );

// Function Contructer starts here!!
let TheQuiz = function( questionsObj ) {
   this.correctAnswer = 0;
   this.questions = questionsObj;
   this.questionIndex = 0;
};

TheQuiz.prototype.getQuestionIndex = function() {
   return this.questions[ this.questionIndex ];
};

// When the user chooses an answer
TheQuiz.prototype.userChoice = function( userAnswer ) {
   let isCorrect = document.getElementById( "status-answers" );

   // When the user chooses an answer Correctly!!
   if ( this.getQuestionIndex().isCorrectAnswer( userAnswer )) {
      this.correctAnswer++;
      isCorrect.innerHTML = "This answer is Correct!";
   }
   // When the user chooses an answer incorrectly!!
   else {
      isCorrect.innerHTML = "This answer is wrong!!";
      timeRemaining = timeRemaining - 10;
      console.log ( "timeRemaining: " + timeRemaining );
      displayTime();
   };

   this.questionIndex++;
};

TheQuiz.prototype.isEnded = function() {
   return this.questionIndex === this.questions.length;
};

let eachQuestion = function( question, answerChoices, correctAnswer ) {
   this.questionText = question;
   this.answerChoices = answerChoices;
   this.correctAnswer = correctAnswer;
};

eachQuestion.prototype.isCorrectAnswer = function( userAnswer ) {
   return this.correctAnswer === userAnswer;
};

// Display the current remaining time
let displayTime = function() {
   let timeElement = document.getElementById( "time-left" );
   console.log( "displayTime function timeElement: " );
   console.log( timeElement );
   timeElement.innerHTML = "Time Remaining: " + timeRemaining + " seconds.";
};

let displayQuiz = function() {
   // Hide the "Start Quiz" button from the welcome page
   startQuizBtn.style.visibility = "hidden";

   // Change the page's header message as we are no longer in the welcome page
   let headerMsg = "<h1 id = 'header-msg'>JavaScript Coding Assessment</h1>";
   let element = document.getElementById( "Dquiz" );
   element.innerHTML = headerMsg;
   
   // Display time remaining
   //displayTime();

   if( newQuiz.isEnded() ) {
      displayScores();
   }
   else {
      // Display the Dquiz question
      let element = document.getElementById( "questions" );
      element.innerHTML = newQuiz.getQuestionIndex().questionText;

       // Display answer choices
      let choices = newQuiz.getQuestionIndex().answerChoices;
      for( let i = 0; i < choices.length; i++ ) {
         let element = document.getElementById( "answer-choice" + i );
         element.innerHTML = choices[ i ];
         userChoice( "button" + i, choices[ i ] );
      }

      displayProgress();
   }
};

let userChoice = function( id, answerChoice ) {
   let button = document.getElementById( id );
   button.onclick = function() {
      newQuiz.userChoice( answerChoice );
      displayQuiz();
   }
};

let displayProgress = function() {
   let currentQuestionNumber = newQuiz.questionIndex + 1;
   let element = document.getElementById( "theprogress" );
   console.log ( "function displayProgress element: ");
   console.log( element );
   element.innerHTML = "Question " + currentQuestionNumber + " of " + newQuiz.questions.length;
};

let displayScores = function() {
   let gameOverHTML = "<h1>Your Performance</h1>";
   gameOverHTML += "<br><h2 id = 'correct-answer'>You answered " + newQuiz.correctAnswer + " out of " +
                     newQuiz.questions.length + " questions correctly.</h2><br>" +
                     "<h2 id = 'correct-answer'>Your score is " + timeRemaining + "</h2>";
   let element = document.getElementById( "Dquiz" );
   element.innerHTML = gameOverHTML;
};

// Questions will begin here!!
let quizQuestions = [
   new eachQuestion( "Commonly used data types DO NOT include:",
                     [ "strings", "booleans", "alerts", "numbers" ],
                     "alerts" ),
   new eachQuestion( "The condition in an if/else statement is enclosed with _____.",
                     [ "quotes", "curly brackets", "parenthesis", "square brackets" ],
                     "parenthesis" ),
   new eachQuestion( "Arrays in JavaScript can be use to store _____.",
                     [ "numbers and string", "other arrays", "booleans", "all of the above" ],
                     "all of the above" ),
   new eachQuestion( "String values must be enclosed within _____ when being assigned to variables",
                     [ "commas", "curly brackets", "quotes", "parenthesis" ],
                     "quotes" ),
   new eachQuestion( "A very useful tool used during evelopment and debugging for printing content to the debugger is",
                     [ "JavaScript", "terminal/bash", "for loops", "console log" ],
                     "console log" ),
   new eachQuestion( "JavaScript is:",
                     [ "client-side scripting language", "server-side scripting language", "neither", "both" ],
                     "both" ),
   new eachQuestion( "Which is the symbol used for comments in JavaScript",
                     [ "//", "!----!", "**", "none of the above" ],
                     "//" ),
   new eachQuestion( "Which of the following is a strict equality?",
                     [ "==", "=", "===", "all of the above" ],
                     "===" ),
   new eachQuestion( "What can you use to convert the string of any base to an integer in JavaScript?",
                     [ "convertToInt();", "parseInt();", "toInt();", "allToInt();" ],
                     "parseInt();" ),
   new eachQuestion( "What does an undefined value in JavaScript mean?",
                     [ "variable does not exist", "variable has no value", "property does not exist", "all of the above" ],
                     "all of the above" )
];

// Quiz constructer Created Here!!!
let newQuiz = new TheQuiz( quizQuestions );

let displayWelcome = function() {
   // Display welcome message
   let welcomeMsg = "<h1 id = 'welcome'>Welcome to<br>Multiple Choice Quiz!!</h1>";
   welcomeMsg += "<br><h2 id = 'welcomeH2'>Try your luck at answering these JavaScript/HTML questions and see how many you can get.By the way there is a time limit. Be sure to answer correctly!</h2><br>" + startQuizBtn.outerHTML;
   let element = document.getElementById( "Dquiz" );
   element.innerHTML = welcomeMsg;

   document.getElementById( "start-quiz").addEventListener( "click", displayQuiz );
};

// Welcone Page displayed here!!
displayWelcome();