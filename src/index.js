import Game from './modules/game.js';
import View from './modules/view.js';
import Controller from './modules/controller.js';
import './index.html';
import './style.css';

const game = new Game();
const view = new View();
const tetris = new Controller(game, view);

tetris.startGame();