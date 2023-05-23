import { 
  GAME_SCREEN_HTML, 
  TETROMINOS,
  TETROMINO_COLOR,
  SCORE_TABLE,
  LEVEL_SPEED,
  CELL_SIZE
} from "./constants.js";

// Game variables.
let frameCount;
let activeTetromino;
let nextTetromino;
let gameActive;
let gameIsOver;

let currentScore;
let currentLevel;
let lineCount;
let rowClearCount;

let scoreDisplay;
let lineDisplay;
let levelDisplay;
let gameDisplay;
let controlButtons;


// All required steps to start a game instance.
export function startGame () {

  // Add game html to screen.
  const screenContents = document.getElementById("screen-contents");
  screenContents.innerHTML = GAME_SCREEN_HTML;

  // Initialize HTML canvas.
  const canvas = document.getElementById("game-screen");
  const ctx = canvas.getContext('2d');

  // Add values to initialized variables.
  currentScore = lineCount = rowClearCount = 0;
  currentLevel = 1;

  // Select needed HTML elements.
  scoreDisplay = document.getElementById("score-display");
  scoreDisplay.innerHTML = currentScore;

  lineDisplay = document.getElementById("line-count");
  lineDisplay.innerHTML = lineCount;

  levelDisplay = document.getElementById('level-count');
  levelDisplay.innerHTML = currentLevel;

  gameDisplay = document.getElementById('game-display');
  controlButtons = document.querySelectorAll("button.control-input");

  createEventListeners();
}



// Add key and button event listeners.
function createEventListeners () {

  // TODO: only fire if not mobile or tablet.
  document.addEventListener("keydown", (e) => {
    handleEvent(e);
  }, false);

  // Add button events.
  controlButtons.forEach(function (i) { 
    i.addEventListener("click", (e) => {
      handleEvent(e);
    })
  }, false);
}

// Event listener callback function.
function handleEvent(e) {
  console.log(`this will be an event some day.`);
}