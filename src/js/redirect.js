(() => {
  const redirectBar = document.getElementById("redirect-bar");
  const btnRedirect = document.getElementById("redirect");
  const textWa = "Redirecionado pelo site";
  const textFormatado = textWa.replaceAll(" ", "+");
  const number = "5521969569178";
  const groupLink = "CY4tlrUqwSj5RpdZqGlWgT";
  const useNumber = false;
  const redirectBarSt = redirectBar.style;
  const ipinfo = JSON.parse(localStorage.getItem("ipinfo") || "[]");
  var allowRedirect = JSON.parse(localStorage.getItem("redirect"));

  redirectBarSt.animation = false;
  redirectBarSt.width = "50%";
  redirectBar.textContent = "carregando...50%";
  btnRedirect.addEventListener("click", redirect);
  window.addEventListener("load", redirect);

  function redirect() {
    if (allowRedirect != null && !allowRedirect) {
      alert("Ola Dev. allowRedirect=" + allowRedirect);
    } else {
      if (useNumber) {
        redirectMsg(
          "Redirecionando Usuário para Aministrador do Brasil Eternity! Parceria com Brasil Eternity & ₢copyright By LUIS DAS ARTIMANHAS & PINGOBRAS S.A"
        );
      } else {
        redirectMsg(
          "Redirecionando Usuário para Brasil Eternity! Parceria com Brasil Eternity & ₢copyright By LUIS DAS ARTIMANHAS & PINGOBRAS S.A"
        );
      }
    }
  }

  function redirectMsg(msg) {
    window.brasil_Eternity_message("REDIRECT", msg, "BRASIL ETERNITY CLIENT");
    redirectBarSt.width = "75%";
    redirectBar.textContent = "carregando...75%";
    if (useNumber) {
      alert(
        "Não foi possível obter o link do grupo. Estamos te enviando para o administrador do grupo do WhatsApp!"
      );
      window.location.href = `https://wa.me/${number}?text=${textFormatado}`;
    } else {
      alert("Estamos te adicionando ao grupo do WhatsApp!");
      redirectBarSt.width = "100%";
      redirectBar.textContent = "carregando...100%";
      window.location.href = `https://chat.whatsapp.com/${groupLink}`;
    }
  }

  function spawnNotification(corpo, icone, titulo) {
    var opcoes = {
      body: corpo,
      icon: icone,
    };
    var n = new Notification(titulo, opcoes);
  }

  function onError(error) {
    console.debug(error);
    alert(error);
  }

  function genTokenEncodeBase64(user, password) {
    var token = user + ":" + password;
    var encodedToken = btoa(token);
    return "Basic " + encodedToken;
  }
})();
