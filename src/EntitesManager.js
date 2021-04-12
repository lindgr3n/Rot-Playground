class EntitesManager {
  constructor() {
    this.objects = [];
  }

  add(object) {
    this.objects.push(object)
  }
  
  get({id}) {
    return this.objects
  }
  
  getObjects() {
    return this.objects;
  }
  
  getObjectAt({pos}) {
    const object = this.objects.find(object => object.x === pos.x && object.y === pos.y);
    return object;
  }
  
  removeDead({target}) {
    // Get index of the provided object
    const foundIndex = this.objects.findIndex(
      object => object.x === target.x && object.y === target.y
    );
  
    // Remove it from the objects list
    if (foundIndex > -1) {
      this.objects.splice(foundIndex, 1);
    }
  }
  
  removeDeadObjects() {
    // Get index of the provided object
    const areDead = this.objects.filter(object => object.dead);
    areDead.forEach(target => this.removeDead({target}));
  }

  clear() {
    this.objects = [];
  }
}

export default EntitesManager;


