const $arenas = document.querySelector('.arenas');
const $randomButton = document.querySelector('.button');

const player1 = {
    player: 1,
    name: 'Scorpion',
    hp: 100,
    img: 'http://reactmarathon-api.herokuapp.com/assets/scorpion.gif',
    weapon: ['Zin-rokh', 'Ashbringer', 'Armageddon'],
    changeHp: changeHp,
    renderHp: renderHp,
    elHp: elHp,
    attack: function () {
        console.log(this.name + ' ' + 'Fight...');
    }
}

const player2 = {
    player: 2,
    name: 'Sonya',
    hp: 100,
    img: 'http://reactmarathon-api.herokuapp.com/assets/sonya.gif',
    weapon: ['Zin-rokh', 'Ashbringer', 'Armageddon'],
    changeHp: changeHp,
    renderHp: renderHp,
    elHp: elHp,
    attack: function () {
        console.log(this.name + ' ' + 'Fight...');
    }
}

function createElement(tag, className) {
    const $tag = document.createElement(tag);
    if (className) {
        $tag.classList.add(className);
    }

    return $tag;
}

function createPlayer(player) {
    const $player = createElement('div', 'player' + player.player);
    const $progressbar = createElement('div', 'progressbar');
    const $character = createElement('div', 'character');
    const $life = createElement('div', 'life');
    const $name = createElement('div', 'name');
    const $img = createElement('img');


    $life.style.width = player.hp + '%';
    $name.innerText = player.name;
    $img.src = player.img;

    $progressbar.appendChild($name);
    $progressbar.appendChild($life);

    $character.appendChild($img);

    $player.appendChild($progressbar);
    $player.appendChild($character);

    return $player;
}

function randomHp(hp) {
    return Math.ceil(Math.random() * hp);
}

function changeHp(point) {
    this.hp -= point;

    if (this.hp < 0) {
        this.hp = 0;
    }
}

function elHp() {
    return document.querySelector('.player' + this.player + ' .life');
}

function renderHp() {
    return this.elHp().style.width = this.hp + '%';
}

function playerWin(name) {
    const $winTitle = createElement('div', 'winTitle');

    if (name) {
        $winTitle.innerText = name + ' win';
    } else {
        $winTitle.innerText = 'draw';
    }
    return $winTitle;
}

function createReloadButton() {
    const $reloadWrap = createElement('div', 'reloadWrap');
    const $restartButton = createElement('button', 'button');
    $restartButton.innerText = 'Restart';
    $reloadWrap.appendChild($restartButton);

    return $reloadWrap;

}

$randomButton.addEventListener('click', function () {
        player1.changeHp(randomHp(20));
        player2.changeHp(randomHp(20));
        player1.renderHp();
        player2.renderHp();

        if (player1.hp === 0 || player2.hp === 0) {
            $randomButton.disabled = true;

            const $restartButton = createReloadButton();
            $arenas.appendChild($restartButton);

            $restartButton.addEventListener('click', function () {
                window.location.reload();
            })
        }

        if (player1.hp === 0 && player1.hp < player2.hp) {
            $arenas.appendChild(playerWin(player2.name));
        } else if (player2.hp === 0 && player2.hp < player1.hp) {
            $arenas.appendChild(playerWin(player1.name));
        } else if (player1.hp === 0 && player2.hp === 0) {
            $arenas.appendChild(playerWin());
        }
    }
)


$arenas.appendChild(createPlayer(player1));
$arenas.appendChild(createPlayer(player2));
      
 

















