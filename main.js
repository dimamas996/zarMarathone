const arena = document.querySelector('.arenas');

const player1 = {
    name: 'Lui Kang',
    hp: 100,
    img: 'http://reactmarathon-api.herokuapp.com/assets/liukang.gif',
    weapon: ['AK-47', 'Katana'],
    attack: function() {
    console.log(this.name + ' ' + 'fight');    
    }
    }

    const player2 = {
        name: 'Kitana',
        hp: 100,
        img: 'http://reactmarathon-api.herokuapp.com/assets/kitana.gif',
        weapon: ['Glock', 'Knife'],
        attack: function() {
        console.log(this.name + ' ' + 'fight');       
        }
        }
    

function createPlayer(playerClass, playerObj) {
    const newPlayer = document.createElement('div');
    newPlayer.classList.add(playerClass);

    const progress = document.createElement('div');
    progress.classList.add('progressbar');

    const newPlayerLife = document.createElement('div');
    newPlayerLife.classList.add('life');
    newPlayerLife.textContent = playerObj.hp;
    const newPlayerName = document.createElement('div');
    newPlayerName.classList.add('name');
    newPlayerName.textContent = playerObj.name;

    progress.appendChild(newPlayerLife);
    progress.appendChild(newPlayerName);

    const newCharacter = document.createElement('div');
    newCharacter.classList.add('character');
    const newCharacterImg = document.createElement('img');
    newCharacterImg.src = playerObj.img;

    newCharacter.appendChild(newCharacterImg);

    newPlayer.appendChild(progress);
    newPlayer.appendChild(newCharacter);
    arena.appendChild(newPlayer);
}

createPlayer('player1', player1);
createPlayer('player2', player2);