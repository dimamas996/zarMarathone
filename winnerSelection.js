import { createElement, createReloadButton } from "./utils.js";
import { player1, player2 } from "./players.js";
import { generateLogs } from "./chatAndLogs.js";

const $submitFightBtn = document.querySelector(".button");
const $formFight = document.querySelector(".control");
const $arena = document.querySelector(".arenas");

export function showSelectedWinner(condition) {
  const $winTitle = createElement("div", "winTitle");
  const characterOne = document.querySelector(".player1 .character");
  const characterTwo = document.querySelector(".player2 .character");
  switch (condition) {
    case "player1":
      $winTitle.innerText = `${player1.name} WINS!`;
      characterOne.classList.add("winner");
      characterTwo.classList.add("loser");
      break;
    case "player2":
      $winTitle.innerText = `${player2.name} WINS!`;
      characterOne.classList.add("loser");
      characterTwo.classList.add("winner");
      break;
    case "draw":
      $winTitle.innerText = "DRAW";
      characterOne.classList.add("winner");
      characterTwo.classList.add("winner");
      break;
  }

  return $winTitle;
}

export function winnerSelection() {
  if (player1.hp === 0 || player2.hp === 0) {
    $submitFightBtn.disabled = true;
    $formFight.style.display = "none";
    $arena.appendChild(createReloadButton());
  }

  if (player1.hp === 0 && player1.hp < player2.hp) {
    $arena.appendChild(showSelectedWinner("player2"));
    generateLogs("end", player2, player1);
  }
  if (player2.hp === 0 && player1.hp > player2.hp) {
    $arena.appendChild(showSelectedWinner("player1"));
    generateLogs("end", player1, player2);
  }
  if (player1.hp === 0 && player2.hp === 0) {
    $arena.appendChild(showSelectedWinner("draw"));
    generateLogs("draw");
  }
}
