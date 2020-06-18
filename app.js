/** @format */

////////////////////////////////////////////////////////////////////////////////
// Declaring, Identifying and initializing variables
////////////////////////////////////////////////////////////////////////////////
// UI variables
const minNum_EL = document.querySelector('#min-num'),
  maxNum_EL = document.querySelector('#max-num'),
  numberInput_EL = document.querySelector('#number-input'),
  guessBtn_EL = document.querySelector('#guess-btn'),
  message_EL = document.querySelector('#message'),
  gameDiv_EL = document.querySelector('.game'),
  feedback_EL = document.querySelector('#feedback');
// Game variables
let minNum = 1,
  maxNum = 10,
  numbOfTries = 3,
  numberToGuess = randomNumber(minNum, maxNum),
  guess;
// UI variable initialization
minNum_EL.textContent = minNum;
maxNum_EL.textContent = maxNum;

////////////////////////////////////////////////////////////////////////////////
// Event Listeners
////////////////////////////////////////////////////////////////////////////////
// Play again
gameDiv_EL.addEventListener('mousedown', function (e) {
  if (e.target.className === 'button-primary') {
    window.location.reload();
  }
});
// Runs a guess
guessBtn_EL.addEventListener('click', runGuess);

////////////////////////////////////////////////////////////////////////////////
// Functions
////////////////////////////////////////////////////////////////////////////////
function runGuess() {
  guess = parseInt(numberInput_EL.value);
  // Input validation
  if (isNaN(guess) || guess < minNum || guess > maxNum) {
    message(
      `Please enter a valid number between ${minNum} to ${maxNum}`,
      false,
      'black'
    );
  } else {
    //Notify of win, lose or hint
    numbOfTries--;
    if (guess === numberToGuess) {
      message(`Congratulations, YOU WIN`, true, 'green');
    } else if (numbOfTries === 0) {
      message(`YOU LOSE, Correct number was ${numberToGuess}`, true, 'blue');
    } else {
      let hint = getHint(guess);
      message(`Your guess is ${hint.hint}`, false, hint.color);
      numberInput_EL.value = '';
    }

    //hold the previous guess entered
    feedback_EL.textContent += guess + ' ';
  }
}

function message(msg, playAgain, color) {
  if (playAgain) {
    guessBtn_EL.value = 'Play again';
    guessBtn_EL.removeEventListener('click', runGuess);
    guessBtn_EL.className = 'button-primary';
    numberInput_EL.disabled = 'true';
    numberInput_EL.style.backgroundColor = '#F0F0F0';
  }
  numberInput_EL.style.borderColor = color;
  message_EL.textContent = msg;
  message_EL.style.color = color;
}

// Returns how close the guess is to numberToGuess
function getHint(guess) {
  let hint, color;

  if (guess + 1 === numberToGuess || guess - 1 === numberToGuess) {
    color = 'red';
    hint = 'Hot';
  } else if (guess + 2 === numberToGuess || guess - 2 === numberToGuess) {
    color = 'orange';
    hint = 'Warm';
  } else {
    color = 'blue';
    hint = 'Cold';
  }
  return {
    hint,
    color,
  };
}

// Generates a random number between min and max
function randomNumber(minNum, maxNum) {
  return Math.floor(Math.random() * (maxNum - minNum + 1)) + minNum;
}
