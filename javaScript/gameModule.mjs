import { 
  GAME_SCREEN_HTML, 
  GAME_OVER_HTML,
  TETROMINO_MATRIX,
  TETROMINO_COLOR,
  TETROMINO_DISPLAY,
  SCORE_TABLE,
  LEVEL_SPEED,
  CELL_SIZE
} from "./constants.js";

// Game variables.
let frameCount;
let gameActive;
let gameArray;

let activeTetromino;
let nextTetromino;

let currentScore;
let currentLevel;
let lineCount;
let rowClearCount;

// Canvas elements.
let canvas;
let ctx;
let displayCanvas;
let dtx;

// DOM elements.
let screenContents;
let scoreDisplay;
let lineDisplay;
let levelDisplay;
let gameDisplay;
let controlButtons;

// All required steps to start a game instance from main.js.
export function startGame (level) {

  // Add game html to screen.
  screenContents = document.getElementById("screen-contents");
  screenContents.innerHTML = GAME_SCREEN_HTML;

  // Initialize HTML canvas elements.
  canvas = document.getElementById("game-screen");
  ctx = canvas.getContext('2d');

  displayCanvas = document.getElementById("next-piece-canvas");
  dtx = displayCanvas.getContext('2d');

  // Populate initial game array.
  gameArray = [];

  for (let row = -2; row < 20; row++) {
    gameArray[row] = [];
  
    for (let column = 0; column < 10; column++) {
      if (row >= 19 && column < 9) {
        gameArray[row][column] = "I";
      }
      else {
        gameArray[row][column] = 0;
      }
    }
  }

  // Fetch initial active / next tetrominos.
  fetchTetromino();

  // Add values to initialized variables.
  currentScore = lineCount = rowClearCount = frameCount = 0;
  currentLevel = level;

  // Select HTML elements.
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
  gameActive = requestAnimationFrame(gameLoop);
}

// Generate next tetromino with slight bias against choosing activeTetromino consecutively (NES Tetris randomizer).
function generateTetromino(savedTetromino) {

  function rollDie(max) {
    return Math.floor(Math.random() * max);
  }

  let selected = null;
  const names = ['I','J', 'L','O','S','T','Z'];

  if (!savedTetromino) {
    selected = names[rollDie(7)];

    return {
      name : selected,
      matrix : TETROMINO_MATRIX[selected],
      col : selected === "I" ? 3 : 4,
      row : selected === "I" ? -1 : -2
    }
  }

  else {
    let roll = rollDie(7);

    // If 8 or index of previous tetromino is rolled, re-roll!
    if (roll === 7 || roll === names.indexOf(savedTetromino.name)) { 
      roll = rollDie(6);
    }

    selected = names[roll];
  }

  return {
    name : selected,
    matrix : TETROMINO_MATRIX[selected],
    col : selected === "I" ? 3 : 4,
    row : selected === "I" ? -1 : -2
  }


}

