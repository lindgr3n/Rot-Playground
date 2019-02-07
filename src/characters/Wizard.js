
import { wizard } from './characters.json';
import { canChop } from "../EntityComponent/canChop";
import { hasHealth } from "../EntityComponent/hasHealth";
import { hasPosition } from "../EntityComponent/hasPosition";
import { canExit } from '../EntityComponent/canExit.js';
import { canLoot } from '../EntityComponent/canLoot.js';
import { canAttack } from '../EntityComponent/canAttack.js';

export function Wizard(config) {
  const self = Object.assign({}, wizard, hasPosition(), hasHealth(), config)
  // Assign methods
  Object.assign(self, canChop(self), canAttack(self), canExit(self), canLoot(self));
  return self;
}