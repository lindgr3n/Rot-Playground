
import { generateMap } from "../map/mapGenerator";

let map = [];

export function generate({config}) {
  map = generateMap({config});
  return map; 
};

export function getTileAt({pos}) {
  const tileAt = map[pos.y][pos.x];
  return tileAt;
}

export function getMap() {
  return map;
}