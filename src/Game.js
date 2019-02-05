import * as Renderer from './Renderer'
import * as Map from './Map'
import * as Entities from './Entites'
import * as Listeners from './Listeners'
import * as Level from './Level'
import { Wizard } from "./characters/Wizard";
import { Door } from './objects/Door'
import { Tree } from './objects/Tree'

// Map size
let config = {
  width: 25,
  height: 15
};
const players = [];
const inventory = {};
let level = {}

export function Game() {}

export function init() {
  
  // Add objects
  Entities.add(Door({ x: 10, y: 10 }));
  Entities.add(Tree({ x: 10, y: 4, treasure: { type: 'wood', amount: 3 } }));
  Entities.add(Tree({ x: 8, y: 7, treasure: { type: 'wood', amount: 3 } }));
  Entities.add(Tree({ x: 8, y: 8, treasure: { type: 'wood', amount: 3 } }));
  Entities.add(Tree({ x: 8, y: 9, treasure: { type: 'wood', amount: 3 } }));

  // Add players
  // 0 index is current player
  players.push(Wizard({name: 'Player 1', x: 1, y: 1}));

  level = Level.getLevel({config});
  // Render map
  Renderer.init({config});
  Listeners.init();

  update();
}

export function update() {
  const map = Level.getMap();
  const objects= Entities.getObjects();
  
  Renderer.drawTiles({map});
  Renderer.drawObjects({objects});
  Renderer.drawPlayers({players});
  Renderer.renderInventory({inventory});
}

export function collision({pos}) {
  interact({object: getPlayer(), pos});
  Entities.removeDeadObjects();
  update();
}

export function getPlayer() {
  return players[0];
}

export function getMap() {
  return Map.getMap();
}

export function canMoveTo({player, pos}) {
  if (!player || !pos) {
    return true;
  }
  const object = Entities.getObjectAt({pos});
  // If there exist a object we know that interaction made it still exist
  if (object) {
    return false;
  }

  const tile = Map.getTileAt({pos});
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
  const target = Entities.getObjectAt({pos});
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
      if (!inventory[loot.type]) {
        inventory[loot.type] = 0;
      }
      inventory[loot.type] = inventory[loot.type] + loot.amount;
    }
  }
}