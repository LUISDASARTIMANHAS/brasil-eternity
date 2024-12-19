window.addEventListener("load", () => {
  const form = document.getElementById("form");
  const formCode = document.getElementById("formCode");
  const btnEntrar = document.getElementById("btnEntrar");
  const loading = document.getElementById("loadingCode");
  const cookieContinuarConectado = getCookie("continuarConectado");
  const msgError = document.getElementById("msgError");
  const msgSuccess = document.getElementById("msgSuccess");
  const lastDataUser = JSON.parse(localStorage.getItem("dataUser"));

  // redireciona o usuario caso ele tenha feito login anteriormente e auorizado o dispositivo a continuar logado
  if (cookieContinuarConectado == "true" && lastDataUser) {
    loginMessage(`Bem vindo de volta ${lastDataUser.usuario}!`);
    window.location.href = "/user";
  } else {
    // habilita o sistma de login caso o usuario não tenha feito login anteriormente ou não autorizou o dispositivo a permanecer conectado
    btnEntrar.hidden = false;
    loading.hidden = true;
  }

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    getData();
  });

  function getData() {
    const inpEmail = document.getElementById("email");
    const url =
      "https://pingobras-sg.glitch.me/api/brasil-eternity/login/magiclink";
    const date = new Date();
    const id = Math.floor(Math.random() * 20242002);
    const payloadLogin = {
      email: inpEmail.value,
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
      .then(async (response) => {
        if (response.ok) {
          formMessage("Aguardando Código de Confirmação!");
          await loginMessage(`Magic Link enviado com sucesso!`);
          return response.text();
        } else {
          return response.text().then(async (errorText) => {
            await loginMessage(
              "Erro ao Enviar Codigo Magick Link: " + errorText
            );
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

  async function loginMessage(msg) {
    await window.brasil_Eternity_message(
      "LOGIN",
      msg,
      "BRASIL ETERNITY CLIENT"
    );
  }

  function formMessage(message) {
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

  function genTokenEncodeBase64(user, password) {
    var token = user + ":" + password;
    var encodedToken = btoa(token);
    return "Basic " + encodedToken;
  }
});
