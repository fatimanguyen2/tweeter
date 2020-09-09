/*
* Client-side JS logic goes here
* jQuery is already loaded
* Reminder: Use (and do all your DOM work in) jQuery's document ready function
*/

$(document).ready(function() {
  const $errorMess = $('#error');
  $errorMess.hide();

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
      // $.ajax('/tweets/', {method: 'POST', data: $formText}) //ALTERNATIVE WAY
      // $.get('/tweets/', (data) => {
      //   const newTweet = createTweetElement(data[data.length - 1]);
      //   $('#tweet-container').prepend(newTweet);
      // })

      $.post('/tweets', $formText)
        .then(() => {
          return $.get('/tweets/')
        })
        .then(data => {
          const newTweet = createTweetElement(data[data.length - 1]);
          $('#tweet-container').prepend(newTweet);
        });
    }
  });

  loadTweets();
});


