/*
* Client-side JS logic goes here
* jQuery is already loaded
* Reminder: Use (and do all your DOM work in) jQuery's document ready function
*/

$(document).ready(() => {
//Show new tweet section on click
  $('#compose-button').click(() => {
    $('.new-tweet').slideToggle('fast');
    $('textarea').focus();
  });

  // Post new tweet using AJAX
  $('form').submit(function () {
    event.preventDefault();

    const $formText = $(this).serialize();
    const textArea = $(this).find('textarea').val();

    $('.error').hide();

    if (!textArea) {
      $('.error').text('This field is required.').show();

    } else if (textArea.length > 140) {
      $('.error').text('The text entered exceeds the maximum length.').show();

    } else {
      $.post('/tweets', $formText)
        .then(data => {
          $('#tweet-container').empty();
          loadTweets();
          $('textarea').val('');
          $('.counter').text(140);
        });
    }
  });

  loadTweets();
});


