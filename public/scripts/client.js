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
  $('form').submit(function(event) {
    const $formText = $(this).serialize();
    const textArea = $(this).find('textarea').val();

    event.preventDefault();
    $('.error').hide(); //ensures that error message is hidden when composing tweet after an error
    let validTweet = tweetSubmissionCheck(textArea, 140);

    if (validTweet) {
      $.post('/tweets', $formText)
        .then(() =>resetForm(140))
        .then(() => loadTweets());
    }
  });

  loadTweets();
});


