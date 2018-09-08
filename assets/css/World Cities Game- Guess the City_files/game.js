// Creates an array that lists out all of the possible cities
var cities = ["London", "Paris", "Rome", "Berlin", "New York", "Los Angeles", "Hong Kong", "Tokyo", "Shanghai", "Bangkok", "Sydney", "Dubai"];
var numberOfGuessesRemaining = 15;
var lettersGuessed = [];

var chosenCity = cities[Math.floor(Math.random() * cities.length)];
var imagename = chosenCity.replace(/ /g,'') + ".jpeg";
var city_image = document.getElementById("berlin");
city_image.style.display == "none";
console.log(city_image);

//var chosenCity = cities[4];
console.log("Chosen city = " + chosenCity + " image file = " + imagename);

// // Build the underscores to display the blank word
// var underscores = "";
// for (var i = 0;i < chosenCity.length;i++) {
//     if (chosenCity[i] === " ") underscores = underscores + " ";
//     else underscores = underscores + "_ ";
// }
// underscores.trim(underscores.length -1);

var wordElement = document.getElementById("underscores");
wordElement.innerHTML = generateUnderscoreString(chosenCity, lettersGuessed);

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
            document.getElementById("underscores").innerHTML = " YOU WIN!!!!<br>" + chosenCity;
            city_image.style.display == "block";
            var imagename = chosenCity.replace(/ /g,'') + ".jpeg";
            console.log(imagename);
        }
    } else {
        document.getElementById("underscores").innerText = "You lose!!! The answer was: " + chosenCity;
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