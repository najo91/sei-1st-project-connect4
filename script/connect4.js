// declare a class ..
class Connect4 {
  constructor (selector) {
    this.ROWS = 4;
    this.COLS = 4;
    this.player = 'red';
    this.selector = selector;
    this.isGameOver = false;
    this.onPlayerMove = function () {};
    this.createGrid();
    this.setupEventListeners();
  }
// function for create a board grid ..
  createGrid () {
    const $board = $(this.selector);
    $board.empty ();
    this.isGameOver = false; // to stop the entract with board when its over ..
    this.player = 'red';
    for (let row = 0; row < this.ROWS; row ++) { // to create a rows in grid ..
      const $row = $('<div>')
      .addClass ('row');
      for (let col = 0; col < this.COLS; col ++) { // to create a columns inside each row ..
        const $col = $('<div>')
        .addClass ('col empty')
        .attr ('data-col', col)
        .attr ('data-row', row); // to set a value for each slot ..
        $row.append ($col);
      }
      $board.append($row);
    }
  }

  setupEventListeners () {
    const $board = $(this.selector);
    const that = this;

    function findLastEmptyCell (col) { // to find the last empty slot ..
      const cells = $(`.col[data-col=${col}]`);
      for (let n = cells.length - 1; n >= 0; n --) {
        const $cell = $(cells[n]);
        if ($cell.hasClass ('empty')) {
          return $cell;
        }
      }
      return null;
    }

    $board.on ('mouseenter', '.col.empty', function (){ // mouseenter event for hovering effect ..
      if (that.isGameOver) return;
      const col = $(this).data ('col');
      const $lastEmptyCell = findLastEmptyCell (col);
      $lastEmptyCell.addClass (`next-${that.player}`);
    });

    $board.on ('mouseleave', '.col', function () { // mouseleave event fo hovering effect ..
      $('.col').removeClass (`next-${that.player}`);
    });

    $board.on ('click', '.col.empty', function () { // click event to ineract with board ..
      if (that.isGameOver) return;
      const col = $(this).data ('col');
      const $lastEmptyCell = findLastEmptyCell (col);
      $lastEmptyCell.removeClass (`empty next-${that.player}`);
      $lastEmptyCell.addClass (that.player);
      $lastEmptyCell.data ('player', that.player); // to safely store the which color in which slot ..

      const winner = that.checkForWinner (
        $lastEmptyCell.data ('row'),
        $lastEmptyCell.data ('col')
      )
      if (!$('.col.empty')[0]) {
        that.isGameOver = true;
      }
      if (winner) { // ending the game and announce the winner ..
        that.isGameOver = true;
        alert (`game over, ${that.player} wins!`)
        $('.col.empty').removeClass ('empty');
        return;
      } else if (that.isGameOver) {
        alert (`game over, TIE!`)
        return;
      }

      that.player = (that.player === 'red') ? 'yellow' : 'red'; // to alternate between the two players ..
      that.onPlayerMove ();
      $(this).trigger ('mouseenter');
    });
  }

  checkForWinner (row, col) {
    const that = this;

    function $getCell (i, j) {
      return $(`.col[data-row='${i}'][data-col='${j}']`);
    }


    function checkDirection (direction) { // a function to determine checking direction ..
      let total = 0;
      let i = row + direction.i;
      let j = col + direction.j;
      let $next = $getCell (i, j);
      while (i >= 0
      && i < that.ROWS
      && j >= 0
      && j < that.COLS
      && $next.data ('player') === that.player) {
        total ++;
        i += direction.i;
        j += direction.j;
        $next = $getCell (i, j);
      }
      return total;
    }

    function checkWin (directionA, directionB) { // dirA UP, and dirB DOWN ..
      const total = 1 +
        checkDirection (directionA) +
        checkDirection (directionB);
        if (total >= 4) {
          return true;
        } else {
          return false;
        }
    }

    function checkDiagonalBLtoTR () { // diagonal checking method ..
      return checkWin ({i: -1, j: -1}, {i: 1, j: 1});
    }

    function checkDiagonalTLtoBR () { // diagonal checking method ..
      return checkWin ({i: 1, j: 1}, {i: -1, j: -1});
    }

    function checkVerticals () { // vertical checking method ..
      return checkWin ({i: -1, j: 0}, {i: 1, j: 0});
    }

    function checkHorizontals () { // horizontal cheching method ..
      return checkWin ({i: 0, j: -1}, {i: 0, j: 1});
    }

    return checkVerticals ()
        || checkHorizontals ()
        || checkDiagonalBLtoTR ()
        || checkDiagonalTLtoBR ();
  }

  restart () { // restarting the game without refreshing the page method ..
    this.createGrid ();
    this.onPlayerMove ();
  }
}
