// Helper functions to be used with client.js file

// Fetch data from client-side JS using AJAX
const loadTweets = () => $.get('/tweets/', renderTweets);

// Create safeHTML text to prevent
const escape = str => {
  let p = document.createElement('p');
  p.appendChild(document.createTextNode(str));
  return p.innerHTML;
};

// Create a tweet element from a tweet object
const createTweetElement = tweetData => {
  const date = moment(tweetData.created_at).fromNow();
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
const renderTweets = arrOfObjs => {
  arrOfObjs
    .reverse()
    .forEach(tweetObj => $('#tweet-container').append(createTweetElement(tweetObj)));
};
