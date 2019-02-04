export const canLoot = character => ({
  loot: (object) => {
    console.log('LOOOT', object.lootObject())
    return object.lootObject()
  }
})