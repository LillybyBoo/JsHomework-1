const $arenas = document.querySelector('.arenas');

const $randomButton = document.querySelector('.button');

const player1 = {
    player: 1,
    name: 'Scorpion',
    hp: 100,
    img: 'http://reactmarathon-api.herokuapp.com/assets/scorpion.gif',
    weapon: ['Zin-rokh', 'Ashbringer', 'Armageddon'],
    attack: function(){
        console.log(this.name +' '+ 'Fight...')
    },
    };

const player2 = {
    player: 2,
    name: 'Sonya',
    hp: 100,
    img: 'http://reactmarathon-api.herokuapp.com/assets/sonya.gif',
    weapon: ['Zin-rokh', 'Ashbringer', 'Armageddon'],
    attack: function(){
        console.log(this.name +' '+ 'Fight...')
    },
    };

    function createElement (tag, className) {
        const $tag = document.createElement(tag);
        if (className) {
            $tag.classList.add(className);  
        }
        return $tag;
    }

    function createPlayer(playerObj) {
        const $player = createElement('div', 'player'+playerObj.player);
        const $progressbar = createElement('div','progressbar');
        const $character = createElement('div', 'character');
        const $life = createElement('div','life');
        const $name = createElement('div', 'name');
        const $img = createElement('img');


        $life.style.width = playerObj.hp;
        $name.innerText = playerObj.name;
        $img.src = playerObj.img;

        $progressbar.appendChild($name);
        $progressbar.appendChild($life);

        $character.appendChild($img);

        $player.appendChild($progressbar);
        $player.appendChild($character);

        return $player;
    }

    function changeHP(player) {
        const $playerLife = document.querySelector('.player'+ player.player +' .life');
        player.hp = Math.floor(Math.random() * (player.hp - 0 + 1)) + 0;
        $playerLife.style.width = player.hp + '%';

        if (player.hp < 1) {
            
            $arenas.appendChild(playerlose(player.name));
        }
        
    }

      
    $randomButton.addEventListener('click', function () {
        changeHP(player1);
        changeHP(player2);
    })




    function playerlose(name) {
        const $loseTitle = createElement('div', 'loseTitle');
        $loseTitle.innerText = name +' lose';

        return $loseTitle;
    }

    // function playerWin(name) {
    //     const $winTitle = createElement('div', 'winTitle');
    //     $winTitle.innerText = name +' win';
        
    //     return $winTitle;
    // }

    $arenas.appendChild(createPlayer(player1));
    $arenas.appendChild(createPlayer(player2));
      
 

















