import BoardManager from './BoardManager'
import RendererManager from './RendererManager'
import EntitesManager from './EntitesManager';
import { Wizard } from "./characters/Wizard";
import KeyboardManager from './KeyboardManager'

class GameManager {
  constructor() {
    this.columns = 25;
    this.rows = 15;

    this.boardManager = new BoardManager({columns: this.columns, rows: this.rows, gameManager: this})
    this.rendererManager = new RendererManager();
    this.keyboardManager = new KeyboardManager({gameManager: this});
    this.entitesManager = new EntitesManager();

    this.level = 3;

    this.enemies = [];
    this.players = [];
    this.inventory = {};
    this.enemiesMoving = false;
    this.playersTurn = true;

    document.addEventListener('exit', () => this.levelLoaded())
  }

  init() {
    this.enemies = [];
    this.players = [];
    this.entitesManager.clear();
    
    this.boardManager.setup(this.level);
    this.players.push(Wizard({name: 'Player 1', x: 1, y: this.rows}));
    this.render();
  }

  levelLoaded() {
    this.level++;
    this.init();
  }

  update() {
    this.render();
    if(this.playersTurn || this.enemiesMoving) {
      return;
    }

    this.moveEnemies();
  }
  
  render() {
    const objects = this.entitesManager.getObjects();
    const players = this.players;
    
    this.rendererManager.renderInventory({inventory: this.inventory});
    this.rendererManager.renderGameInfo({level: this.level});
    this.rendererManager.drawTiles({ map: this.boardManager.getBoard() })
    this.rendererManager.drawObjects({objects});
    this.rendererManager.drawPlayers({players});
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

  getPlayer() {
    return this.players[0]
  }

  collision({pos}) {
    this.interact({object: this.getPlayer(), pos});
    this.entitesManager.removeDeadObjects();
    this.update();
  }

  interact({object, pos}) {
    if (!object || !pos) {
      return;
    }
    const target = this.entitesManager.getObjectAt({pos});
    // No object exist carry on
    if (!target) {
      return;
    }
  
    if (target.types.find(type => type === 'exit')) {
      object.exit({target});
    }
  
    if (target.types.find(type => type === 'breakable')) {
      object.chop({target});
      const { loot } = object.loot({target});
      if (loot) {
        if (!this.inventory[loot.type]) {
          this.inventory[loot.type] = 0;
        }
        this.inventory[loot.type] = this.inventory[loot.type] + loot.amount;
      }
    }
    if (target.types.find(type => type === 'enemy')) {
      object.attack({target});
      const { loot } = object.loot({target});
      if (loot) {
        if (!this.inventory[loot.type]) {
          this.inventory[loot.type] = 0;
        }
        this.inventory[loot.type] = this.inventory[loot.type] + loot.amount;
      }
    }
  }

  canMoveTo({player, pos}) {
    if (!player || !pos) {
      return true;
    }
    const object = this.entitesManager.getObjectAt({pos});
    // If there exist a object we know that interaction made it still exist
    if (object) {
      return false;
    }
  
    const tile = this.boardManager.getTileAt({pos});
    // No tile exist allow pass
    if (!tile) {
      return true;
    }
  
    // Type of non passable prevent moving
    if (tile.types.find(type => type === 'block')) {
      return false;
    }
  
    return true;
  }

  getRenderManager() {
    return this.rendererManager;
  }

  getEntitiesManager() {
    return this.entitesManager;
  }

  getBoard() {
    return this.boardManager.getBoard();
  }
}

export default GameManager;