$(document).ready (function (){
  const connect4 = new Connect4('#connect4')

  connect4.onPlayerMove = function () {
    $('#player').text (connect4.player);
  }

  $('.myButton').click (function () {
    connect4.restart ();
  })
});
