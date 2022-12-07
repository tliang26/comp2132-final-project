const keyboardSection = document.getElementById("container-keys");

class Letter{
    constructor(upper, lower){
        this.upper = upper;
        this.lower = lower;
    }
}

class LetterKey{
    constructor(){
        this.letterUpper = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
        this.letterLower = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "d", "t", "u", "v", "w", "x", "y", "z"];

        this.keys = [];

        for(let i = 0; i < this.letterUpper.length; i++){
            let singleKey = new Letter(this.letterUpper[i], this.letterLower[i]);
            this.keys.push(singleKey);
        }
    }
}

// create and append the article elements that are the keys
LetterKey.prototype.addKeys = function(){
    for(let i = 0; i < this.keys.length; i++){
        let singleLetter = document.createElement("article");
        singleLetter.classList.add("keyboard-letter");
        singleLetter.innerText = `${this.keys[i].upper}`;
        keyboardSection.appendChild(singleLetter);
    }
}

const keyboard = new LetterKey();
keyboard.addKeys();