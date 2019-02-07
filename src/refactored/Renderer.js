
import { Display } from 'rot-js';

let d = null;
let config = null;
let out1;
let out2;

export function init({config}) {
  config = config;
  // Setup
  out1 = document.createElement('div');
  out2 = document.createElement('div');
  document.getElementById('debug').appendChild(out1);
  document.getElementById('debug').appendChild(out2);

  d = new Display(config);
  document.getElementById('game').appendChild(d.getContainer());

}

export function renderInventory({inventory}) {
  const inventoryItemsDiv = document.querySelector('.inventory-items');
  const lis = Object.keys(inventory).map(
    key => `<li>${key}: ${inventory[key]}</li>`
  );
  inventoryItemsDiv.innerHTML = `<ul>${lis.join()}</ul>`;
}

export function drawTiles({map}) {
  const height = map.length;
  for (let j = 0; j < height; j++) {
    const width = map[j].length;
    for (let i = 0; i < width; i++) {
      var tile = map[j][i];
      d.draw(i, j, tile.tag, tile.color);
    }
  }
}

export function drawObjects({objects}) {
  objects.forEach(object =>
    d.draw(object.x, object.y, object.tag, object.color)
  );
}

export function drawPlayers({players}) {
  players.forEach(object =>
    d.draw(object.x, object.y, object.tag, object.color)
  );
}

export function renderDebug(config) {
  const {code, vk, player, map} = config;
  out1.innerHTML = 'Keydown: code is ' + code + ' (' + vk + ')';
  out2.innerHTML =
    'Standing on: ' + JSON.stringify(map[player.y][player.x]);
}