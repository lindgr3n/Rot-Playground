import './styles.css';

import * as Game from './refactored/Game'

if (module.hot) {
  module.hot.accept(function () {
    location.reload();
  });
}

Game.init();
