const form = document.querySelector("form");

form.addEventListener("submit", stopDefAction);
// form.addEventListener("input", preview);

function stopDefAction(event) {
  event.preventDefault();
  findBase();
}

function preview() {
  const previewBase = document.getElementById("previewBase");
  const previewSimlink = document.getElementById("previewSimlink");

  previewBase.textContent = base.name;
  previewSimlink.href = base.simlink;
  previewSimlink.textContent = base.simlink;
}

async function findBase() {
  const urlBase = "https://link.hackersthegame.com/simlink.php";
  const baseName = document.getElementById("baseName");
  const lasbelTentativas = document.getElementById("labelTentativas");
  const previewBase = document.getElementById("previewBase");
  const previewSimlink = document.getElementById("previewSimlink");
  const date = new Date();
  const id = Math.floor(Math.random() * 20242002);
  const options = {
    method: "GET",
    mode: "no-cors",
    headers: {
      "content-type": "application/json;charset=utf-8",
    },
  };
  const maxTentativas = 100;
  let currentBaseName = null;
  let qtdeTentativas = 0;

  while (
    qtdeTentativas < maxTentativas &&
    !baseName.value.includes(currentBaseName)
  ) {
    const parser = new DOMParser();
    const p = getRandomInt(93158715);
    const t = getRandomInt(94442873);
    const c = getRandomInt(97455);
    const q = getRandomInt(957);
    const s = getRandomInt(908);
    const url = `${urlBase}?p=${p}&t=${t}&c=${c}&q=${q}&s=${s}`;

    qtdeTentativas++;
    lasbelTentativas.innerHTML = `${qtdeTentativas} de ${maxTentativas}`;
    previewBase.textContent = "procurando..." + qtdeTentativas;
    previewSimlink.href = url;
    previewSimlink.textContent = url;
    await fetch(url, options)
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
        const dom = parser.parseFromString(data, "text/html");
        const baseName = dom.title;
        const baseNameFormated = baseName
          .replace("SimLink to ", "")
          .replace("'s network", "")
          .replace("『ᴮʳETER』", "");
        console.log("DATA RESPONSE: ");
        console.log(data);

        currentBaseName = baseNameFormated;
        previewBase.textContent =  baseNameFormated;
      })
      .catch((error) => onError(error));
  }
}

function onError(error) {
  console.debug(error);
}

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}