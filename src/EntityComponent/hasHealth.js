export function hasHealth({max = 100, current = max} = {}) {
  return {
    health: {
      max: max, 
      current: current
    }
  }
}