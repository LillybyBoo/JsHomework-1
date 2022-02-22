const $arenas = document.querySelector('.arenas');

const $subButton = document.querySelector('.button');

const $formFight = document.querySelector('.control');

const HIT = {
    head: 30,
    body: 25,
    foot: 20,
}

const ATTACK = ['head', 'body', 'foot'];

const player1 = {
    player: 1,
    name: 'Scorpion',
    hp: 100,
    img: 'http://reactmarathon-api.herokuapp.com/assets/scorpion.gif',
    weapon: ['Zin-rokh', 'Ashbringer', 'Armageddon'],
    changeHp,
    renderHp,
    elHp,
    // attack: attack,
}

const player2 = {
    player: 2,
    name: 'Sonya',
    hp: 100,
    img: 'http://reactmarathon-api.herokuapp.com/assets/sonya.gif',
    weapon: ['Zin-rokh', 'Ashbringer', 'Armageddon'],
    changeHp,
    renderHp,
    elHp,
    // attack: attack,
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

// function attack() {
//     console.log(this.name + ' ' + 'Fight...');
// }

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
    $restartButton.addEventListener('click', function () {
        window.location.reload();
    })
    $reloadWrap.appendChild($restartButton);
    $arenas.appendChild($reloadWrap);
}

function results(player1, player2) {
    if (player1.hp === 0 || player2.hp === 0) {
        $subButton.disabled = true;
        createReloadButton();
    }
    if (player1.hp === 0 && player1.hp < player2.hp) {
        $arenas.appendChild(playerWin(player2.name));
    } else if (player2.hp === 0 && player2.hp < player1.hp) {
        $arenas.appendChild(playerWin(player1.name));
    } else if (player1.hp === 0 && player2.hp === 0) {
        $arenas.appendChild(playerWin());
    }
}

$arenas.appendChild(createPlayer(player1));
$arenas.appendChild(createPlayer(player2));

function playerAttack(playerTurn) {
    const attack = {
        value: 0,
        hit: '',
        defence: '',
    }
    if (playerTurn) {
        for (let item of playerTurn) {
            if (item.checked && item.name === 'hit') {
                attack.value = randomHp(HIT[item.value]);
                attack.hit = item.value;
            }
            if (item.checked && item.name === 'defence') {
                attack.defence = item.value;
            }
            item.checked = false;
        }
    }
    return attack;
}

function enemyAttack() {
    const hit = ATTACK[randomHp(3) - 1];
    const defence = ATTACK[randomHp(3) - 1];

    return {
        value: randomHp(HIT[hit]),
        hit,
        defence,
    };
}

function battle(player1, player2) {
    const enemy = enemyAttack();
    const player = playerAttack($formFight);

    if (player.hit !== enemy.defence) {
        player2.changeHp(player.value);

    }
    if (enemy.hit !== player.defence) {
        player1.changeHp(player.value);
    }
}

$formFight.addEventListener('submit', function (event) {
    event.preventDefault();

    battle(player1, player2);

    player1.renderHp();
    player2.renderHp();

    results(player1, player2);
})
 

















