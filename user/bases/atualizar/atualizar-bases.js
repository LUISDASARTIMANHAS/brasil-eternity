window.addEventListener("load", () => {
  try {
    const form = document.querySelector("form");
    const dataUser = JSON.parse(localStorage.getItem("dataUser"));
    const selectBases = document.getElementById("bases-select");
    let bases = [];

    form.addEventListener("submit", stopDefAction);

    function stopDefAction(event) {
      event.preventDefault();
      verificar();
    }

    function verificar() {
      const inpThumbnail = document.getElementById("thumbnail");
      const baseSelecionada = selectBases.value;
      const base = pesqBase(bases, baseSelecionada);
      var thumbnail = inpThumbnail.value;

      if (baseSelecionada == "default") {
        alert("Selecione uma Base para Editar!");
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
          atualizarBase(baseSelecionada, baseNameFormated, thumbnail);
        });
      }
    }

    function onError(error) {
      console.debug(error);
      alert(error);
    }

    function atualizarBase(lastBase, base, thumbnail) {
      const url = `${window.env.apiUrl}/bases`;
      const date = new Date();
      const id = Math.floor(Math.random() * 20242002);
      const payloadLogin = {
        lastBase: lastBase,
        name: `『ᴮʳETER』${base}`,
        user: dataUser.usuario,
        thumbnail: thumbnail,
      };
      const options = {
        method: "PUT",
        mode: "cors",
        headers: {
          "content-type": "application/json;charset=utf-8",
          Authorization: window.getAuthorizationHeader(),
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
      const url = `${window.env.apiUrl}/bases`;
      const date = new Date();
      const id = Math.floor(Math.random() * 20242002);
      const options = {
        method: "GET",
        mode: "cors",
        headers: {
          "content-type": "application/json;charset=utf-8",
          Authorization: window.getAuthorizationHeader(),
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
      "ERRO INTERNO FALTAL IN atualizar-bases.js: " +
        err +
        "\n CONTATE O ADMINISTRADOR DO SITE!"
    );
  }
});
