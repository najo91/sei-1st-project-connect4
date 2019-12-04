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
