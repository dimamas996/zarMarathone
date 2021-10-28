import { player1, player2 } from "./players.js";
import { createElement } from "./utils.js";
import { generateLogs } from "./chatAndLogs.js";
import { playerAttack, enemyAttack } from "./playerActions.js";
import { winnerSelection } from "./winnerSelection.js";

const $arena = document.querySelector(".arenas");
const $formFight = document.querySelector(".control");

export const startLog =
  "Часы показывали [time], когда [player1] и [player2] бросили вызов друг другу.";

function createPlayer(playerObj) {
  const $newPlayer = createElement("div", `player${playerObj.player}`);
  const $progress = createElement("div", "progressbar");
  const $newPlayerLife = createElement("div", "life");
  const $newPlayerName = createElement("div", "name");
  const $newCharacter = createElement("div", "character");
  const $newCharacterImg = createElement("img");

  $newPlayerLife.style.width = `${playerObj.hp}%`;
  $newPlayerName.textContent = playerObj.name;
  $newCharacterImg.src = playerObj.img;

  $progress.appendChild($newPlayerName);
  $progress.appendChild($newPlayerLife);

  $newCharacter.appendChild($newCharacterImg);

  $newPlayer.appendChild($progress);
  $newPlayer.appendChild($newCharacter);

  return $newPlayer;
}

$formFight.addEventListener("submit", (e) => {
  e.preventDefault();

  const {
    value: playerValue,
    hit: playerHit,
    defence: playerDefence,
  } = playerAttack();
  const {
    value: enemyValue,
    hit: enemyHit,
    defence: enemyDefence,
  } = enemyAttack();

  if (playerDefence !== enemyHit) {
    player1.changeHP(enemyValue);
    player1.renderHP();
    generateLogs("hit", player1, player2, enemyValue);
  } else {
    generateLogs("defence", player1, player2);
  }

  if (enemyDefence !== playerHit) {
    player2.changeHP(playerValue);
    player2.renderHP();
    generateLogs("hit", player2, player1, playerValue);
  } else {
    generateLogs("defence", player2, player1);
  }

  winnerSelection();
});

$arena.appendChild(createPlayer(player1));
$arena.appendChild(createPlayer(player2));
generateLogs("start", player1, player2);
