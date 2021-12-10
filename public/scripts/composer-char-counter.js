$(document).ready(function() {
  let tweetText = document.getElementById("tweet-text");
  tweetText.addEventListener("input", function() {
    let text = String($(this).val());
    let count = 140 - (text.length);
    console.log(count);
    let counter = this.parentElement.querySelector('.counter');
    $(counter).text(count);
    if (count < 0) {
      counter.setAttribute('id', 'counterNegative');
    } else {
      counter.setAttribute('id', 'counterPositive');
    }
  });
});