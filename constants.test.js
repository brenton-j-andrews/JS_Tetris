// Testing suite for tetromine behavior outside of game impelementation.
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

const CLOCKWISE_90_DEG = {
  'J':[
    [0,1,1],
    [0,1,0],
    [0,1,0]
  ]
}

const COUNTERCLOCKWISE_90_DEG = {
  'J':[
    [0,1,0],
    [0,1,0],
    [1,1,0]
  ]
}

function rotateMatrix90DegClockWise (matrix) {
  const N = matrix.length - 1;

  const result = matrix.map((row, i) =>
    row.map((val, j) => matrix[N - j][i])
    
  );

  console.log(result);
  return result;
}

function rotateMatrix90DegCounterClockWise (matrix) {
  const N = matrix.length - 1;

  const result = matrix.map((row, i) =>
    row.map((val, j) => matrix[i][N - j])
  );

  console.log(result);
  return result;
}

function rotateMatrix360DegClockWise (matrix) {
  let result = matrix;
  for (let i = 0; i < 4; i++) {
    result = rotateMatrix90DegClockWise(result);
  }
  return result;
}

test('Rotate tetromino 90 degrees clockwise', () => {
  expect(rotateMatrix90DegClockWise(TETROMINOS.J)).toStrictEqual(CLOCKWISE_90_DEG.J);
});

// test('Rotate tetromino 360 degrees clockwise.', () => {
//   expect(rotateMatrix360DegClockWise(TETROMINOS.J)).toStrictEqual(TETROMINOS.J);
// });

test('Rotate tetromino 90 degrees counterclockwise', () => {
  expect(rotateMatrix90DegCounterClockWise(TETROMINOS.J)).toStrictEqual(COUNTERCLOCKWISE_90_DEG.J);
})