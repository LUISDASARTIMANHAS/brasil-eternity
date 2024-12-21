window.addEventListener("load", () => {
  const btnCopyText = document.getElementById("copyText");
  const dataUser = JSON.parse(localStorage.getItem("dataUser"));
  const usuario = dataUser.usuario;

  btnCopyText.addEventListener("click", copyText);

  function getBases() {
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
            throw new Error(
              "Erro ao obter banco de dados dos simlinks: " + errorText
            );
          });
        }
      })
      .then((data) => {
        console.log("DATA RESPONSE: ");
        console.log(data);
        gerarTexto(data);
        genBarAtt(data);
      })
      .catch((error) => onError(error));
  }
  getBases();

  function onError(error) {
    console.debug(error);
    alert(error);
  }

  function gerarTexto(database) {
    const outputBases = document.getElementById("outputBases");
    const totalBases = document.getElementById("totalBases");
    const date = new Date();
    const dataLocal = date.toLocaleString();
    let text = "";
    

    for (let i = 0; i < database.length; i++) {
      const base = database[i];
      const usuario = base.user;
      const nome = base.name;
      const simlink = base.simlink;

      text = `${text}
    
Usuário = ${usuario}
    
Base = ${nome}
    
${simlink}`;
    }
    text = `${text}
  
Utilize /bases no grupo para gerar o texto com mais facilicade!

Ultima atualização: ${dataLocal}
Disponivel também em: 
https://brasil-eternity.com/login`;
    outputBases.innerHTML = text;
    totalBases.textContent = database.length;
  }

  function copyText() {
    const text = document.getElementById("outputBases");

    // Select the text field
    // text.select();
    // For mobile devices
    // text.setSelectionRange(0, 99999);
    message(`${usuario} Gerou um texto das bases. Use com cuidado!`);
    // Copy the text inside the text field
    navigator.clipboard.writeText(text.textContent);

    // Alert the copied text
    alert("Texto copiado! " + text.textContent);
  }

  function genBarAtt(database) {
    const bar = document.getElementById("barAttBases");
    let basesAtualizadas = 0;
    let width = 0;

    bar.style.animation = "disabled";
    for (let i = 0; i < database.length; i++) {
      const base = database[i];
      const baseUser = base.user;

      if (baseUser) {
        setTimeout(() => {
          width = 4.54 * basesAtualizadas + 0.12;
          bar.style.width = width + "%";
          bar.textContent = `${basesAtualizadas}/${database.length} Bases Atualizadas`;
        }, 1000);
        basesAtualizadas++;
      }
    }
  }

  function message(msg) {
    window.brasil_Eternity_message("GERAR TEXTO", msg);
  }
});
