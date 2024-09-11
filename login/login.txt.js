window.addEventListener("load", () => {
  const form = document.getElementById("form");
  const btnEntrar = document.getElementById("btnEntrar");
  const formCode = document.getElementById("formCode");
  const msgError = document.getElementById("msgError");
  const msgSuccess = document.getElementById("msgSuccess");
  const cookieContinuarConectado = getCookie("continuarConectado");
  const lastDataUser = JSON.parse(localStorage.getItem("dataUser"));
  const inpCode = document.getElementById("code");

  if (cookieContinuarConectado == "true" && lastDataUser) {
    loginMessage(`Bem vindo de volta ${lastDataUser.usuario}!`);
    window.location.href = "/user";
  }

  form.addEventListener("submit", stopDefAction);
  formCode.addEventListener("submit", stopDefActionSendCode);
  inpCode.addEventListener("input", () => {
    if(inpCode.value.length > 5){
      sendCode();
    }
  });
  btnEntrar.disabled = false;
  
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
    const id = Math.floor(Math.random() * 20242002);
    const payloadLogin = {
      email: inpEmail.value
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

    formMessage("Aguardando Servidor...");
    loginMessage(` ${censurarEmail(inpEmail.value)} pediu um magic link!`);
    fetch(url, options)
      .then((response) => {
        if (response.ok) {
          formMessage("Aguardando Código de Confirmação!");
          loginMessage(`Magic Link enviado com sucesso!`);
          return response.text();
        } else {
          return response.text().then((errorText) => {
            loginMessage("Erro ao Enviar Codigo Magick Link: " + errorText);
            throw new Error("Erro ao Enviar Codigo Magick Link: " + errorText);
          });
        }
      })
      .then((data) => {
        console.log("DATA RESPONSE: ");
        console.log(data);
        formMessage(data);
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

    formMessage("Aguardando Servidor...");
    loginMessage(
      `${censurarEmail(
        inpEmail.value
      )} Esta tentando fazer login, Aguarde confirmação!`
    );
    fetch(url, options)
      .then((response) => {
        if (response.ok) {
          loginMessage(`${censurarEmail(inpEmail.value)} Logado com sucesso!`);
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
    const manterConectado = document.getElementById("continueConnected");
    const dataUserJson = JSON.stringify(userLogado);

    formMessage("Validando Acesso...");
    localStorage.setItem("dataUser", dataUserJson);
    setCookie("continuarConectado", manterConectado.checked, 5);

    setTimeout(() => {
      window.location.href = "/user";
    }, 4000);
  }

  function loginMessage(msg) {
    window.brasil_Eternity_message("LOGIN", msg, "BRASIL ETERNITY CLIENT");
  }
  
  function formMessage(message){
    msgError.setAttribute("style", "display: none");
    msgSuccess.innerHTML = message;
    msgSuccess.setAttribute("style", "display: block");
  }

  function onError(error) {
    console.debug(error);
    msgError.setAttribute("style", "display: block");
    msgError.innerHTML = error;
    msgSuccess.setAttribute("style", "display: none");
  }

  function genTokenEncodeBase64(user, password) {
    var token = user + ":" + password;
    var encodedToken = btoa(token);
    return "Basic " + encodedToken;
  }

  function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
    let expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  }
  function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(";");
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == " ") {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }

  function censurarEmail(email) {
    if (email.length >= 5) {
      // Mantém os primeiros cinco caracteres e substitui o restante por asteriscos
      const censurado = email.slice(0, 5) + "*".repeat(email.length - 5);
      return censurado;
    } else {
      // Se o email for menor que 5 caracteres, não faz nada
      return email;
    }
  }
});