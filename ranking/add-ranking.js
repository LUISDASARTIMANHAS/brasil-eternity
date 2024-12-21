try {
  window.addEventListener("load", () => {
    const form = document.querySelector("form");
    const dataUser = JSON.parse(localStorage.getItem("dataUser"));
    const selectBases = document.getElementById("selectBase");
    const selectPosicao = document.getElementById("selectPosicao");
    const inpReputacao = document.getElementById("reputacao");
    const inpDinheiro = document.getElementById("dinheiro");
    const inpBitcoin = document.getElementById("bitcoin");
    let bases = [];

    form.addEventListener("submit", stopDefAction);

    function stopDefAction(event) {
      event.preventDefault();
      sendBaseRanking();
    }

    function onError(error) {
      console.debug(error);
      alert(error);
    }

    function sendBaseRanking() {
      const url = `${window.env.apiUrl}/ranking`;
      const date = new Date();
      const id = Math.floor(Math.random() * 20242002);
      const baseSelecionada = selectBases.value;
      const payload = {
        posicao: selectPosicao.value,
        name: baseSelecionada,
        level: null,
        reputacao: inpReputacao.value,
        dinheiro: inpDinheiro.value,
        bitcoin: inpBitcoin.value,
        administrador: dataUser.usuario,
      };
      const options = {
        method: "POST",
        mode: "cors",
        headers: {
          "content-type": "application/json;charset=utf-8",
          Authorization: window.getAuthorizationHeader(),
          key: date.getUTCHours() * date.getFullYear() * id,
          id: id,
        },
        body: JSON.stringify(payload),
      };

      message("Cadastrando Base no ranking Aguarde confirmação...");
      fetch(url, options)
        .then((response) => {
          if (response.ok) {
            return response.text();
          } else {
            return response.text().then((errorText) => {
              message("Erro ao cadastrar base no ranking: " + errorText);
              throw new Error(
                "Erro ao cadastrar base no ranking: " + errorText
              );
            });
          }
        })
        .then((data) => {
          console.log("DATA RESPONSE: ");
          console.log(data);
          alert(data);
          message(data);
          setTimeout(() => {
            window.location.href = "/ranking";
          }, 2000);
        })
        .catch((error) => onError(error));
    }

    function getBase() {
      const url = `${window.env.apiUrl}/basesName`;
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
          for (let i = 0; i < data.length; i++) {
            const baseName = data[i];
            const option = document.createElement("option");

            // configuração do option
            option.textContent = baseName;
            option.value = baseName;

            selectBases.appendChild(option);
          }
          bases = data;
        })
        .catch((error) => onError(error));
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
      window.brasil_Eternity_message("ADD BASE RANKING", msg);
    }
  });
} catch (err) {
  alert("ERRO INTERNO FALTAL: " + err + "\n CONTATE O ADMINISTRADOR DO SITE!");
}
