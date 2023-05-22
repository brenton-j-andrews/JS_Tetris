// Constants.
const TETROMINOS = {
  'I':[
    [0,0,0,0],
    [1,1,1,1],
    [0,0,0,0],
    [0,0,0,0]
  ],

  'J':[
    [1,0,0],
    [1,1,1],
    [0,0,0]
  ],

  'L':[
    [0,0,1],
    [1,1,1],
    [0,0,0]
  ],

  'O':[
    [1,1],
    [1,1]
  ],

  'S':[
    [0,1,1],
    [1,1,0],
    [0,0,0]
  ],

  'T':[
    [0,1,0],
    [1,1,1],
    [0,0,0]
  ],

  'Z':[
    [1,1,0],
    [0,1,1],
    [0,0,0]
  ]
}

const TETROMINO_COLOR = {
  'I': 'cyan',
  'O': 'magenta',
  'T': 'purple',
  'S': 'green',
  'Z': 'red',
  'J': 'blue',
  'L': 'orange'
}

// Source: https://tetris.fandom.com/wiki/Tetris_(NES,_Nintendo)
const LEVEL_SPEED = {
  1:48,
  2:43,
  3:38, 
  4:33,
  5:20
}

// Source: https://tetris.wiki/Scoring
const SCORE_TABLE = {
  1: 100,
  2: 300,
  3: 500,
  4: 800
}

const CELL_SIZE = "15"; 

// Initialize canvas.
const canvas = document.getElementById("game-screen");
const ctx = canvas.getContext('2d');

// ------------------------------------------------ LEVEL SELECTION / HIGH SCORE.

// ------------------------------------------------------- GAME FUNCTIONS / CODE.

// Populate empty game array.
let gameArray = [];

for (let row = -5; row < 20; row++) {
  gameArray[row] = [];

  for (let element = 0; element < 10; element++) {
    gameArray[row][element] = 0;
  }
}

// Set initial game variables.
let frameCount = 0;
let activeTetromino = null;
let gameActive = null;
let gameIsOver = false;

let currentScore = 0;
let currentLevel = 1;
let lineCount = 0;
let rowClearCount = 0;

// Fetch DOM display elements / HTML documents.
const scoreDisplay = document.getElementById('score-display');
scoreDisplay.innerHTML = currentScore;

const lineDisplay = document.getElementById('line-count');
lineDisplay.innerHTML = lineCount;

const levelDisplay = document.getElementById('level-count');
levelDisplay.innerHTML = currentLevel;

const gameDisplay = document.getElementById('game-display');

// TODO: Generate a tetromino sequence via 8-bag algorithm. Lazy randomizer for now.
function generateTetrominoSequence() {
  const names = ['I','J', 'L','O','S','T','Z'];
  return names[Math.floor(Math.random() * names.length)];
}

// Fetch a tetromino.
function fetchTetromino() {
  const name = generateTetrominoSequence();
  // const name = "I";
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

// Check move validity (in bounds and piece collisions). 
// TODO: handle piece rotation validity? Maybe in seperate function.
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
        for (row = gameArray.length - 1; row >= 0; row--) {
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
  gameDisplay.innerHTML = `
  <div class="game-over-wrapper">
    <div class="game-over">
      <div class="game-over-inner">
        <span class="game-over-message">Game</span>
        <span class="game-over-message">Over</span>
      </div>
    </div>

    <div class="try-again-prompt-wrapper">
      <span class="try-again-prompt one"> PLEASE </span>
      <span class="try-again-prompt prompt-two"> TRY </span>
      <span class="try-again-prompt prompt-three">AGAIN♥</span>
    </div>
  </div>
  `

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

// TODO: Add multi key press functionality... Store key presses for simultaneous keydown events.
let keysPressed = {};

// Key event listeners. TODO: Button events for mobile.
document.addEventListener("keydown", (e) => {
  console.log(e.code);

  if (e.code === "ArrowUp") {
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

  if (e.code === "ArrowRight") {
    let incrementedColumn = activeTetromino.col + 1;
    
    const valid = checkValidMove(activeTetromino.matrix, incrementedColumn, activeTetromino.row);
    if (valid) {
      activeTetromino.col++;
    }
  }

  if (e.code === "ArrowLeft") {
    let incrementedColumn = activeTetromino.col - 1;
    const valid = checkValidMove(activeTetromino.matrix, incrementedColumn, activeTetromino.row);

    if (valid) {
      activeTetromino.col--;
    }
  }

  if (e.code === "ArrowDown") {
    let incrementedRow = activeTetromino.row + 1;
    const valid = checkValidMove(activeTetromino.matrix, activeTetromino.col, incrementedRow);
    if (!valid) {
      activeTetromino.row = incrementedRow - 1;
      placeTetromino(activeTetromino);
      return
    } 

    else {
      currentScore++;
      scoreDisplay.innerHTML = currentScore;
      activeTetromino.row ++;
    }
  }
 
}, false);

if (!gameIsOver) {
  gameActive = requestAnimationFrame(gameLoop);
  console.log(gameActive);
}
