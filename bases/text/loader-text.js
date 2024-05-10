function getBases() {
  const url = "https://pingobras-sg.glitch.me/api/brasil-eternity/bases";
  const date = new Date();
  const id = Math.floor(Math.random() * 20242002);
  const options = {
    method: "GET",
    mode: "cors",
    headers: {
      "content-type": "application/json;charset=utf-8",
      Authorization: "Bearer brasil-eternity&auth=afddsafhatoshajslnchcasdc",
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
  
Disponivel também em: 
https://brasil-eternity.glitch.me/bases`;
  outputBases.innerHTML = text;
  totalBases.textContent = database.length;
}

function copyText() {
  const text = document.getElementById("outputBases");

  // Select the text field
  // text.select();
  // For mobile devices
  // text.setSelectionRange(0, 99999);

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
