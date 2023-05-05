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
const LEVELS = {
  0:53,
  1:43,
  2:38, 
  3:33,
  4:20
}

const CELL_SIZE = "15"; 

// Initialize canvas.
const canvas = document.getElementById("game-screen");
const ctx = canvas.getContext('2d');

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
let gameOver = false;

let currentLevel = 0;
let lineCount = 0;
let rowClearCount = 0;

// Fetch DOM display elements.
const lineDisplay = document.getElementById('line-count');
lineDisplay.innerHTML = lineCount;

const levelDisplay = document.getElementById('level-count');
levelDisplay.innerHTML = currentLevel;

// TODO: Generate a tetromino sequence via 8-bag algorithm. Lazy randomizer for now.
function generateTetrominoSequence() {
  const names = ['I','J', 'L','O','S','T','Z'];
  return names[Math.floor(Math.random() * names.length)];
}

// Fetch a tetromino.
function fetchTetromino() {
  const name = generateTetrominoSequence();
  // const name = "O";
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

// Check move validity (in bounds and piece collisions). TODO: handle piece rotation validity? Maybe in seperate function.
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

// Update gameArray on tetromino placement. TODO: check game over conditions and clear lines. 
function placeTetromino(activeTetromino) {
  for (let i = 0; i < activeTetromino.matrix.length; i++) {
    for (let j = 0; j < activeTetromino.matrix[i].length; j++) {

      // If exists, update gameArray.
      if (activeTetromino.matrix[i][j]) {
        gameArray[activeTetromino.row + i][activeTetromino.col + j] = activeTetromino.name;  

        // TODO: Check for game ending condition.

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

// Game driver loop.
function gameLoop() {
  requestAnimationFrame(gameLoop);
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
    if (frameCount > LEVELS[currentLevel]) {
      frameCount = 0;
      activeTetromino.row++;

      // If piece is in final position, place it into the gameArray, update lineCount and increment level if needed.
      if (!checkValidMove(activeTetromino.matrix, activeTetromino.col, activeTetromino.row)) {
        activeTetromino.row--;
        placeTetromino(activeTetromino);    
        lineCount += rowClearCount;
        rowClearCount = 0;
        lineDisplay.innerText = lineCount;

        // Increment level, refactor later for different play modes.
        if (lineCount / 10 === 1) {
          currentLevel++;
          levelDisplay.innerHTML = currentLevel;
        }
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

// Key event listeners. Button events to be added later.
document.addEventListener("keydown", (e) => {

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

  else if (e.code === "ArrowRight") {
    let incrementedColumn = activeTetromino.col + 1;
    
    const valid = checkValidMove(activeTetromino.matrix, incrementedColumn, activeTetromino.row);
    if (valid) {
      activeTetromino.col++;
    }
  }

  else if (e.code === "ArrowLeft") {
    let incrementedColumn = activeTetromino.col - 1;
    const valid = checkValidMove(activeTetromino.matrix, incrementedColumn, activeTetromino.row);

    if (valid) {
      activeTetromino.col--;
    }
  }

  else if (e.code === "ArrowDown") {
    let incrementedRow = activeTetromino.row + 1;
    const valid = checkValidMove(activeTetromino.matrix, activeTetromino.col, incrementedRow);

    if (!valid) {
      activeTetromino.row = incrementedRow - 1;
      placeTetromino();
      return
    } 

    else {
      activeTetromino.row ++;
    }
  }
 
}, false);

gameActive = requestAnimationFrame(gameLoop);