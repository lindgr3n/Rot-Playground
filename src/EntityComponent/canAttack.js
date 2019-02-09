export const canAttack = character => ({
  attack: ({target}) => {
    if (character.hasOwnProperty('damage')) {
      target.health.current = target.health.current - character.damage;
      if(target.hasOwnProperty('dead')) {
        console.log('health', target.health.current)
        target.dead = target.health.current <= 0;
      }
    }
    console.log(`Choop! The attacked health ${target.health.current}`);
  }
})