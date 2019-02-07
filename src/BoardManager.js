import EntitesManager from './EntitesManager'
import { hallway, wall } from './tiles.json';
import {Tree} from './objects/Tree'
import { Door } from "./objects/Door";
import EntitiesManager from './EntitesManager'

/**
 * This example returns a random integer between the specified values. 
 * The value is no lower than min (or the next integer greater than min if min isn't an integer), 
 * and is less than (but not equal to) max.
 * 
 * @param {*} min 
 * @param {*} max 
 */
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

class BoardManager {
  constructor({columns, rows, wallLimit, foodCount}) {
    this.columns = columns;
    this.rows = rows;
    this.wallLimit = wallLimit || { min: 5, max: 9 }
    this.foodCount = foodCount || { min: 1, max: 9 }
    
    this.freeSpace = [];
    this.board = [];
  }
  
  setup(level) {
    this.enemyCount = Math.round(Math.log(level))

    this.createBoard();

    // EntitiesManager.add();
    // EntitiesManager.add(Tree({ x: 8, y: 7, treasure: { type: 'wood', amount: 3 } }));
    // EntitiesManager.add(Tree({ x: 8, y: 8, treasure: { type: 'wood', amount: 3 } }));
    // EntitiesManager.add(Tree({ x: 8, y: 9, treasure: { type: 'wood', amount: 3 } }));
    
    this.layoutObjectAtRandom({object: 'tree', limit: this.wallLimit})
    this.layoutObjectAtRandom({tag: 'O', limit: this.foodCount})
    this.layoutObjectAtRandom({tag: 'E', limit: {min: this.enemyCount, max: this.enemyCount}})
    
    EntitiesManager.add(Door({ x: this.columns, y: 1 }));
    // this.board[1][this.rows] = {tag: 'D'}
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
          console.log(column, row)
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
      // console.log(column, row);
      
      // this.board[column][row] = {tag};
      switch(object) {
        case 'tree':
          EntitiesManager.add(Tree({ x: column, y: row, treasure: { type: 'wood', amount: 3 } }));
          break;
      }
    }
  }

  logBoard() {
    console.log(this.board)
  }
}

// const board = new BoardManager({level: 10, columns: 8, rows: 8})
// board.setup(1);
// board.logBoard();

export default BoardManager;