(() => {
  const url = "https://pingobras-sg.glitch.me/api/brasil-eternity/manutencao";
  const date = new Date();
  const id = Math.floor(Math.random() * 20242002);
  const options = {
    method: "GET",
    mode: "cors",
    headers: {
      "content-type": "application/json;charset=utf-8",
      key: date.getUTCHours() * date.getFullYear() * id,
      id: id,
      authorization: genTokenEncodeBase64(
        "manutencao",
        "brasil-eternity&route=api"
      ),
    },
  };
  fetch(url, options)
    .then((response) => {
      if (response.ok) {
        return response.json();
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
      redirectManutencao(data);
    })
    .catch((error) => {
      console.error(error);
    });

  function redirectManutencao(offline) {
    const devUser = JSON.parse(localStorage.getItem("dev")) || false;
    const expUser =
      JSON.parse(localStorage.getItem("experimentalMode")) || false;
    const body = document.querySelector("body");

    if ((offline && !devUser) || (offline && !devUser)) {
      body.hidden = true;

      if (body) {
        body.style.display = "none";
      }

      setTimeout(() => {
        window.location.href = "/sys/manutencao.html";
      }, 3000);
    }
  }
  redirectManutencao(false);

  function genTokenEncodeBase64(user, password) {
    var token = user + ":" + password;
    var encodedToken = btoa(token);
    return "Basic " + encodedToken;
  }
})();


// const url = "https://pingobras-sg.glitch.me/api/brasil-eternity/manutencao";
//     const payload = {
//         "manutencao": "false"
//     };
//     const options = {
//       method: "POST",
//       mode: "cors",
//       headers: {
//         "content-type": "application/json;charset=utf-8",
//         Authorization: genTokenEncodeBase64("manutencao", "brasil-eternity&route=api"),
//       },
//       body: JSON.stringify(payload),
//     };

//     fetch(url, options)
//       .then((response) => {
//         if (response.ok) {
//           const headers = response.headers;
//           const contentType = headers.get("Content-Type");
//           console.log(contentType);

//           if (contentType && contentType.includes("application/json")) {
//             return response.json();
//           } else {
//             return response.text();
//           }
//         } else {
//           return response.text().then((errorText) => {
//             const errorMessage = `Statuscode: ${response.status} - ${errorText}`;
//             throw new Error(errorMessage);
//           });
//         }
//       })
//       .then((data) => {
//         console.log("DATA RESPONSE: ");
//         console.log(data);
//       })
//       .catch((error) => console.debug(error));

//   function genTokenEncodeBase64(user, password) {
//     var token = user + ":" + password;
//     var encodedToken = btoa(token);
//     return "Basic " + encodedToken;
//   }
