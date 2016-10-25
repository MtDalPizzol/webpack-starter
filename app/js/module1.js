$(document).ready(function(){

  $('#app-modules-status')
    .text('App modules were successfuly loaded from from ./app/js')
    .closest('.card')
    .removeClass('red')
    .addClass('green');

});
