setInterval(refreshDesconect, 3000);
const bodyAuth = document.querySelector("body");
const tokenAuth = localStorage.getItem("token") || null;
const tokenAuthAdmin = localStorage.getItem("tokenAdmin") || null;
const headAuth = document.querySelector("header");
refreshDesconect();
refreshDesconectAdmin();

function refreshDesconect() {
  if (tokenAuth && tokenAuth.length >= 20) {
    console.log("Sincronizando dados do usuario!");
  } else {
    localStorage.removeItem("token");
    console.warn("Usuario deslogado ou tokenAuth não disponivel");
    if (bodyAuth) {
      bodyAuth.style.display = "none";
    }
    if (headAuth) {
      headAuth.style.display = "none";
    }
    alert("Usuario deslogado ou tokenAuth não disponivel")
    window.location.href = "/user/forbidden.html";
  }
} //Fim do Refresh desconectar


function refreshDesconectAdmin() {
  if (tokenAuthAdmin && tokenAuthAdmin.length >= 50) {
    console.log("Sincronizando dados do Administrador!");
  } else {
    localStorage.removeItem("tokenAdmin");
    console.warn("Administrador deslogado ou tokenAuth não disponivel");
    if (bodyAuth) {
      bodyAuth.style.display = "none";
    }
    if (headAuth) {
      headAuth.style.display = "none";
    }
    alert("Administrador deslogado ou tokenAuth não disponivel")
    window.location.href = "/login/admin";
  }
} //Fim do Refresh desconectar

function desconectar() {
  localStorage.removeItem("token");
  alert("Usuario deslogado com sucesso!");
  window.location.href = "/login";
}

function desconectarADM() {
  localStorage.removeItem("tokenAdmin");
  alert("Administrador deslogado com sucesso!");
  window.location.href = "/login/admin";
}
