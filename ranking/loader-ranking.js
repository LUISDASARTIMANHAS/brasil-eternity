window.addEventListener("load", () => {
  const url = "https://pingobras-sg.glitch.me/api/brasil-eternity/ranking";
  const date = new Date();
  const id = Math.floor(Math.random() * 20242002);
  const options = {
    method: "GET",
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
  };
  console.log(options.headers);
  fetch(url, options)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        return response.text().then((errorText) => {
          throw new Error(
            "Erro ao obter banco de dados da Votação: " + errorText
          );
        });
      }
    })
    .then((data) => {
      console.log("DATA RESPONSE: ");
      console.log(data);
      renderVotacao(data);
    })
    .catch((error) => onError(error));

  function renderVotacao(database) {
    const tabela = document.querySelector("table");
    const autoloadRanking = document.getElementById("autoloadRanking");

    autoloadRanking.innerHTML = "Todas As Bases do Ranking Foram Carregadas!";
    for (let i = 0; i < database.length; i++) {
      const base = database[i];
      const posicao = base.posicao;
      const baseName = base.descricao;
      const level = base.dataDeInicio;
      const reputacao = base.dataDeTermino;
      const dinheiro = base.status;
      const bitcoin = base.inscritos;

      var trLine = document.createElement("tr");
      var tdElementPosicao = document.createElement("td");
      var tdElementBaseName = document.createElement("td");
      var tdElementLevel = document.createElement("td");
      var tdElementReputacao = document.createElement("td");
      var tdElementDinheiro = document.createElement("td");
      var tdElementBitcoin = document.createElement("td");

      tdElementPosicao.textContent = `${i+1}°`;
      tdElementBaseName.textContent = baseName;
      tdElementLevel.textContent = level;
      tdElementReputacao.textContent = `${reputacao}`;
      tdElementDinheiro.textContent = `$${dinheiro}`;
      tdElementBitcoin.textContent = `B${bitcoin}`;

      trLine.appendChild(tdElementPosicao);
      trLine.appendChild(tdElementBaseName);
      trLine.appendChild(tdElementLevel);
      trLine.appendChild(tdElementReputacao);
      trLine.appendChild(tdElementDinheiro);
      trLine.appendChild(tdElementBitcoin);

      tabela.appendChild(trLine);
    }
  }

  function onError(error) {
    console.debug(error);
    alert(error);
  }

  function genTokenEncodeBase64(user, password) {
    var token = user + ":" + password;
    var encodedToken = btoa(token);
    return "Basic " + encodedToken;
  }
});
