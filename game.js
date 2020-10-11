// Define global variables
const numOfLetters = 10; // How many letters to give the player
const letterSelection = []; // empy selection array, gets defined in function
let i = 0; // Iterator for loop to select letters
let timeAllowed = 106; // How long the player has (controls )

const pickLettersDiv = document.getElementById('pickLettersDiv');
const drawLetterButton = document.querySelector('#pickLetterButton'); // The "Draw letters buttom"
const resultsDiv = document.getElementById('results'); // The box you drag in to
const changeLetterButton = document.getElementById('redrawButton'); // The link to get new letters
const doneButton = document.getElementById('doneButton'); // The link to get new letters
const newGameButton = document.getElementById('newGameButton'); // The link to get new letters

const scoreP = document.getElementById('scoreP');
const highscoreP = document.getElementById('highscoreP');
const displayTime = document.querySelector('#time');

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
  newTile.innerHTML += letter; // Add the letter in to the tile
  pickLettersDiv.appendChild(newTile); // Add the tile in to the row of letters
  return letterSelection;
}

// // Make the letters draggable (via the Sortable CDN)
new Sortable(pickLettersDiv, {
  group: 'shared', // set both lists to same group
  animation: 150,
});

new Sortable(resultsDiv, {
  group: 'shared',
  animation: 150,
});

// Loop through lettersArray and present results on screen - called by startGame & newLetters functions
function pickLetters() {
  while (i < numOfLetters) {
    pickLetter();
    i++;
  }
}

// Start the timer - called by startGame function
function gameTimer() {
  timeAllowed -= 1;
  displayTime.textContent = `${timeAllowed} seconds`;
  displayTime.style.backgroundColor = `hsl(${timeAllowed}, 75%, 50%)`; // see https://mothereffinghsl.com/
  if (timeAllowed <= 0) {
    timeAllowed = 0;
  }
  return timeAllowed;
}

// Reset the letters but keep the timer going
function newLetters() {
  i = 0;
  pickLettersDiv.innerHTML = ``; // Clears the drawn letters
  resultsDiv.innerHTML = ``; // Clears the played letters
  letterSelection.length = 0; // Clears the array
  pickLetters(); // Reruns the pick letters array
}

// Starts the game
function startGame() {
  pickLetters(); // pick the letters
  const callEverySecond = setInterval(gameTimer, 1000);
  drawLetterButton.style.backgroundColor = '#FFFFFF';
  doneButton.style.backgroundColor = 'lightgreen';
}

// Get the word the player formed as a string - WIP
function endWord() {
  const playedNum = document.getElementById('results').querySelectorAll('.tile')
    .length;
  const finalScore = playedNum * timeAllowed;
  scoreP.innerHTML = `Score: ${finalScore} (${playedNum} letters * ${timeAllowed} seconds remaining) `;
  displayTime.style.display = 'none'; // This is horrible
  if (finalScore > highScore) {
    localStorage.setItem('highscore', finalScore);
    highscoreP.innerHTML = `Highscore: ${finalScore} - a new record!`;
    highscoreP.style.backgroundColor = 'lightgreen';
  }
}

function doneWithGame(playedNum) {
  endWord();
  // clearInterval(callEverySecond); // Meant to stop setInterval, but doesn't work as it can't access the startGame() function.
}

// Get & display current highscore
let highScore = localStorage.getItem('highscore');
if (highScore == null) {
  highScore = 0;
}
highscoreP.innerHTML = `Highscore: ${highScore}`;

// New Game
function newGame() {
  location.reload();
}

// Event listeners on the button
drawLetterButton.addEventListener('click', startGame); // Button that starts the game (adds letters and starts timer)
changeLetterButton.addEventListener('click', newLetters); // Button that adds letters but doens't restart the timer
newGameButton.addEventListener('click', newGame); // Button the user clicks to signal they are done
doneButton.addEventListener('click', doneWithGame); // Button the user clicks to signal they are done
