const form = document.querySelector("form");
const msgError = document.getElementById("msgError");
const msgSuccess = document.getElementById("msgSuccess");

form.addEventListener("submit", stopDefAction);

function stopDefAction(event) {
  event.preventDefault();
  getData();
}

function getData() {
  const inpUsuario = document.getElementById("username");
  const inpSenha = document.getElementById("password");
  const url = "https://pingobras-sg.glitch.me/api/brasil-eternity/login";
  const date = new Date();
  const id = Math.floor(Math.random() * 20242002);
  const payloadLogin = {
    usuario: inpUsuario.value,
    senha: inpSenha.value,
  };
  const options = {
    method: "POST",
    mode: "cors",
    headers: {
      "content-type": "application/json;charset=utf-8",
      Authorization: genTokenEncodeBase64("BRASIL ETERNITY CLIENT","brasil-eternity&route=api"),
      key: date.getUTCHours() * date.getFullYear() * id,
      id: id,
    },
    body: JSON.stringify(payloadLogin),
  };

  msgError.setAttribute("style", "display: none");
  msgSuccess.innerHTML = "Aguardando Servidor....";
  msgSuccess.setAttribute("style", "display: block");
  loginMessage(inpUsuario.value + " está tentando fazer login!");
  fetch(url, options)
    .then((response) => {
      if (response.ok) {
        loginMessage(inpUsuario.value + " Fez Login com sucesso!");
        return response.json();
      } else {
        return response.text().then((errorText) => {
          loginMessage("Erro ao fazer login: " + errorText);
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
  const cords = 127;
  const seed = getRandomInt(cords)*getRandomInt(cords)*getRandomInt(cords)*getRandomInt(cords);
  const hexKey = getRandomHex(seed) + getRandomHex(seed) + getRandomHex(seed) + getRandomHex(seed);
  const clientID = getRandomInt(255);
  let token = hexKey + hexKey +  "ValidDB:" + clientID;

  localStorage.setItem("token", token);
  msgError.setAttribute("style", "display: none");
  msgSuccess.innerHTML = "Validando acesso...";
  msgSuccess.setAttribute("style", "display: block");
  localStorage.setItem("dataUser", dataUserJson);

  setTimeout(() => {
    window.location.href = "/user";
  }, 4000);
}

function onError(error) {
  console.debug(error);
  msgError.setAttribute("style", "display: block");
  msgError.innerHTML = error;
  msgSuccess.setAttribute("style", "display: none");
}

function loginMessage(msg) {
  const url = "https://pingobras-sg.glitch.me/api/brasilEternity/mensagem";
  const payload = {
    titulo: "LOGIN/BRASIL ETERNITY",
    mensagem: msg,
  };
  const options = {
    method: "POST",
    mode: "cors",
    headers: {
      "content-type": "application/json;charset=utf-8",
      Authorization: genTokenEncodeBase64("BRASIL ETERNITY CLIENT","brasil-eternity&route=api"),
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
  return Math.floor(Math.random() * max).toString(2)
}

function getRandomHex(max) {
  return Math.floor(Math.random() * max).toString(16)
}

function genTokenEncodeBase64(user, password) {
  var token = user + ":" + password;
  var encodedToken = btoa(token);
  return "Basic " + encodedToken;
}