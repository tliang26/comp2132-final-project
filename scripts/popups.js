const $instructionsBtn             = $("#button-instructions");
const $instructionsPopup           = $("#instructions-popup");
const $startGameBtn                = $("#button-start-game");
const $closeInstructionsPopupIcon  = $("#icon-close-instructions");
const $resultsPopup                = $("#results-popup");
const $playAgainBtn                = $("#button-play-again");

let popupTimeoutHandler;
let popupAnimationHandler;
const popupDelay = 500;

let opacity      = 0;
const opacityMin = 0;
const opacityMax = 1;

let gameStarted = false;

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
    $instructionsPopup.css({
        "opacity": opacityMin,
        "visibility": "hidden"
    });
    opacity = opacityMin;

    if(!gameStarted){
        gameStarted = true;
        fetchWord();
    }
}

function resultsFadeIn(success){
    if(success){

    }
    else{
        
    }

    $resultsPopup.css("visibility", "visible");

    if(opacity < opacityMax){
        opacity += 1/30;
        $resultsPopup.css("opacity", opacity);
        popupAnimationHandler = requestAnimationFrame(resultsFadeIn(success));
    }
    else{
        cancelAnimationFrame(popupAnimationHandler);
    }
}

function closeResults(){
    $resultsPopup.css({
        "opacity": opacityMin,
        "visibility": "hidden"
    });

    // reset variables and displays for new game
    $keyboardLetters.css({
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

    gameStarted = true;
    fetchWord();
}