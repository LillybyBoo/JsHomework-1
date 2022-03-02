import {LOGS} from "./logs.js";
import {player1, player2} from "./players.js";
import {randomNum, createElement} from "./func.js";
import {$formFight} from "./main.js";

export const $arenas = document.querySelector('.arenas');

export const $subButton = document.querySelector('.button');

export const $chat = document.querySelector('.chat');

const HIT = {
    head: 30,
    body: 25,
    foot: 20,
}

const ATTACK = ['head', 'body', 'foot'];

function enemyAttack() {
    const hit = ATTACK [randomNum(0, 2)];
    const defence = ATTACK [randomNum(0, 2)];

    return {
        value: randomNum(0, HIT[hit]),
        hit,
        defence,
    };
}

function playerAttack(playerTurn) {
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

export const logMessage = (logType) => {

    let logText = '';
    const time = new Date();
    const hours = pullTime(time.getHours());
    const minutes = pullTime(time.getMinutes());
    const seconds = pullTime(time.getSeconds());

    const textType = logType.includes('start', 'draw') ? LOGS[logType] : LOGS[logType][randomNum(0, LOGS[logType].length - 1)];

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

const playerWin = (name) => {
    const $winTitle = createElement('div', 'winTitle');
    if (name) {
        $winTitle.innerText = name + ' win';
    } else {
        $winTitle.innerText = 'draw';
    }
    return $winTitle;
}

export const createReloadButton = () => {
    const $reloadWrap = createElement('div', 'reloadWrap');
    const $restartButton = createElement('button', 'button');

    $restartButton.innerText = 'Restart';
    $restartButton.addEventListener('click', function () {
        window.location.reload();
    })
    $reloadWrap.appendChild($restartButton);
    $arenas.appendChild($reloadWrap);
}

export const results = () => {
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

export function battle(player1, player2) {
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

function pullTime(str) {
    return +str < 10 ? `0${str}` : str
}


results();
