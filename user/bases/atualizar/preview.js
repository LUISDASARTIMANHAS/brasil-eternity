window.addEventListener("load", () => {
  try {
    const form = document.querySelector("form");
    const dataUser = JSON.parse(localStorage.getItem("dataUser"));
    const selectBases = document.getElementById("bases-select");
    let bases = [];
    form.addEventListener("click", preview);

    function preview() {
      const previewBase = document.getElementById("previewBase");
      const previewUsuario = document.getElementById("previewUsuario");
      const previewImg = document.getElementById("previewImg");
      const previewSimlink = document.getElementById("previewSimlink");
      const inpThumbnail = document.getElementById("thumbnail").value;
      const urlThumbnail = inpThumbnail;
      const baseSelecionada = selectBases.value;
      const base = pesqBase(bases, baseSelecionada);

      previewUsuario.textContent = dataUser.usuario;
      if (baseSelecionada == "default") {
        previewBase.textContent = "Selecione uma Base para Editar!";
      } else {
        getBaseName(base.simlink, (baseNameFormated) => {
          previewBase.textContent = `『ᴮʳETER』${baseNameFormated}`;
        });
      }

      if (urlThumbnail == "") {
        previewImg.setAttribute(
          "src",
          base.thumbnail ||
            "https://link.hackersthegame.com/images/Hackers_title_512.png"
        );
      } else {
        // Codifica a URL do thumbnail para evitar problemas com caracteres especiais
        previewImg.setAttribute("src", urlThumbnail);
      }

      if (baseSelecionada == "default") {
        previewSimlink.href = "https://link.hackersthegame.com/simlink.php";
        previewSimlink.textContent = "Selecione uma Base para Editar!";
      } else {
        previewSimlink.href = base.simlink;
        previewSimlink.textContent = base.simlink;
      }
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
          Authorization: window.getAuthorizationHeader(),
          key: date.getUTCHours() * date.getFullYear() * id,
          id: id,
        },
        body: JSON.stringify(payload),
      };
      const parser = new DOMParser();

      message("Obtendo nome da base para efetuar atualização!");
      fetch(`${window.env.apiUrl}/bases/name`, options)
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
          Authorization: window.getAuthorizationHeader(),
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
  } catch (err) {
    alert(
      "ERRO INTERNO FALTAL: " + err + "\n CONTATE O ADMINISTRADOR DO SITE!"
    );
  }
});
