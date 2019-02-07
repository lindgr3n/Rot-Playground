import BoardManager from './BoardManager'
import RendererManager from './RendererManager'
import EntitesManager from './EntitesManager';

class GameManager {
  constructor() {
    this.boardManager = new BoardManager({columns: 25, rows: 15})
    this.rendererManager = new RendererManager();
    this.level = 3;

    this.enemies = [];
    this.enemiesMoving = false;
    this.playersTurn = true;
  }

  init() {
    this.enemies = [];
    this.boardManager.setup(this.level);
    this.render();
  }

  levelLoaded() {
    this.level++;
    this.init();
  }

  update() {
    if(this.playersTurn || this.enemiesMoving) {
      return;
    }

    this.moveEnemies();
    this.render();
  }
  
  render() {
    const objects = EntitesManager.getObjects();
    this.rendererManager.drawTiles({ map: this.boardManager.getBoard() })
    this.rendererManager.drawObjects({objects});
    this.rendererManager.drawPlayers({});
  }

  gameOver() {
    console.log('Nooo')
  }

  moveEnemies() {
    this.enemiesMoving = true;
    
    for(let index = 0; index < this.enemies.length; index++) {
      this.enemies[index].move(); 
    }

    this.playersTurn  = true;
    this.enemiesMoving = false;
  }
}

export default GameManager;