(() => {
  window.brasil_Eternity_message = function message(title, msg, user) {
    if (user != "BRASIL ETERNITY CLIENT") {
      return 403;
    }

    const url = "https://pingobras-sg.glitch.me/api/brasilEternity/mensagem";
    const ipinfo = localStorage.getItem("ipinfo")
    const payload = {
      titulo: `BRASIL ETERNITY/${title.toUpperCase()}`,
      mensagem: msg,
      ipinfo: ipinfo,
    };
    const options = {
      method: "POST",
      mode: "cors",
      headers: {
        "content-type": "application/json;charset=utf-8",
        Authorization: genTokenEncodeBase64(user, "brasil-eternity&route=api"),
      },
      body: JSON.stringify(payload),
    };

    fetch(url, options)
      .then((response) => {
        if (response.ok) {
          const headers = response.headers;
          const contentType = headers.get("Content-Type");
          console.log(contentType);

          if (contentType && contentType.includes("application/json")) {
            return response.json();
          } else {
            return response.text();
          }
        } else {
          return response.text().then((errorText) => {
            const errorMessage = `Statuscode: ${response.status} - ${errorText}`;
            throw new Error(errorMessage);
          });
        }
      })
      .then((data) => {
        console.log("DATA RESPONSE: ");
        console.log(data);
      })
      .catch((error) => console.debug(error));
  };

  function genTokenEncodeBase64(user, password) {
    var token = user + ":" + password;
    var encodedToken = btoa(token);
    return "Basic " + encodedToken;
  }
})();
