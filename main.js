const $arena = document.querySelector(".arenas");
const $submitFightBtn = document.querySelector(".button");
const $formFight = document.querySelector(".control");
const $chat = document.querySelector(".chat");

const HIT = {
  head: 30,
  body: 25,
  foot: 20,
};
const ATTACK = ["head", "body", "foot"];

const logs = {
  start:
    "Часы показывали [time], когда [player1] и [player2] бросили вызов друг другу.",
  end: [
    "Результат удара [playerWins]: [playerLose] - труп",
    "[playerLose] погиб от удара бойца [playerWins]",
    "Результат боя: [playerLose] - жертва, [playerWins] - убийца",
  ],
  hit: [
    "[playerDefence] пытался сконцентрироваться, но [playerKick] разбежавшись раздробил копчиком левое ухо врага.",
    "[playerDefence] расстроился, как вдруг, неожиданно [playerKick] случайно раздробил грудью грудину противника.",
    "[playerDefence] зажмурился, а в это время [playerKick], прослезившись, раздробил кулаком пах оппонента.",
    "[playerDefence] чесал <вырезано цензурой>, и внезапно неустрашимый [playerKick] отчаянно размозжил грудью левый бицепс оппонента.",
    "[playerDefence] задумался, но внезапно [playerKick] случайно влепил грубый удар копчиком в пояс оппонента.",
    "[playerDefence] ковырялся в зубах, но [playerKick] проснувшись влепил тяжелый удар пальцем в кадык врага.",
    "[playerDefence] вспомнил что-то важное, но внезапно [playerKick] зевнув, размозжил открытой ладонью челюсть противника.",
    "[playerDefence] осмотрелся, и в это время [playerKick] мимоходом раздробил стопой аппендикс соперника.",
    "[playerDefence] кашлянул, но внезапно [playerKick] показав палец, размозжил пальцем грудь соперника.",
    "[playerDefence] пытался что-то сказать, а жестокий [playerKick] проснувшись размозжил копчиком левую ногу противника.",
    "[playerDefence] забылся, как внезапно безумный [playerKick] со скуки, влепил удар коленом в левый бок соперника.",
    "[playerDefence] поперхнулся, а за это [playerKick] мимоходом раздробил коленом висок врага.",
    "[playerDefence] расстроился, а в это время наглый [playerKick] пошатнувшись размозжил копчиком губы оппонента.",
    "[playerDefence] осмотрелся, но внезапно [playerKick] робко размозжил коленом левый глаз противника.",
    "[playerDefence] осмотрелся, а [playerKick] вломил дробящий удар плечом, пробив блок, куда обычно не бьют оппонента.",
    "[playerDefence] ковырялся в зубах, как вдруг, неожиданно [playerKick] отчаянно размозжил плечом мышцы пресса оппонента.",
    "[playerDefence] пришел в себя, и в это время [playerKick] провел разбивающий удар кистью руки, пробив блок, в голень противника.",
    "[playerDefence] пошатнулся, а в это время [playerKick] хихикая влепил грубый удар открытой ладонью по бедрам врага.",
  ],
  defence: [
    "[playerKick] потерял момент и храбрый [playerDefence] отпрыгнул от удара открытой ладонью в ключицу.",
    "[playerKick] не контролировал ситуацию, и потому [playerDefence] поставил блок на удар пяткой в правую грудь.",
    "[playerKick] потерял момент и [playerDefence] поставил блок на удар коленом по селезенке.",
    "[playerKick] поскользнулся и задумчивый [playerDefence] поставил блок на тычок головой в бровь.",
    "[playerKick] старался провести удар, но непобедимый [playerDefence] ушел в сторону от удара копчиком прямо в пятку.",
    "[playerKick] обманулся и жестокий [playerDefence] блокировал удар стопой в солнечное сплетение.",
    "[playerKick] не думал о бое, потому расстроенный [playerDefence] отпрыгнул от удара кулаком куда обычно не бьют.",
    "[playerKick] обманулся и жестокий [playerDefence] блокировал удар стопой в солнечное сплетение.",
  ],
  draw: "Ничья - это тоже победа!",
};

const player1 = {
  player: 1,
  name: "LIU KANG",
  hp: 100,
  img: "http://reactmarathon-api.herokuapp.com/assets/liukang.gif",
  weapon: ["AK-47", "Katana"],
  attack: function () {
    console.log(`${this.name} Fight...`);
  },
  changeHP,
  elHP,
  renderHP,
};

const player2 = {
  player: 2,
  name: "KITANA",
  hp: 100,
  img: "http://reactmarathon-api.herokuapp.com/assets/kitana.gif",
  weapon: ["Glock", "Knife"],
  attack: function () {
    console.log(`${this.name} Fight...`);
  },
  changeHP,
  elHP,
  renderHP,
};

function createElement(tag, className) {
  const $tag = document.createElement(tag);

  if (className) {
    $tag.classList.add(className);
  }

  return $tag;
}

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

function changeHP(damage) {
  this.hp -= damage;
  if (this.hp < 0) this.hp = 0;
}

function elHP() {  
  return document.querySelector(`.player${this.player} .life`)
}

function renderHP() {
  this.elHP().style.width = `${this.hp}%`;
}

function createReloadButton() {
  const div = createElement("div", "reloadWrap");
  const btn = createElement("button", "button");
  btn.innerText = "Restart";
  btn.addEventListener("click", function () {
    window.location.reload();
  });
  div.appendChild(btn);
  return div;
}

function getRandom(maxValue) {
  return Math.floor(Math.random() * maxValue + 1);
}

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

function getCurrentTime() {
  const date = new Date();
  const options = {
    hour: "numeric",
    minute: "numeric",
  };
  return date.toLocaleString("ru", options);
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
  const enemy = enemyAttack();
  const player = playerAttack();

  if (player.defence !== enemy.hit) {
    player1.changeHP(enemy.value);
    player1.renderHP();
    generateLogs("hit", player1, player2, enemy.value);
  } else {
    generateLogs("defence", player1, player2);
  }

  if (enemy.defence !== player.hit) {
    player2.changeHP(player.value);
    player2.renderHP();
    generateLogs("hit", player2, player1, player.value);
  } else {
    generateLogs("defence", player2, player1);
  }

  winnerSelection();
});

$arena.appendChild(createPlayer(player1));
$arena.appendChild(createPlayer(player2));
generateLogs("start", player1, player2);
