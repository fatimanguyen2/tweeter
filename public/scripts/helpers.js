// Helper functions to be used with client.js & composer-char-counter.js file
// Dynamically count characters (e.g. for new tweet section)
const countChar = (node, max, textLength) => node.text(max - textLength);

// Turn text in red if limit exceeded (e.g. character counter for new tweet section)
const changeTextRed = (node, condition) => {
  if (condition) {
    node.addClass('exceedingCharLimit');
  } else {
    node.removeClass('exceedingCharLimit');
  }
};

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
  
// Append an array of tweets to tweeter page in reverse chronological order
const renderTweets = arrOfObjs => {
  arrOfObjs
    .reverse()
    .forEach(tweetObj => $('#tweet-container').append(createTweetElement(tweetObj)));
};

// Check if valid tweet (no empty string nor exceeding chars)
const checkTweetSubmission = (userInput, maxChar) => {
  if (!userInput || userInput.length > maxChar) {
    return false;
  } else {
    return true;
  }
};

//Reset form (e.g. after posting a tweet) 
const resetForm = (maxChar) => {
  $('#tweet-container').empty();
  $('textarea').val('');
  $('.counter').text(maxChar);
};

// Write errormessage
const writeError = (node, message) => $(node).text(message);
