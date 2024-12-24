window.addEventListener("load", () => {
  const formCode = document.getElementById("formCode");
  const msgError = document.getElementById("msgError");
  const msgSuccess = document.getElementById("msgSuccess");
  const inpCode = document.getElementById("code");

  formCode.addEventListener("submit", (event) => {
    event.preventDefault();
    sendCode();
  });
  // aciona o enviar codigo automaticamente para caracteres digitados acima de 5
  inpCode.addEventListener("input", () => {
    if (inpCode.value.length > 5) {
      sendCode();
    }
  });

  async function sendCode() {
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
        Authorization: window.getAuthorizationHeader(),
        key: date.getUTCHours() * date.getFullYear() * id,
        id: id,
      },
      body: JSON.stringify(payloadLogin),
    };

    formMessage("Aguardando Servidor...");
    await loginMessage(
      `${censurarEmail(
        inpEmail.value
      )} Esta tentando fazer login, Aguarde confirmação!`
    );
    fetch(url, options)
      .then(async (response) => {
        if (response.ok) {
          await loginMessage(
            `${censurarEmail(inpEmail.value)} Logado com sucesso!`
          );
          return response.json();
        } else {
          return response.text().then(async (errorText) => {
            await loginMessage("Erro ao fazer login: " + errorText);
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
    setCookie("continuarConectado", manterConectado.checked, 30);

    setTimeout(() => {
      window.location.href = "/user";
    }, 4000);
  }

  async function loginMessage(msg) {
    await window.brasil_Eternity_message("LOGIN",msg);
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
  
  function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
    let expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
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
