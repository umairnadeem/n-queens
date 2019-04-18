// This file is a Backbone Model (don't worry about what that means)
// It's part of the Board Visualizer
// The only portions you need to work on are the helper functions (below)

(function() {

  window.Board = Backbone.Model.extend({

    initialize: function (params) {
      if (_.isUndefined(params) || _.isNull(params)) {
        console.log('Good guess! But to use the Board() constructor, you must pass it an argument in one of the following formats:');
        console.log('\t1. An object. To create an empty board of size n:\n\t\t{n: %c<num>%c} - Where %c<num> %cis the dimension of the (empty) board you wish to instantiate\n\t\t%cEXAMPLE: var board = new Board({n:5})', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
        console.log('\t2. An array of arrays (a matrix). To create a populated board of size n:\n\t\t[ [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...] ] - Where each %c<val>%c is whatever value you want at that location on the board\n\t\t%cEXAMPLE: var board = new Board([[1,0,0],[0,1,0],[0,0,1]])', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
      } else if (params.hasOwnProperty('n')) {
        this.set(makeEmptyMatrix(this.get('n')));
      } else {
        this.set('n', params.length);
      }
    },

    rows: function() {
      return _(_.range(this.get('n'))).map(function(rowIndex) {
        return this.get(rowIndex);
      }, this);
    },

    togglePiece: function(rowIndex, colIndex) {
      this.get(rowIndex)[colIndex] = + !this.get(rowIndex)[colIndex];
      this.trigger('change');
    },

    _getFirstRowColumnIndexForMajorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex - rowIndex;
    },

    _getFirstRowColumnIndexForMinorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex + rowIndex;
    },

    hasAnyRooksConflicts: function() {
      return this.hasAnyRowConflicts() || this.hasAnyColConflicts();
    },

    hasAnyQueenConflictsOn: function(rowIndex, colIndex) {
      return (
        this.hasRowConflictAt(rowIndex) ||
        this.hasColConflictAt(colIndex) ||
        this.hasMajorDiagonalConflictAt(this._getFirstRowColumnIndexForMajorDiagonalOn(rowIndex, colIndex)) ||
        this.hasMinorDiagonalConflictAt(this._getFirstRowColumnIndexForMinorDiagonalOn(rowIndex, colIndex))
      );
    },

    hasAnyQueensConflicts: function() {
      return this.hasAnyRooksConflicts() || this.hasAnyMajorDiagonalConflicts() || this.hasAnyMinorDiagonalConflicts();
    },

    _isInBounds: function(rowIndex, colIndex) {
      return (
        0 <= rowIndex && rowIndex < this.get('n') &&
        0 <= colIndex && colIndex < this.get('n')
      );
    },


/*
         _             _     _
     ___| |_ __ _ _ __| |_  | |__   ___ _ __ ___ _
    / __| __/ _` | '__| __| | '_ \ / _ \ '__/ _ (_)
    \__ \ || (_| | |  | |_  | | | |  __/ | |  __/_
    |___/\__\__,_|_|   \__| |_| |_|\___|_|  \___(_)

 */
    /*=========================================================================
    =                 TODO: fill in these Helper Functions                    =
    =========================================================================*/

    // ROWS - run from left to right
    // --------------------------------------------------------------
    //
    // test if a specific row on this board contains a conflict
    hasRowConflictAt: function(rowIndex) {
      //input: index of the row we need to preform a function on
      //output: boolean, true or false whether there is a conflict or not
      //constaints: input number needs to be within the bounds of the input matrix
      //edgecase: if our matrix is empty
      //check the specifcied row
      return this.rows()[rowIndex].reduce((accumulator, element) => accumulator + element) > 1;
      //add all of the values in the row
      //check if the sum is > than 1
      //if it is > 1 return true, otherwise return false
    },

    // test if any rows on this board contain conflicts
    hasAnyRowConflicts: function() {
      // go through all rows

      // I: nothing
      // O: boolean, T/F (true if any row has conflict, false otherwise)
      // C: nothing
      // E: empty matrix

      // check each row separately
      // if sum of that row > 1, return false
      // after checking all rows, return false at the very end

      var board = this.rows();
      var conflict = false;

      for (var i = 0; i < board.length; i++) {
        if (this.hasRowConflictAt(i)) {
          conflict = true;
        }
      }

      return conflict;
    },



    // COLUMNS - run from top to bottom
    // --------------------------------------------------------------
    //
    // test if a specific column on this board contains a conflict
    hasColConflictAt: function(colIndex) {
      // I: colIndex
      // O: boolean, T/F (true if any column has conflict, false otherwise)
      // C: outside of the bounds of colIndex
      // E: empty matrix
      //check colIndex at every row
      //add all of the numbers in our specified column in every row
      //if the sum is > 1, return true, otherwise return false
      return this.rows().reduce((accumulator, element) => accumulator + element[colIndex], 0) > 1;
    },

    // test if any columns on this board contain conflicts
    hasAnyColConflicts: function() {
      // go through all cols

      // I: nothing
      // O: boolean, T/F (true if any col has conflict, false otherwise)
      // C: nothing
      // E: empty matrix

      // check each col separately
      // if sum of that col > 1, return true
      // after checking all cols, return false at the very end

      var board = this.rows();
      var conflict = false;

      for (var i = 0; i < board.length; i++) {
        if (this.hasColConflictAt(i)) {
          conflict = true;
        }
      }

      return conflict;

    },



    // Major Diagonals - go from top-left to bottom-right
    // --------------------------------------------------------------
    //
    // test if a specific major diagonal on this board contains a conflict
    hasMajorDiagonalConflictAt: function(majorDiagonalColumnIndexAtFirstRow) {
     // I: the column index of the diagonal at the first row
     // O: boolean determining whether or not there is a conflict
     // C: the input has to be within the bounds of the matrix
     // E: if the matrix is empty
     //go through each diaganol element in the matrix
     //add up all of the values in that diaganol line
     //if the sum is > 1, return true, otherwise return false
     //call the reduce method on the matrix
     return this.rows().reduce((accumulator, element, index) => {
       if (element[index + majorDiagonalColumnIndexAtFirstRow]) {
       return accumulator + element[index + majorDiagonalColumnIndexAtFirstRow];
      } else {
        return accumulator;
      }}, 0) > 1;
    },

    // test if any major diagonals on this board contain conflicts
    hasAnyMajorDiagonalConflicts: function() {
      // I: nothing
      // O: boolean, T/F, determine whether there's any major diagonal conflict
      // C: none
      // E: if matrix is empty

      // Create a length of board using .get
      // Create a conflict variable, set to false
      // iterate over each major diagonal line
      // If there's a conflict, set conflict to true, otherwise return false

      // debugger;
      var length = this.get('n') - 1;
      var conflict = false;

      for (let index = -1*length; index < length; index++) {
        if(this.hasMajorDiagonalConflictAt(index)) {
          conflict = true;
        }
      }

      return conflict;
      
    },



    // Minor Diagonals - go from top-right to bottom-left
    // --------------------------------------------------------------
    //
    // test if a specific minor diagonal on this board contains a conflict
    hasMinorDiagonalConflictAt: function(minorDiagonalColumnIndexAtFirstRow) {
      return this.rows().reduce((accumulator, element, index) => {
        if (element[minorDiagonalColumnIndexAtFirstRow - index]) {
        return accumulator + element[minorDiagonalColumnIndexAtFirstRow - index];
       } else {
         return accumulator;
       }}, 0) > 1;
    },

    // test if any minor diagonals on this board contain conflicts
    hasAnyMinorDiagonalConflicts: function() {
      var length = this.get('n') - 1;
      var conflict = false;

      for (let index = 2*length; index > 0; index--) {
        if(this.hasMinorDiagonalConflictAt(index)) {
          conflict = true;
        }
      }

      return conflict;
    }

    /*--------------------  End of Helper Functions  ---------------------*/


  });

  var makeEmptyMatrix = function(n) {
    return _(_.range(n)).map(function() {
      return _(_.range(n)).map(function() {
        return 0;
      });
    });
  };

}());
