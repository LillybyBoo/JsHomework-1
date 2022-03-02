const $arenas = document.querySelector('.arenas');

const $subButton = document.querySelector('.button');

const $formFight = document.querySelector('.control');

const $chat = document.querySelector('.chat');

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

const createReloadButton = () => {
    const $reloadWrap = createElement('div', 'reloadWrap');
    const $restartButton = createElement('button', 'button');

    $restartButton.innerText = 'Restart';
    $restartButton.addEventListener('click', function () {
        window.location.reload();
    })
    $reloadWrap.appendChild($restartButton);
    $arenas.appendChild($reloadWrap);
}

const createElement = (tag, className) => {
    const $tag = document.createElement(tag);
    if (className) {
        $tag.classList.add(className);
    }

    return $tag;
}

const createPlayer = (player) => {
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

const enemyAttack = () => {
    const hit = ATTACK [randomNum(0, 2)];
    const defence = ATTACK [randomNum(0, 2)];

    return {
        value: randomNum(0, HIT[hit]),
        hit,
        defence,
    };
}

const playerAttack = (playerTurn) => {
    const attack = {
        value: 0,
        hit: '',
        defence: '',
    }
    if (playerTurn) {
        for (let item of playerTurn) {
            if (item.checked && item.name === 'hit') {
                attack.value = randomNum(0, HIT[item.value]);
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

const playerWin = (name) => {
    const $winTitle = createElement('div', 'winTitle');
    if (name) {
        $winTitle.innerText = name + ' win';
    } else {
        $winTitle.innerText = 'draw';
    }
    return $winTitle;
}

const results = () => {
    if (player1.hp === 0 || player2.hp === 0) {
        $subButton.disabled = true;
        createReloadButton();
    }
    if (player1.hp === 0 && player1.hp < player2.hp) {
        $arenas.appendChild(playerWin(player2.name));
        logMessage('end');

    } else if (player2.hp === 0 && player2.hp < player1.hp) {
        $arenas.appendChild(playerWin(player1.name));
        logMessage('end');

    } else if (player1.hp === 0 && player2.hp === 0) {
        $arenas.appendChild(playerWin());
        logMessage('draw');
    }
}

const randomNum = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const HIT = {
    head: 30,
    body: 25,
    foot: 20,
}

const ATTACK = ['head', 'body', 'foot'];

const arrLogs = {
    start: 'Часы показывали [time], когда [player1] и [player2] бросили вызов друг другу.',
    end: [
        'Результат удара [playerWins]: [playerLose] - труп',
        '[playerLose] погиб от удара бойца [playerWins]',
        'Результат боя: [playerLose] - жертва, [playerWins] - убийца',
    ],
    hit: [
        '[playerDefence] пытался сконцентрироваться, но [playerKick] разбежавшись раздробил копчиком левое ухо врага.',
        '[playerDefence] расстроился, как вдруг, неожиданно [playerKick] случайно раздробил грудью грудину противника.',
        '[playerDefence] зажмурился, а в это время [playerKick], прослезившись, раздробил кулаком пах оппонента.',
        '[playerDefence] чесал <вырезано цензурой>, и внезапно неустрашимый [playerKick] отчаянно размозжил грудью левый бицепс оппонента.',
        '[playerDefence] задумался, но внезапно [playerKick] случайно влепил грубый удар копчиком в пояс оппонента.',
        '[playerDefence] ковырялся в зубах, но [playerKick] проснувшись влепил тяжелый удар пальцем в кадык врага.',
        '[playerDefence] вспомнил что-то важное, но внезапно [playerKick] зевнув, размозжил открытой ладонью челюсть противника.',
        '[playerDefence] осмотрелся, и в это время [playerKick] мимоходом раздробил стопой аппендикс соперника.',
        '[playerDefence] кашлянул, но внезапно [playerKick] показав палец, размозжил пальцем грудь соперника.',
        '[playerDefence] пытался что-то сказать, а жестокий [playerKick] проснувшись размозжил копчиком левую ногу противника.',
        '[playerDefence] забылся, как внезапно безумный [playerKick] со скуки, влепил удар коленом в левый бок соперника.',
        '[playerDefence] поперхнулся, а за это [playerKick] мимоходом раздробил коленом висок врага.',
        '[playerDefence] расстроился, а в это время наглый [playerKick] пошатнувшись размозжил копчиком губы оппонента.',
        '[playerDefence] осмотрелся, но внезапно [playerKick] робко размозжил коленом левый глаз противника.',
        '[playerDefence] осмотрелся, а [playerKick] вломил дробящий удар плечом, пробив блок, куда обычно не бьют оппонента.',
        '[playerDefence] ковырялся в зубах, как вдруг, неожиданно [playerKick] отчаянно размозжил плечом мышцы пресса оппонента.',
        '[playerDefence] пришел в себя, и в это время [playerKick] провел разбивающий удар кистью руки, пробив блок, в голень противника.',
        '[playerDefence] пошатнулся, а в это время [playerKick] хихикая влепил грубый удар открытой ладонью по бедрам врага.',
    ],
    defence: [
        '[playerKick] потерял момент и храбрый [playerDefence] отпрыгнул от удара открытой ладонью в ключицу.',
        '[playerKick] не контролировал ситуацию, и потому [playerDefence] поставил блок на удар пяткой в правую грудь.',
        '[playerKick] потерял момент и [playerDefence] поставил блок на удар коленом по селезенке.',
        '[playerKick] поскользнулся и задумчивый [playerDefence] поставил блок на тычок головой в бровь.',
        '[playerKick] старался провести удар, но непобедимый [playerDefence] ушел в сторону от удара копчиком прямо в пятку.',
        '[playerKick] обманулся и жестокий [playerDefence] блокировал удар стопой в солнечное сплетение.',
        '[playerKick] не думал о бое, потому расстроенный [playerDefence] отпрыгнул от удара кулаком куда обычно не бьют.',
        '[playerKick] обманулся и жестокий [playerDefence] блокировал удар стопой в солнечное сплетение.'
    ],
    draw: 'Ничья - это тоже победа!'
};
const logMessage = (logType) => {

    let logText = '';
    const time = new Date();
    const hours = pullTime(time.getHours());
    const minutes = pullTime(time.getMinutes());
    const seconds = pullTime(time.getSeconds());

    const textType = logType.includes('start', 'draw') ? arrLogs[logType] : arrLogs[logType][randomNum(0, arrLogs[logType].length - 1)];

    switch (logType) {
        case 'start':
            logText = textType;
            logText = logText.replace('[time]', `${hours}:${minutes}:${seconds}`);
            logText = logText.replace('[player1]', player1.name);
            logText = logText.replace('[player2]', player2.name);
            break;

        case 'end':
            logText = textType;
            logText = logText.replace('[playerWins]', player1.name);
            logText = logText.replace('[playerLose]', player2.name);
            break;

        case 'hit':
            logText = textType;
            logText = logText.replace('[playerKick]', player1.name);
            logText = logText.replace('[playerDefence]', player2.name);
            logText = `${hours}:${minutes}:${seconds}` + '  ' + `${logText}` + ` ${player1.name} : здоровье ${player1.hp} / 100.`;
            break;
        case 'defence':
            logText = textType;
            logText = logText.replace('[playerKick]', player2.name);
            logText = logText.replace('[playerDefence]', player1.name);
            logText = `${hours}:${minutes}:${seconds}` + '  ' + `${logText}` + ` ${player2.name} : здоровье ${player2.hp} / 100.`;
            break;

        case 'draw':
            break;
    }
    $chat.insertAdjacentHTML('afterbegin', `<p>${logText}</p>`)
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

function pullTime(str) {
    return +str < 10 ? `0${str}` : str
}

function battle(player1, player2) {
    const enemy = enemyAttack();
    const player = playerAttack($formFight);

    const dmg1 = player.hit === enemy.defence ? 0 : enemy.value;
    const dmg2 = enemy.hit === player.defence ? 0 : player.value;

    player1.changeHp(dmg1);
    player2.changeHp(dmg2);


    logMessage('hit');
    logMessage('defence');

    player1.renderHp(dmg1);
    player2.renderHp(dmg2);
}

$formFight.addEventListener('submit', function (event) {
    event.preventDefault();

    battle(player1, player2);


    results();
})

$arenas.appendChild(createPlayer(player1));
$arenas.appendChild(createPlayer(player2));

logMessage('start', player1, player2);










