const objects = [];

export function add(object) {
  objects.push(object)
}

export function get({id}) {
  return objects
}

export function getObjects() {
  return objects;
}

export function getObjectAt({pos}) {
  const object = objects.find(object => object.x === pos.x && object.y === pos.y);
  return object;
}

export function removeDead({target}) {
  // Get index of the provided object
  const foundIndex = objects.findIndex(
    object => object.x === target.x && object.y === target.y
  );

  // Remove it from the objects list
  if (foundIndex > -1) {
    objects.splice(foundIndex, 1);
  }
}

export function removeDeadObjects() {
  // Get index of the provided object
  const areDead = objects.filter(object => object.dead);
  areDead.forEach(target => removeDead({target}));
}