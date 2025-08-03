window.addEventListener("load", () => {
  const form = document.getElementById("form");
  const msgError = document.getElementById("msgError");
  const msgSuccess = document.getElementById("msgSuccess");

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    verificar();
  });

  function verificar() {
    const inpUsuario = document.getElementById("user");
    const inpPerfilIMG = document.getElementById("perfilIMG");
    const inpPrivacity = document.getElementById("selectPrivacity");
    const inpEmail = document.getElementById("email");
    const thumbnail = inpPerfilIMG.value;

    if (!inpUsuario.value && !inpUsuario.value > 3) {
      alert("O usuario deve conter mais de 3 caracteres!");
    } else if (
      thumbnail !== "" &&
      thumbnail !== null &&
      !thumbnail.startsWith("https://")
    ) {
      alert("Insira uma imagem de perfil Valida!");
    } else if (
      thumbnail !== "" &&
      thumbnail !== null &&
      !thumbnail.endsWith(".png") &&
      !thumbnail.endsWith(".jpg")
    ) {
      alert("A imagem precisa ser png ou jpg");
    } else {
      sendData(inpUsuario.value, inpEmail.value, inpPrivacity.value, thumbnail);
    }
  }

  async function sendData(user, email, privacityPerfil, PerfilImg) {
    const url = "https://pingobras-sg.glitch.me/api/brasil-eternity/cadastro";
    const date = new Date();
    const id = Math.floor(Math.random() * 20242002);
    const payloadLogin = {
      usuario: user,
      email: email,
      privacity: privacityPerfil,
      PerfilIMG: PerfilImg,
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

    msgError.setAttribute("style", "display: none");
    msgSuccess.innerHTML = "Aguardando Servidor....";
    msgSuccess.setAttribute("style", "display: block");
   await cadastroMessage(`Cadastrando ${user}, aguarde confirmação!`);
    fetch(url, options)
      .then(async (response) => {
        if (response.ok) {
          await cadastroMessage(`Cadastrado com sucesso!`);
          return response.text();
        } else {
          return response.text().then(async (errorText) => {
            await cadastroMessage("Erro ao cadastrar: " + errorText);
            throw new Error("Erro ao cadastrar: " + errorText);
          });
        }
      })
      .then((data) => {
        console.log("DATA RESPONSE: ");
        console.log(data);
        alert(data);
        msgSuccess.innerHTML = "Redirecionando....";
        setTimeout(() => {
          window.location.href = "/login";
        }, 5000);
      })
      .catch((error) => onError(error));
  }

  async function cadastroMessage(msg) {
    await window.brasil_Eternity_message("CADASTRO", msg);
  }

  function onError(error) {
    console.debug(error);
    msgError.setAttribute("style", "display: block");
    msgError.innerHTML = error;
    msgSuccess.setAttribute("style", "display: none");
  }
});
