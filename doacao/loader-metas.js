window.addEventListener("load", () => {
  try {
    const qtMetasBar = document.getElementById("qtd-metas");
    const msgError = document.getElementById("msgError");
    const msgSuccess = document.getElementById("msgSuccess");
    const inpCode = document.getElementById("code");

    async function getQtdMetas() {
      const url = `${window.env.apiUrl}/doacao`;
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

      await message(`Obtendo Metas de Doação!`);
      fetch(url, options)
        .then(async (response) => {
          if (response.ok) {
            await message(`Metas de doação obtidas com sucesso!`);
            return response.json();
          } else {
            return response.text().then(async (errorText) => {
              await message("Erro ao obter Metas: " + errorText);
              throw new Error("Erro ao obter Metas: " + errorText);
            });
          }
        })
        .then((data) => {
          console.log("DATA RESPONSE: ");
          console.log(data);
        genBarAtt(data);
        })
        .catch((error) => onError(error));
    }
    getQtdMetas();
    
     function genBarAtt(database) {
      const bar = document.getElementById("qtdMeta");
      const meta = database.meta;
       const qtdDoacao = database.qtdDoacao;
      let width = getPercent(qtdDoacao,meta);

      bar.style.animation = "disabled";
      for (let i = 0; i < width; i++) {

          setTimeout(() => {
            bar.style.width = i + "%";
            // i * 70 ms o I segue o a porcentagem que foi completa mas o I e interado com um delay para que a barra não expanda de uma vez e expanda a cada porcentagem representada pelo I interado. ex:
            // i = 1; e o mesmo que width = 1% da barra delay de 70ms
            // i = 10; e o mesmo que width = 10% da barra delay de 700ms
            // i = 20; e o mesmo que width = 20% da barra delay de 1400ms
            // i = 30; e o mesmo que width = 30% da barra delay de 2100ms
            // i = 100; e o mesmo que width = 100% da barra delay de 7000ms
          }, i * 70);
      }
            bar.textContent = `R$ ${qtdDoacao}/${meta} - ${width}% `;
    }

    async function message(msg) {
      await window.brasil_Eternity_message("DOAÇÃO", msg);
    }

    function getPercent(value,total){
      return (value/total) * 100
    }
    function onError(error) {
      console.debug(error);
      alert(error);
    }
  } catch (err) {
    alert(
      "ERRO INTERNO FALTAL: " + err + "\n CONTATE O ADMINISTRADOR DO SITE!"
    );
  }
});
