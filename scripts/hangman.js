/* ---------- 
Variables 
---------- */

const displayLettersSection = document.getElementById("section-letters");
const blanksSection         = document.getElementById("container-blanks");
const hintSection           = document.getElementById("container-hint");
const $noticeBox            = $("#container-warning");
const $hangmanImg           = $("#img-hangman");
let $currentLetter;

const apiURL             = "https://www.wordgamedb.com/api/v1/words/random";
const minNumOfLetters    = 5;
const maxWrongAttempts   = 6;
let currentWord          = '';
let wrongLetterCounter   = 0;
let correctLetterCounter = 0;
let letterMatched        = false;
let success              = false;

/* ---------- 
Function calls 
---------- */

// when user clicks on any one of the keyboard letters
$(".keyboard-letter").click(clickKeyboardLetter);

/* ---------- 
Functions 
---------- */

function clickKeyboardLetter(){
    // testing if the letter is read correctly
    console.log(`${$(this).text().toLowerCase()}`);

    // grey out key
    $(this).css({
        "background-color": "#918c90",
        "border-color": "#918c90",
        "cursor": "not-allowed",
        "pointer-events": "none"
    });

    // set matched letter flag to default false
    letterMatched = false;

    // loop through each letter of the word to see if clicked key matches
    for(let i = 1; i <= currentWord.length; i++){
        // get the correct blank spot
        $currentLetter = $(`.article-blanks:nth-of-type(${i})`);

        // if the clicked key matches the current letter of the current word
        if($(this).text().toLowerCase() == currentWord[i-1]){
            console.log("matched");
            letterMatched = true;
            correctLetterCounter++;

            $currentLetter.text(`${currentWord[i-1].toUpperCase()}`);
            $noticeBox.css({"background-color": "#80b64e",
                            "display": "block"})
                      .html(`<p>Yes, this letter is in the word! You have ${maxWrongAttempts-wrongLetterCounter}/${maxWrongAttempts} incorrect chances left.</p>`);

            // if the clicked key is the last letter needed to finish the word
            if(correctLetterCounter == currentWord.length){
                success = true;
                popupAnimationHandler = requestAnimationFrame(resultsFadeIn);
                return;
            }
        }
    }

    // if the clicked key did not match any letter of the current word
    if(!letterMatched){
        wrongLetterCounter++;
        $noticeBox.css({"background-color": "#f44336",
                        "display": "block"})
                  .html(`<p>Uh oh! You have ${maxWrongAttempts-wrongLetterCounter}/${maxWrongAttempts} incorrect chances left.</p>`);
        $hangmanImg.attr("src", `images/hangman/${wrongLetterCounter}.jpg`);
    }

    // if the available attempts run out
    if(wrongLetterCounter == (maxWrongAttempts)){
        success = false;
        popupAnimationHandler = requestAnimationFrame(resultsFadeIn);
        return;
    }
}

function fetchWord(){
    fetch(apiURL)
        .then(function(response){
            if(response.ok){
                return response.json();
            }
        })
        .then(function(data){
            // only display blanks for words longer than 4 letters
            if(data.numLetters >= minNumOfLetters){
                console.log(`${data.word}, ${data.numLetters} letters long`);

                // clear section from previous game
                blanksSection.innerHTML = "";

                for(let i = 0; i < data.numLetters; i++){
                    // create an article element with the blank letter style
                    let blankLetter = document.createElement("article");
                    blankLetter.classList.add("article-blanks");
                    blankLetter.innerHTML = "";

                    // append article element as a child to the parent container
                    blanksSection.appendChild(blankLetter);

                    console.log(`${i+1}, done`);
                }

                // display hint, save word
                hintSection.innerHTML = `<p>Category hint: ${data.category}</p>`;
                currentWord = data.word;
            }
            // else fetch another word until it meets the min letter requirement
            else{
                console.log(`${data.word}, not enough letters`);
                fetchWord();
            }
        })
        .catch(function(){
            console.log("Fetch failed.");
        });
}