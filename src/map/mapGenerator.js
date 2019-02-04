
import { hallway, wall } from '../tiles.json';
// Generate map
export function generateMap({width, height}) {
  let map = [];
  for (let j = 0; j < height; j++) {
    var row = [];
    for (let i = 0; i < width; i++) {
      if (!i || !j || i + 1 === width || j + 1 === height) {
        row.push(wall);
      } else {
        row.push(hallway);
      }
    }
    map.push(row);
  }
  return map;
}