const form = document.querySelector("form");
const msgError = document.getElementById("msgError");
const msgSuccess = document.getElementById("msgSuccess");

form.addEventListener("submit", stopDefAction);

function stopDefAction(event) {
  event.preventDefault();
  sendData();
}

function sendData() {
  const inpSenha = document.getElementById("senha");
  const inpEmail = document.getElementById("email");
  const url = "https://pingobras-sg.glitch.me/api/brasil-eternity/login/redefinir";
  const date = new Date();
  const id = Math.floor(Math.random() * 20242002);
  const payloadLogin = {
    "email": inpEmail.value,
    "senha": inpSenha.value
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
  message("Recuperação de Senha para o Email: " + censurarEmail(inpEmail.value))
  fetch(url, options)
    .then((response) => {
      if (response.ok) {
         message("Usuario e Senha alterados com sucesso!, verifique seu email ou caixa de spam.")
        alert("Usuario e Senha alterados com sucesso!, verifique seu email ou caixa de spam.");
        window.location.href = "/login";
        return response.json();
      } else {
        return response.text().then((errorText) => {
          message("Dados Incorretos! Digite o email novamente!")
        throw new Error("Dados Incorretos! Digite o email novamente!");
        });
      }
    })
    .catch((error) => onError(error));
}

function onError(error) {
  console.debug(error);
  msgError.setAttribute("style", "display: block");
  msgError.innerHTML = error;
  msgSuccess.setAttribute("style", "display: none");
  message(error);
}

function message(msg) {
  const url = "https://pingobras-sg.glitch.me/api/brasilEternity/mensagem";
  const payload = {
    titulo: "REDEFINIR SENHA/BRASIL ETERNITY",
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

function censurarEmail(email) {
    if (email.length >= 5) {
        // Mantém os primeiros cinco caracteres e substitui o restante por asteriscos
        const censurado = email.slice(0, 5) + '*'.repeat(email.length - 5);
        return censurado;
    } else {
        // Se o email for menor que 5 caracteres, não faz nada
        return email;
    }
}