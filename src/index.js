import './styles.css';

import { Display, KEYS } from 'rot-js';
import { hallway, wall } from './tiles.json';
import { Tree } from './objects/Tree';
import { Door } from './objects/Door';
import { Wizard } from "./characters/Wizard";

// Setup
var out1 = document.createElement('div');
var out2 = document.createElement('div');
document.getElementById('debug').appendChild(out1);
document.getElementById('debug').appendChild(out2);

// Map size
let o = {
  width: 25,
  height: 15
};

let d = new Display(o);
document.getElementById('game').appendChild(d.getContainer());

let map = [];
const objects = [];
const players = [];
const inventory = {};

// Add objects
objects.push(Door({ x: 10, y: 10 }));
objects.push(Tree({ x: 10, y: 4, treasure: { type: 'wood', amount: 3 } }));
objects.push(Tree({ x: 8, y: 7, treasure: { type: 'wood', amount: 3 } }));
objects.push(Tree({ x: 8, y: 8, treasure: { type: 'wood', amount: 3 } }));
objects.push(Tree({ x: 8, y: 9, treasure: { type: 'wood', amount: 3 } }));

// Add players
// 0 index is current player
players.push(Wizard({name: 'Player 1', x: 1, y: 1}));

// Create the map
generateMap();
// Render map
update();

function removeDead({target}) {
  // Get index of the provided object
  const foundIndex = objects.findIndex(
    o => o.x === target.x && o.y === target.y
  );

  // Remove it from the objects list
  if (foundIndex > -1) {
    objects.splice(foundIndex, 1);
  }
}

function removeDeadObjects() {
  // Get index of the provided object
  const areDead = objects.filter(o => o.dead);
  areDead.forEach(target => removeDead({target}));
}

function updateInventory() {
  const inventoryItemsDiv = document.querySelector('.inventory-items');
  const lis = Object.keys(inventory).map(
    key => `<li>${key}: ${inventory[key]}</li>`
  );
  inventoryItemsDiv.innerHTML = `<ul>${lis.join()}</ul>`;
}

// Generate map
function generateMap() {
  for (let j = 0; j < o.height; j++) {
    var row = [];
    for (let i = 0; i < o.width; i++) {
      if (!i || !j || i + 1 === o.width || j + 1 === o.height) {
        row.push(wall);
      } else {
        row.push(hallway);
      }
    }
    map.push(row);
  }
}

function drawTiles() {
  for (let j = 0; j < o.height; j++) {
    for (let i = 0; i < o.width; i++) {
      var tile = map[j][i];
      d.draw(i, j, tile.tag, tile.color);
    }
  }
}

function drawObjects() {
  objects.forEach(object =>
    d.draw(object.x, object.y, object.tag, object.color)
  );
}
function drawPlayers() {
  players.forEach(object =>
    d.draw(object.x, object.y, object.tag, object.color)
  );
}

function update() {
  drawTiles();
  drawObjects();
  drawPlayers();
}

function getTileAt({pos}) {
  const tileAt = map[pos.y][pos.x];
  return tileAt;
}

function getObjectAt({pos}) {
  const object = objects.find(o => o.x === pos.x && o.y === pos.y);
  return object;
}

function canMoveTo({player, pos}) {
  if (!player || !pos) {
    return true;
  }
  const object = getObjectAt({pos});
  // If there exist a object we know that interaction made it still exist
  if (object) {
    return false;
  }

  const tile = getTileAt({pos});
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

function interact({object, pos}) {
  if (!object || !pos) {
    return;
  }
  const target = getObjectAt({pos});
  // No object exist carry on
  if (!target) {
    return;
  }

  if (target.types.find(type => type === 'exit')) {
    // object.interact(object);
    object.exit({target});
  }

  if (target.types.find(type => type === 'breakable')) {
    object.chop({target});
    const { loot } = object.loot({target});
    if (loot) {
      if (!inventory[loot.type]) {
        inventory[loot.type] = 0;
      }
      inventory[loot.type] = inventory[loot.type] + loot.amount;
    }
  }
}

// Listeners
document.body.addEventListener('keydown', function(e) {
  var code = e.keyCode;

  var vk = '?'; /* find the corresponding constant */
  for (var name in KEYS) {
    if (KEYS[name] == code && name.indexOf('VK_') == 0) {
      vk = name;
    }
  }

  let dir = { x: 0, y: 0 };
  if (code === KEYS.VK_LEFT) {
    dir.x = -1;
  }
  if (code === KEYS.VK_RIGHT) {
    dir.x = 1;
  }
  if (code === KEYS.VK_UP) {
    dir.y = -1;
  }
  if (code === KEYS.VK_DOWN) {
    dir.y = 1;
  }

  const player = players[0];
  const nextPos = {
    x: player.x + dir.x,
    y: player.y + dir.y
  };

  // interact
  interact({object: player, pos: nextPos});
  removeDeadObjects();
  updateInventory();

  const canMove = canMoveTo({player, pos: nextPos});
  if (!canMove) {
    return;
  }

  players[0].x += dir.x;
  players[0].y += dir.y;

  update();
  out1.innerHTML = 'Keydown: code is ' + code + ' (' + vk + ')';
  out2.innerHTML =
    'Standing on: ' + JSON.stringify(map[players[0].y][players[0].x]);
});

document.body.addEventListener('keypress', function(e) {
  var code = e.charCode;
  var ch = String.fromCharCode(code);
  out2.innerHTML = 'Keypress: char is ' + ch;
});
