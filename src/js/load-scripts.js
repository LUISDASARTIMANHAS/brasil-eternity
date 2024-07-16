(() => {
  const autoscripts = document.querySelector("autoscripts");
  const fonteUser = "https://brasil-eternity.glitch.me/src/js/";
  const srcsUser = ["functions", "offline", "message"];

  for (let i = 0; i < srcsUser.length; i++) {
    var newScript = document.createElement("script");

    newScript.setAttribute("src", fonteUser + srcsUser[i] + ".js");
    autoscripts.appendChild(newScript);

    console.log(" Novo Script Num: " + srcsUser[i]);
  }
})();
