let countDownEl = document.querySelector("#countdown");
let questionContainerEl = document.querySelector(".Contains-Questions");
let questionSpanEl = document.querySelector("#question-span");
let scoreEl = document.querySelector("#count");
let startEl = document.querySelector("#start");

//This will display if the answers are correct or wrong!!
let answerArea = document.querySelector("#answerZ");

let endGameArea = document.querySelector("#Game-End");

let score = 0;
let timeLeft = 60;
let currentQuestionindex = 0;

//Questions will be made here!!!
let questions = [
    { q: "What does HTML stand for?", a: "Ham Tomato Mayo and Lettuce", b: "HyperText Markup Language", c: "Hyperberic Teritary Logrithm", d: "Hypertrophic Management Language"},
    { q: "Which one is not a CSS property?", a: "color", b: "font-style", c: "text-align", d: "bread" },
    { q: "<br /> What type of tag is this", a: "Break Tag", b: "Opening Tag", c: "Main Tag", d: "Header Tag"  },
    { q: "Which of the following is an example of an empty element?", a: "<img/>", b: "</img>", c:"<img><img>", d: "<img></img>" },
    { q: "<body> Is this an opening or closing tag?", a: "Opening", b: "Closing" }
    
]

// run timer function
function countDown(amount) {
    if ( amount > 1 ) {
        timeLeft =  timeLeft - amount;
    } else {
        timeLeft--;
    }
    
    countDownEl.textContent = timeLeft
}

function endGame(score, initials = "", status) {

    if(status === "end game") {

        questionContainerEl.textContent = "Your time is up, hope you had fun! Your score is" + score; 
        endGameArea.style.display = "block";
        questionSpanEl.textContent = "";
        questionContainerEl.textContent = '';

    } else {
    questionSpanEl.textContent = "";
    questionContainerEl.textContent = '';

    questionContainerEl.textContent = "Thank you for taking this Quiz, your score was " + score;
    
    endGameArea.style.display = "block";
    }

}


function printQuestion(questionObj) {

    // Question is printed here!!
    questionSpanEl.textContent = '';
    questionSpanEl.textContent = questionObj.q;

    questionContainerEl.textContent = '';

    // Loop for the answer for the user!
    for (answer in questionObj) {
        
        if (answer !== 'q') {
           
            // Button created for the answers
            let answerBtn = document.createElement('button');
            answerBtn.setAttribute('id', 'answer-id');
            answerBtn.setAttribute('class', 'btn'); 
            answerBtn.textContent = questionObj[answer];

            // when answer is selected the function starts here!!
            answerBtn.onclick = function() {
             
                    // Answers displayed here!
                    if (   
                            answerBtn.textContent === "HyperText Markup Language" || 
                            answerBtn.textContent === "bread" || 
                            answerBtn.textContent === "Break Tag" || 
                            answerBtn.textContent === "<img></img>" || 
                            answerBtn.textContent === "Opening" 
                    ) {
                      
                        // Score increased because the user answereed correectly!!
                        score++;

                        // Next question is moved here!!
                        currentQuestionindex++;

                        // CHANGE THE TEXT TO SAY CORRECT
                        answerArea.textContent = "Congrats!, You got it right!";

                        // AFTER 2 SECONDS MOVE ON TO THE NEXT QUESTION AND IF ITS THE LAST QUESTION THEN 
                        // CALL THE END GAME FUNCTION 
                        setTimeout(function(){ 
                            answerArea.textContent = "";
                            
                            if(currentQuestionindex === 5){
                                endGame(score);
                            } else {
                                printQuestion(questions[currentQuestionindex]);
                            }

                        }, 2000);

                    } else {

                        currentQuestionindex++;
                        answerArea.textContent = "Sorry, This answer is wrong!";

                        // CALL THE COUNTDOWN CLOCK WITH SPECIAL NUMBER
                        // INSTEAD OF -1 PASS IT A CUSTOM NUMBER -5 
                        countDown(10);
                        setTimeout(function(){ 
                            answerArea.textContent = "";
                              
                            if(currentQuestionindex == 5){

                                endGame(score);
                            } else {
                                printQuestion(questions[currentQuestionindex]);
                            }

                        }, 2000);

                    }

            };
            questionContainerEl.appendChild(answerBtn);
            
        }
    }
}

function setHighScores() {

    // TO DO 

    // INSERT THE INITIALS AND SCORE TO LOCAL STORAGE
    console.log("here",document.querySelector("#string-initials").elements[0].value)
    localStorage.setItem('score', score)
    localStorage.setItem('initials', document.querySelector("#string-initials").elements[0].value)
}

function getHighScores()
{
    var initials = localStorage.getItem('initials');
    score = localStorage.getItem('score'); 

    if (initials && score) {
       window.location = "score.html"; 
    }
}


    startEl.addEventListener('click', function() {
        let countDownTimerID = setInterval(function() {
            
            if (timeLeft > 0) {
                countDown();
            } else {
                //Timer has ended the game!
                endGame(score, '', 'end game');
                clearInterval(countDownTimerID);
            }
        }, 1000);
    
        printQuestion(questions[currentQuestionindex]);
    });