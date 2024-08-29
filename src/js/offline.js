(() => {
  const url = "https://pingobras-sg.glitch.me/";
  const date = new Date();
  const id = Math.floor(Math.random() * 20242002);
  const options = {
    method: "GET",
    mode: "cors",
    headers: {
      "content-type": "application/json;charset=utf-8",
      key: date.getUTCHours() * date.getFullYear() * id,
      id: id,
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
      console.error(error);
    });

  function redirectOffline(offline) {
    const body = document.querySelector("body");

    if (offline) {
      body.hidden = true;

      if (body) {
        body.style.display = "none";
      }

      setTimeout(() => {
        window.location.href = "/offline.html";
      }, 5000);
    }
  }
  redirectOffline(false);
})();
