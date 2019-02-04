export const hasLoot = ({type = '', amount = 0}) =>( {
  lootObject: () => ({
    loot: {
      type, 
      amount
    }
  })
})