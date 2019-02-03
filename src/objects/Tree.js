import { tree } from '../objects.json';

export function treeInteraction(interactor) {
  if (interactor.hasOwnProperty('damage')) {
    this.health = this.health - interactor.damage;
  }
  console.log(`Choop! My current health ${this.health}`);
  // Dead return the loot!
  if (this.health <= 0) {
    this.dead = true;
  }

  return this.loot;
}
const chop = self => interactor => {
  console.log('Wohoo', self);
  if (interactor.hasOwnProperty('damage')) {
    self.health = self.health - interactor.damage;
  }
  console.log(`Choop! My current health ${self.health}`);
  // Dead return the loot!
  if (self.health <= 0) {
    self.dead = true;
  }

  return self.loot;
};

const canDie = self => ({ dead: false });

export const Tree = ({ x, y, ...rest }) => {
  const self = { x, y, health: 10 };
  console.log('Wohoo', x, y, rest);
  return Object.assign(self, tree, canDie(self), { chop: chop(self) }, rest);
};
