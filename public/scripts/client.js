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
      <p>${tweet['created_at']}</p>
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
  
  //test tweetData
  const tweetData = [
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
  ];

  //loops through an array of tweet objects, creating a new tweet and appending it to the front page
  const renderTweets = function (tweetArray){
    for(let each of tweetArray) {
      let $newTweet = createTweetElement(each);
      $('#tweets-container').append($newTweet);
    }
  };

  renderTweets(tweetData);
});
