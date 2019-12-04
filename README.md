Hello, it's my first time creating a README.md file ..
so I'll do what you instructed us to do ..
and explain the process of my code ..
also I made a comments inside js files to explain the methods used ..
I hope its the right way to do it ..

the project about coding a Connect 4 Classic Game ..

- index.html:
this file created to be my home page to start the game ..
it contains a header, body with game logo, start game button, and footer ..
all created with HTML elements .. styled using CSS style sheet ..
jQuery library link added to head ..

- gamePage.html:
this file created to be the game page ..
it contains a header (the player color name 'red' and 'yellow' turn appear in it),
board 4x4 grid, two buttons (restart and home), and footer ..
all created with HTML elements .. styled using CSS style sheet ..
jQuery library link added to head ..

- game logic:
I tried so many different ways to achieve the best implementation to play the game
Mr. Saad, Ms. Samar, Ms. Sara, and Mr. Abdullah they didn't stop of supporting
one of the suggestions was to use 2D arrays to determine the winner, but I didn't
got the idea at the moment. I try and try but wasn't lucky,
so I start searching for understandable way for me to
code the game accordingly finally I found a tutorial in YouTube and I follow it.

- script:
(connect4.js) created to declare a class to use it in main.js file ..
both script files was linked in head tag in the HTML file ..

- main.js:

// DOM manipulation code, it's  calling jQuery's $ function ..
$(document).ready (function (){

// to create a board grid using jQuery ..
  const connect4 = new Connect4('#connect4')

// a function to announce player turn in HTML text element with id #player ..
  connect4.onPlayerMove = function () {
    $('#player').text (connect4.player);
  }

// a function to restart the game on click the restart button ..
  $('.myButton').click (function () {
    connect4.restart ();
  })
});

- connect4.js:

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
      if (winner) { // ending the game and announce the winner ..
        that.isGameOver = true;
        alert (`game over, ${that.player} wins!`)
        $('.col.empty').removeClass ('empty');
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
          return that.player;
        } else {
          return null;
        }
    }

    function checkDiagonalBLtoTR () { // diagonal checking method ..
      return checkWin ({i: 1, j: -1}, {i: 1, j: 1});
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

last but not least ..
here's the deployed link for my project ..
I faced alot of bugs when I tryed to make the TIE ..
not sure why but I'll make it ..

https://ifaisalo.github.io/sei-1st-project-connect4/

done .. thanks ..
