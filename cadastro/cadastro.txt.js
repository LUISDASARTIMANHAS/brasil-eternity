(() => {
const form = document.getElementById("form");
const msgError = document.getElementById("msgError");
const msgSuccess = document.getElementById("msgSuccess");

form.addEventListener("submit", stopDefAction);
form.addEventListener("input", preview);
preview();

function stopDefAction(event) {
  event.preventDefault();
  verificar();
}

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

function sendData(user,email,privacityPerfil,PerfilImg) {
  const url = "https://pingobras-sg.glitch.me/api/brasil-eternity/cadastro";
  const date = new Date();
  const id = Math.floor(Math.random() * 20242002);
  const payloadLogin = {
    usuario:user,
    email: email,
    privacity:privacityPerfil,
    PerfilIMG:PerfilImg
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
  cadastroMessage(`Cadastrando ${user}, aguarde confirmação!`);
  fetch(url, options)
    .then((response) => {
      if (response.ok) {
        cadastroMessage(`Cadastrado com sucesso!`);
        return response.text();
      } else {
        return response.text().then((errorText) => {
          cadastroMessage("Erro ao cadastrar: " + errorText);
          throw new Error("Erro ao cadastrar: " + errorText);
        });
      }
    })
    .then((data) => {
      console.log("DATA RESPONSE: ");
      console.log(data);
      alert(data);
      msgSuccess.innerHTML = "Redirecionando....";
      setTimeout(()=>{
        window.location.href = "/login"
    },5000)
    })
    .catch((error) => onError(error));
}

function preview() {
  const previewUsuario = document.getElementById("previewUsuario");
  const previewImg = document.getElementById("previewImg");
  const previewPrivacity = document.getElementById("previewPrivacity");
  const previewEmail = document.getElementById("previewEmail");
  const inpUsuario = document.getElementById("user");
  const inpAvatar = document.getElementById("perfilIMG");
  const inpPrivacity = document.getElementById("selectPrivacity");
  const inpEmail = document.getElementById("email");


  if (inpUsuario.value == "") {
    previewUsuario.textContent = "Not Found User";
  } else {
    previewUsuario.textContent = inpUsuario.value;
  }

  if (inpAvatar.value == "") {
    previewImg.src =
      "https://w7.pngwing.com/pngs/798/436/png-transparent-computer-icons-user-profile-avatar-profile-heroes-black-profile.png";
  } else {
    previewImg.src = inpAvatar.value;
    previewImg.alt = inpUsuario.value;
  }
  
  if (inpPrivacity.value == "") {
    previewPrivacity.textContent = "Não selecionado!";
  } else {
    previewPrivacity.textContent = inpPrivacity.value;
  }
  
  if (inpEmail.value == "") {
    previewEmail.textContent = "Visivel apenas para você!";
  } else {
    previewEmail.textContent = inpEmail.value;
  }
}

function cadastroMessage(msg) {
    window.brasil_Eternity_message("LOGIN",msg,"BRASIL ETERNITY CLIENT");
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
})();