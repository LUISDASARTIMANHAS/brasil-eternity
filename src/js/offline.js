(() => {
  const body = document.querySelector("body");
  const offline = false;

  
  if (offline) {
    body.hidden = true;
    setTimeout(() => {
 window.location.href= "/offline.html"
},5000)
  }
})();
