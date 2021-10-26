function changeHP(damage) {
  this.hp -= damage;
  if (this.hp < 0) this.hp = 0;
}

function elHP() {
  return document.querySelector(`.player${this.player} .life`);
}

function renderHP() {
  this.elHP().style.width = `${this.hp}%`;
}

export {changeHP, elHP, renderHP};

