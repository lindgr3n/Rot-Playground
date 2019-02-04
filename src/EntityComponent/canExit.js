export const canExit = character => ({
  exit: ({target}) => {  
    return target.exit();
  }
})