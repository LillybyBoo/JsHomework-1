import {createElement} from './func.js';

export class Player {
    constructor(props) {
        this.player = props.player;
        this.name = props.name;
        this.hp = props.hp;
        this.img = props.img;
        this.selector = `player${this.player}`;
        this.rootSelector = props.rootSelector;
    }

    changeHp = (point) => {
        this.hp -= point;
        if (this.hp <= 0) {
            this.hp = 0;
        }
    }

    elHp = () => {
        return document.querySelector(`.${this.selector} .life`);
    }

    renderHp = () => {
        this.elHp().style.width = `${this.hp}%`;
    }

    createPlayer = () => {
        const $player = createElement('div', this.selector);
        const $progressbar = createElement('div', 'progressbar');
        const $character = createElement('div', 'character');
        const $life = createElement('div', 'life');
        const $name = createElement('div', 'name');
        const $img = createElement('img');


        $life.style.width = `${this.hp}%`;
        $name.innerText = this.name;
        $img.src = this.img;

        $progressbar.appendChild($name);
        $progressbar.appendChild($life);

        $character.appendChild($img);

        $player.appendChild($progressbar);
        $player.appendChild($character);

        const $root = document.querySelector(`.${this.rootSelector}`);
        $root.appendChild($player);

        return $player;
    }
}