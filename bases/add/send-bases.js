const form = document.querySelector("form");

form.addEventListener("submit", stopDefAction);
form.addEventListener("input", preview);

function stopDefAction(event) {
  event.preventDefault();
  verificar();
}

function verificar() {
  const inpbaseNome = document.getElementById("baseNome");
  const inpSimlink = document.getElementById("simlink");
  const inpThumbnail = document.getElementById("thumbnail");
  const inpUsuario = document.getElementById("usuario");
  const thumbnail = inpThumbnail.value;
  let simlink = inpSimlink.value;

  if (!simlink.startsWith("https://link.hackersthegame.com/simlink.php?")) {
    simlink = inpSimlink.value;
    alert("Insira um Simlink Valido!");
  } else if (thumbnail !== "" && thumbnail !== null && (!thumbnail.endsWith(".png") && !thumbnail.endsWith(".jpg"))) {
      alert("A imagem precisa ser png ou jpg");
  } else {
    sendBase(inpbaseNome.value, inpUsuario.value, simlink, thumbnail);
  }
}

function onError(error) {
  console.debug(error);
  alert(error);
}

function preview() {
  const previewBase = document.getElementById("previewBase");
  const previewUsuario = document.getElementById("previewUsuario");
  const previewImg = document.getElementById("previewImg");
  const previewSimlink = document.getElementById("previewSimlink");
  const inpbaseNome = document.getElementById("baseNome");
  const inpUsuario = document.getElementById("usuario");
  const inpSimlink = document.getElementById("simlink");
  const inpThumbnail = document.getElementById("thumbnail");
  let simlink = null;

  if (
    inpSimlink.value.startsWith("https://link.hackersthegame.com/simlink.php?")
  ) {
    simlink = inpSimlink.value;
  }

  if (inpbaseNome.value == "") {
    previewBase.textContent = "Not Found";
  } else {
    previewBase.textContent = `『ᴮʳETER』${inpbaseNome.value}`;
  }
  
  if (inpUsuario.value == "") {
    previewUsuario.textContent = "Not Found User";
  } else {
    previewUsuario.textContent = inpUsuario.value;
  }
  
  if (inpThumbnail.value == "") {
    previewImg.src =
      "https://link.hackersthegame.com/images/Hackers_title_512.png";
  } else {
    previewImg.src = inpThumbnail.value;
  }
  
  if (simlink == "" || simlink == null) {
    previewSimlink.href = "https://link.hackersthegame.com/simlink.php";
    previewSimlink.textContent = "Insira um Simlink Valido!";
  } else {
    previewSimlink.href = simlink;
    previewSimlink.textContent = simlink;
  }
}

function sendBase(base, user, simlink, thumbnail) {
  const url = "https://pingobras-sg.glitch.me/api/brasil-eternity/bases";
  const date = new Date();
  const id = Math.floor(Math.random() * 20242002);
  const payloadLogin = {
    name: `『ᴮʳETER』${base}`,
    user: user,
    simlink: simlink,
    thumbnail: thumbnail,
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

  fetch(url, options)
    .then((response) => {
      if (response.ok) {
        return response.text();
      } else {
        return response.text().then((errorText) => {
          throw new Error("Erro ao cadastrar base: " + errorText);
        });
      }
    })
    .then((data) => {
      console.log("DATA RESPONSE: ");
      console.log(data);
      alert(data);
      setTimeout(() => {
        window.location.href = "/bases";
      }, 2000);
    })
    .catch((error) => onError(error));
}

function genTokenEncodeBase64(user, password) {
  var token = user + ":" + password;
  var encodedToken = btoa(token);
  return "Basic " + encodedToken;
}