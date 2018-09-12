// Creates an array that lists out all of the possible cities
// Note that there is expected to be a one-to-one correspondence bewtween each
// city and an image of that city in the assests/images folder. If the city is
// Los Angeles the associated image must be named LosAngeles.jpeg. 
var cities = ["London", "Paris", "Rome", "Berlin", "New York", "Los Angeles", "Hong Kong", "Tokyo", "Shanghai", "Bangkok", "Sydney", "Dubai"];
var numberOfGuessesRemaining = 15;
var lettersGuessed = [];
var wins = 0;
var chosenCity = cities[Math.floor(Math.random() * cities.length)];
var imagename = "assets/images/globe_flags.png";
var city_image = document.getElementById("citypic");
city_image.setAttribute("src", imagename);
console.log("Chosen city = " + chosenCity);
document.getElementById("city_result").textContent = "Guess the city!!!";
var audio = new Audio("");


// Build the underscore string
document.getElementById("underscores").innerHTML = generateUnderscoreString(chosenCity, lettersGuessed);

// Event handler for key release
document.onkeyup = function(event) {

    if (numberOfGuessesRemaining > 0) {
        var userGuess = event.key;
        if (isLetter(userGuess)) {
            numberOfGuessesRemaining--;
            document.getElementById("guesses_remaining").textContent = numberOfGuessesRemaining;
            if (!lettersGuessed.includes(userGuess.toUpperCase())) lettersGuessed.push(userGuess.toUpperCase());
            document.getElementById("underscores").textContent = generateUnderscoreString(chosenCity, lettersGuessed);
            document.getElementById("lettersUsed").textContent = lettersGuessed;
            if (!document.getElementById("underscores").textContent.includes("_ ")) {
                setImage(chosenCity); // show city whether win or lose   
                setAudio(chosenCity);
                document.getElementById("city_result").textContent = "YOU WIN!!! The answer was:  " + chosenCity;
                wins++;
                cities.splice(cities.indexOf(chosenCity), 1);
                if (cities.length == 0) finishGame();
                resetValues();
            }
        }
    } else {
        document.getElementById("city_result").textContent = "YOU LOSE!!! The answer was: " + chosenCity;
        setImage(chosenCity); // show city whether win or lose
        resetValues();
    } 
}

// generateUnderscoresString generates the blank string with one underscore per letter
// and a blank space for a blank space. There is also one space added between each
// underscore for readability.
function generateUnderscoreString(chosenWord, lettersGuessed) {
    var underscoreString = "";
    for (var i = 0;i < chosenWord.length;i++) {
        if (lettersGuessed.includes(chosenWord[i].toUpperCase())) {
            underscoreString = underscoreString + chosenWord[i].toUpperCase() + " ";
        }
        else if (chosenWord[i] == " ")underscoreString = underscoreString + "  ";
        else underscoreString = underscoreString + "_ ";
    }
    var wordElement = document.getElementById("underscores");
    wordElement.innerHTML = underscoreString;
    return underscoreString;
}

// Displays an image in the citypic element. The filename is the city name with
// all spaces removed and .jpeg added to end. There is expected to be a one-to-one
// correspondence between all cities in the list and image files present in the 
// assets/images folder.
function setImage(cityName) {
    var imagename = "assets/images/" + cityName.replace(/ /g,'') + ".jpeg";
    var city_image = document.getElementById("citypic").setAttribute("src", imagename);
}

function setAudio(cityName) { 
    if (!audio.paused) audio.pause();
    var audiofile = "assets/mp3/" + cityName.replace(/ /g,'') + ".mp3";
    audio.setAttribute("src", audiofile);
    audio.play();
    setTimeout(function() { 
        audio.pause(); 
        document.getElementById("city_result").textContent = "Guess another city!!!";
        document.getElementById("citypic").setAttribute("src", imagename);
    }, 15000);
}

// This function resets the values after a city has been completed. It selects a new city
// and puts the new city's underscores up. It clears out the list of guessed letters
// and resets the number of guesses remaining to 15. 
function resetValues() {
    numberOfGuessesRemaining = 15;
    chosenCity = cities[Math.floor(Math.random() * cities.length)];
    lettersGuessed = [];
    document.getElementById("underscores").innerText = generateUnderscoreString(chosenCity, lettersGuessed);
    document.getElementById("wins").innerText = wins;
    document.getElementById("lettersUsed").innerText = lettersGuessed;
    document.getElementById("guesses_remaining").innerText = numberOfGuessesRemaining;
}

// After the entire list of cities has been exhaused, the game is over and this function
// displays text saying the game is over.
function finishGame() {
    document.getElementById("underscores").innerHTML = "<h1>Congratulations!</h1> <p>You have completed all cities.</p>"; 
}

// Uses regular expression to determine if the key entered is a letter.
// It must be only one character long and not be a number or meta key.
function isLetter(str) {
    return str.length === 1 && str.match(/[a-z]/i);
}