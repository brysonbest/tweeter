//escape function allows text from user to be processed without running user-input scripts
const escape = function(str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
}

export { escape };