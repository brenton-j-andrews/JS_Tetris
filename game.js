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

const CELL_SIZE = "15"; 

// Initialize canvas.
const canvas = document.getElementById("game-screen");
const ctx = canvas.getContext('2d');
ctx.fillStyle = 'lightgray';

console.log(ctx);

// Populate empty game array.
let gameArray = [];

for (let row = -10; row < 20; row++) {
  gameArray[row] = [];

  for (let element = 0; element < 10; element++) {
    gameArray[row][element] = 0;
  }
}



// Game driver loop.
function gameLoop() {

  // ctx.fillRect(0, 0, CELL_SIZE - 1, CELL_SIZE - 1);
  // ctx.strokeRect(50, 50, 150, 150);


  // Draw the current game state.
  for (let row = 0; row < 20; row++) {
    for (let column = 0; column < 10; column++) {
      ctx.fillRect(column * CELL_SIZE, row * CELL_SIZE, CELL_SIZE - 1, CELL_SIZE - 1);
    }
  }
  console.log("all done!");
}

gameLoop();