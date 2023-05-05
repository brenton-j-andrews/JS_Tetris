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

// Initialize canvas.
const canvas = document.getElementById("game-screen");
const ctx = canvas.getContext('2d');
ctx.fillStyle = 'lightgray';

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

// TODO: Generate a tetromino sequence via 8-bag algorithm.
function generateTetrominoSequence() {
  const names = ['I','J', 'L','O','S','T','Z'];
  return names[Math.floor(Math.random() * names.length)];
}

// Fetch a tetromino.
function fetchTetromino() {
  const name = generateTetrominoSequence();
  const matrix = TETROMINOS[name];
  let col = matrix.name === 'I' ? 3 : 4;
  let row = matrix.name === 'I' ? -1 :-2;

  return {
    name: name,
    matrix: matrix,
    col: col,
    row: 5
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

// TODO: Check move validity (in bounds and piece collisions)
function checkValidMove(matrix, incrementedColumn) {
  for (let row = 0; row < matrix.length; row++) {
    for (let col = 0; col < matrix[row].length; col++) {

      if (matrix[row][col] && (

        // Right wall collision
        (col + incrementedColumn >= 10) ||

        // Left wall collision
        (col + incrementedColumn < 0)
        
        // TODO: Bottom wall collision.
        // TODO: Piece collision.
      )
      ) {
        console.log("col value: ", col);
        console.log("inc col value: ", incrementedColumn);
        return false;
      }
    }
  }

  return true;
}

// TODO: Shift matrix that is being rotated while out of bounds.
function shiftMatrix(matrix, increment) {

}

// TODO: Update gameArray on tetromino placement.
function placeTetromino() {
  return 'TODO!';
}

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

  // Update canvas with tetromino position.
  if (activeTetromino) {
    if (frameCount > 300) {
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
    let matrix = rotateMatrix90DegClockWise(activeTetromino.matrix);
    const valid = checkValidMove(matrix, activeTetromino.col);
    console.log(activeTetromino.col);

    if (valid) {
      activeTetromino.matrix = matrix;
    } 

    // Edge cases: rotating tetromino while some of the matrix is out of bounds.
    else if (activeTetromino.col === 8 ) {
      activeTetromino.col--;
      activeTetromino.matrix = matrix;
    }
    else if (activeTetromino.col === -1) {
      activeTetromino.col++;
      activeTetromino.matrix = matrix;
    }
  }

  else if (e.code === "ArrowRight") {
    let incrementedColumn = activeTetromino.col + 1;
    
    const valid = checkValidMove(activeTetromino.matrix, incrementedColumn);
    if (valid) {
      activeTetromino.col++;
    }
  }

  else if (e.code === "ArrowLeft") {
    let incrementedColumn = activeTetromino.col - 1;
    const valid = checkValidMove(activeTetromino.matrix, incrementedColumn);

    if (valid) {
      activeTetromino.col--;
    }
  }

  else if (e.code === "SpaceBar") {
    console.log("Hard drop!!!");
  }
 
}, false);

// // TODO: Add on screen button events.
// document.addEventListener("click", (e) => {
//   console.log(`you clicked a button!`);
// }, false);

gameActive = requestAnimationFrame(gameLoop);