import './styles.css';

import { Display, KEYS } from 'rot-js';
import { hallway, wall } from './tiles.json';
import * as tileObjects from './objects.json';
import { wizard } from './players.json';

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

// Add objects
objects.push(Object.assign({ x: 10, y: 10 }, tileObjects.exit));
objects.push(Object.assign({ x: 8, y: 7 }, tileObjects.tree));
objects.push(Object.assign({ x: 8, y: 8 }, tileObjects.tree));
objects.push(Object.assign({ x: 8, y: 9 }, tileObjects.tree));

// Add players
// 0 index is current player
players.push(
  Object.assign(
    {
      x: 1,
      y: 1
    },
    wizard
  )
);

// Create the map
generateMap();
// Render map
update();

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

function canMoveTo(object, dir) {
  const tileAt = map[object.y + dir.y][object.x + dir.x];
  console.log(tileAt);
  if (tileAt.types.find(type => type === 'block')) {
    return false;
  }

  return true;
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
  const canMove = canMoveTo(players[0], dir);

  if (!canMove) {
    // Check if we can interact
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
