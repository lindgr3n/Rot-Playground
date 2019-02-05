import * as Map from './Map'

let level = {map: {}};

export function init() {

}

export function getLevel({config} = {}) {
  level.map = generateLevel({config});
  return {level};
}

function generateLevel({config}) {
  // Create the map
  const generatedMap = Map.generate({config});
  console.log('MAP', generatedMap)
  return generatedMap;
}

export function getMap() {
  return level.map;
}