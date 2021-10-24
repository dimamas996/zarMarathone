const $arena = document.querySelector(".arenas");
const $submitFightBtn = document.querySelector(".button");
const $formFight = document.querySelector(".control");

const HIT = {
  head: 30,
  body: 25,
  foot: 20,
}
const ATTACK = ['head', 'body', 'foot'];

const player1 = {
  player: 1,
  name: "LIU KANG",
  hp: 100,
  img: "http://reactmarathon-api.herokuapp.com/assets/liukang.gif",
  weapon: ["AK-47", "Katana"],
  attack: function () {
    console.log(this.name + " " + "Fight...");
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
    console.log(this.name + " " + "Fight...");
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
  const $newPlayer = createElement("div", "player" + playerObj.player);
  const $progress = createElement("div", "progressbar");
  const $newPlayerLife = createElement("div", "life");
  const $newPlayerName = createElement("div", "name");
  const $newCharacter = createElement("div", "character");
  const $newCharacterImg = createElement("img");

  $newPlayerLife.style.width = playerObj.hp + "%";
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
      $winTitle.innerText = player1.name + " WINS!";
      characterOne.classList.add("winner");
      characterTwo.classList.add("loser");
      break;
    case "player2":
      $winTitle.innerText = player2.name + " WINS!";
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
  return document.querySelector(".player" + this.player + " .life");
}

function renderHP() {
  this.elHP().style.width = this.hp + "%";
}

function createReloadButton() {
  const div = createElement("div", "reloadWrap");
  const btn = createElement("button", "button");
  btn.innerText = "Restart";
  btn.addEventListener("click", function(){
    window.location.reload();
  })
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
  }
}

/*$submitFightBtn.addEventListener("click", function() {
  player1.changeHP(getRandom(20));
  player2.changeHP(getRandom(20));

  player1.renderHP();
  player2.renderHP();

  if (player1.hp === 0 || player2.hp === 0) {
    $submitFightBtn.disabled = true;
    $formFight.display = "none";
    $arena.appendChild(createReloadButton());
  }

  if (player1.hp === 0 && player1.hp < player2.hp)
    $arena.appendChild(showSelectedWinner("player2"));
  if (player2.hp === 0 && player1.hp > player2.hp)
    $arena.appendChild(showSelectedWinner("player1"));
  if (player1.hp === 0 && player2.hp === 0)
    $arena.appendChild(showSelectedWinner("draw"));
});*/

$formFight.addEventListener("submit", (e)=>{
  e.preventDefault();  
  const enemy = enemyAttack();
  const attack = {};

  for (let item of $formFight) {
    if (item.checked && item.name === "hit") {
      attack.value = getRandom(HIT[item.value]);
      attack.hit = item.value;
    }

    if (item.checked && item.name === "defence") {
      attack.defence = item.value
    }

    item.checked = false;    
  }

  if (enemy.hit !== attack.defence) {
    player1.changeHP(enemy.value);
    if (enemy.value > 0) player1.renderHP();
  };
  if (attack.hit !== enemy.defence) {
    player2.changeHP(attack.value);
    if (attack.value > 0) player2.renderHP();
  }; 

  if (player1.hp === 0 || player2.hp === 0) {
    $submitFightBtn.disabled = true;
    $formFight.style.display = "none";
    $arena.appendChild(createReloadButton());
  }

  if (player1.hp === 0 && player1.hp < player2.hp)
    $arena.appendChild(showSelectedWinner("player2"));
  if (player2.hp === 0 && player1.hp > player2.hp)
    $arena.appendChild(showSelectedWinner("player1"));
  if (player1.hp === 0 && player2.hp === 0)
    $arena.appendChild(showSelectedWinner("draw"));  
});

$arena.appendChild(createPlayer(player1));
$arena.appendChild(createPlayer(player2));
