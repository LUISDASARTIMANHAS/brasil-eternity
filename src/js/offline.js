(() => {
  const body = document.querySelector("body");
  const offline = true;

  
  if (offline) {
    body.hidden = true;
    
    if(body){
      body.style.display = "none";
    }
    
    setTimeout(() => {
 window.location.href= "/offline.html"
},5000)
  }
})();
