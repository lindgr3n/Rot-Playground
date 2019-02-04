import { tree } from '../objects.json';
import { canDie } from "../EntityComponent/canDie";
import { hasLoot } from "../EntityComponent/hasLoot";
import { hasHealth } from "../EntityComponent/hasHealth";

export const Tree = ({ x, y, ...rest }) => {
  const self = { x, y };
  return Object.assign(self, tree, canDie(), hasHealth({max: 10}), hasLoot({type: 'Wood', amount: 3}), rest);
};
