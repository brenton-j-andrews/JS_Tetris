import { 
  GAME_SCREEN_HTML, 
  GAME_OVER_HTML,
  TETROMINOS,
  TETROMINO_COLOR,
  SCORE_TABLE,
  LEVEL_SPEED,
  CELL_SIZE
} from "./constants.js";

// Game variables.
let frameCount;
let activeTetromino;
let gameActive;
let gameArray;

let currentScore;
let currentLevel;
let lineCount;
let rowClearCount;

// Canvas elements.
let canvas;
let ctx;

// DOM elements.
let screenContents;
let scoreDisplay;
let lineDisplay;
let levelDisplay;
let gameDisplay;
let controlButtons;


// All required steps to start a game instance from main.js.
export function startGame () {

  // Add game html to screen.
  screenContents = document.getElementById("screen-contents");
  screenContents.innerHTML = GAME_SCREEN_HTML;

  // Initialize HTML canvas.
  canvas = document.getElementById("game-screen");
  ctx = canvas.getContext('2d');

  // Populate initial game array.
  gameArray = [];

  for (let row = -5; row < 20; row++) {
    gameArray[row] = [];
  
    for (let element = 0; element < 10; element++) {
      gameArray[row][element] = 0;
    }
  }

  // Add values to initialized variables.
  currentScore = lineCount = rowClearCount = frameCount = 0;
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

  // Start game via requestAnimationFrame!
  // gameActive = requestAnimationFrame(gameLoop);
  gameOver();
}

// TODO: Generate a tetromino sequence via 8-bag algorithm (Classic Tetris randomizer).
function generateTetromino() {
  const names = ['I','J', 'L','O','S','T','Z'];
  return names[Math.floor(Math.random() * names.length)];
}

// Fetch a tetromino.
function fetchTetromino() {

  const name = generateTetromino();
  const matrix = TETROMINOS[name];
  let col = matrix.name === 'I' ? 3 : 4;
  let row = matrix.name === 'I' ? -1 : -2;

  return {
    name: name,
    matrix: matrix,
    col: col,
    row: row
  }
}

// Rotate tetromino matrix 90 degrees clockwise.
function rotateMatrix90Deg(matrix) {
  const N = matrix.length - 1;

  const result = matrix.map((row, i) =>
    row.map((val, j) => matrix[N - j][i])
  );

  return result;
}

// TODO: Rotate tetromino matrix 90 degress counterClockWise.
function rotateMatrix90DegCounterClockWise(matrix) {
  console.log(`TODO!!!`);
}

// Check move validity (in bounds and piece collisions). 
function checkValidMove(matrix, incrementedColumn, incrementedRow) {
  for (let row = 0; row < matrix.length; row++) {
    for (let col = 0; col < matrix[row].length; col++) {

      if (matrix[row][col] && (

        // Right wall collision
        (col + incrementedColumn >= 10) ||

        // Left wall collision
        (col + incrementedColumn < 0) ||
        
        // Bottom wall collision.
        (incrementedRow + row >= 20) ||

        // Piece collision.
        (gameArray[incrementedRow + row][incrementedColumn + col])

      )) {
        return false;
      }
    }
  }

  return true;
}

// Update gameArray on tetromino placement.
function placeTetromino(activeTetromino) {
  for (let i = 0; i < activeTetromino.matrix.length; i++) {
    for (let j = 0; j < activeTetromino.matrix[i].length; j++) {

      // If exists, update gameArray.
      if (activeTetromino.matrix[i][j]) {
        gameArray[activeTetromino.row + i][activeTetromino.col + j] = activeTetromino.name;  

        // TODO: Check for game ending condition.
        if (activeTetromino.row <= 0) {
          gameOver();
        }

        // Check if row is full, remove and drop down rows above if so.
        for (let row = gameArray.length - 1; row >= 0; row--) {
          if (gameArray[row].every(item => !!item)) {
            rowClearCount++;
            // Clear row.
            for (let r = row; r >= 0; r--) {
              for (let c = 0; c < gameArray[r].length; c++) {
                gameArray[r][c] = gameArray[r - 1][c];
              }
            }
          }
        }
      }
    }
  }
}

// On loosing the game, exit the game canvas and display game screen.
function gameOver() {
  cancelAnimationFrame(gameActive);
  gameDisplay.innerHTML = GAME_OVER_HTML;

  document.addEventListener("keydown", (e) => {
    if (e.code === "Enter") {;
      location.reload()
    }
  })
}

// Game driver loop.
function gameLoop() {
  gameActive = requestAnimationFrame(gameLoop);
  frameCount++;

  // Draw the current game state.
  for (let row = 0; row < 20; row++) {
    for (let column = 0; column < 10; column++) {
      if (gameArray[row][column]) {
        ctx.fillStyle = TETROMINO_COLOR[gameArray[row][column]];
      } else {
        ctx.fillStyle = "#ffffe4";
        // ctx.fillStyle = "red";
      }
      ctx.fillRect(column * CELL_SIZE, row * CELL_SIZE, CELL_SIZE - 1, CELL_SIZE - 1);
    }
  }

  // If no tetromino, fetch new one.
  if (!activeTetromino) {
    activeTetromino = fetchTetromino();
  }

  // Update canvas with tetromino position.
  if (activeTetromino) {
    if (frameCount > LEVEL_SPEED[currentLevel]) {
      frameCount = 0;
      activeTetromino.row++;

      // If piece is in final position, update gameArray, score and lineCount. Increment level if needed.
      if (!checkValidMove(activeTetromino.matrix, activeTetromino.col, activeTetromino.row)) {
        activeTetromino.row--;
        placeTetromino(activeTetromino);    
        lineCount += rowClearCount;
        lineDisplay.innerText = lineCount;

        // Update the score.
        if (rowClearCount) {
          currentScore += (SCORE_TABLE[rowClearCount] * currentLevel);
          scoreDisplay.innerHTML = currentScore;
        }

        // Increment level, refactor later for different play modes.
        if (lineCount >= (currentLevel) * 10) {
          currentLevel++;
          levelDisplay.innerHTML = currentLevel;
        }

        rowClearCount = 0;
        activeTetromino = fetchTetromino();
      }
    }

    for (let row = 0; row < activeTetromino.matrix.length; row++) {
      for (let col = 0; col < activeTetromino.matrix[row].length; col++) {
        if (activeTetromino.matrix[row][col]) {
          ctx.fillStyle = TETROMINO_COLOR[activeTetromino.name];
          ctx.fillRect((activeTetromino.col + col) * CELL_SIZE, (activeTetromino.row + row) * CELL_SIZE, CELL_SIZE - 1, CELL_SIZE - 1);
        }
      }
    }
  }
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