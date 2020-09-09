/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function() {
// Create a tweet element from a tweet object
  const createTweetElement = function(tweetData) {
    const $tweet = $(`
      <article>
        <header>
          <div class='avatar'>
            <img src=${tweetData.user.avatars}>
            <p>${tweetData.user.name}</p>
          </div>
          <p class='handle'>t${tweetData.user.handle}</p>
        </header>

        <main>
          <p>${tweetData.content.text}</p>
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
  //FUNCTION BELOW NOT WORKING, DONT UNDERSTAND ERROR
  // const renderTweets = function(arrOfObjs) {
  //   arrOfObjs.forEach(function(tweetObj){
  //     $('#tweet-container').append(createTweetElement(tweetObj));
  //   });
  // }:
  // renderTweets(data);

  // Post new tweet using AJAX
  $('form').submit(function() {
    const $formText = $(this).serialize();
    event.preventDefault();
    
    $.ajax('/tweets/', {method: 'POST', data: $formText})
  })

  // Fetch data from client-side JS using AJAX
  const loadTweets = function() {
    $.get('/tweets/', (arrayOfDbTweets) => {
      renderTweets(arrayOfDbTweets);
    });
    // $.get('/tweets/', renderTweets(arrayOfDbTweets)); //why doesn't this work?
  };

  loadTweets();
});


