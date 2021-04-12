import { KEYS } from 'rot-js';

class KeyboardManager {
  constructor({gameManager}) {
    this.gameManager = gameManager;
    this.setupKeyListeners();
  }
  setupKeyListeners() {
    document.body.addEventListener('keydown', (e) => {
      var code = e.keyCode;
    
      var vk = '?'; /* find the corresponding constant */
      for (var name in KEYS) {
        if (KEYS[name] == code && name.indexOf('VK_') == 0) {
          vk = name;
        }
      }
    
      let dir = { x: 0, y: 0 };
      if (code === KEYS.VK_LEFT) {
        dir.x = -1;
      }
      if (code === KEYS.VK_RIGHT) {
        dir.x = 1;
      }
      if (code === KEYS.VK_UP) {
        dir.y = -1;
      }
      if (code === KEYS.VK_DOWN) {
        dir.y = 1;
      }
    
      const player = this.gameManager.getPlayer();
      const nextPos = {
        x: player.x + dir.x,
        y: player.y + dir.y
      };
    
      // interact
      this.gameManager.collision({pos: nextPos});
    
      const canMove = this.gameManager.canMoveTo({player, pos: nextPos});
      if (!canMove) {
        return;
      }
    
      player.x += dir.x;
      player.y += dir.y;
    
      this.gameManager.update();
    
      this.gameManager.getRenderManager().renderDebug({code, vk, player, map: this.gameManager.getBoard()});
    });
    
    // document.body.addEventListener('keypress', function(e) {
    //   var code = e.charCode;
    //   var ch = String.fromCharCode(code);
    //   out2.innerHTML = 'Keypress: char is ' + ch;
    // });
  }
}

export default KeyboardManager