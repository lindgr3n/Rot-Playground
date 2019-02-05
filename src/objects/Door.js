import { door } from '../sprites/objects.json';
import { hasExit } from "../EntityComponent/hasExit";

export const Door = ({ x, y, ...rest }) => {
  const self = { x, y };
  return Object.assign(self, door, hasExit(), rest);
};
