/* ---------- 
Variables 
---------- */

const $instructionsBtn             = $("#button-instructions");
const $instructionsPopup           = $("#instructions-popup");
const $startGameBtn                = $("#button-start-game");
const $closeInstructionsPopupIcon  = $("#icon-close-instructions");
const $resultsPopup                = $("#results-popup");
const $resultsDisplay              = $("#popup-display");
const $playAgainBtn                = $("#button-play-again");

let popupTimeoutHandler;
let popupAnimationHandler;
const popupDelay = 500;

let opacity      = 0;
const opacityMin = 0;
const opacityMax = 1;

let gameStarted = false;

/* ---------- 
Function calls 
---------- */

// set up 0.5s delay and fade-in animation for instructions popup
popupTimeoutHandler = setTimeout(function(){
    popupAnimationHandler = requestAnimationFrame(instructionsFadeIn);
}, popupDelay);

// open the popup when instructions button is clicked
$instructionsBtn.click(function(){
    popupAnimationHandler = requestAnimationFrame(instructionsFadeIn);
});

// close the instructions popup 
$startGameBtn.click(closeInstructions);
$closeInstructionsPopupIcon.click(closeInstructions);

// close the results popup
$playAgainBtn.click(closeResults);

/* ---------- 
Functions 
---------- */

function instructionsFadeIn(){
    // set default background color
    $(".section-popup").css("background-color", "#94463a");

    // set to visible first (at 0 opacity)
    $instructionsPopup.css("visibility", "visible");

    // if game has already started, hide the start game button
    if(gameStarted){
        $startGameBtn.css("display", "none");
    }

    // increase opacity to 1
    if(opacity < opacityMax){
        opacity += 1/30;
        $instructionsPopup.css("opacity", opacity);
        popupAnimationHandler = requestAnimationFrame(instructionsFadeIn);
    }
    else{
        cancelAnimationFrame(popupAnimationHandler);
    }
}

function closeInstructions(){
    // decrease opacity to 0 and hide
    $instructionsPopup.css({
        "opacity": opacityMin,
        "visibility": "hidden"
    });
    opacity = opacityMin;

    // when closing instructions, if game hasn't started it should start
    if(!gameStarted){
        gameStarted = true;
        fetchWord();
    }
}

function resultsFadeIn(){
    // set background color according to win/lose result
    if(success){
        $(".section-popup").css("background-color", "#80b64e");
        $resultsDisplay.html(`<h2>Congratulations ☺</h2>
            <p style="text-align:center">You won! The word was "<strong>${currentWord}</strong>". Let's try another round!</p>`);
    }
    else{
        $(".section-popup").css("background-color", "#f44336");
        $resultsDisplay.html(`<h2>Sorry ☹</h2>
            <p style="text-align:center">You lost. The word was "<strong>${currentWord}</strong>". Better luck next time!</p>`);
    }

    // set to visible first (at 0 opacity)
    $resultsPopup.css("visibility", "visible");

    // increase opacity to 1
    if(opacity < opacityMax){
        opacity += 1/30;
        $resultsPopup.css("opacity", opacity);
        popupAnimationHandler = requestAnimationFrame(resultsFadeIn);
    }
    else{
        cancelAnimationFrame(popupAnimationHandler);
    }
}

function closeResults(){
    // decrease opacity to 0 and hide
    $resultsPopup.css({
        "opacity": opacityMin,
        "visibility": "hidden"
    });

    // reset variables and displays for new game
    $(".keyboard-letter").css({
        "background-color": "transparent",
        "border-color": "#94463a",
        "cursor": "pointer",
        "pointer-events": "auto"
    });
    $hangmanImg.attr("src", "images/hangman/0.jpg");
    $noticeBox.css("display", "none");
    opacity = opacityMin;
    wrongLetterCounter = 0;
    correctLetterCounter = 0;
    currentWord = "";

    // start new game
    gameStarted = true;
    fetchWord();
}