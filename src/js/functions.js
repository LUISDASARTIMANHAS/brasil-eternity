const Subir = document.getElementById("back-to-top");
const Descer = document.getElementById("jsDescer");
const btnALL = document.querySelectorAll("button");
const labelRegion = document.getElementById("labelRegion");
const AreaDeTexto = document.getElementsByTagName("textarea");
const iPInfo = JSON.parse(localStorage.getItem("ipinfo"));
const region = iPInfo.region;
const WindowSongError1 = new Audio(
  "https://cdn.glitch.global/b39d6a4a-0e14-4b41-930d-29d3ccd6c137/Windows-error-song?v=1656019161212.mp3?v=1651870846885.mp3"
);
const alarm = new Audio(
  "https://cdn.glitch.global/b39d6a4a-0e14-4b41-930d-29d3ccd6c137/Shop empire 2 - Alarm.mp3?v=1660420687299.mp3"
);
const ClickMouseFUNCTIONS = new Audio(
  "https://cdn.glitch.global/b39d6a4a-0e14-4b41-930d-29d3ccd6c137/click%20do%20mouse.mp3?v=1661006466474"
);

if (labelRegion) {
  labelRegion.textContent = region;
}

function mostrarsenha() {
  let inputSenha = document.getElementById("senha");
  ClickMouseFUNCTIONS.play();

  if (inputSenha.getAttribute("type") == "password") {
    inputSenha.setAttribute("type", "text");
    inputSenha.placeholder = "1234";
  } else {
    inputSenha.setAttribute("type", "password");
    inputSenha.placeholder = "****";
  }
}

//   (() => {
//     var opcoes = {
//       body: "As notificações estão ativadas!",
//       icon: "https://cdn.glitch.global/5817ad45-950e-4225-9b84-8f4348004350/Brasil-Eternity-image.jpg?v=1705932727089",
//     };
//     // Verifica se o browser suporta notificações
//     if (!("Notification" in window)) {
//       alert("Este browser não suporta notificações de Desktop");
//     }

//     // Let's check whether notification permissions have already been granted
//     else if (Notification.permission === "granted") {
//       // If it's okay let's create a notification
//       var notification = new Notification("Sistema de Notificação", opcoes);
//       new Notification(
//             "Utilizamos cookies para melhorar sua experiência. Você pode aceitá-los, rejeitar os não essenciais ou configurá-los. Mais informações na Política de Cookies.",
//             opcoes
//           );
//     }

//     // Otherwise, we need to ask the user for permission
//     else if (Notification.permission !== "denied") {
//       Notification.requestPermission(function (permission) {
//         // If the user accepts, let's create a notification
//         if (permission === "granted") {
//           var notification = new Notification(
//             "As notificações estão desativadas!",
//             opcoes
//           );
//         }
//       });
//     }

//     // At last, if the user has denied notifications, and you
//     // want to be respectful there is no need to bother them any more.
//   })();

btnALL.forEach((btn) => {
  if (btn) {
    console.log(btn);
    addSoundClicker(btn);
  }
});
for (let i = 0; i < AreaDeTexto.length; i++) {
  AreaDeTexto[i].style.height = AreaDeTexto[i].scrollHeight;
  AreaDeTexto[i].addEventListener("input", AoDigitar, false);
  this.value = "";
}

function pageYT() {
  ClickMouseFUNCTIONS.play();
  window.location.href = "/user/video-player";
}
function pageLives() {
  ClickMouseFUNCTIONS.play();
  window.location.href = "/user/live";
}
function redirectUrl(url) {
  ClickMouseFUNCTIONS.play();
  window.location.href = url;
}

function FullScreen() {
  document.documentElement.requestFullscreen();
}

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function getRandomBin(max) {
  return Math.floor(Math.random() * max).toString(2);
}

function getRandomHex(max) {
  return Math.floor(Math.random() * max).toString(16);
}

window.getAuthorizationHeader = function getAuthorizationHeader() {
  const combined = `${window.env.encodedUser}:${window.env.encodedPassword}`; 
  const doubleEncoded = btoa(btoa(combined));
  return `Basic ${doubleEncoded}`;
};


//======================= Events listener =====================
if (Subir) {
  Subir.addEventListener("click", function () {
    ClickMouseFUNCTIONS.play();
    window.scrollTo(0, 0);
    console.log("FUNCTIONS/LOG> O Usuario foi redirecionado para cima!");
  });
}
if (Descer) {
  Descer.addEventListener("click", function () {
    ClickMouseFUNCTIONS.play();
    window.scrollTo(0, 3000);
    console.log("FUNCTIONS/LOG> O Usuario foi redirecionado para baixo!");
  });
}

function AoDigitar() {
  console.warn("Redimensionamento Automático Ativado!");
  this.style.height = 0;
  this.style.height = this.scrollHeight + 20 + "px";
}

function addSoundClicker(button) {
  button.addEventListener("click", () => {
    ClickMouseFUNCTIONS.play();
    console.log("Clicou no botão!");
  });
}
