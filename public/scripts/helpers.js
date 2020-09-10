// Helper functions to be used with client.js file

// Fetch data from client-side JS using AJAX
const loadTweets = function() {
  $.get('/tweets/', renderTweets);
};

// Create safeHTML text
const escape = (str) => {
  let p = document.createElement('p');
  p.appendChild(document.createTextNode(str));
  return p.innerHTML;
};

const determineTimeSince = (ms) => {
  const now = new Date();

  // Get time difference from now and tweet time in secs
  const secsPassed = (now.getTime() - ms) / 1000;
  
  let time;
  switch (true) {
    case (secsPassed < 60):
      time = parseInt(secsPassed) + ' seconds ago';
      break;
    case (secsPassed < 3600):
      time = parseInt(secsPassed / 60) + ' minutes ago';
      break;
    case (secsPassed < 86400):
      time = parseInt(secsPassed / 3600) + ' hours ago';
      break;
    case (secsPassed < 31536000): 
      time = parseInt(secsPassed / 86400) + ' days ago';
      break;
    case (secsPassed >= 31536000): 
      time = parseInt(secsPassed / 31536000) + ' years ago'; 
  }
  return time;
};

// Create a tweet element from a tweet object
const createTweetElement = function(tweetData) {
  const date = determineTimeSince(tweetData.created_at);
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
        <p>${date}</p>
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
  arrOfObjs
    .reverse()
    .forEach(tweetObj => $('#tweet-container').append(createTweetElement(tweetObj)));
};
