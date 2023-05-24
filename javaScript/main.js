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
let modalIsShown = true;
modalButton.innerHTML = "Hide Controls";
informationModal.classList.add("visible");

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

// Level selection 
function changeLevel(e) {
  let prevLevel = level;

  if (e.code === "ArrowDown" && level < 6) { 
    level += 5;
  }

  if (e.code === "ArrowUp" && level > 5) {
    level -= 5;
  }

  if (e.code === "ArrowRight" && level < 10) {
    level += 1;
  }

  if (e.code === "ArrowLeft" && level > 1) {
    level -= 1;
  }

  if (prevLevel !== level) {
    selectedLevel.classList.remove("active");
    selectedLevel = levelSelect[level - 1];
    selectedLevel.classList.add("active");
  }
}

// ------------- High Scores.
