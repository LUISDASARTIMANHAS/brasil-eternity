setInterval(loaderUserData, 5000);

function loaderUserData() {
  const dataUser = JSON.parse(localStorage.getItem("dataUser"));
  const labelSaldo = document.getElementById("saldo");
  const labelPerfilIcon = document.getElementById("perfilIcon");
  const labellogado = document.getElementById("logado");
  var elements = document.querySelectorAll("[admin]");

  // banco de dados
  const userLoad = dataUser.usuario;
  const saldoLoad = dataUser.saldo;
  const imgLoad = dataUser.PerfilIMG;
  const backgroundLoad = dataUser.UserBGCad;
  const tokenLoad = dataUser.Token;
  const admin = dataUser.type;
  const navg = navigator.appCodeName;

  console.log("Carregando dados....");
  //account Setings
  if (labelSaldo) {
    labelSaldo.innerHTML = saldoLoad + ",00";
  }
  if (labellogado) {
    labellogado.innerHTML = `Olá 👋 ${userLoad}!`;
  }
  if (imgLoad) {
    labelPerfilIcon.src = imgLoad;
  } else {
    labelPerfilIcon.src =
      "https://cdn-icons-png.flaticon.com/512/3177/3177440.png";
  }
  elements.forEach(function (elemento) {ativarElementosAdm(elemento)});
  function ativarElementosAdm(elemento) {
    if (admin == "admin") {
      elemento.style.display = "";
      elemento.hidden = false
      console.log("%c[SYSTEM] Ativando elementos do administrador!","color:#00ff00");
    } else {
      elemento.hidden = true
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
