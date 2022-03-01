
import {createPlayer, player1, player2} from "./players.js";
import {$arenas, battle, logMessage, results} from './battle.js';
export const $formFight = document.querySelector('.control');
$formFight.addEventListener('submit', function (event) {
    event.preventDefault();

    battle(player1, player2);

    results();
});
$arenas.appendChild(createPlayer(player1));
$arenas.appendChild(createPlayer(player2));

logMessage('start', player1, player2);






