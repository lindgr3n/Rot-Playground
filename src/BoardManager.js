import EntitesManager from './EntitesManager'
import { hallway, wall } from './tiles.json';
import {Tree} from './objects/Tree'
import { Door } from "./objects/Door";
import EntitiesManager from './EntitesManager'
import { getRandomInt } from "./utils";

class BoardManager {
  constructor({columns, rows, wallLimit, foodCount, gameManager}) {
    this.gameManager = gameManager;
    this.columns = columns;
    this.rows = rows;
    this.wallLimit = wallLimit || { min: 10, max: 20 }
    this.foodCount = foodCount || { min: 1, max: 9 }
    
    this.freeSpace = [];
    this.board = [];
  }
  
  setup(level) {
    this.enemyCount = Math.round(Math.log(level))

    this.createBoard();
    
    this.layoutObjectAtRandom({object: 'tree', limit: this.wallLimit})
    this.layoutObjectAtRandom({tag: 'O', limit: this.foodCount})
    this.layoutObjectAtRandom({tag: 'E', limit: {min: this.enemyCount, max: this.enemyCount}})
    
    this.gameManager.getEntitiesManager().add(Door({ x: this.columns, y: 1 }));
  }

  getBoard() {
    return this.board;
  }

  createBoard() {
    for(let row = -1; row < this.rows + 1; row++) {
      let xAxis = [];
      for(let column = -1; column < this.columns + 1; column++) {
        if(column == -1 || column == this.columns || row == -1 || row == this.rows) {
          xAxis.push(wall)
        } else {
          xAxis.push(hallway)
        }
      }
      this.board.push(xAxis)
    }

    // Set up free space
    for(let row = 1; row < this.rows - 1; row++) {
      for(let column = 1; column < this.columns - 1; column++) {
        this.freeSpace.push({column, row})
      }
    }
  }

  getRandomFreeSpace() {
    const randomIndex = getRandomInt(0, this.freeSpace.length);
    const randomSpace = this.freeSpace[randomIndex];
    this.freeSpace = [...this.freeSpace.slice(0, randomSpace), ...this.freeSpace.slice(randomSpace)]
    return randomSpace;
  }

  layoutObjectAtRandom({object, limit}) {
    const randomAmount = getRandomInt(limit.min, limit.max);

    for(let count = 0; count < randomAmount; count++) {
      const {column, row} = this.getRandomFreeSpace();
      switch(object) {
        case 'tree':
          this.gameManager.getEntitiesManager().add(Tree({ x: column, y: row, treasure: { type: 'wood', amount: 3 } }));
          break;
      }
    }
  }
  
  getTileAt({pos}) {
    const tileAt = this.board[pos.y][pos.x];
    return tileAt;
  }

  logBoard() {
    console.log(this.board)
  }
}

export default BoardManager;