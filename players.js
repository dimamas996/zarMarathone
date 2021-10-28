import {changeHP, elHP, renderHP} from "./playerMethods.js";

export const player1 = {
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

export const player2 = {
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
