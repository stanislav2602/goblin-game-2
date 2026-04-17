import './style.css';
import goblinImg from './img/goblin.png';
import './img/hammer.svg';
import Board from './js/board'
import Goblin from './js/goblin';
import Game from './js/game';

const boardElement = document.getElementById('board');
const scoreEl = document.getElementById('score');
const missedEl = document.getElementById('missed');
const msgEl = document.getElementById('message');

const board = new Board(boardElement);
const goblin = new Goblin(goblinImg);
const game = new Game(board, goblin, scoreEl, missedEl, msgEl);

game.start();