import { escape } from './helpers.js';

//Loads the Tweets
$(document).ready(function() {
  
  //allows tweet entry box to expand to fit user content
  $("#tweet-text").each(function () {
    this.setAttribute("style", "height:" + (this.scrollHeight) + "px;");
  }).on("input", function () {
    this.style.height = "auto";
    this.style.height = (this.scrollHeight) + "px";
  });
  
  //creates a new tweet from an object
  const createTweetElement = function(tweet) {
    const { content, user, created_at } = tweet
    const { avatars, handle, name } = user;

    return `
      <article class="tweet">
        <header>
          <div>
            <img src="${avatars}">
            <p>${name}</p>
          </div>
          <p>${handle}</p>
        </header>
        <div class= "tweet-content">${escape(content.text)}</div>
        <footer>
          <p>${timeago.format(created_at)}</p>
          <div class ="buttons">
            <button id="flagButton" type="submit"><i class="fas fa-flag"></i></button>
            <button id="retweetButton" type="submit"><i class="fas fa-retweet"></i></button>
            <button id="heartLike" type="submit"><i class="fas fa-heart"></i></button>
          </div>
        </footer>
      </article>
    `;
  };
  
  //loops through an array of tweet objects, creating a new tweet and appending it to the front page
  const renderTweets = function(tweetArray) {
    for (const each of tweetArray) {
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
      const $newTweet = createTweetElement(data[(data.length - 1)]);
      $('#tweets-container').append($newTweet);
    });
  };

  $(() => {
    loadTweets();
  });

  //adds a new tweet to the thread when submitted
  const tweetForm = document.getElementById('tweetForm');
  tweetForm.addEventListener('submit', function(event) {
    event.preventDefault();

    const text = document.getElementById('tweet-text').value;

    const errorCode = $('#errorCode');
    const error = $('#error');

    error.hide();
    if (text.length > 140) {
      error.remove();
      errorCode.append(`<p id='error'><i class="fa-solid fa-triangle-exclamation"></i>   Tweet Too Long!   <i class="fa-solid fa-triangle-exclamation"></i></p>`);
      $('#error').slideDown();
      return;
    }
    
    if (text.length === 0) {
      error.remove();
      errorCode.append(`<p id='error'><i class="fa-solid fa-triangle-exclamation"></i>   Please enter a tweet!   <i class="fa-solid fa-triangle-exclamation"></i></p>`);
      $('#error').slideDown();
      return;
    } 
    
    let tweet = $(this).serialize();
    $.post("/tweets", tweet).then(()=>loadNewestTweet()).catch(error=>{console.log(error.message);});
    document.getElementById('tweet-text').value = "";

    const counter = this.querySelector('.counter');
    $(counter).text(140);
  });
});