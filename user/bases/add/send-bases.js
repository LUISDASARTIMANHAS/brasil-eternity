const form = document.querySelector("form");
const dataUser = JSON.parse(localStorage.getItem("dataUser"));
let baseName = null;

form.addEventListener("submit", stopDefAction);
form.addEventListener("input", preview);

function stopDefAction(event) {
  event.preventDefault();
  verificar();
}

function verificar() {
  const inpSimlink = document.getElementById("simlink");
  const inpThumbnail = document.getElementById("thumbnail");
  const thumbnail = inpThumbnail.value;
  let simlink = inpSimlink.value;


  if (simlink.length < 20 || !simlink.startsWith("https://link.hackersthegame.com/simlink.php?")) {
    simlink = inpSimlink.value;
    alert("Insira um Simlink Valido!");
  } else if (
    baseName !== "" &&
    baseName !== null &&
    inpSimlink.value.length > 20
  ) {
    simlink = inpSimlink.value;
    alert("Insira um Simlink Valido!");
  } else if (
    thumbnail !== "" &&
    thumbnail !== null &&
    !thumbnail.endsWith(".png") &&
    !thumbnail.endsWith(".jpg")
  ) {
    alert("A imagem precisa ser png ou jpg");
  } else {
    getBaseName(simlink,(baseNameFormated) => {
      sendBase(baseNameFormated, simlink, thumbnail);
    }); 
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
  const inpSimlink = document.getElementById("simlink");
  const inpThumbnail = document.getElementById("thumbnail");
  let simlink = inpSimlink.value;
  

    previewUsuario.textContent = dataUser.usuario;
  if (
    simlink.startsWith("https://link.hackersthegame.com/simlink.php?")
  ) {
    simlink = inpSimlink.value;
  }

  if (simlink.length > 20 && simlink.startsWith("https://link.hackersthegame.com/simlink.php?")) {
    getBaseName(simlink,(baseNameFormated) => {
      previewBase.textContent = `『ᴮʳETER』${baseNameFormated}`;
    });
  }else{
    previewBase.textContent = "Not Found";
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

function sendBase(base, simlink, thumbnail) {
  const url = "https://pingobras-sg.glitch.me/api/brasil-eternity/bases";
  const date = new Date();
  const id = Math.floor(Math.random() * 20242002);
  const payloadLogin = {
    name: `『ᴮʳETER』${base}`,
    user: dataUser.usuario,
    simlink: simlink,
    thumbnail: thumbnail,
  };
  const options = {
    method: "POST",
    mode: "cors",
    headers: {
      "content-type": "application/json;charset=utf-8",
      Authorization: genTokenEncodeBase64(
        "BRASIL ETERNITY CLIENT",
        "brasil-eternity&route=api"
      ),
      key: date.getUTCHours() * date.getFullYear() * id,
      id: id,
    },
    body: JSON.stringify(payloadLogin),
  };

  message("Cadastrando Base Aguarde confirmação...")
  fetch(url, options)
    .then((response) => {
      if (response.ok) {
        return response.text();
      } else {
        return response.text().then((errorText) => {
          message("Erro ao cadastrar base: " + errorText)
          throw new Error("Erro ao cadastrar base: " + errorText);
        });
      }
    })
    .then((data) => {
      console.log("DATA RESPONSE: ");
      console.log(data);
      alert(data);
    message(data)
      setTimeout(() => {
        window.location.href = "user/bases";
      }, 2000);
    })
    .catch((error) => onError(error));
}

function getBaseName(simlink,callback) {
  const date = new Date();
  const id = Math.floor(Math.random() * 20242002);
  const payload = {
    urlParams: simlink.replace("https://link.hackersthegame.com/simlink.php?",""),
  };
  const options = {
    method: "POST",
    headers: {
      "content-type": "application/json; charset=UTF-8",
      Accept: "*/*",
      "Cache-Control": "no-cache",
      Authorization: genTokenEncodeBase64(
        "BRASIL ETERNITY CLIENT",
        "brasil-eternity&route=api"
      ),
      key: date.getUTCHours() * date.getFullYear() * id,
      id: id,
    },
    body: JSON.stringify(payload),
  };
  const parser = new DOMParser();

  fetch(
    "https://pingobras-sg.glitch.me/api/brasil-eternity/bases/name",
    options
  )
    .then((response) => {
      if (response.ok) {
        return response.text();
      } else {
        return response.text().then((errorText) => {
          throw new Error("Erro ao buscar nome da base: " + errorText);
        });
      }
    })
    .then((data) => {
      const dom = parser.parseFromString(data, "text/html");
      const baseName = dom.title;
      const baseNameFormated = baseName
        .replace("SimLink to ", "")
        .replace("'s network", "")
        .replace("『ᴮʳETER』", "");;
      callback(baseNameFormated);
    })
    .catch((error) => onError(error));

  function onError(error) {
    console.error(error);
    alert(error);
  }
}


function message(msg) {
  const url = "https://pingobras-sg.glitch.me/api/brasilEternity/mensagem";
  const payload = {
    titulo: "CADASTRAR/BASE/BRASIL ETERNITY",
    mensagem: msg,
  };
  const options = {
    method: "POST",
    mode: "cors",
    headers: {
      "content-type": "application/json;charset=utf-8",
      Authorization: genTokenEncodeBase64(
        "BRASIL ETERNITY CLIENT",
        "brasil-eternity&route=api"
      ),
    },
    body: JSON.stringify(payload),
  };

  fetch(url, options)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        return response.text();
      }
    })
    .then((data) => {
      console.log("DATA RESPONSE: ");
      console.log(data);
    })
    .catch((error) => console.debug(error));
}

function genTokenEncodeBase64(user, password) {
  var token = user + ":" + password;
  var encodedToken = btoa(token);
  return "Basic " + encodedToken;
}