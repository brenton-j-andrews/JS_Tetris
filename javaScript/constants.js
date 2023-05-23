// Constants.js contains constant variables used in the game.

// Screen HTML.
export const GAME_SCREEN_HTML =  
  `
    <div class="game-display" id="game-display">
        <canvas id="game-screen" width="150", height="300"></canvas>
    </div>

    <div class="score-display-wrapper">
      <div class="current-score-wrapper">
        <div class="current-score-theme-top"></div>
        <div class="current-score-theme-middle"></div>

        <div class="current-score-theme-bottom">
          <span class="score-display-text" id="score-display"></span>
        </div>

        <div class="label-wrapper score-label-wrapper">
          <span class="score-display-label"> Score </span>
        </div>
      </div>

      <div class="lower-display-wrapper">
        <div class="stat-display-wrapper">
          <div class="stat-display">
            <span class="stat-display-label"> Level </span>
            <span class="stat-display-text" id="level-count"></span>
          </div>
        </div>

        <div class="stat-display-wrapper">
          <div class="stat-display">
            <span class="stat-display-label"> Lines </span>
            <span class="stat-display-text" id="line-count"></span>
          </div>
        </div>

        <div class="next-piece-wrapper">
          <div class="next-piece-inner-wrapper">

          </div>
        </div>

      </div>
    </div>
  `

export const TETROMINOS = {
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

