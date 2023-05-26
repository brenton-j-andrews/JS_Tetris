// Main.js renders the level selection and game over menus, calls the game script and writes to the highscores file when needed.

import { START_SCREEN_HTML } from "./constants.js";
import { startGame } from "./gameModule.mjs";

const screenContents = document.getElementById("screen-contents");
screenContents.innerHTML = START_SCREEN_HTML;

const startButton = document.getElementById("start-button");
startButton.addEventListener("click", () => {
  document.removeEventListener("keydown", changeLevel, false);
  startGame(level);
})

// ----------- Program Controls Modal.
const informationModal = document.getElementById("info-modal");

const modalButton = document.getElementById("modal-btn");
modalButton.addEventListener("click", toggleModal, false);
let modalIsShown = false;

function toggleModal() {
  if (!modalIsShown) {
    modalButton.innerHTML = "Hide Controls";
    informationModal.classList.add("visible");
  } else {
    modalButton.innerHTML = "Show Controls";
    informationModal.classList.remove("visible");
  }

  modalIsShown = !modalIsShown;
}

// ----------- Level Selection Events.

let level = 1;

const levelSelect = document.querySelectorAll("#levelOption");
let selectedLevel = levelSelect[level - 1];
selectedLevel.classList.add("active");

// Arrow Event Listeners.
document.addEventListener("keydown", changeLevel, false);
document.addEventListener("click", changeLevel, false);

function changeLevel(e) {
  let code = e.target.id || e.key;
  let prevLevel = level;

  if (code === "ArrowDown" && level < 6) { 
    level += 5;
  }

  if (code === "ArrowUp" && level > 5) {
    level -= 5;
  }

  if (code === "ArrowRight" && level < 10) {
    level += 1;
  }

  if (code === "ArrowLeft" && level > 1) {
    level -= 1;
  }

  if (prevLevel !== level) {
    selectedLevel.classList.remove("active");
    selectedLevel = levelSelect[level - 1];
    selectedLevel.classList.add("active");
  }
}

// Display highest scores.
let player_1 = document.getElementById("player_1");
let score_1 = document.getElementById("score_1");
player_1.innerHTML = ".........";
score_1.innerHTML = ".........";

let player_2 = document.getElementById("player_2");
let score_2 = document.getElementById("score_2");
player_2.innerHTML = ".........";
score_2.innerHTML = ".........";

let player_3 = document.getElementById("player_3");
let score_3 = document.getElementById("score_3");
player_3.innerHTML = ".........";
score_3.innerHTML = ".........";
