export const canLoot = object => ({
  loot: () => {
    return object.treasure
  }
})