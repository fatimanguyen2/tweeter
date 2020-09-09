/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
const tweetData = {
  "user": {
    "name": "Newton",
    "avatars": "https://i.imgur.com/73hZDYK.png",
      "handle": "@SirIsaac"
    },
  "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
  "created_at": 1461116232227
}




$(document).ready(function() {
  const createTweetElement = function(tweetObj) {
    return $(`
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
  };
  const $tweet = createTweetElement(tweetData);
  
  // Test / driver code (temporary)
  console.log($tweet); // to see what it looks like
  $('#tweet-container').append($tweet); // to add it to the page so we can make sure it's got all the right elements, classes, etc.
});


