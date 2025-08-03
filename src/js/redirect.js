import config from "./config.js";
import { message } from "./apiUtils.mjs";
(() => {
  const btnRedirect = document.getElementById("redirect");
  const textWa = "Redirecionado pelo site";
  const textFormatado = textWa.replaceAll(" ", "+");
  const number = "5521969569178";
  const useNumber = false;

  const DebugMode = JSON.parse(localStorage.getItem("debugMode")) || false;
  const naoDebugMode = !DebugMode;

  incrementBar(50);
  btnRedirect.addEventListener("click", redirect);
  window.addEventListener("load", redirect);

  function redirect() {
    if (naoDebugMode) {
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
    message("REDIRECT", msg);
    incrementBar(75);
    if (useNumber) {
      alert(
        "Não foi possível obter o link do grupo. Estamos te enviando para o administrador do grupo do WhatsApp!"
      );
      window.location.href = `https://wa.me/${number}?text=${textFormatado}`;
    } else {
      alert("Estamos te adicionando ao grupo do WhatsApp!");
      incrementBar(100);
      window.location.href = `https://chat.whatsapp.com/${config.groupId}`;
    }
  }

  function incrementBar(percent) {
    const redirectBar = document.getElementById("redirect-bar");
    const redirectBarSt = redirectBar.style;
    redirectBarSt.animation = false;
    redirectBarSt.width = `${percent}%`;
    redirectBar.textContent = `carregando...${percent}%`;
  }

  // function spawnNotification(corpo, icone, titulo) {
  //   var opcoes = {
  //     body: corpo,
  //     icon: icone,
  //   };
  //   var n = new Notification(titulo, opcoes);
  // }
})();
