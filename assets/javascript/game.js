// Creates an array that lists out all of the possible cities
var cities = ["London", "Paris", "Rome", "Berlin", "New York", "Los Angeles", "Hong Kong", "Tokyo", "Shanghai", "Bangkok", "Sydney", "Dubai"];
var numberOfGuessesRemaining = 15;
var lettersGuessed = [];
var wins = 0;
var chosenCity = cities[Math.floor(Math.random() * cities.length)];
var imagename = "assets/images/globe_flags.png";
var city_image = document.getElementById("citypic");
city_image.setAttribute("src", imagename);

console.log("Chosen city = " + chosenCity);


// Build the underscore string
document.getElementById("underscores").innerHTML = generateUnderscoreString(chosenCity, lettersGuessed);

document.onkeyup = function(event) {

    if (numberOfGuessesRemaining > 0) {
        var userGuess = event.key;
        numberOfGuessesRemaining--;
        document.getElementById("guesses_remaining").innerText = numberOfGuessesRemaining;
        if (!lettersGuessed.includes(userGuess.toUpperCase())) lettersGuessed.push(userGuess.toUpperCase());
        document.getElementById("underscores").innerText = generateUnderscoreString(chosenCity, lettersGuessed);
        document.getElementById("lettersUsed").innerText = lettersGuessed;
        if (!document.getElementById("underscores").innerText.includes("_ ")) {
            console.log("here"); 
            setImage(chosenCity); // show city whether win or lose   
            document.getElementById("city_result").innerText = "YOU WIN!!! The answer was:  " + chosenCity;
            wins++;
            resetValues();
        }
    } else {
        document.getElementById("city_result").innerText = "YOU LOSE!!! The answer was: " + chosenCity;
        setImage(chosenCity); // show city whether win or lose
        resetValues();
    }
   
}


function generateUnderscoreString(chosenWord, lettersGuessed) {
    var underscoreString = "";
    for (var i = 0;i < chosenWord.length;i++) {
        if (lettersGuessed.includes(chosenWord[i].toUpperCase())) {
            underscoreString = underscoreString + chosenWord[i].toUpperCase() + " ";
        }
        else if (chosenWord[i] == " ")underscoreString = underscoreString + " ";
        else underscoreString = underscoreString + "_ ";
    }
    
    var wordElement = document.getElementById("underscores");
    wordElement.innerHTML = underscoreString;
    return underscoreString;

}

function setImage(cityName) {
    var imagename = "assets/images/" + cityName.replace(/ /g,'') + ".jpeg";
    console.log(imagename);
    var city_image = document.getElementById("citypic").setAttribute("src", imagename);
}

function resetValues() {
    numberOfGuessesRemaining = 15;
    chosenCity = cities[Math.floor(Math.random() * cities.length)];
    lettersGuessed = [];
    document.getElementById("underscores").innerHTML = generateUnderscoreString(chosenCity, lettersGuessed);
    document.getElementById("wins").innerText = wins;
    document.getElementById("lettersUsed").innerText = lettersGuessed;
    document.getElementById("guesses_remaining").innerText = numberOfGuessesRemaining;
}