export const canExit = character => ({
  exit: (object) => {  
    return object.exit();
  }
})