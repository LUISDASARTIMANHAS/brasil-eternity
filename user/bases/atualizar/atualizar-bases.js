const form = document.querySelector("form");
const selectBases = document.getElementById("bases-select");
let bases = [];

form.addEventListener("submit", stopDefAction);
form.addEventListener("click", preview);

function stopDefAction(event) {
  event.preventDefault();
  verificar();
}

function verificar() {
  const inpUsuario = document.getElementById("usuario");
  const inpThumbnail = document.getElementById("thumbnail");
  const baseSelecionada = selectBases.value;
  const base = pesqBase(bases, baseSelecionada);
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
    getBaseName(base.simlink, (baseNameFormated) => {
      atualizarBase(
        baseSelecionada,
        baseNameFormated,
        inpUsuario.value,
        thumbnail
      );
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
  const inpUsuario = document.getElementById("usuario");
  const inpThumbnail = document.getElementById("thumbnail");
  const baseSelecionada = selectBases.value;
  const base = pesqBase(bases, baseSelecionada);
  
  if (baseSelecionada == "default") {
    previewBase.textContent = "Selecione uma Base para Editar!";
  } else {
      getBaseName(base.simlink, (baseNameFormated) => {
        previewBase.textContent = `『ᴮʳETER』${baseNameFormated}`;
      });
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
      Authorization: genTokenEncodeBase64(
        "BRASIL ETERNITY CLIENT",
        "brasil-eternity&route=api"
      ),
      key: date.getUTCHours() * date.getFullYear() * id,
      id: id,
    },
    body: JSON.stringify(payloadLogin),
  };

  message("Atualizando Base Aguarde confirmação...");
  fetch(url, options)
    .then((response) => {
      if (response.ok) {
        return response.text();
      } else {
        return response.text().then((errorText) => {
          message("Erro ao atualizar base: " + errorText);
          throw new Error("Erro ao atualizar base: " + errorText);
        });
      }
    })
    .then((data) => {
      console.log("DATA RESPONSE: ");
      console.log(data);
      message(data);
      alert(data);
      setTimeout(() => {
        window.location.href = "/user/bases";
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
      Authorization: window.genTokenEncodeBase64(
        "BRASIL ETERNITY CLIENT",
        "brasil-eternity&route=api"
      ),
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

function getBaseName(simlink, callback) {
  const date = new Date();
  const id = Math.floor(Math.random() * 20242002);
  const payload = {
    urlParams: simlink.replace(
      "https://link.hackersthegame.com/simlink.php?",
      ""
    ),
  };
  const options = {
    method: "POST",
    headers: {
      "content-type": "application/json; charset=UTF-8",
      Accept: "*/*",
      "Cache-Control": "no-cache",
      "Accept-Encoding": "gzip, deflate, br",
      Connection: "keep-alive",
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

  message("Obtendo nome da base para efetuar atualização!");
  fetch(
    "https://pingobras-sg.glitch.me/api/brasil-eternity/bases/name",
    options
  )
    .then((response) => {
      if (response.ok) {
        return response.text();
      } else {
        return response.text().then((errorText) => {
          message("Erro ao buscar nome da base: " + errorText);
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
        .replace("『ᴮʳETER』", "");
      message("Nome da base obtido com sucesso!");
      callback(baseNameFormated);
    })
    .catch((error) => onError(error));

  function onError(error) {
    console.error(error);
    alert(error);
  }
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

function message(msg) {
  const url = "https://pingobras-sg.glitch.me/api/brasilEternity/mensagem";
  const payload = {
    titulo: "ATUALIZAR/BASE/BRASIL ETERNITY",
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

  // fetch(url, options)
  //   .then((response) => {
  //     if (response.ok) {
  //       return response.json();
  //     } else {
  //       return response.text();
  //     }
  //   })
  //   .then((data) => {
  //     console.log("DATA RESPONSE: ");
  //     console.log(data);
  //   })
  //   .catch((error) => console.debug(error));
}

function genTokenEncodeBase64(user, password) {
  var token = user + ":" + password;
  var encodedToken = btoa(token);
  return "Basic " + encodedToken;
}