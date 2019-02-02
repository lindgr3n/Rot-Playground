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
objects.push(
  Object.assign(
    {
      x: 10,
      y: 10,
      interact: function(interactor) {
        console.log('Wohoo you found the exit!');
      }
    },
    tileObjects.exit
  )
);
objects.push(
  Object.assign(
    {
      x: 8,
      y: 7,
      health: 5,
      loot: { type: 'wood', amount: 3 },
      interact: function(interactor) {
        if (interactor.hasOwnProperty('damage')) {
          this.health = this.health - interactor.damage;
        }
        console.log(`Choop! My current health ${this.health}`);
        // Dead return the loot!
        if (this.health <= 0) {
          removeDead(this);
        }

        return this.loot;
      }
    },
    tileObjects.tree
  )
);
objects.push(
  Object.assign(
    {
      x: 8,
      y: 8,
      health: 5,
      loot: { type: 'wood', amount: 3 },
      interact: function(interactor) {
        if (interactor.hasOwnProperty('damage')) {
          this.health = this.health - interactor.damage;
        }
        console.log(`Choop! My current health ${this.health}`);
        // Dead return the loot!
        if (this.health <= 0) {
          removeDead(this);
        }

        return this.loot;
      }
    },
    tileObjects.tree
  )
);
objects.push(
  Object.assign(
    {
      x: 8,
      y: 9,
      health: 5,
      loot: { type: 'wood', amount: 1 },
      interact: function(interactor) {
        if (interactor.hasOwnProperty('damage')) {
          this.health = this.health - interactor.damage;
        }
        console.log(`Choop! My current health ${this.health}`);
        // Dead return the loot!
        if (this.health <= 0) {
          removeDead(this);
        }

        return this.loot;
      }
    },
    tileObjects.tree
  )
);

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

function removeDead(object) {
  // Get index of the provided object
  const foundIndex = objects.findIndex(
    o => o.x === object.x && o.y === object.y
  );

  // Remove it from the objects list
  if (foundIndex > -1) {
    objects.splice(foundIndex, 1);
  }
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

function getTileAt(pos) {
  const tileAt = map[pos.y][pos.x];
  return tileAt;
}

function getObjectAt(pos) {
  const object = objects.find(o => o.x === pos.x && o.y === pos.y);
  return object;
}

function canMoveTo(player, pos) {
  if (!player || !pos) {
    return true;
  }
  const object = getObjectAt(pos);
  // If there exist a object we know that interaction made it still exist
  if (object) {
    return false;
  }

  const tile = getTileAt(pos);
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

function interact(player, pos) {
  if (!player || !pos) {
    return;
  }
  const object = getObjectAt(pos);
  // No object exist carry on
  if (!object) {
    return;
  }

  if (object.types.find(type => type === 'exit')) {
    object.interact(player);
  }

  if (object.types.find(type => type === 'breakable')) {
    // Break it
    const loot = object.interact(player);
    if (loot) {
      console.log('Wohoo we got loot: ', loot);
    }
  }

  console.log('Time to interact with: ', object);
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
  interact(player, nextPos);

  const canMove = canMoveTo(player, nextPos);
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
