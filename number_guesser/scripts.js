function generateRandomNumber() {
// creates random number for the game
  return Math.floor(Math.random() * (max - min)) + min;
}

function setRange() {
// sets range when range button is clicked
  min = parseInt(document.getElementById("minimum").value);
  max = parseInt(document.getElementById("maximum").value);
  answer = generateRandomNumber();
}

function submitGuess() {
  // this function takes guess value and creates variable
  var guess = document.getElementById("guess").value;
  // enables clear button
  enableButton('clear');
  // enables reset button
  enableButton('reset');
  // makes sure guess input is valid
  validateGuess(guess);
}

function validateGuess(guess) {
// this function checks user input and makes sure the input is valid aka a number
  message = document.getElementById("feedback")
  if (isNaN(guess)) {
// checks if input is NOT A NUMBER and tells user to enter a number
    message.innerHTML = "Sorry Your Input Was Invalid Enter A Valid Number";
  } else if (Number(guess) < min || Number(guess) > max) {
// makes sure input is within set range
    message.innerHTML = `Enter A Number Between ${min} & ${max}.`;
  } else {
// if input is valid then the feedback function is called to notify user if they won or if their guess is too high or low
    var feedback = getFeedback(guess);
    message.innerHTML = feedback;
  };
}

function giveFeedback(guess) {
// gives user feedback based on guess input  
  feedback = `Your last guess was`
  if (guess > answer) {
// if the guess is greater than the answer user is notified the guess is too high
    return `${feedback}
      <h2> ${guess} </h2>
      Too High Guess Again!`;
  } else if (guess < answer) {
// if the guess is less than the answer then the user is notified that the guess is too low
    return `${feedback}
        <h2> ${guess} </h2>
        Too Low Guess Again!`;
  } else if (guess == answer) {
// if the guess matches the answer then the win condition function is triggered
    winCondition();
    return `${feedback} <h2> ${guess} </h2> 
      <h3> CORRECT! </h3> 
      You Win! The new range is now ${min} to ${max}.`
      ;
  };
}

function winCondition() {
// increments the min and max after a win 
  min -= 10;
  max += 10;
// resets the minimum and maximum value to the new values
  document.getElementById("minimum").value = min;
// sets new minimum value
  document.getElementById("maximum").value = max;
// sets new maximum value
  answer = generateRandomNumber();
// sets new answer for next game
}

function clearInput() {
// clears input field for guess and disables clear button
  disableButton("clear");
  document.getElementById("guess").value = "";
}

function resetFeedback() {
// clears feedback response and disables reset feedback button
  disableButton("reset")
  document.getElementById("feedback").innerHTML = "";
}

function disableButton(button) {
// disables button when called
  document.getElementById(button).disabled = true;
}

function enableButton(button) {
// enables button 
  document.getElementById(button).disabled = false;
}

function resetGame() {
// resets game
  clearInput();
// clears input fields
  resetFeedback();
// resets feedback
  resetRange();
// resets range
  answer = generateRandomNumber();
// creates new answer
}

function resetRange() {
// resets range and sets values
  min = 0;
  max = 100;
  document.getElementById("minimum").value = min;
  document.getElementById("maximum").value = max;
}

var min = 0;
var max = 100;
var answer = generateRandomNumber();