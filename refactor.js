/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */

// const WIDTH = 7;
// const HEIGHT = 6;
 
//let currPlayer = 1; // active player: 1 or 2
// let board = []; // array of rows, each row is array of cells  (board[y][x])
 
 /** makeBoard: create in-JS board structure:
  *    board = array of rows, each row is array of cells  (board[y][x])
  */
 
  class Game {
    constructor(p1, p2, height = 6, width = 7) {
      this.players = [p1, p2];
      this.height = height;
      this.width = width;
      this.currPlayer = p1;
      this.makeBoard();
      this.makeHtmlBoard();
      this.gameOver = false;
    }
  

 makeBoard() {
   this.board = [];
   // TODO: set "board" to empty HEIGHT x WIDTH matrix array
   for (let y = 0; y < this.height; y++) {
    this.board.push(Array.from({ length: this.width }));
  }
 }
 
 /** makeHtmlBoard: make HTML table and row of column tops. */
 
 makeHtmlBoard() {
   // TODO: get "htmlBoard" variable from the item in HTML w/ID of "board"
   const htmlBoard = document.querySelector("#board");
   htmlBoard.innerHTML = '';
   // TODO: add comment for this code\
   this.handleGameClick = this.handleClick.bind(this);
   //Adds table row for top column with the id of "column-top".  Also adds a click event to for dropping piece into that column.
   let top = document.createElement("tr");
   top.setAttribute("id", "column-top");
   top.addEventListener("click", this.handleGameClick);
   top.addEventListener("mouseover", function(e) {
     if (this.currPlayer === 1) {
       e.target.style.backgroundColor = "red";
     }
     else {
       e.target.style.backgroundColor = "blue";
     }
   });
   top.addEventListener("mouseout", function(e) {
     e.target.style.backgroundColor = "white";
   })

 
   for (let x = 0; x < this.width; x++) {
     let headCell = document.createElement("td");
     headCell.setAttribute("id", x);
     top.append(headCell);
   }
   htmlBoard.append(top);
 
   // TODO: add comment for this code
   //Create table elements and set ids for the board.
   for (let y = 0; y < this.height; y++) {
     const row = document.createElement("tr");
     for (let x = 0; x < this.width; x++) {
       const cell = document.createElement("td");
       cell.setAttribute("id", `${y}-${x}`);
       row.append(cell);
     }
     htmlBoard.append(row);
   }
 }
 
 /** findSpotForCol: given column x, return top empty y (null if filled) */
 
 findSpotForCol(x) {
   // TODO: write the real version of this, rather than always returning 0
    for (let y = 5; y >= 0; y--) {
      if(!this.board[y][x]){
      return y; 
      }
    }
    return null;
 }
 
 /** placeInTable: update DOM to place piece into HTML table of board */
 
 placeInTable(y, x) {
   // TODO: make a div and insert into correct table cell
   const piece = document.createElement('div');
  piece.classList.add('piece');
  piece.style.backgroundColor = this.currPlayer.color;
  piece.style.top = -50 * (y + 2);

  const spot = document.getElementById(`${y}-${x}`);
  spot.append(piece);
 }
 
 /** endGame: announce game end and restart the game*/
 
/*endGame(msg) {
   // TODO: pop up alert message
   setTimeout(() => { alert(msg);
   location.reload();
   }, 100)
 }
*/
endGame(msg) {
  alert(msg);
  const top = document.querySelector("#column-top");
  top.removeEventListener("click", this.handleGameClick);
} 

 /** handleClick: handle click of column top to play piece */
 
 handleClick(evt) {
   //evt.target.style.backgroundColor: "white";
   // get x from ID of clicked cell
   let x = +evt.target.id;
 
   // get next spot in column (if none, ignore click)
   const y = this.findSpotForCol(x);
   if (y === null) {
     return;
   }
 
   // place piece in board and add to HTML table
   // TODO: add line to update in-memory board
   this.board[y][x] = this.currPlayer;
   this.placeInTable(y, x);
 
   // check for win
   if (this.checkForWin()) {
    this.gameOver = true;
    return this.endGame(`The ${this.currPlayer.color} player won!`);
  }
   // check for tie
   // TODO: check if all cells in board are filled; if so call, call endGame
  
  if(this.board.every(function(row) {
    return row.every(function(cell) {
      return cell
    })
  })) {
    return this.endGame("You have tied")
  }
  
   // switch players
   // TODO: switch currPlayer 1 <-> 2
  /* if(currPlayer === 1) {
     return currPlayer = 2;
   }
   else {
     return currPlayer = 1;
   }*/
   this.currPlayer =
      this.currPlayer === this.players[0] ? this.players[1] : this.players[0];
 }
 
 /** checkForWin: check board cell-by-cell for "does a win start here?" */
 
 checkForWin() {
  // Check four cells to see if they're all color of current player
  //  - cells: list of four (y, x) cells
  //  - returns true if all are legal coordinates & all match currPlayer
  const _win = cells =>
    cells.every(
      ([y, x]) =>
        y >= 0 &&
        y < this.height &&
        x >= 0 &&
        x < this.width &&
        this.board[y][x] === this.currPlayer
    );
 
   // TODO: read and understand this code. Add comments to help you.
   //Looping over and verifying all possible win conditions
   for (let y = 0; y < this.height; y++) {
     for (let x = 0; x < this.width; x++) {
       let horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];
       let vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]];
       let diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]];
       let diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]];
      //returns true if win conditions are met.
       if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
         return true;
       }
     }
   }
 }
}
 //makeBoard();
 //makeHtmlBoard();

 class Player {
  constructor(color) {
    this.color = color;
  }
}

document.getElementById('start-game').addEventListener('click', () => {
  let p1 = new Player(document.getElementById('p1-color').value);
  let p2 = new Player(document.getElementById('p2-color').value);
  new Game(p1, p2);
});