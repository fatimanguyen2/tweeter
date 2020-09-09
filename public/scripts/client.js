/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function() {
  const data = [
    {
      "user": {
        "name": "Newton",
        "avatars": "https://i.imgur.com/73hZDYK.png"
        ,
        "handle": "@SirIsaac"
      },
      "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
      "created_at": 1461116232227
    },
    {
      "user": {
        "name": "Descartes",
        "avatars": "https://i.imgur.com/nlhLi3I.png",
        "handle": "@rd" },
      "content": {
        "text": "Je pense , donc je suis"
      },
      "created_at": 1461113959088
    }
  ]

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
  
  const renderTweets = function(arrOfObjs) {
    arrOfObjs.forEach(function(tweetObj){
      $('#tweet-container').append(createTweetElement(tweetObj));
    });
  };
  //FUNCTION BELOW NOT WORKING, DONT UNDERSTSND ERROR
  // const renderTweets = function(arrOfObjs) {
  //   arrOfObjs.forEach(function(tweetObj){
  //     $('#tweet-container').append(createTweetElement(tweetObj));
  //   });
  // }:

  renderTweets(data);
});


