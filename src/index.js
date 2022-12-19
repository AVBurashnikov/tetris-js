import Game from './modules/game';
import View from './modules/view';
import Controller from './modules/controller';
import './index.html';
import './style.css';

const game = new Game();
const view = new View();
const tetris = new Controller(game, view);

tetris.startGame();