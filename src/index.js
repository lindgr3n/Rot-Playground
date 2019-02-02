import './styles.css';

import { Display, KEYS } from 'rot-js';
import { hallway, wall } from './tiles.js';
import * as objects from './objects.js';
import { wizard } from './players.js';

let map = [];
let o = {
  width: 25,
  height: 15
};
const player = Object.assign(
  {},
  {
    x: 1,
    y: 1
  },
  wizard
);
let d = new Display(o);
document.body.appendChild(d.getContainer());

// Generate map
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
// Add a exit
map[10][10] = objects.exit;
map[8][8] = objects.tree;
map[8][8] = objects.tree;
map[9][8] = objects.tree;

// Render map
for (let j = 0; j < o.height; j++) {
  for (let i = 0; i < o.width; i++) {
    var tile = map[j][i];
    d.draw(i, j, tile.tag, tile.color);
  }
}

update(player);
console.table(map);
function update(object) {
  d.draw(object.x, object.y, object.tag, object.color);
}

var out1 = document.createElement('div');
var out2 = document.createElement('div');
document.body.appendChild(out1);
document.body.appendChild(out2);

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
  console.log('OLD', player.x, player.y);
  update(Object.assign({}, player, map[player.y][player.x]));
  player.x += dir.x;
  player.y += dir.y;
  console.log('NEW', player.x, player.y);
  update(player);

  out1.innerHTML = 'Keydown: code is ' + code + ' (' + vk + ')';
  out2.innerHTML = 'Standing on: ' + JSON.stringify(map[player.y][player.x]);
});

document.body.addEventListener('keypress', function(e) {
  var code = e.charCode;
  var ch = String.fromCharCode(code);
  out2.innerHTML = 'Keypress: char is ' + ch;
});
