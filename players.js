import { createElement } from "./utils.js";

export class Player {
  constructor(properties) {
    this.player = properties.player;
    this.name = properties.name;
    this.hp = properties.hp;
    this.img = properties.img;
    this.weapon = properties.weapon;
  }

  attack = () => {
    console.log(`${this.name} Fight...`);
  }

  changeHP = (damage) => {
    this.hp -= damage;
    if (this.hp < 0) this.hp = 0;
  }
  
  elHP = () => {
    return document.querySelector(`.player${this.player} .life`);
  }

  renderHP = () => {
    this.elHP().style.width = `${this.hp}%`;
  }

  createPlayerInDOM = () => {
    const $newPlayer = createElement("div", `player${this.player}`);
    const $progress = createElement("div", "progressbar");
    const $newPlayerLife = createElement("div", "life");
    const $newPlayerName = createElement("div", "name");
    const $newCharacter = createElement("div", "character");
    const $newCharacterImg = createElement("img");

    $newPlayerLife.style.width = `${this.hp}%`;
    $newPlayerName.textContent = this.name;
    $newCharacterImg.src = this.img;

    $progress.appendChild($newPlayerName);
    $progress.appendChild($newPlayerLife);

    $newCharacter.appendChild($newCharacterImg);

    $newPlayer.appendChild($progress);
    $newPlayer.appendChild($newCharacter);

    return $newPlayer;
  }
}
