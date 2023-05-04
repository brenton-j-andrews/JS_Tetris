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
  'O': 'yellow',
  'T': 'purple',
  'S': 'green',
  'Z': 'red',
  'J': 'blue',
  'L': 'orange'
}

const CELL_SIZE = "15"; 

// Fetch a tetromino.
function fetchTetromino() {
  const name = 'I';
  const matrix = TETROMINOS[name];
  let col = matrix.name === 'I' ? 3 : 4;
  let row = matrix.name === 'I' ? -1 :-2;

  return {
    name: name,
    matrix: matrix,
    col: col,
    row: row
  }
}

// Rotate tetromino matrix 90 degrees.
function rotateMatrix90DegClockWise(matrix) {
  const N = matrix.length - 1;

  const result = matrix.map((row, i) =>
    row.map((val, j) => matrix[N - j][i])
  );

  return result;
}

// Initialize canvas.
const canvas = document.getElementById("game-screen");
const ctx = canvas.getContext('2d');
ctx.fillStyle = 'lightgray';

// Populate empty game array.
let gameArray = [];

for (let row = -10; row < 20; row++) {
  gameArray[row] = [];

  for (let element = 0; element < 10; element++) {
    gameArray[row][element] = 0;
  }
}

let frameCount = 0;
let activeTetromino = null;
let gameActive = null;
let gameOver = false;

// Game driver loop.
function gameLoop() {
  requestAnimationFrame(gameLoop);
  frameCount++;

  // Draw the current game state.
  for (let row = 0; row < 20; row++) {
    for (let column = 0; column < 10; column++) {
      if (gameArray[row][column]) {
        ctx.fillStyle = TETROMINO_COLOR[activeTetromino.name];
      } else {
        ctx.fillStyle = "lightgrey";
      }
      ctx.fillRect(column * CELL_SIZE, row * CELL_SIZE, CELL_SIZE - 1, CELL_SIZE - 1);
    }
  }

  // If no tetromino, fetch new one.
  if (!activeTetromino) {
    activeTetromino = fetchTetromino();
  }

  // Update gameArray with tetromino position.
  if (activeTetromino) {
    if (frameCount > 35) {
      frameCount = 0;
      activeTetromino.row++;
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
    activeTetromino.matrix = rotateMatrix90DegClockWise(activeTetromino.matrix);
  }

  else if (e.code === "ArrowRight") {
    if (activeTetromino.col + activeTetromino.matrix.length < 10) {
      activeTetromino.col++;
    }
  }

  else if (e.code === "ArrowLeft") {
    if (activeTetromino.col >= 1) {
      activeTetromino.col--;
    }
  }

  else if (e.code === "SpaceBar") {
    console.log("Hard drop!!!");
  }
 
}, false);

gameActive = requestAnimationFrame(gameLoop);