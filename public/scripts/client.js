//Loads the Tweets
$(document).ready(function() {
  //escape function allows text from user to be processed without running user-input scripts
  const escape = function(str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };
  
  //creates a new tweet from an object
  const createTweetElement = function(tweet) {
    const newTweet = `
    <article class="tweet">
    <header>
      <div>
        <img src="${tweet['user']['avatars']}"> 
        <p>${tweet['user']['name']}</p>
      </div>
      <p>${tweet['user']['handle']}</p>
    </header>
    <div class= "tweet-content">${escape(tweet['content']['text'])}</div>
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

  const newTweetSlide = document.getElementById('newTweetSlide');
  //button that shows or hides the new-tweet option
  newTweetSlide.addEventListener('click', function(event) {
    if ($('.new-tweet').is(":hidden")) {
      $('.new-tweet').slideDown();
      document.getElementById('tweet-text').focus();
    } else {
      $('.new-tweet').slideUp();
    }
  });

  const scrollTop = document.getElementById('scrollTop');
  //button that scrolls to the top of the page
  scrollTop.addEventListener('click', function(event) {
    $('.new-tweet').slideDown();
    document.getElementById('tweet-text').focus();
  });

  //activates on scroll to show/hide the new tweet and scroll to top buttons
  $(document).scroll(function() {
    if ($(document).scrollTop() > "600") {
      $("#scrollTop").show();
    } else if ($(document).scrollTop() < "600") {
      $("#scrollTop").hide();
    }
    if ($("#scrollTop").is(":hidden")) {
      $(".navMessage").show();
    } else {
      $(".navMessage").hide();
    }
  });

  const tweetForm = document.getElementById('tweetForm');

  //adds a new tweet to the thread when submitted
  tweetForm.addEventListener('submit', function(event) {
    event.preventDefault();
    const text = document.getElementById('tweet-text').value;
    $('#error').hide();
    if (text.length > 140) {
      $('#error').remove();
      $('#errorCode').append(`<p id='error'><i class="fa-solid fa-triangle-exclamation"></i>   Tweet Too Long!   <i class="fa-solid fa-triangle-exclamation"></i></p>`);
      $('#error').slideDown();
    } else if (text.length === 0) {
      $('#error').remove();
      $('#errorCode').append(`<p id='error'><i class="fa-solid fa-triangle-exclamation"></i>   Please enter a tweet!   <i class="fa-solid fa-triangle-exclamation"></i></p>`);
      $('#error').slideDown();
    } else {
      let tweet = $(this).serialize();
      $.post("/tweets", tweet).then(()=>loadNewestTweet());
      document.getElementById('tweet-text').value = "";
    }
  });
});
