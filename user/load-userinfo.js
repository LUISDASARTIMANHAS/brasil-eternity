setInterval(loaderUserData, 5000);

function renderUserInfo() {
  const header = document.querySelector("header");
  const userInfoElement = document.createElement("userinfo");
  const aElement = document.createElement("a");
  const ioniconElement = document.createElement("ion-icon");
  const imgElement = document.createElement("img");
  const pElement = document.createElement("p");
  var iniLista = header.firstChild;

  // configurações do ion icon do A
  ioniconElement.name = "home-outline";
  ioniconElement.innerHTML = "Home";

  // configurações do A do user info
  aElement.innerHTML = "Home";
  aElement.setAttribute("class", "btn");
  aElement.setAttribute("href", "/user");
  aElement.appendChild(ioniconElement);

  // configurações do img do user info
  imgElement.setAttribute("class", "logo");
  imgElement.setAttribute(
    "src",
    "https://cdn-icons-png.flaticon.com/512/3177/3177440.png"
  );
  imgElement.setAttribute("width", "40");
  imgElement.id = "perfilIcon";

  // configurações do P do user info
  pElement.id = "logado";
  pElement.innertHTML = "Erro 404 Not Found User!";

  userInfoElement.appendChild(aElement);
  userInfoElement.appendChild(imgElement);
  userInfoElement.appendChild(pElement);

  
  header.insertBefore(userInfoElement,iniLista);
}
renderUserInfo();

function loaderUserData() {
  const dataUser = JSON.parse(localStorage.getItem("dataUser"));
  const labelPerfilIcon = document.getElementById("perfilIcon");
  const labellogado = document.getElementById("logado");
  const labelLastLogin = document.getElementById("lastLogin");
  var elements = document.querySelectorAll("[admin]");


  // banco de dados
  const userLoad = dataUser.usuario;
  const userAccountAtualizado = dataUser.profileUpdated;
  const userEmail = dataUser.email;
  const lastLogin = dataUser.lastLogin;
  const imgLoad = dataUser.PerfilIMG;
  const userID = dataUser.userId;
  const tokenLoad = dataUser.token;
  const loginHistory = dataUser.loginHistory;
  const themePreferences = dataUser.themePreferences;
  const perfilPrivate = dataUser.perfilPrivate;
  const languagePreferences = dataUser.languagePreferences;
  const admin = dataUser.type;
  const navg = navigator.appCodeName;

  console.log("Carregando dados....");
  if (labelLastLogin) {
    labelLastLogin.innerHTML = lastLogin || "Primeiro Acesso";
  }
  if (labellogado) {
    labellogado.innerHTML = `Olá 👋 ${userLoad}!`;
  }
  if (labelPerfilIcon) {
    if (imgLoad) {
      labelPerfilIcon.src = imgLoad;
    } else {
      labelPerfilIcon.src =
        "https://cdn-icons-png.flaticon.com/512/3177/3177440.png";
    }
  }

  elements.forEach(function (elemento) {
    ativarElementosAdm(elemento);
  });

  function ativarElementosAdm(elemento) {
    if (admin == "admin") {
      elemento.style.display = "";
      elemento.hidden = false;
      console.log(
        "%c[SYSTEM] Ativando elementos do administrador!",
        "color:#00ff00"
      );
    } else {
      elemento.hidden = true;
    }
  }
}

loaderUserData();

function conversorSimEnao(value) {
  if (value) {
    return "✔Esta conta esta autorizada como administrador";
  }
  return "⚠Esta conta não tem acessoa administrativo!";
}
