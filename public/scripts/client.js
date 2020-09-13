$(document).ready(() => {
//Show new tweet section on click
  $('#compose-button').click(() => {
    $('.new-tweet').slideToggle('fast');
    $('textarea').focus();
  });

  // Post new tweet using AJAX
  $('form').submit(function(event) {
    event.preventDefault();

    const $formText = $(this).serialize();
    const textArea = $(this).find('textarea').val();
    const validTweet = checkTweetSubmission(textArea, 140);
    
    $('.error').hide(); //ensures that error message is hidden when composing tweet after an error

    if (validTweet) {
      $.post('/tweets', $formText)
        .then(() =>resetForm(140))
        .then(() => loadTweets());

    } else if (!textArea) {
      writeError($('.error'), 'This field is required.').show();

    } else {
      writeError($('.error'), 'The text entered exceeds the maximum length.').show();
    }
  });

  loadTweets();
});


