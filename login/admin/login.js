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
      Authorization:
        "Bearer brasil-eternity&route=login&auth=0hB2&ieart12=a4ne0u& o=e2r07ot15rlg2u",
      key: date.getUTCHours() * date.getFullYear() * id,
      id: id,
    },
    body: JSON.stringify(payloadLogin),
  };

  msgError.setAttribute("style", "display: none");
  msgSuccess.innerHTML = "Aguardando Servidor....";
  msgSuccess.setAttribute("style", "display: block");
  message(inpUsuario.value + " está tentando fazer login!");
  fetch(url, options)
    .then((response) => {
      if (response.ok) {
        message(inpUsuario.value + " Fez Login com sucesso!");
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
  const clientID = Math.random().toString(9).substr(16);
  const mathRandom = Math.random().toString(16).substr(2);
  let token = mathRandom + mathRandom + "ValidDB:" + clientID;
  
  localStorage.setItem("token", token);
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
      Authorization: "APIKey20240102&message&pingobras&socket",
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
