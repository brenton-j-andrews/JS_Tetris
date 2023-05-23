// Constants.js contains constant variables used in the game.

// Screen HTML.
export const START_SCREEN_HTML = 
  `
    <div class="level-select-wrapper">
      <div class="level-select-label"> LEVEL </div>

      <div class="level-selector-box">
        <div class="level-selector-upper">
          <div class="level-option active"> 0 </div>
          <div class="level-option"> 1 </div>
          <div class="level-option"> 2 </div>
          <div class="level-option"> 3 </div>
          <div class="level-option"> 4 </div>
        </div>


        <div class="level-selector-lower">
          <div class="level-option"> 5 </div>
          <div class="level-option"> 6 </div>
          <div class="level-option"> 7 </div>
          <div class="level-option"> 8 </div>
          <div class="level-option"> 9 </div>
        </div>
      </div>

      <div class="level-select-label"> TOP-SCORE</div>

      <div class="high-scores">
        <div class="high-scores-left">
          <span class="score-label"> 1 </span>
          <span class="score-label"> 2 </span>
          <span class="score-label"> 3 </span>
        </div>

        <div class="score-table">
          <div class="score-table-left">
            <span class="player-name"> Brent... </span>
            <span class="player-name"> Bruce... </span>
            <span class="player-name"> Nigel... </span>
          </div>

          <div class="score-table-right">
            <span class="high-score"> 1043 </span>
            <span class="high-score"> 999 </span>
            <span class="high-score"> 666 </span>
          </div>
        </div>
      </div>
    </div>  
  `

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

export const GAME_OVER_HTML = 
  `
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

// Source: https://tetris.fandom.com/wiki/Tetris_(NES,_Nintendo)
export const LEVEL_SPEED = {
  1:48,
  2:43,
  3:38, 
  4:33,
  5:20
}

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

export const TETROMINO_COLOR = {
  'I': 'cyan',
  'O': 'magenta',
  'T': 'purple',
  'S': 'green',
  'Z': 'red',
  'J': 'blue',
  'L': 'orange'
}

// Source: https://tetris.wiki/Scoring
export const SCORE_TABLE = {
  1: 100,
  2: 300,
  3: 500,
  4: 800
}

export const CELL_SIZE = "15"; 

