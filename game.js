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



// Generate random teteromino.
function generateTetromino() {

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
let test_i = 0;
let test_j = 0;
let gameActive = null;

// Game driver loop.
function gameLoop() {
  requestAnimationFrame(gameLoop);

  gameArray[test_i][test_j] = 1;
  frameCount++;

  // Draw the current game state.
  for (let row = 0; row < 20; row++) {
    for (let column = 0; column < 10; column++) {
      if (gameArray[row][column]) {
        ctx.fillStyle = TETROMINO_COLOR['J'];
      } else {
        ctx.fillStyle = "lightgrey";
      }
      ctx.fillRect(column * CELL_SIZE, row * CELL_SIZE, CELL_SIZE - 1, CELL_SIZE - 1);
    }
  }

  if (frameCount > 35) {
    frameCount = 0;
    gameArray[test_i][test_j] = 0;
    test_i++;
  }
}

gameActive = requestAnimationFrame(gameLoop);

