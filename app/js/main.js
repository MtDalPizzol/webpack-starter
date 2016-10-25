import './module1.js';

$(document).ready(function() {

  $('.button-collapse')
    .on('click', function() {
      $('#slide-out').toggleClass('visible-on-mobile');
    });

  $(document).on('click', function(e) {
    var target = e.target;
    if (!$(target).is('#slide-out') && !$(target).parents().is('#slide-out') &&
        !$(target).is('.button-collapse') && !$(target).parents().is('.button-collapse')) {
      $('#slide-out').removeClass('visible-on-mobile');
    }
  });

  $('#npm-modules-status')
    .text('NPM modules were successfuly loaded from from ./node_modules')
    .closest('.card')
    .removeClass('red')
    .addClass('green');

  var html = require('../partial.html');

  $('#raw-loader-status')
    .html(html)
    .closest('.card')
    .removeClass('red')
    .addClass('green');

});
