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
  console.log(options.headers);
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
      renderBases(data);
    })
    .catch((error) => onError(error));
}
getBases();

function renderBases(database) {
  const autoloadBases = document.getElementById("autoloadBases");
  const totalBases = document.getElementById("totalBases");

  autoloadBases.innerHTML = "Todas As Bases Foram Carregadas!";
  totalBases.textContent = database.length;
  for (let i = 0; i < database.length; i++) {
    const base = database[i];
    var liElement = document.createElement("li");
    var divElementCard = document.createElement("div");
    var imgElementElement = document.createElement("img");
     var pElementUsuario = document.createElement("p");
    var pElementBase = document.createElement("p");
    var divElementSimlink = document.createElement("div");
    var ioniconElementSimlink = document.createElement("ion-icon");
    var pElementSimlink = document.createElement("p");
    var aElementSimlink = document.createElement("a");

    //Configurações da img
    if (base.thumbnail) {
      imgElementElement.setAttribute("src", base.thumbnail);
    } else {
      imgElementElement.setAttribute(
        "src",
        "https://link.hackersthegame.com/images/Hackers_title_512.png"
      );
    }
    imgElementElement.setAttribute("alt", "Icone da Base");

    //Configurações do p base e do p usuario 
    pElementUsuario.innerHTML = `Usuário: ${base.user}`
    pElementBase.innerHTML = `Base: ${base.name}`;

    //Configurações do ion icon
    divElementSimlink.setAttribute("class", "simlink");

    //Configurações do ion icon
    ioniconElementSimlink.name = "link-outline";
    ioniconElementSimlink.title =
      "Simlink da Base, basta clicar para fazer o teste";

    //Configurações do p simlink
    pElementSimlink.textContent = "SimLink: ";

    //Configurações do a simlink do p simlink
    aElementSimlink.setAttribute("href", base.simlink || "/");
    aElementSimlink.setAttribute("target", "_blank");
    aElementSimlink.textContent = "Click Here";

    //Configurações da div card
    divElementCard.setAttribute("class", "card");

    divElementSimlink.appendChild(ioniconElementSimlink);
    divElementSimlink.appendChild(pElementSimlink);
    divElementSimlink.appendChild(aElementSimlink);

    divElementCard.appendChild(imgElementElement);
    divElementCard.appendChild(pElementUsuario);
    divElementCard.appendChild(pElementBase);
    divElementCard.appendChild(divElementSimlink);

    liElement.appendChild(divElementCard);
    autoloadBases.appendChild(liElement);
  }
}

function onError(error) {
  console.debug(error);
  alert(error);
}

// <p>Usuário : <js id="previewUsuario">Not Found User</js></p>