const textWa = "Redirecionado pelo site";
const number = "5521969569178";
const groupLink = "CY4tlrUqwSj5RpdZqGlWgT";
const useNumber = false;
const redirectBar = document.getElementById("redirect-bar");
const redirectBarSt = redirectBar.style;
const ipinfo = JSON.parse(localStorage.getItem("ipinfo") || "[]");

function redirect() {
  var allowRedirect = JSON.parse(localStorage.getItem("redirect"));
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
redirect();

function redirectMsg(msg) {
  const url = "https://pingobras-sg.glitch.me/api/brasilEternity/mensagem";
  const payload = {
    titulo: "BRASIL ETERNITY REDIRECT",
    mensagem: msg,
    ipinfo: ipinfo,
  };

  const options = {
    method: "POST",
    mode: "cors",
    headers: {
      "content-type": "application/json;charset=utf-8",
      authorization: genTokenEncodeBase64(
        "BRASIL ETERNITY CLIENT",
        "brasil-eternity&route=api"
      ),
    },
    body: JSON.stringify(payload),
  };

  redirectBarSt.animation = false;
  redirectBarSt.width = "50%";
  redirectBar.textContent = "carregando...50%";

  fetch(url, options)
    .then((response) => {
      if (response.ok) {
        return response.text();
      } else {
        return response.text().then((errorText) => {
          const errorMessage = `Statuscode: ${response.status} - ${errorText}`;
          throw new Error(errorMessage);
        });
      }
    })
    .then((data) => {
      const textFormatado = textWa.replaceAll(" ", "+");
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
      console.log("DATA RESPONSE: ");
      console.log(data);
    })
    .catch((error) => onError(error));
}

// function notifyMe() {
//   var opcoes = {
//     body: "As notificações estão ativadas!",
//     icon: "https://cdn.glitch.global/5817ad45-950e-4225-9b84-8f4348004350/Brasil-Eternity-image.jpg?v=1705932727089",
//   };
//   // Verifica se o browser suporta notificações
//   if (!("Notification" in window)) {
//     alert("Este browser não suporta notificações de Desktop");
//   }

//   // Let's check whether notification permissions have already been granted
//   else if (Notification.permission === "granted") {
//     // If it's okay let's create a notification
//     var notification = new Notification("Sistema de Notificação", opcoes);
//   }

//   // Otherwise, we need to ask the user for permission
//   else if (Notification.permission !== "denied") {
//     Notification.requestPermission(function (permission) {
//       // If the user accepts, let's create a notification
//       if (permission === "granted") {
//         var notification = new Notification(
//           "As notificações estão desativadas!",
//           opcoes
//         );
//       }
//     });
//   }

//   // At last, if the user has denied notifications, and you
//   // want to be respectful there is no need to bother them any more.
// }
// notifyMe();

// function spawnNotification(corpo, icone, titulo) {
//   var opcoes = {
//     body: corpo,
//     icon: icone,
//   };
//   var n = new Notification(titulo, opcoes);
// }

function onError(error) {
  console.debug(error);
  alert(error);
}

function genTokenEncodeBase64(user, password) {
  var token = user + ":" + password;
  var encodedToken = btoa(token);
  return "Basic " + encodedToken;
}
