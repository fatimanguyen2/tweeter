/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function() {
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

  // Post new tweet using AJAX
  $('form').submit(function(event) {
    const $formText = $(this).serialize();
    const textAreaValue = $(this).find('textarea').val();

    event.preventDefault();

    if (!textAreaValue) {
      alert('Error, tweet contains no text. Please write out your tweet!');
    } else if (textAreaValue.length > 140) {
      alert('Tweet exceeding character limit! Please shorten your tweet.');
    } else {
      // $.ajax('/tweets/', {method: 'POST', data: $formText}) //ALTERNATIVE WAY

      $.post('/tweets', $formText)
        .then(() => {/* $.get('/tweets/') */
        $.get('/tweets/', (data) => {
          const newTweet = createTweetElement(data[data.length - 1]);
          $('#tweet-container').prepend(newTweet);
        })
      })
        // WHAT S WRONG WITH MY PROMISE!?!?! 
        // .then(data => {
        //   const newTweet = createTweetElement(data[data.length - 1]);
        //   $('#tweet-container').prepend(newTweet);
        // }) 
    }
  })

  // Fetch data from client-side JS using AJAX
  const loadTweets = function() {
    $.get('/tweets/', renderTweets);
  };

  loadTweets();
});


