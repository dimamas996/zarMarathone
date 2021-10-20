const $arena = document.querySelector(".arenas");
const $randomButton = document.querySelector(".button");

const player1 = {
  player: 1,
  name: "LIU KANG",
  hp: 100,
  img: "http://reactmarathon-api.herokuapp.com/assets/liukang.gif",
  weapon: ["AK-47", "Katana"],
  attack: function () {
    console.log(this.name + " " + "Fight...");
  },
  changeHP: changeHP,
  elHP: elHP,
  renderHP: renderHP,
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
  changeHP: changeHP,
  elHP: elHP,
  renderHP: renderHP,
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

$randomButton.addEventListener("click", function() {
  player1.changeHP(getRandom(20));
  player2.changeHP(getRandom(20));

  player1.renderHP();
  player2.renderHP();

  if (player1.hp === 0 || player2.hp === 0) {
    $randomButton.disabled = true;
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
