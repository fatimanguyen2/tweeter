/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
// Create safeHTML text
  const escape = (str) => {
    let p = document.createElement('p');
    p.appendChild(document.createTextNode(str));
    return p.innerHTML;
  };
  // Create a tweet element from a tweet object
  const createTweetElement = function(tweetData) {

    const $tweet = $(`
      <article>
        <header>
          <div class='avatar'>
            <img src=${tweetData.user.avatars}>
            <p>${tweetData.user.name}</p>
          </div>
          <p class='handle'>${tweetData.user.handle}</p>
        </header>
  
        <main>
          <p>${escape(tweetData.content.text)}</p>
        </main>
  
        <footer>
          <p>${tweetData.created_at}</p>
          <div>
            <i class="fas fa-flag"></i>
            <i class="fas fa-retweet"></i>
            <i class="fas fa-heart"></i>
          </div>
        </footer>
    </article>
    `);
    return $tweet;
  };
  
  // Append an array of tweets to tweeter page
  const renderTweets = function(arrOfObjs) {
    arrOfObjs.forEach(function(tweetObj){
      $('#tweet-container').append(createTweetElement(tweetObj));
    });
  };

  
  $(document).ready(function() {
    const $errorMess = $('#error');
    $errorMess.hide(); //WHY CANT I PUT IT OUTSIDE OF DOCUMENT READY

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
        .then(() => {$.get('/tweets/')

          .then(data => {
            const newTweet = createTweetElement(data[data.length - 1]);
            $('#tweet-container').prepend(newTweet);
          }) 
      })
    }
  })

  // Fetch data from client-side JS using AJAX
  const loadTweets = function() {
    $.get('/tweets/', renderTweets);
  };

  loadTweets();
});


