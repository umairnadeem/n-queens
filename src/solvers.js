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


    // e.g. 3x3
  // Create a board
  // **** 1st 
  // 1. Place 1st piece at 0,0
    // Conflicts? No. Go down further to 2nd piece
      // ***** 2nd
      // 2. Place 2nd piece at 1th place
        // Conflicts? Yes. Put at next place
      // 3. Place 2nd piece at 2nd place
        // Conflicts? Yes. Put at next place
      //...
      // 4. Place 2nd piece at 4th place
        // Conflicts? No. Go down further to 3rd piece
          // ***** 3rd
          // Place at 6th. 
            // Conflicts? Yes. Put at next place
          //...
          // Place at 9th.
            // Conflicts? No. Don't go deeper since number of pieces placed = n. Increase number of solutions
      // *** 2nd (Back-track)
        // Haven't toggled piece at (n-1)th place, so keep continuing loop



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
  var solutionCount = 0; 

  // create a n x n board
  var solutionBoard = new Board({n :n});
  // solutionBoard.togglePiece(2,2);
  
  // helper function: numberOfPieces(board)
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

  // console.log(nextAvailablePosition(solutionBoard));
      // helper function: placeRook(board)
        // I: a board
        // O: an updated board with another non-conflictingly placed rook
        
  function placeRook (board) {
    var freePositions = n * n - nextAvailablePosition(board);
    for (var i = 0; i < freePositions; i++) {
      
      var storedRow = row(nextAvailablePosition(board, i));
      var storedCol = col(nextAvailablePosition(board, i));
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

    // console.log(placeRook(solutionBoard));
      // in every iteration:
        // Toggle a piece at next available position
        // check if has any rook conflicts
          // If so, move on, place piece in next available position
          // Else, check if amount of pieces layed = n
            // If so, and doesn't have any rook conflicts, solutions++
            // else, go deeper (recursive call on updated board)
    
      // number of iterations at each level: empty spaces + 1

   placeRook(solutionBoard);   
        
        

  return solutionCount;
  // console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  // return solutionCount;
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
