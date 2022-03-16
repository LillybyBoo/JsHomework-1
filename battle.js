import {LOGS, HIT, ATTACK} from './consts.js';
import {Player} from './players.js';
import {randomNum, createElement, pullTime} from './func.js';

const $fightButton = document.querySelector('.button');
const $arenas = document.querySelector('.arenas');
const $chat = document.querySelector('.chat');
const $formFight = document.querySelector('.control');

export class Game {
    constructor() {
        this.button = $fightButton
        this.chat = $chat;
        this.root = $arenas;
        this.control = $formFight;

        this.player1 = new Player({
            player: 1,
            name: 'Scorpion',
            hp: 100,
            img: 'http://reactmarathon-api.herokuapp.com/assets/scorpion.gif',
            rootSelector: 'arenas'
        })

        this.player2 = new Player({
            player: 2,
            name: 'Sonya',
            hp: 100,
            img: 'http://reactmarathon-api.herokuapp.com/assets/sonya.gif',
            rootSelector: 'arenas'
        })
    }

    start = () => {
        this.root.appendChild(this.player1.createPlayer());
        this.root.appendChild(this.player2.createPlayer());

        this.logMessage('start', this.player1, this.player2);

        this.battle(this.player1, this.player2);

    }

    enemyAttack = () => {
        const hit = ATTACK [randomNum(0, 2)];
        const defence = ATTACK [randomNum(0, 2)];

        return {
            value: randomNum(0, HIT[hit]),
            hit,
            defence,
        };
    }

    playerAttack = () => {
        const attack = {
            value: 0,
            hit: '',
            defence: '',
        }
        for (let item of this.control) {
            if (item.checked && item.name === 'hit') {
                attack.value = randomNum(0, HIT[item.value]);
                attack.hit = item.value;
            }
            if (item.checked && item.name === 'defence') {
                attack.defence = item.value;
            }
            item.checked = false;
        }

        return attack;
    }

    logMessage = (logType, damage) => {
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
                logText = logText.replace('[player1]', this.player1.name);
                logText = logText.replace('[player2]', this.player2.name);
                break;

            case 'end':
                logText = textType;
                logText = logText.replace('[playerWins]', this.player1.name);
                logText = logText.replace('[playerLose]', this.player2.name);
                break;

            case 'hit':
                logText = textType;
                logText = logText.replace('[playerKick]', this.player1.name);
                logText = logText.replace('[playerDefence]', this.player2.name);
                logText = `${hours}:${minutes}:${seconds}` + '  ' + `${logText}` + ` ${this.player1.name} урон  ${damage} : здоровье ${this.player1.hp} / 100.`;
                break;

            case 'defence':
                logText = textType;
                logText = logText.replace('[playerKick]', this.player2.name);
                logText = logText.replace('[playerDefence]', this.player1.name);
                logText = `${hours}:${minutes}:${seconds}` + '  ' + `${logText}` + ` ${this.player2.name} урон  ${damage} : здоровье ${this.player2.hp} / 100.`;
                break;

            case 'draw':
                break;
        }
        this.chat.insertAdjacentHTML('afterbegin', `<p>${logText}</p>`)
    }

    battle = () => {
        this.control.addEventListener('submit', (e) => {
            e.preventDefault();

            const enemy = this.enemyAttack();
            const player = this.playerAttack(this.control);

            const dmg1 = player.hit === enemy.defence ? 0 : enemy.value;
            const dmg2 = enemy.hit === player.defence ? 0 : player.value;

            this.player1.changeHp(dmg1);
            this.player2.changeHp(dmg2);

            this.logMessage('hit', enemy.value, player.value);
            this.logMessage('defence', player.value, enemy.value);

            this.player1.renderHp(dmg1);
            this.player2.renderHp(dmg2);

            this.results()

        })
    }

    playerWin = (name) => {
        const winTitle = createElement('div', 'winTitle');

        if (name) {
            winTitle.innerText = name + ' wins';
        } else {
            winTitle.innerText = name + ' draw';
        }

        return winTitle;
    };

    createReloadButton = () => {
        const $reloadWrap = createElement('div', 'reloadWrap');
        const $restartButton = createElement('button', 'button');

        $restartButton.innerText = 'Restart';
        $restartButton.addEventListener('click', function () {
            window.location.reload();
        })
        $reloadWrap.appendChild($restartButton);
        this.root.appendChild($reloadWrap);
    }

    results() {
        if (this.player1.hp === 0 || this.player2.hp === 0) {
            this.button.disabled = true;
            this.createReloadButton();
        }
        if (this.player1.hp === 0 && this.player1.hp < this.player2.hp) {
            this.root.appendChild(this.playerWin(this.player2.name));
            this.logMessage('end');

        } else if (this.player2.hp === 0 && this.player2.hp < this.player1.hp) {
            this.root.appendChild(this.playerWin(this.player1.name));
            this.logMessage('end');

        } else if (this.player1.hp === 0 && this.player2.hp === 0) {
            this.root.appendChild(this.playerWin());
            this.logMessage('draw');
        }
    }
}