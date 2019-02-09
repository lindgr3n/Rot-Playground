
import { Display } from 'rot-js';

class RendererManager {
  constructor({config} = {}) { 
    this.d = null;
    this.config = config || null;
    this.out1;
    this.out2;

    this.init();
  }

  init() {
    this.out1 = document.createElement('div');
    this.out2 = document.createElement('div');
    document.getElementById('debug').appendChild(this.out1);
    document.getElementById('debug').appendChild(this.out2);
  
    this.d = new Display(this.config);
    document.getElementById('game').appendChild(this.d.getContainer());
  }

  renderInventory({inventory}) {
    const inventoryItemsDiv = document.querySelector('.inventory-items');
    const lis = Object.keys(inventory).map(
      key => `<li>${key}: ${inventory[key]}</li>`
    );
    inventoryItemsDiv.innerHTML = `<ul>${lis.join()}</ul>`;
  }

  renderGameInfo({level}) {
    const levelElement = document.querySelector('.game .level')
    levelElement.innerHTML = level;
  }

  drawTiles({map}) {
    const height = map.length;    
    for (let j = 0; j < height; j++) {
      const width = map[j].length;
      for (let i = 0; i < width; i++) {
        var tile = map[j][i];
        this.d.draw(i, j, tile.tag, tile.color);
      }
    }
  }

  drawObjects({objects}) {
    if(!objects) {
      return;
    }
    objects.forEach(object =>
      this.d.draw(object.x, object.y, object.tag, object.color)
    );
  }
  
  drawPlayers({players}) {
    if(!players) {
      return;
    }
    players.forEach(object =>
      this.d.draw(object.x, object.y, object.tag, object.color)
    );
  }
  
  renderDebug(config) {
    const {code, vk, player, map} = config;
    this.out1.innerHTML = 'Keydown: code is ' + code + ' (' + vk + ')';
    this.out2.innerHTML =
      'Standing on: ' + JSON.stringify(map[player.y][player.x]);
  }
}

export default RendererManager;