import { Player } from "./players.js";
import {
  createElement,
  getRandom,
  getCurrentTime,
  createReloadButton,
} from "./utils.js";
import { logs, HIT, ATTACK } from "./constants.js";

class Game {
  start = () => {
    const $arena = document.querySelector(".arenas");
    const $formFight = document.querySelector(".control");
    const $chat = document.querySelector(".chat");
    const $submitFightBtn = document.querySelector(".button");

    const player1 = new Player({
      player: 1,
      name: "LIU KANG",
      hp: 100,
      img: "http://reactmarathon-api.herokuapp.com/assets/liukang.gif",
      weapon: ["AK-47", "Katana"],
    });

    const player2 = new Player({
      player: 2,
      name: "KITANA",
      hp: 100,
      img: "http://reactmarathon-api.herokuapp.com/assets/kitana.gif",
      weapon: ["Glock", "Knife"],
    });

    function enemyAttack() {
      const hit = ATTACK[getRandom(3) - 1];
      const defence = ATTACK[getRandom(3) - 1];

      return {
        value: getRandom(HIT[hit]),
        hit,
        defence,
      };
    }

    function playerAttack() {
      const attack = {};

      for (let item of $formFight) {
        if (item.checked && item.name === "hit") {
          attack.value = getRandom(HIT[item.value]);
          attack.hit = item.value;
        }

        if (item.checked && item.name === "defence") {
          attack.defence = item.value;
        }

        item.checked = false;
      }
      return attack;
    }

    function generateLogs(type, player1, player2, hp) {
      let text = "";
      let element = "";

      switch (type) {
        case "start":
          text = logs[type]
            .replace("[player1]", player1.name)
            .replace("[player2]", player2.name)
            .replace("[time]", getCurrentTime());
          element = `<p>${text}</p>`;
          break;
        case "end":
          text = logs[type][getRandom(logs[type].length - 1)]
            .replace("[playerWins]", player1.name)
            .replace("[playerLose]", player2.name);
          element = `<p>${text}</p>`;
          break;
        case "hit":
          text = logs[type][getRandom(logs[type].length - 1)]
            .replace("[playerDefence]", player1.name)
            .replace("[playerKick]", player2.name);
          element = `<p>${getCurrentTime()} - ${text} -${hp} [${
            player1.hp
          }/100]</p>`;
          break;
        case "defence":
          text = logs[type][getRandom(logs[type].length - 1)]
            .replace("[playerDefence]", player1.name)
            .replace("[playerKick]", player2.name);
          element = `<p>${getCurrentTime()} - ${text}</p>`;
          break;
        case "draw":
          text = logs[type];
          element = `<p>${text}</p>`;
          break;
      }
      $chat.insertAdjacentHTML("afterbegin", element);
    }

    function showSelectedWinner(condition) {
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

    function winnerSelection() {
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

    $arena.appendChild(player1.createPlayerInDOM());
    $arena.appendChild(player2.createPlayerInDOM());
    generateLogs("start", player1, player2);
  };
}

export default Game;
