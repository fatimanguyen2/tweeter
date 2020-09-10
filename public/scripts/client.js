/*
* Client-side JS logic goes here
* jQuery is already loaded
* Reminder: Use (and do all your DOM work in) jQuery's document ready function
*/

$(document).ready(function() {
  // Hide input error messsage
  const $errorMess = $('#error'); //IS THIS NEEDED??????????????@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
  $errorMess.hide();

  // Hide new tweet section @@@@@@@@@@@@@@@@@@@@@@CSS VS JS@@@@@@@@@@@
  // $('.new-tweet').hide();
  // Show scroll button on scroll
  $(window).scroll(() => {
    if ($(window).scrollTop() === 0) {
      $('#scroll-button').hide();
    } else {
      $('#scroll-button').show();
    }
  });

  //Show new tweet section on click
  $('#compose-button').click(() => {
    $('.new-tweet').slideToggle('fast');
    $('textarea').focus();
  });

  // Post new tweet using AJAX
  $('form').submit(function(event) {
    const $formText = $(this).serialize();
    const textArea = $(this).find('textarea').val();

    event.preventDefault();
    $errorMess.hide();

    if (!textArea) {
      $errorMess.text('This field is required.').show();
    } else if (textArea.length > 140) {
      $errorMess.text('The text entered exceeds the maximum length.').show();
    } else {
      $.post('/tweets', $formText)
        .then(() =>  $.get('/tweets/'))
        .then(data => {
          const newTweet = createTweetElement(data[data.length - 1]);
          $('#tweet-container').prepend(newTweet);
        });
    }
  });

  loadTweets();
});


