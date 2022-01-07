$(document).ready(function() {

  //button that shows or hides the new-tweet option
  const newTweetSlide = document.getElementById('newTweetSlide');
  newTweetSlide.addEventListener('click', function() {
    if ($('.new-tweet').is(":visible")) {
      $('.new-tweet').slideUp();
    } else {
      $('.new-tweet').slideDown();
      document.getElementById('tweet-text').focus();
    }
  });

  //button that scrolls to the top of the page
  const scrollTop = document.getElementById('scrollTop');
  scrollTop.addEventListener('click', function() {
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
});