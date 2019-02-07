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
  constructor({level, columns, rows, wallLimit, foodCount}) {
    this.columns = columns;
    this.rows = rows;
    this.wallLimit = wallLimit || { min: 5, max: 9 }
    this.foodCount = foodCount || { min: 1, max: 9 }
    this.enemyCount = Math.round(Math.log(level))

    this.freeSpace = [];
    this.board = [];
  }

  setup() {
    this.createBoard();
    this.layoutObjectAtRandom({tag: '#', limit: this.wallLimit})
    this.layoutObjectAtRandom({tag: 'O', limit: this.foodCount})
    this.layoutObjectAtRandom({tag: 'E', limit: {min: this.enemyCount, max: this.enemyCount}})
  }

  getBoard() {
    return this.board;
  }

  createBoard() {
    for(let row = -1; row < this.rows + 1; row++) {
      let xAxis = [];
      for(let column = -1; column < this.columns + 1; column++) {
        if(column == -1 || column == this.columns || row == -1 || row == this.rows) {
          xAxis.push({tag: '#'})
        } else {
          xAxis.push({tag: '.'})
          this.freeSpace.push({column, row})
        }
      }
      this.board.push(xAxis)
    }
  }

  getRandomFreeSpace() {
    const randomIndex= getRandomInt(0, this.freeSpace.length);
    const randomSpace = this.freeSpace[randomIndex];
    this.freeSpace = [...this.freeSpace.slice(0, randomSpace), ...this.freeSpace.slice(randomSpace+1)]
    return randomSpace;
  }

  layoutObjectAtRandom({tag, limit}) {
    const randomAmount = getRandomInt(limit.min, limit.max);

    for(let count = 0; count < randomAmount; count++) {
      const {column, row} = this.getRandomFreeSpace();
      this.board[column][row] = {tag};
    }
  }

  logBoard() {
    console.log(this.board)
  }
}

const board = new BoardManager({level: 10, columns: 8, rows: 8})
board.setup();
board.logBoard();