const lettersSection = document.getElementById("section-letters");

apiURL = "https://www.wordgamedb.com/api/v1/words/random";

function fetchWord(){
    fetch(apiURL)
        .then(function(response){
            if(response.ok){
                return response.json();
            }
        })
        .then(function(data){
            if(data.numLetters >= 4){
                lettersSection.innerHTML += `<p>${data.word}</p>`;
            }
            else{
                lettersSection.innerHTML += `<p>Not enough letters.</p>`;
                fetchWord();
            }
        })
        .catch(function(){
            console.log("Fetch failed.");
        });
}

fetchWord();