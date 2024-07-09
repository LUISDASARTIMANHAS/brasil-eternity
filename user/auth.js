try{
const bodyAuth = document.querySelector("body");
const tokenAuth = localStorage.getItem("token");
const tokenAuthAdmin = localStorage.getItem("tokenAdmin");
const dataUser = JSON.parse(localStorage.getItem("dataUser"));
const headAuth = document.querySelector("header");
refreshDesconect();
setInterval(refreshDesconect, 3000);

function refreshDesconect() {
  const accountType = dataUser.type || null;
  
  if (accountType == "user") {
    if (dataUser && tokenAuth && tokenAuth.length >= 20) {
      console.log("Sincronizando dados do usuario!");
    } else {
      delCacheDados();
      console.warn("Usuario deslogado ou tokenAuth não disponivel");
      if (bodyAuth) {
        bodyAuth.style.display = "none";
      }
      if (headAuth) {
        headAuth.style.display = "none";
      }
      alert("Usuario deslogado ou tokenAuth não disponivel");
      window.location.href = "/user/forbidden.html";
    }
  } else {
    refreshDesconectAdmin();
  }
} //Fim do Refresh desconectar

function refreshDesconectAdmin() {
  if (dataUser && tokenAuthAdmin && tokenAuthAdmin.length >= 20) {
    console.log("Sincronizando dados do Administrador!");
  } else {
    delCacheDados();
    console.warn("Administrador deslogado ou tokenAuth não disponivel");
    if (bodyAuth) {
      bodyAuth.style.display = "none";
    }
    if (headAuth) {
      headAuth.style.display = "none";
    }
    alert("Administrador deslogado ou tokenAuth não disponivel");
    window.location.href = "/login/admin";
  }
} //Fim do Refresh desconectar

}catch(err){
  delCacheDados();
  alert("Autorização Falhou! tente novamente.");
  alert("Por favor reporte o erro ao administrador do site! " + err);
  window.location.href = "/user/forbidden.html";
}
  
function desconectar() {
  delCacheDados();
  alert("Usuario deslogado com sucesso!");
  window.location.href = "/login";
}

function desconectarADM() {
  delCacheDados();
  alert("Administrador deslogado com sucesso!");
  window.location.href = "/login/admin";
}

function delCacheDados(){
  localStorage.removeItem("tokenAdmin");
  localStorage.removeItem("token");
  localStorage.removeItem("dataUser");
}
