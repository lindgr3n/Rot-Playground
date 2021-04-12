
import { alien } from './characters.json';
import { canChop } from "../EntityComponent/canChop";
import { hasHealth } from "../EntityComponent/hasHealth";
import { hasPosition } from "../EntityComponent/hasPosition";
import { hasLoot } from '../EntityComponent/hasLoot.js';
import { canDie } from '../EntityComponent/canDie.js';

export function Alien(config) {
  const self = Object.assign({}, alien, hasPosition(), hasLoot({type: 'gold', amount: 3}), hasHealth({max: 10}), config)
  // Assign methods
  Object.assign(self, canChop(self), canDie(self));
  return self;
}