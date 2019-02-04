export function hasTreasure({type = '', amount = 0}) {
  return {
    treasure: {
      type, 
      amount
    }
  }
}