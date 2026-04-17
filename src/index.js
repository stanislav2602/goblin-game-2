import './style.css';
import goblin from './img/goblin.png';
import './img/hammer.svg';
import Board from './js/board';
import Goblin from './js/goblin';
import Game from './js/game';

const board = new Board(document.getElementById('board'));
const game = new Game(
    board,
    new Goblin(goblin),
    document.getElementById('score'),
    document.getElementById('missed'),
    document.getElementById('message')
);
game.start();