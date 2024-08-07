(() => {
  const form = document.getElementById("form");
  const formCode = document.getElementById("formCode");
  const msgError = document.getElementById("msgError");
  const msgSuccess = document.getElementById("msgSuccess");

  form.addEventListener("submit", stopDefAction);
  formCode.addEventListener("submit", stopDefActionSendCode);

  function stopDefAction(event) {
    event.preventDefault();
    getData();
  }

  function stopDefActionSendCode(event) {
    event.preventDefault();
    sendCode();
  }

  function getData() {
    const inpEmail = document.getElementById("email");
    const url =
      "https://pingobras-sg.glitch.me/api/brasil-eternity/login/magiclink";
    const date = new Date();
    const id = getRandomInt(20242002);
    const payloadLogin = {
      email: inpEmail.value,
      type: "admin",
    };
    const options = {
      method: "POST",
      mode: "cors",
      headers: {
        "content-type": "application/json;charset=utf-8",
        Authorization: genTokenEncodeBase64(
          "BRASIL ETERNITY CLIENT",
          "brasil-eternity&route=api"
        ),
        key: date.getUTCHours() * date.getFullYear() * id,
        id: id,
      },
      body: JSON.stringify(payloadLogin),
    };

    msgError.setAttribute("style", "display: none");
    msgSuccess.innerHTML = "Aguardando Servidor....";
    msgSuccess.setAttribute("style", "display: block");
    message("Esta enviando magic link para o email!");
    fetch(url, options)
      .then((response) => {
        if (response.ok) {
          message(`Magic Link enviado com sucesso!`);
          msgSuccess.setAttribute("style", "display: none");
          return response.text();
        } else {
          return response.text().then((errorText) => {
            message("Erro ao Enviar Codigo Magick Link: " + errorText);
            throw new Error("Erro ao Enviar Codigo Magick Link: " + errorText);
          });
        }
      })
      .then((data) => {
        console.log("DATA RESPONSE: ");
        console.log(data);
        alert(data);
        form.hidden = true;
        formCode.hidden = false;
      })
      .catch((error) => onError(error));
  }

  function sendCode() {
    const inpEmail = document.getElementById("email");
    const inpCode = document.getElementById("code");
    const url = "https://pingobras-sg.glitch.me/api/brasil-eternity/login";
    const date = new Date();
    const id = Math.floor(Math.random() * 20242002);
    const payloadLogin = {
      email: inpEmail.value,
      code: inpCode.value,
    };
    const options = {
      method: "POST",
      mode: "cors",
      headers: {
        "content-type": "application/json;charset=utf-8",
        Authorization: genTokenEncodeBase64(
          "BRASIL ETERNITY CLIENT",
          "brasil-eternity&route=api"
        ),
        key: date.getUTCHours() * date.getFullYear() * id,
        id: id,
      },
      body: JSON.stringify(payloadLogin),
    };

    msgError.setAttribute("style", "display: none");
    msgSuccess.innerHTML = "Aguardando Servidor....";
    msgSuccess.setAttribute("style", "display: block");
    message("Admin esta tentando fazer login, Aguarde confirmação!");
    fetch(url, options)
      .then((response) => {
        if (response.ok) {
          message(`Admin Logado com sucesso!`);
          return response.json();
        } else {
          return response.text().then((errorText) => {
            message("Erro ao fazer login: " + errorText);
            throw new Error("Erro ao fazer login: " + errorText);
          });
        }
      })
      .then((data) => {
        console.log("DATA RESPONSE: ");
        console.log(data);
        autenticar(data);
      })
      .catch((error) => onError(error));
  }

  function autenticar(userLogado) {
    const dataUserJson = JSON.stringify(userLogado);
    const cords = 255;
    const seed =
      getRandomInt(cords) *
      getRandomInt(cords) *
      getRandomInt(cords) *
      getRandomInt(cords);
    const hexKey =
      getRandomHex(seed) +
      getRandomHex(seed) +
      getRandomHex(seed) +
      getRandomHex(seed);
    const clientID = getRandomHex(255255255);
    let token = hexKey + hexKey + "ValidDB:" + clientID;

    localStorage.setItem("tokenAdmin", token);
    setTimeout(() => {
      window.location.href = "/user/admin";
    }, 4000);
  }

  function onError(error) {
    console.debug(error);
    msgError.setAttribute("style", "display: block");
    msgError.innerHTML = error;
    msgSuccess.setAttribute("style", "display: none");
  }

  function message(msg) {
    const url = "https://pingobras-sg.glitch.me/api/brasilEternity/mensagem";
    const payload = {
      titulo: "ADMIN LOGIN/BRASIL ETERNITY",
      mensagem: msg,
    };
    const options = {
      method: "POST",
      mode: "cors",
      headers: {
        "content-type": "application/json;charset=utf-8",
        Authorization: genTokenEncodeBase64(
          "BRASIL ETERNITY CLIENT",
          "brasil-eternity&route=api"
        ),
      },
      body: JSON.stringify(payload),
    };

    fetch(url, options)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          return response.text();
        }
      })
      .then((data) => {
        console.log("DATA RESPONSE: ");
        console.log(data);
      })
      .catch((error) => console.debug(error));
  }

  function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

  function getRandomBin(max) {
    return Math.floor(Math.random() * max).toString(2);
  }

  function getRandomHex(max) {
    return Math.floor(Math.random() * max).toString(16);
  }

  function genTokenEncodeBase64(user, password) {
    var token = user + ":" + password;
    var encodedToken = btoa(token);
    return "Basic " + encodedToken;
  }
})();
