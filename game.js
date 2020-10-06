// Dependencies (prob drag library)

// Define global variables
const numOfLetters = 10; // How many letters to give the player
const letterSelection = []; // empy selection array, gets defined in function
let i = 0; // Iterator for loop to select letters
const timeAllowed = 106; // How long the player has (controls )
let timeBgColour = timeAllowed; // Drives the timer BG colour - see https://mothereffinghsl.com/
let score = 0; // Set the starting score to 0

const display = document.querySelector('#time');
const pickLettersDiv = document.getElementById('pickLettersDiv');
const drawLetterButton = document.querySelector('#pickLetterButton'); // The "Draw letters buttom"
const resultsDiv = document.getElementById('results'); // The box you drag in to
const changeLetterButton = document.getElementById('redrawButton'); // The link to get new letters

// Pick an individual letter. Probablity based on frequency of letter in English.
function pickLetter() {
  const alphabetPos = Math.ceil(Math.random() * 100);
  let letter = 'E';
  switch (true) {
    case alphabetPos < 8:
      letter = 'A';
      break;
    case alphabetPos < 10:
      letter = 'B';
      break;
    case alphabetPos < 15:
      letter = 'C';
      break;
    case alphabetPos < 18:
      letter = 'D';
      break;
    case alphabetPos < 29:
      letter = 'E';
      break;
    case alphabetPos < 31:
      letter = 'F';
      break;
    case alphabetPos < 33:
      letter = 'G';
      break;
    case alphabetPos < 36:
      letter = 'H';
      break;
    case alphabetPos < 44:
      letter = 'I';
      break;
    case alphabetPos < 45:
      letter = 'J';
      break;
    case alphabetPos < 46:
      letter = 'K';
      break;
    case alphabetPos < 51:
      letter = 'L';
      break;
    case alphabetPos < 54:
      letter = 'M';
      break;
    case alphabetPos < 61:
      letter = 'N';
      break;
    case alphabetPos < 68:
      letter = 'O';
      break;
    case alphabetPos < 71:
      letter = 'P';
      break;
    case alphabetPos < 72:
      letter = 'Q';
      break;
    case alphabetPos < 79:
      letter = 'R';
      break;
    case alphabetPos < 84:
      letter = 'S';
      break;
    case alphabetPos < 91:
      letter = 'T';
      break;
    case alphabetPos < 95:
      letter = 'U';
      break;
    case alphabetPos < 96:
      letter = 'V';
      break;
    case alphabetPos < 97:
      letter = 'W';
      break;
    case alphabetPos < 98:
      letter = 'X';
      break;
    case alphabetPos < 99:
      letter = 'Y';
      break;
    default:
      letter = 'Z';
      break;
  }
  letterSelection.push(letter);

  const newTile = document.createElement('DIV'); // Create a div for the new tile
  newTile.id = `${letter}`; // Give the new div a unique ID
  newTile.className = 'tile'; // Give the new div a class of tile
  newTile.draggable = 'true'; // Add the 'draggable=true' attribute
  newTile.setAttribute('ondragstart', 'drag(event)'); // Add ondragstart="drag(event)
  newTile.innerHTML += letter; // Add the letter in to the tile

  pickLettersDiv.appendChild(newTile); // Add the tile in to the row of letters

  return letterSelection;
}

// Make the letters draggable
function allowDrop(ev) {
  ev.preventDefault();
}

function drag(ev) {
  ev.dataTransfer.setData('text', ev.target.id);
}

function drop(ev) {
  ev.preventDefault();
  const data = ev.dataTransfer.getData('text');
  ev.target.appendChild(document.getElementById(data));
  scoring(); // This function counts the divs in the 'results' div
}

// Loop through lettersArray and present results on screen - called by startGame & newLetters functions
function pickLetters() {
  while (i < numOfLetters) {
    pickLetter();
    i++;
  }
}

// Start the timer - called by startGame function
function startTimer(duration, display) {
  let timer = duration;
  let minutes;
  let seconds;
  display = document.querySelector('#time');

  setInterval(function () {
    minutes = parseInt(timer / 60, 10);
    seconds = parseInt(timer % 60, 10);

    minutes = minutes < 10 ? `0${minutes}` : minutes;
    seconds = seconds < 10 ? `0${seconds}` : seconds;

    display.style.backgroundColor = `hsl(${timeBgColour}, 75%, 50%)`;
    display.textContent = `${minutes}:${seconds}`;

    timeBgColour -= 1;

    if (--timer < 0) {
      timer = 0;
    }
  }, 1000);
}

// Starts the game
function startGame() {
  pickLetters(); // pick the letters
  startTimer(timeAllowed, display); // Start the timer
}

// Reset the letters but keep the timer going
function newLetters() {
  i = 0;
  pickLettersDiv.innerHTML = ``; // Clears the drawn letters
  resultsDiv.innerHTML = ``; // Clears the played letters
  letterSelection.length = 0; // Clears the array
  pickLetters(); // Reruns the pick letters array
}

// Calculate & update the score
function scoring() {
  const scoreP = document.getElementById('scoreP');
  score = resultsDiv.getElementsByTagName('div').length; // Count the number of divs (tiles) in the results div
  scoreP.innerHTML = `Score: ${score}`;
}

// Get the word the player formed as a string - WIP
function endWord() {
  const letterDiv = resultsDiv.getElementsByTagName('div').length;
}

drawLetterButton.addEventListener('click', startGame); // Button that starts the game (adds letters and starts timer)

changeLetterButton.addEventListener('click', newLetters); // Button that adds letters but doens't restart the timer
