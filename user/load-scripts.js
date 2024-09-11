(() => {
  const autoscriptsUser = document.querySelector("autoscriptsuser");
  const fonteUser = "/user/";
  const srcsUser = ["auth", "load-userinfo"];
  const fonteScripts = "/src/js/";
  const srcsScripts = ["manutencao-redirect", "functions", "offline"];

  for (let i = 0; i < srcsScripts.length; i++) {
    var newScript = document.createElement("script");

    newScript.setAttribute("src", fonteScripts + srcsScripts[i] + ".js");
    autoscriptsUser.appendChild(newScript);

    console.log(" Novo Script Num: " + srcsScripts[i]);
  }

  for (let i = 0; i < srcsUser.length; i++) {
    var newScriptUser = document.createElement("script");

    newScriptUser.setAttribute("src", fonteUser + srcsUser[i] + ".js");
    autoscriptsUser.appendChild(newScriptUser);

    console.log(" Novo User Script Num: " + srcsUser[i]);
  }
})();
