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

window.findNRooksSolution = function(n) {
  var solution = new Board({n: n});

  // I: n (size of matrix)
  // O: a matrix solution
  // C: 
  // E: n = 1

  // Only lay n pieces

  for (let i  = 0; i < n; i++) {
    solution.togglePiece(i,i);
  }

  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution.rows();
};

window.countNRooksSolutions = function(n) {
// I: a board
// O: an updated board with another non-conflictingly placed rook

// in every iteration:
// Toggle a piece at next available position
// check if has any rook conflicts
  // If so, move on, place piece in next available position
  // Else, check if amount of pieces layed = n
    // If so, and doesn't have any rook conflicts, solutions++
    // else, go deeper (recursive call on updated board)

  var solutionCount = 0;
  var solutionBoard = new Board({n :n});
  
  /*
  ***Helper Functions***
  */
  function numberOfPieces(board) {
    var testBoard = board.rows();
    return testBoard.reduce((accum, row) => accum + row.reduce((innerAccum, col) => innerAccum + col), 0);
  }

  function nextAvailablePosition(board, index = 0) {
    var testBoard = board.rows();
    return testBoard
          .reduce((accumlator, row) => accumlator.concat(row))
          .lastIndexOf(1) + 1 + index;
  }

  function row(postion) {
    return Math.floor(postion / n);
  }

  function col(postion) {
    return postion % n;
  }

  /*
  ***Recursive Function***
  */      
  function placeRook (board) {
    var freePositions = n * n - nextAvailablePosition(board);
    var storedRow, storedCol = 0;

    for (let i = 0; i < freePositions; i++) {
      storedRow = row(nextAvailablePosition(board, i));
      storedCol = col(nextAvailablePosition(board, i));
      board.togglePiece(storedRow, storedCol);
      if (!board.hasAnyRooksConflicts()) {
        if (numberOfPieces(board) === n) {
          solutionCount++;
          board.togglePiece(storedRow, storedCol);
          return;
        } else {
          placeRook(board);
          board.togglePiece(storedRow, storedCol);
        } 
      } else {
        board.togglePiece(storedRow, storedCol);
      }
    }
  }

  placeRook(solutionBoard);   
  return solutionCount;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = undefined; //fixme

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
