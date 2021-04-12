import './styles.css';

// import * as Game from './refactored/Game'
import GameManager from './GameManager'

if (module.hot) {
  module.hot.accept(function () {
    location.reload();
  });
}

// Game.init();
const game = new GameManager();
game.init();

