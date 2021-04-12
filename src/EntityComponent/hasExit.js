
export const hasExit = () => ({
  exit: () => {
    console.log('Wohoo you found the exit!'); 
    const event = document.createEvent('Event');
    event.initEvent('exit', true, true);
    document.dispatchEvent(event);
  }
})