// Fetch a tetromino.
function fetchTetromino() {

  // On game start.
  if (!activeTetromino) {
    activeTetromino = generateTetromino();
    nextTetromino = generateTetromino();
  } 

  else {
    let savedTetromino = activeTetromino;
    activeTetromino = nextTetromino;
    nextTetromino = generateTetromino(savedTetromino);
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

// Rotate tetromino matrix 90 degress counterclockwise.
function rotateMatrix90DegCounterClockWise(matrix) {
  const N = matrix.length - 1;

  const result = matrix.map((row, i) =>
    row.map((val, j) => matrix[j][N - i])
  );

  return result;
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

  // Place tetromino.
  for (let i = 0; i < activeTetromino.matrix.length; i++) {
    for (let j = 0; j < activeTetromino.matrix[i].length; j++) {

      // If exists, update gameArray.
      if (activeTetromino.matrix[i][j]) {
        gameArray[activeTetromino.row + i][activeTetromino.col + j] = activeTetromino.name;  

        // Check for game ending condition.
        if (activeTetromino.row <= 0) {
          gameOver();
        }

          // Clear rows that are full after placement.
        for (let row = gameArray.length - 1; row >= 0; row--) {
          if (gameArray[row].every(cell => !!cell)) {
            rowClearCount ++;

            // Update the gameArray with cleared row.
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
  dtx.clearRect(0, 0, 50, 50);

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
      }
      ctx.fillRect(column * CELL_SIZE, row * CELL_SIZE, CELL_SIZE - 1, CELL_SIZE - 1);
    }
  }

  // Draw the next piece preview.
  dtx.clearRect(0, 0, 50, 50);
  TETROMINO_DISPLAY[nextTetromino.name].forEach((element) => {
    dtx.fillRect(element[0], element[1], element[2], element[3]);
    dtx.fillStyle = TETROMINO_COLOR[nextTetromino.name];
  })

  // Move / place activeTetromino.
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
      fetchTetromino();
    }
  }

  // Draw activeTetromino to canvas.
  for (let row = 0; row < activeTetromino.matrix.length; row++) {
    for (let col = 0; col < activeTetromino.matrix[row].length; col++) {
      if (activeTetromino.matrix[row][col]) {
        ctx.fillStyle = TETROMINO_COLOR[activeTetromino.name];
        ctx.fillRect((activeTetromino.col + col) * CELL_SIZE, (activeTetromino.row + row) * CELL_SIZE, CELL_SIZE - 1, CELL_SIZE - 1);
      }
    }
  }
}

// TODO: Handle multiple key presses.

// Add key and button event listeners.
function createEventListeners () {

  // TODO: only fire if not mobile or tablet.
  document.addEventListener("keydown", handleEvent, false);

  // Add button events.
  controlButtons.forEach(function (i) { 
    i.addEventListener("click", (e) => {
      handleEvent(e);
    })
  }, false);
}

// Event listener callback function.
function handleEvent(e) {
  let code = e.target.id || e.key;

  // Rotate tetromino 90 deg clockwise.
  if (code === "ArrowUp" || code === "A") {
    let matrix = rotateMatrix90Deg(activeTetromino.matrix);
    const valid = checkValidMove(matrix, activeTetromino.col, activeTetromino.row);

    if (valid) {
      activeTetromino.matrix = matrix;
    } 

    // Edge cases: rotating other tetrominos while some of the matrix is out of bounds.
    else if (activeTetromino.col === 8) {
      activeTetromino.name === "I" ? activeTetromino.col -= 2 : activeTetromino.col--;
      activeTetromino.matrix = matrix;
    }

    else if (activeTetromino.col === -1) {
      activeTetromino.col++;
      activeTetromino.matrix = matrix;
    }

    // 'I' shape specific edge cases.
    else if (activeTetromino.col === 7) {
      activeTetromino.col--;
      activeTetromino.matrix = matrix;
    }

    else if (activeTetromino.col === -2) {
      activeTetromino.col += 2;
      activeTetromino.matrix = matrix;
    }
  }

  // Rotate tetromino 90 deg counterclockwise.
  if (code === "z" || code === "B") {
    let matrix = rotateMatrix90DegCounterClockWise(activeTetromino.matrix);
    const valid = checkValidMove(matrix, activeTetromino.col, activeTetromino.row);

    if (valid) {
      activeTetromino.matrix = matrix;
    } 

    // Edge cases: rotating other tetrominos while some of the matrix is out of bounds.
    else if (activeTetromino.col === 8) {
      activeTetromino.name === "I" ? activeTetromino.col -= 2 : activeTetromino.col--;
      activeTetromino.matrix = matrix;
    }
    else if (activeTetromino.col === -1) {
      activeTetromino.col++;
      activeTetromino.matrix = matrix;
    }

    // 'I' shape specific edge cases.
    else if (activeTetromino.col === 7) {
      activeTetromino.col--;
      activeTetromino.matrix = matrix;
    }
    else if (activeTetromino.col === -2) {
      activeTetromino.col += 2;
      activeTetromino.matrix = matrix;
    }
  }
 
  // Shift tetromino right one cell.
  if (code === "ArrowRight") {
    let incrementedColumn = activeTetromino.col + 1;
    
    const valid = checkValidMove(activeTetromino.matrix, incrementedColumn, activeTetromino.row);
    if (valid) {
      activeTetromino.col++;
    }
  }

  // Shift tetromino left one cell.
  if (code == "ArrowLeft" ) {
    let incrementedColumn = activeTetromino.col - 1;
    const valid = checkValidMove(activeTetromino.matrix, incrementedColumn, activeTetromino.row);

    if (valid) {
      activeTetromino.col--;
    }
  }

  // Drop tetromino one cell.
  if (code === "ArrowDown") {
    let incrementedRow = activeTetromino.row + 1;
    const valid = checkValidMove(activeTetromino.matrix, activeTetromino.col, incrementedRow);

    if (!valid) {
      activeTetromino.row = incrementedRow - 1;
      // placeTetromino(activeTetromino);
    } 

    else {
      currentScore++;
      scoreDisplay.innerHTML = currentScore;
      activeTetromino.row ++;
    }
  }
}