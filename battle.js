import {ATTACK, HIT, LOGS} from './consts.js';
import Player from './players.js';
import {createElement, pullTime, randomNum} from './func.js';


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

    }

    getPlayer = async () => {
        const hero = fetch('https://reactmarathon-api.herokuapp.com/api/mk/players').then(res => res.json());
        return hero;
    }
    getRandomPlayer = async () => {
        const twink = await fetch('https://reactmarathon-api.herokuapp.com/api/mk/player/choose').then(res => res.json())
        return twink
    }

    start = async () => {

        this.player1 = new Player({
            ...JSON.parse(localStorage.getItem('player1')),
            player: 1,
            rootSelector: 'arenas',
        })

        this.player2 = new Player({
            ...await this.getRandomPlayer(),
            player: 2,
            rootSelector: 'arenas',
        })

        this.player1.createPlayer()
        this.player2.createPlayer()

        this.enterPlayers(this.player1, this.player2)

    }

    enterPlayers = () => {
        this.logMessage('start', this.player1.name, this.player2.name);
        this.control.addEventListener('submit', this.damageDone(this.player1, this.player2));
    };

    getAttack = async (hit, defence) => {
        const attackInfo = fetch('https://reactmarathon-api.herokuapp.com/api/mk/player/fight', {
            method: 'POST',
            body: JSON.stringify({
                hit,
                defence,
            })
        }).then(res => res.json());

        return attackInfo;
    }


    playerAttack = () => {
        const attack = {};

        for (let item of this.control) {
            if (item.checked && item.name === 'hit') {
                attack.hit = item.value
            }
            ;

            if (item.checked && item.name === 'defence') {
                attack.defence = item.value
            }
            ;

            item.checked = false
        }
        ;

        return attack;
    }
    damageDone = () => {
        this.control.addEventListener('submit', async (e) => {
            e.preventDefault();

            const attack = this.playerAttack();
            const attackLog = await this.getAttack(attack.hit, attack.defence);

            if (attack.hit != attackLog.player2.defence) {
                this.player2.changeHp(attackLog.player1.value);
                this.player2.renderHp();
                this.logMessage('hit', attackLog.player1.value, this.player2.hp);
            } else if (attack.hit === attackLog.player2.defence) {
                this.logMessage('defence', 0, this.player1.hp);
            }

            if (attackLog.player2.hit != attack.defence) {
                this.player1.changeHp(attackLog.player2.value);
                this.player1.renderHp();
                this.logMessage('hit', attackLog.player2.value, this.player1.hp);
            } else if (attackLog.player2.hit === attack.defence) {
                this.logMessage('defence', 0, this.player2.hp);
            }

            this.results();
        })
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

    playerWin = (name) => {
        const winTitle = createElement('div', 'winTitle');

        if (name) {
            winTitle.innerText = name + ' wins';
        } else {
            winTitle.innerText = ' draw';
        }

        return winTitle;
    };


    createReloadButton = () => {
        const $reloadWrap = createElement('div', 'reloadWrap');
        const $restartButton = createElement('button', 'button');

        $restartButton.innerText = 'Restart';
        $restartButton.addEventListener('click', function () {
            window.location.pathname = 'index.html'
        })
        $reloadWrap.appendChild($restartButton);
        this.root.appendChild($reloadWrap);
    }


    logMessage = (logType, damage, hp) => {
        let logText;

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
            case 'defence':
                logText = textType;
                logText = logText.replace('[playerKick]', this.player2.name);
                logText = logText.replace('[playerDefence]', this.player1.name);
                logText = `${hours}:${minutes}:${seconds}` + '  ' + `${logText}` + ` урон ${damage}, здоровье  ${hp}/100  `;
                break;
            case 'draw':
                logText = textType;
                logText = `${hours}:${minutes}:${seconds}` + '  ' + `${logText}`;
                break;

        }
        this.chat.insertAdjacentHTML('afterbegin', `<p>${logText}</p>`)
    }
} 


