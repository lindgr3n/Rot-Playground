import { tree } from '../objects.json';
import { canDie } from "../EntityComponent/canDie";
import { hasTreasure } from "../EntityComponent/hasTreasure";
import { canLoot } from "../EntityComponent/canLoot";
import { hasHealth } from "../EntityComponent/hasHealth";

export const Tree = ({ x, y, ...rest }) => {
  const self = { x, y };
  return Object.assign(self, tree, canDie(), canLoot(self), hasHealth({max: 10}), hasTreasure({type: 'Wood', amount: 3}), rest);
};
