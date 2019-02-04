export const canLoot = character => ({
  loot: ({target}) => {
    console.log('LOOOT', target.lootObject())
    return target.lootObject()
  }
})