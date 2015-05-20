/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other

/*
if   > max found
      update max
      reset numPassing = 1
      reset solution = that board
 */

window.findNRooksSolution = function(n) {
  var board = new Board({n:n});
  var matrix;
  var findValidPaths = function(rowIndex) {
    for(var i=0; i<n; i++) {
      board.togglePiece(rowIndex, i);
      if(!board.hasAnyRooksConflicts()) {
        if(rowIndex === n-1) {
          matrix = JSON.stringify(board.rows());
          return;
        } else {
          if (!matrix){
            findValidPaths(rowIndex + 1);
          }
        }
      }
      board.togglePiece(rowIndex, i);
    }
  };
  findValidPaths(0);
  return JSON.parse(matrix);
};



// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {

  //create new board of size n
  var board = new Board({n:n});
  // create solutionBoards and set it 0
  var solutionBoards = 0;
  // create function findValidPaths and receives board and current row index of board as parameter
  var findValidPaths = function(board, rowIndex) {

    // for each index of row
    for(var i=0; i<n; i++) {
      // if no conflicts at this index
      board.togglePiece(rowIndex, i);
      if(!board.hasColConflictAt(i)) {
        // if row index = n
        if(rowIndex === n-1) {
          // increment solutionBoards
          solutionBoards ++;
        // else
        } else {
          // call recursively passing in updated board and current row index +1;
          findValidPaths(board, rowIndex + 1);
        }
      }
      // untoggle piece
      board.togglePiece(rowIndex, i);
      // console.log('untoggling', board.rows()[rowIndex][i], 'col index is ', i);
    }
  };
  // findValidPaths(board, rowIndex)
  findValidPaths(board, 0);
  // return solutionBoards
  return solutionBoards;
};



// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  if (n===0){
    return [];
  } else if (n===1){
    return [[1]];
  } else if (n===2){
    return [[0,0],[0,0]];
  }else if (n===3){
    return [[0,0,0],[0,0,0],[0,0,0]];
  }
  var board = new Board({n:n});
  var matrix;
  var findValidPaths = function(rowIndex) {
    for(var i=0; i<n; i++) {
      board.togglePiece(rowIndex, i);
      if(!board.hasAnyQueensConflicts()) {
        if(rowIndex === n-1) {
          matrix = JSON.stringify(board.rows());
          return;
        } else {
          if (!matrix){
            findValidPaths(rowIndex + 1);
          }
        }
      }
      board.togglePiece(rowIndex, i);
    }
  };
  findValidPaths(0);
  matrix = JSON.parse(matrix);
  console.log('returning n ', n);
  return matrix;
};


// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = 0; //fixme
  if(n===0 || n===1) {
    solutionCount = 1;
  } else if(n<=3) {
    solutionCount = 0;
  } else {

    // create new board of size n
    var board = new Board({n:n});
    // create solutionCount and set it 0
    var solutionCount = 0;
    // create function findValidPaths and receives board and current row index of board as parameter
    var findValidPaths = function(board, rowIndex) {

      // for each index of row
      for(var i=0; i<n; i++) {
        // if no conflicts at this index
        board.togglePiece(rowIndex, i);
        if(!board.hasColConflictAt(i) && !board.hasAnyMajorDiagonalConflicts() && !board.hasAnyMinorDiagonalConflicts()) {
          // if row index = n
          if(rowIndex === n-1) {
            // increment solutionCount
            solutionCount ++;
          // else
          } else {
            // call recursively passing in updated board and current row index +1;
            findValidPaths(board, rowIndex + 1);
          }
        }
        // untoggle piece
        board.togglePiece(rowIndex, i);
        // console.log('untoggling', board.rows()[rowIndex][i], 'col index is ', i);
      }
    };
    // findValidPaths(board, rowIndex)
    findValidPaths(board, 0);
    // return solutionCount
    return solutionCount;

  }
  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
