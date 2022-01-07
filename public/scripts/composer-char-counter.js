$(document).ready(function() {

  //Updates the character counter for new tweets.
  const tweetText = document.getElementById("tweet-text");
  tweetText.addEventListener("input", function() {
    const text = String($(this).val());
    const count = 140 - (text.length);
    const counter = this.parentElement.querySelector('.counter');
    $(counter).text(count);
    if (count < 0) {
      counter.setAttribute('id', 'counterNegative');
    } else {
      counter.setAttribute('id', 'counterPositive');
    }
  });
});