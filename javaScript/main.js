// Main.js renders the level selection and game over menus, calls the game script and writes to the highscores file when needed.

import { START_SCREEN_HTML } from "./constants.js";
import { startGame } from "./gameModule.mjs";

const screenContents = document.getElementById("screen-contents");
screenContents.innerHTML = START_SCREEN_HTML;

const startButton = document.getElementById("start-button");
startButton.addEventListener("click", () => {
  startGame();
})



