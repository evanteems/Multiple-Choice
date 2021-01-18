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
    { q: "HTML (Hypertext Markup Language)  is the code that is used to structure?", a: "web page content", b: "css", c: "javascript", d: "terminal"},
    { q: "Which one is not a CSS property?", a: "color", b: "font-style", c: "text-align", d: "pizza" },
    { q: "Which language makes the web page interactive?", a: "html", b: "css", c: "javascript", d: "google"  },
    { q: "Which one is not a data type?", a: "inter", b: "string", c:"boolean", d: "color" },
    { q: "Does coding rock?", a: "true", b: "false" }
    
]

// run timer function
function countDown(amount) {
    // check if time left is greater that 0
    // if it is, decrement timeLeft
    // and update countDownEl with new time


    //TAKE THE ARGUMENT PASSED IN AND DECREMENT BY THAT MUCH
    if ( amount > 1 ) {
        timeLeft =  timeLeft - amount;
    } else {
        timeLeft--;
    }
    
    countDownEl.textContent = timeLeft
}

function endGame(score, initials = "", status) {

    if(status === "end game") {

        questionContainerEl.textContent = "Your time is up, but at least you were able to score " + score; 
        endGameArea.style.display = "block";
        questionSpanEl.textContent = "";
        questionContainerEl.textContent = '';

    } else {

    // FUNCTION TO CALL WHEN THE GAME HAS ENDED 
    // EITHER RAN OUT OF TIME OR ALL QUESTIONS ANSWERED

    // UNHIDE THE FORM, TAKE IT FROM DISPLAY NONE, TO DISPLAY BLOCK
    questionSpanEl.textContent = "";
    questionContainerEl.textContent = '';

    questionContainerEl.textContent = "Thank you for playing the Game, your score was " + score;
    
    // MAKE THE END AREA TEXT APPEAR 
    endGameArea.style.display = "block";
    }

}


function printQuestion(questionObj) {

    // PRINT THE QUESTION
    questionSpanEl.textContent = '';
    questionSpanEl.textContent = questionObj.q;

    // PRINT THE ANSWER CHOIES, THIS RESETS THEM TO BLANK PRIOR TO DISPLAYING THEM
    // WHEN APPENDING CHILDREN NEED TO RESET THEM FIRST 
    questionContainerEl.textContent = '';

    // LOOP THROUGH ALL THE ANSWERS TO DISPLAY TO THE USER
    for (answer in questionObj) {
        
        if (answer !== 'q') {
           
            // CREATE A BUTTON FOR EVERY ANSWER 
            let answerBtn = document.createElement('button');
            answerBtn.setAttribute('id', 'answer-id');
            answerBtn.setAttribute('class', 'btn'); 
            answerBtn.textContent = questionObj[answer];

            // WHEN THE USER SELECTS AN ANSWER, CALL THIS FUNCTION TO VALIDATE IF ANSWER IS CORRECT
            answerBtn.onclick = function() {
             
                    // Answers displayed here!
                    if (   
                            answerBtn.textContent === "web page content" || 
                            answerBtn.textContent === "pizza" || 
                            answerBtn.textContent === "javascript" || 
                            answerBtn.textContent === "color" || 
                            answerBtn.textContent === "true" 
                    ) {
                      
                        // INCREMENT THE SCORE BECAUSE THE ANSWER IS CORRECT
                        score++;

                        // MOVE TO THE NEXT QUESTION 
                        currentQuestionindex++;

                        // CHANGE THE TEXT TO SAY CORRECT
                        answerArea.textContent = "CORRECT, Good Job!";

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
                        answerArea.textContent = "WRONG, Sorry bud!";

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
                //GAME TIMER HAS ENDED, CALL THE SAME FUNCTION BUT WITH NEW ARGUMENT
                //THIRD ARGUMENT IS END GAME JUST TO DISTINGUISH BETWEEN NORMAL ENDING AND 
                //TIMEOUT TYPE ENDING
                endGame(score, '', 'end game');
                clearInterval(countDownTimerID);
            }
        }, 1000);
    
        printQuestion(questions[currentQuestionindex]);
    });