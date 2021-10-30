import { Player } from './players.js';
import {
  createElement,
  getRandom,
  getCurrentTime,
  createReloadButton,
} from './utils.js';
import { logs } from './constants.js';

class Game {
  start = () => {
    const $arena = document.querySelector('.arenas');
    const $formFight = document.querySelector('.control');
    const $chat = document.querySelector('.chat');
    const $submitFightBtn = document.querySelector('.button');

    function getPlayerData(orderNumber, objWithPalyerData) {
      const objForPalyerCreation = {};
      objForPalyerCreation.player = orderNumber;
      objForPalyerCreation.name = objWithPalyerData.name;
      objForPalyerCreation.hp = objWithPalyerData.hp;
      objForPalyerCreation.img = objWithPalyerData.img;
      return objForPalyerCreation;
    }

    const player1 = new Player(
      getPlayerData(1, JSON.parse(localStorage.getItem('player1')))
    );

    const player2 = new Player(
      getPlayerData(2, JSON.parse(localStorage.getItem('player2')))
    );

    /*function enemyAttack() {
      const hit = ATTACK[getRandom(3) - 1];
    const defence = ATTACK[getRandom(3) - 1];

      return {
        value: getRandom(HIT[hit]),
        hit,
        defence,
      };
    }*/

    function playerAttack() {
      const attack = {};

      for (let item of $formFight) {
        if (item.checked && item.name === 'hit') {
          //attack.value = getRandom(HIT[item.value]);
          attack.hit = item.value;
        }

        if (item.checked && item.name === 'defence') {
          attack.defence = item.value;
        }

        item.checked = false;
      }
      return attack;
    }

    function generateLogs(type, player1, player2, hp) {
      let text = '';
      let element = '';

      switch (type) {
        case 'start':
          text = logs[type]
            .replace('[player1]', player1.name)
            .replace('[player2]', player2.name)
            .replace('[time]', getCurrentTime());
          element = `<p>${text}</p>`;
          break;
        case 'end':
          text = logs[type][getRandom(logs[type].length - 1)]
            .replace('[playerWins]', player1.name)
            .replace('[playerLose]', player2.name);
          element = `<p>${text}</p>`;
          break;
        case 'hit':
          text = logs[type][getRandom(logs[type].length - 1)]
            .replace('[playerDefence]', player1.name)
            .replace('[playerKick]', player2.name);
          element = `<p>${getCurrentTime()} - ${text} -${hp} [${
            player1.hp
          }/100]</p>`;
          break;
        case 'defence':
          text = logs[type][getRandom(logs[type].length - 1)]
            .replace('[playerDefence]', player1.name)
            .replace('[playerKick]', player2.name);
          element = `<p>${getCurrentTime()} - ${text}</p>`;
          break;
        case 'draw':
          text = logs[type];
          element = `<p>${text}</p>`;
          break;
      }
      $chat.insertAdjacentHTML('afterbegin', element);
    }

    function showSelectedWinner(condition) {
      const $winTitle = createElement('div', 'winTitle');
      const characterOne = document.querySelector('.player1 .character');
      const characterTwo = document.querySelector('.player2 .character');
      switch (condition) {
        case 'player1':
          $winTitle.innerText = `${player1.name} WINS!`;
          characterOne.classList.add('winner');
          characterTwo.classList.add('loser');
          break;
        case 'player2':
          $winTitle.innerText = `${player2.name} WINS!`;
          characterOne.classList.add('loser');
          characterTwo.classList.add('winner');
          break;
        case 'draw':
          $winTitle.innerText = 'DRAW';
          characterOne.classList.add('winner');
          characterTwo.classList.add('winner');
          break;
      }

      return $winTitle;
    }

    function winnerSelection() {
      if (player1.hp === 0 || player2.hp === 0) {
        $submitFightBtn.disabled = true;
        $formFight.style.display = 'none';
        $arena.appendChild(createReloadButton());
      }

      if (player1.hp === 0 && player1.hp < player2.hp) {
        $arena.appendChild(showSelectedWinner('player2'));
        generateLogs('end', player2, player1);
      }
      if (player2.hp === 0 && player1.hp > player2.hp) {
        $arena.appendChild(showSelectedWinner('player1'));
        generateLogs('end', player1, player2);
      }
      if (player1.hp === 0 && player2.hp === 0) {
        $arena.appendChild(showSelectedWinner('draw'));
        generateLogs('draw');
      }
    }

    $formFight.addEventListener('submit', async (e) => {
      e.preventDefault();

      const { hit, defence } = playerAttack();

      const q = await fetch(
        'http://reactmarathon-api.herokuapp.com/api/mk/player/fight',
        {
          method: 'POST',
          body: JSON.stringify({
            hit,
            defence,
          }),
        }
      )
        .then((res) => res.json())
        .then((data) => {
          if (data.player1.defence !== data.player2.hit) {
            player1.changeHP(data.player2.value);
            player1.renderHP();
            generateLogs('hit', player1, player2, data.player2.value);
          } else {
            generateLogs('defence', player1, player2);
          }

          if (data.player2.defence !== data.player1.hit) {
            player2.changeHP(data.player1.value);
            player2.renderHP();
            generateLogs('hit', player2, player1, data.player1.value);
          } else {
            generateLogs('defence', player2, player1);
          }

          winnerSelection();
        });
    });

    $arena.appendChild(player1.createPlayerInDOM());
    $arena.appendChild(player2.createPlayerInDOM());
    generateLogs('start', player1, player2);
  };
}

export default Game;
