// This file is a Backbone Model (don't worry about what that means)
// It's part of the Board Visualizer
// The only portions you need to work on are the helper functions (below)

(function() {

  window.Board = Backbone.Model.extend({

    initialize: function (params) {
      if (_.isUndefined(params) || _.isNull(params)) {
        console.log('Good guess! But to use the Board() constructor, you must pass it an argument in one of the following formats:');
        console.log('\t1. An object. To create an empty board of size n:\n\t\t{n: %c<num>%c} - Where %c<num> %cis the dimension of the (empty) board you wish to instantiate\n\t\t%cEXAMPLE: var board = new Board({n:5})', 'color: blue;', 'color: black;','color: blue;', 'color: black;', 'color: grey;');
        console.log('\t2. An array of arrays (a matrix). To create a populated board of size n:\n\t\t[ [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...] ] - Where each %c<val>%c is whatever value you want at that location on the board\n\t\t%cEXAMPLE: var board = new Board([[1,0,0],[0,1,0],[0,0,1]])', 'color: blue;', 'color: black;','color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
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
      var counter = 0;
      var thisRow = this.get(rowIndex);
      for (var i=0; i<thisRow.length; i++){
        if(thisRow[i]){
          counter++;
        }
      }
      return counter > 1;
    },

    // test if any rows on this board contain conflicts
    hasAnyRowConflicts: function() {
      // go through each row of the board
      for(var i=0; i<this.rows().length; i++) {
      // if every row returns no conflict
        if(this.hasRowConflictAt(i)) {
        // return false
          return true;
        }
      }
      // else
        // return true
      return false;
    },



    // COLUMNS - run from top to bottom
    // --------------------------------------------------------------
    //
    // test if a specific column on this board contains a conflict
    hasColConflictAt: function(colIndex) {
      //create a new array
      var colArray = [];
      //create a counter var set to 0
      var counter = 0;
        //for each row
      for (var i=0; i<this.rows().length; i++){
        //push the column index into the new array
        colArray.push(this.rows()[i][colIndex]);
      }
      //for each item in new array
      for (var i=0; i<colArray.length; i++){
        //if item is 1,
        if(colArray[i]){
          //increment counter
          counter++;
        }
      }
      //return counter > 1
      return counter>1;
    },

    // test if any columns on this board contain conflicts
    hasAnyColConflicts: function() {
      // iterate through board upto board.length
      for(var i = 0; i<this.rows().length; i++) {
        // check if board at index has a column conflict
        if(this.hasColConflictAt(i)) {
        // if true
          // return true
          return true;
        }
      }
      // return false
      return false;
    },



    // Major Diagonals - go from top-left to bottom-right
    // --------------------------------------------------------------
    //
    // test if a specific major diagonal on this board contains a conflict
    hasMajorDiagonalConflictAt: function(majorDiagonalColumnIndexAtFirstRow) {
      //create current column index var set to parameter
      var colIndex = majorDiagonalColumnIndexAtFirstRow;
      //create a counter which counts conflicts
      var counter = 0;
      //loop through each row of board
      for (var i=0; i<this.rows().length; i++){
        //if column index of current row is 1
        if (this.rows()[i][colIndex]){
          //then increment counter
          counter++;
        }
        //increment column index
        colIndex++;
      }
      //return counter > 1
      return counter > 1;
    },

    // test if any major diagonals on this board contain conflicts
    hasAnyMajorDiagonalConflicts: function() {
      var context = this;
      var checkDiagonal = function(colIndex) {
        //create a counter which counts conflicts
        var counter = 0;
        //loop through each row of board
        for (var i=0; i<context.rows().length; i++){
          //if column index of current row is 1
          if (context.rows()[i][colIndex] && colIndex > -1){
            //then increment counter
            counter++;
          }
          //increment column index
          colIndex++;
        }
        //return counter > 1
        return counter > 1;
      };
      // set new var to newLength which is -length + 2
      var newLength = 2 - this.rows().length;
      // for each column index of top row starting at newLength
      for (var i = newLength; i<this.rows().length; i++){
        // if hasMajorDiagonalConflictAt on the current column index
        if (checkDiagonal(i)){
          // return true;
          return true;
        }
      }
      // return false
      return false;
    },



    // Minor Diagonals - go from top-right to bottom-left
    // --------------------------------------------------------------
    //
    // test if a specific minor diagonal on this board contains a conflict
    hasMinorDiagonalConflictAt: function(minorDiagonalColumnIndexAtFirstRow) {
      // set colIndex to parameter
      var colIndex = minorDiagonalColumnIndexAtFirstRow;
      // set coutner to 0
      var counter = 0;
      // iterate through the columns of the first row
      for(var i = 0; i < this.rows().length; i++) {
        // if value
        if(this.rows()[i][colIndex]) {
          // increment counter
          counter ++;
        }
        // decrement colIndex
        colIndex --;

      }
      // return counter > 1
      return counter > 1;
    },

    // test if any minor diagonals on this board contain conflicts
    hasAnyMinorDiagonalConflicts: function() {
      var context = this;
      var checkDiagonal = function(colIndex){
        var counter = 0;
        for(var i = 0; i < context.rows().length; i++) {
          if(context.rows()[i][colIndex]) {
            counter ++;
          }
          colIndex --;
        }
        return counter > 1;
      };
      //set newLength to this length + (this length -2)
      var newLength = this.rows().length + this.rows().length - 2;
      // iterate through first row up to newLength
      for (var i=0; i<newLength; i++){
        // if checkDiagonal at value
        if( checkDiagonal(i) ){
          // increment counter
          return true;
        }
      }
      // return counter > 1
      return false;
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
