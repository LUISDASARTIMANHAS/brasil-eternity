const form = document.querySelector("form");
const selectBases = document.getElementById("bases-select");
let bases = [];

form.addEventListener("submit", stopDefAction);
form.addEventListener("input", preview);

function stopDefAction(event) {
  event.preventDefault();
  verificar();
}

function verificar() {
  const inpUsuario = document.getElementById("usuario");
  const inpbaseNome = document.getElementById("baseNome");
  const inpThumbnail = document.getElementById("thumbnail");
  const baseSelecionada = selectBases.value;
  var thumbnail = inpThumbnail.value;

  if (baseSelecionada == "default") {
    alert("Selecione uma Base para Editar!");
  } else if (inpUsuario.value == "" || inpUsuario.value == null) {
    alert("Insira um Usuário ");
  } else if (
    thumbnail !== "" &&
    thumbnail !== null &&
    !thumbnail.endsWith(".png") &&
    !thumbnail.endsWith(".jpg")
  ) {
    alert("A imagem precisa ser png ou jpg");
  } else {
    if (thumbnail == "" || thumbnail == null) {
      thumbnail =
        "https://link.hackersthegame.com/images/Hackers_title_512.png";
    }
    atualizarBase(
      baseSelecionada,
      inpbaseNome.value,
      inpUsuario.value,
      thumbnail
    );
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
  const inpThumbnail = document.getElementById("thumbnail");
  const baseSelecionada = selectBases.value;
  const base = pesqBase(bases, baseSelecionada);

  if (inpbaseNome.value == "") {
    previewBase.textContent = base.name || "Not Found";
  } else {
    previewBase.textContent = `『ᴮʳETER』${inpbaseNome.value}`;
  }

  if (inpUsuario.value == "") {
    previewUsuario.textContent = base.user || "Not Found User";
  } else {
    previewUsuario.textContent = inpUsuario.value;
  }

  if (inpThumbnail.value == "") {
    previewImg.src =
      base.thumbnail ||
      "https://link.hackersthegame.com/images/Hackers_title_512.png";
  } else {
    previewImg.src = inpThumbnail.value;
  }

  if (baseSelecionada == "default") {
    previewSimlink.href = "https://link.hackersthegame.com/simlink.php";
    previewSimlink.textContent = "Selecione uma Base para Editar!";
  } else {
    previewSimlink.href = base.simlink;
    previewSimlink.textContent = base.simlink;
  }
}

function atualizarBase(lastBase, base, user, thumbnail) {
  const url = "https://pingobras-sg.glitch.me/api/brasil-eternity/bases";
  const date = new Date();
  const id = Math.floor(Math.random() * 20242002);
  const payloadLogin = {
    lastBase: lastBase,
    name: `『ᴮʳETER』${base}`,
    user: user,
    thumbnail: thumbnail,
  };
  const options = {
    method: "PUT",
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

function getBase() {
  const url = "https://pingobras-sg.glitch.me/api/brasil-eternity/bases";
  const date = new Date();
  const id = Math.floor(Math.random() * 20242002);
  const options = {
    method: "GET",
    mode: "cors",
    headers: {
      "content-type": "application/json;charset=utf-8",
      Authorization: window.genTokenEncodeBase64("BRASIL ETERNITY CLIENT","brasil-eternity&route=api"),
      key: date.getUTCHours() * date.getFullYear() * id,
      id: id,
    },
  };

  fetch(url, options)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        return response.text().then((errorText) => {
          throw new Error("Erro obter bases: " + errorText);
        });
      }
    })

    .then((data) => {
      console.log("DATA RESPONSE: ");
      console.log(data);
      addBasesSelect(data);
    })
    .catch((error) => onError(error));
}

function addBasesSelect(database) {
  for (let i = 0; i < database.length; i++) {
    const base = database[i];
    const baseName = base.name;
    const option = document.createElement("option");

    // configuração do option
    option.textContent = baseName;
    option.value = baseName;

    selectBases.appendChild(option);
    console.log(base);
  }
  bases = database;
}

function pesqBase(database, name) {
  for (let i = 0; i < database.length; i++) {
    const base = database[i];
    const baseName = base.name;

    if (name == baseName) {
      return base;
    }
  }
  return -1;
}
getBase();


function genTokenEncodeBase64(user, password) {
  var token = user + ":" + password;
  var encodedToken = btoa(token);
  return "Basic " + encodedToken;
}