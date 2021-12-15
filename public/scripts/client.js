//Loads the Tweets
$(document).ready(function() {
  //creates a new tweet from an object
  const createTweetElement = function(tweet) {
    let newTweet = `
    <article class="tweet">
    <header>
      <div>
        <img src="${tweet['user']['avatars']}"> 
        <p>${tweet['user']['name']}</p>
      </div>
      <p>${tweet['user']['handle']}</p>
    </header>
    <div class= "tweet-content">${tweet['content']['text']}</div>
    <footer>
      <p>${timeago.format(tweet['created_at'])}</p>
      <div class ="buttons">
        <button id="flagButton" type="submit"><i class="fas fa-flag"></i></button>
        <button id="retweetButton" type="submit"><i class="fas fa-retweet"></i></button>
        <button id="heartLike" type="submit"><i class="fas fa-heart"></i></button>
      </div>
    </footer>
  </article>
    `; 
    return newTweet;
  }
  
  //loops through an array of tweet objects, creating a new tweet and appending it to the front page
  const renderTweets = function (tweetArray){
    for(const each of tweetArray) {
      const $newTweet = createTweetElement(each);
      $('#tweets-container').append($newTweet);
    }
  };

  //loads all tweets in the /tweets location
  const loadTweets = function() {
    $.getJSON('/tweets', function(data) {
      renderTweets(data);
    });
  };

  //loads only the latest tweet to the tweet container
  const loadNewestTweet = function() {
    $.getJSON('/tweets', function(data) {
      const $newTweet = createTweetElement(data[(data.length-1)]);
      $('#tweets-container').append($newTweet);;
    });
  }

  $(() => {
    loadTweets();
  });

  const tweetButton = document.getElementById('tweetForm');

  //adds a new tweet to the thread when submitted
  tweetButton.addEventListener('submit', function(event) {
    event.preventDefault();
    let tweet = $(this).serialize();
    $.post("/tweets", tweet).then(()=>loadNewestTweet());
    document.getElementById('tweet-text').value = "";

  });
});
