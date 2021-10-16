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

function playerWin(condition) {
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
    case "drawngame":
      $winTitle.innerText = "NO WINNER...";
      characterOne.classList.add("winner");
      characterTwo.classList.add("winner");
      break;
  };
    
  $randomButton.removeEventListener("click", changeHP);
  $randomButton.innerText = "RESTART"
  $randomButton.addEventListener("click", restart);

  return $winTitle;
}

function restart() {  
  location.reload();  
}

function random() {
  return Math.floor(Math.random() * 20 + 1);
}

function changeHP() {
  const $player1Life = document.querySelector(".player1 .life");
  const $player2Life = document.querySelector(".player2 .life");

  player1.hp -= random();
  player2.hp -= random();

  if (player1.hp < 0) player1.hp = 0;
  if (player2.hp < 0) player2.hp = 0;

  $player1Life.style.width = player1.hp + "%";
  $player2Life.style.width = player2.hp + "%";

  if (player1.hp === 0 && player1.hp < player2.hp) $arena.appendChild(playerWin("player2"));
  if (player2.hp === 0 && player1.hp > player2.hp) $arena.appendChild(playerWin("player1"));
  if (player1.hp === 0 && player2.hp === 0) $arena.appendChild(playerWin("drawngame"));  
}

$randomButton.addEventListener("click", changeHP);

$arena.appendChild(createPlayer(player1));
$arena.appendChild(createPlayer(player2));
