import config from "./config.js";
(() => {
  try {
    const url = `${config.serverUrl}/status`;
    const options = {
      method: "GET",
      mode: "cors",
      headers: {
        "content-type": "application/json;charset=utf-8",
      },
    };
    fetch(url, options)
      .then((response) => {
        if (response.status == 200) {
          redirectOffline(false);
        } else {
          redirectOffline(true);
        }
      })
      .catch((error) => {
        console.debug(`%c [SISTEMA DE STATUS] ${error}`, "color: #ff0000");
        redirectOffline(true);
      });

    function redirectOffline(offline) {
      const body = document.querySelector("body");

      if (offline) {
        body.hidden = true;

        if (body) {
          body.style.display = "none";
        }

        setTimeout(() => {
          console.log(window.location.href);
          if (window.location.hostname.includes("github.io")) {
            window.location.href =
              "https://luisdasartimanhas.github.io/brasil-eternity/sys/offline.html";
          } else {
            window.location.href = "../sys/offline.html";
          }
        }, 5000);
      }
    }
    redirectOffline(false);
  } catch (error) {
    alert(`ERRO FATAL: ${error}`);
  }
})();
