const playerOne = {
    name: 'Scorpion',
    hp: 100,
    img: 'http://reactmarathon-api.herokuapp.com/assets/scorpion.gif',
    weapon: ['Zin-rokh', 'Ashbringer', 'Armageddon'],
    attack: function(){
        console.log(this.name +' '+ 'Fight...')
    },
    };

const playerTwo = {
    name: 'Sonya',
    hp: 100,
    img: 'http://reactmarathon-api.herokuapp.com/assets/sonya.gif',
    weapon: ['Zin-rokh', 'Ashbringer', 'Armageddon'],
    attack: function(){
        console.log(this.name +' '+ 'Fight...')
    },
    };
function createPlayer() {
    const $player1 = document.createElement('div');
    $player1.classList.add('player1');
    const $arenas = document.querySelector('.arenas');
    $arenas.appendChild($player1);
    const $progress = document.createElement('div');
    $progress.classList.add('progressbar');
    $player1.appendChild($progress);
    const $char = document.createElement('div');
    $char.classList.add('character');
    $player1.appendChild($char);
    const $life = document.createElement('div');
    $life.classList.add('life');
    $life.style.widht = '100%';
    $progress.appendChild($life);
    const $name = document.createElement('div');
    $name.innerText = 'Scorpion'
    $name.classList.add('name');
    $progress.appendChild($name);
    const $img = document.createElement('img');
    $img.src = 'http://reactmarathon-api.herokuapp.com/assets/scorpion.gif';
    $char.appendChild($img);
  
}







