// Testing for tetromine behavior specified at https://tetris.fandom.com/wiki/SRS.

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
  'I':[
    [0,0,1,0],
    [0,0,1,0],
    [0,0,1,0],
    [0,0,1,0]
  ],

  'J':[
    [0,1,1],
    [0,1,0],
    [0,1,0]
  ],

  'L':[
    [0,1,0],
    [0,1,0],
    [0,1,1]
  ],

  'O':[
    [1,1],
    [1,1]
  ],

  'S':[
    [0,1,0],
    [0,1,1],
    [0,0,1]
  ],

  'T':[
    [0,1,0],
    [0,1,1],
    [0,1,0]
  ],

  'Z':[
    [0,0,1],
    [0,1,1],
    [0,1,0]
  ]
}

const COUNTERCLOCKWISE_90_DEG = {
  'I':[
    [0,1,0,0],
    [0,1,0,0],
    [0,1,0,0],
    [0,1,0,0]
  ],

  'J':[
    [0,1,0],
    [0,1,0],
    [1,1,0]
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

function rotateMatrix90DegClockWise (matrix) {
  const N = matrix.length - 1;

  const result = matrix.map((row, i) =>
    row.map((val, j) => matrix[N - j][i])
  );

  return result;
}

function rotateMatrix90DegCounterClockWise (matrix) {
  const N = matrix.length - 1;

  const result = matrix.map((row, i) =>
    row.map((val, j) => matrix[j][N - i])
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

test('Rotate all tetrominos 90 degrees clockwise', () => {
  expect(rotateMatrix90DegClockWise(TETROMINOS.J)).toStrictEqual(CLOCKWISE_90_DEG.J);
  expect(rotateMatrix90DegClockWise(TETROMINOS.L)).toStrictEqual(CLOCKWISE_90_DEG.L);
  expect(rotateMatrix90DegClockWise(TETROMINOS.I)).toStrictEqual(CLOCKWISE_90_DEG.I);
  expect(rotateMatrix90DegClockWise(TETROMINOS.L)).toStrictEqual(CLOCKWISE_90_DEG.L);
  expect(rotateMatrix90DegClockWise(TETROMINOS.O)).toStrictEqual(CLOCKWISE_90_DEG.O);
  expect(rotateMatrix90DegClockWise(TETROMINOS.S)).toStrictEqual(CLOCKWISE_90_DEG.S);
  expect(rotateMatrix90DegClockWise(TETROMINOS.T)).toStrictEqual(CLOCKWISE_90_DEG.T);
  expect(rotateMatrix90DegClockWise(TETROMINOS.Z)).toStrictEqual(CLOCKWISE_90_DEG.Z);
});

test('Rotate all tetrominos 360 degrees clockwise.', () => {
  expect(rotateMatrix360DegClockWise(TETROMINOS.J)).toStrictEqual(TETROMINOS.J);
  expect(rotateMatrix360DegClockWise(TETROMINOS.L)).toStrictEqual(TETROMINOS.L);
  expect(rotateMatrix360DegClockWise(TETROMINOS.I)).toStrictEqual(TETROMINOS.I);
  expect(rotateMatrix360DegClockWise(TETROMINOS.L)).toStrictEqual(TETROMINOS.L);
  expect(rotateMatrix360DegClockWise(TETROMINOS.O)).toStrictEqual(TETROMINOS.O);
  expect(rotateMatrix360DegClockWise(TETROMINOS.S)).toStrictEqual(TETROMINOS.S);
  expect(rotateMatrix360DegClockWise(TETROMINOS.T)).toStrictEqual(TETROMINOS.T);
  expect(rotateMatrix360DegClockWise(TETROMINOS.Z)).toStrictEqual(TETROMINOS.Z);
});

