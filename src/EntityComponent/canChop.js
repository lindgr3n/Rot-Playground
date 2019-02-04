export const canChop = character => ({
  chop: (object) => {  
    console.log('kill', character, object)
    if (character.hasOwnProperty('damage')) {
      object.health.current = object.health.current - character.damage;
      if(object.hasOwnProperty('dead')) {
        console.log('health', object.health.current)
        object.dead = object.health.current <= 0;
      }
    }
    console.log(`Choop! The attacked health ${object.health.current}`);
  }
})