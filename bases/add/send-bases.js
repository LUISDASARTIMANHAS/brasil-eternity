const form = document.querySelector("form");

form.addEventListener("submit", stopDefAction);
form.addEventListener("input", preview);

function stopDefAction(event) {
  event.preventDefault();
  sendBase();
}

function sendBase() {
  const url = "https://pingobras-sg.glitch.me/api/brasil-eternity/bases";
  const date = new Date();
  const id = Math.floor(Math.random() * 20242002);
  const inpbaseNome = document.getElementById("baseNome");
  const inpSimlink = document.getElementById("simlink");
  const inpThumbnail = document.getElementById("thumbnail");
  const payloadLogin = {
    name: `『ᴮʳETER』${inpbaseNome.value}`,
    simlink: inpSimlink.value,
    thumbnail: inpThumbnail.value,
  };
  const options = {
    method: "POST",
    mode: "cors",
    headers: {
      "content-type": "application/json;charset=utf-8",
      Authorization: "Bearer brasil-eternity&auth=afddsafhatoshajslnchcasdc",
      key: date.getUTCHours() * date.getFullYear() * id,
      id: id,
    },
    body: JSON.stringify(payloadLogin),
  };

  fetch(url, options)
    .then((response) => {
      if (response.ok) {
        return response.text();
      } else {
        return response.text().then((errorText) => {
          throw new Error("Erro ao cadastrar base: " + errorText);
        });
      }
    })
    .then((data) => {
      console.log("DATA RESPONSE: ");
      console.log(data);
      alert(data);
      setTimeout(() => {
        window.location.href = "/bases";
      }, 2000);
    })
    .catch((error) => onError(error));
}

function onError(error) {
  console.debug(error);
  alert(error);
}

function preview() {
  const previewBase = document.getElementById("previewBase");
  const previewImg = document.getElementById("previewImg");
  const previewSimlink = document.getElementById("previewSimlink");
  const inpbaseNome = document.getElementById("baseNome");
  const inpSimlink = document.getElementById("simlink");
  const inpThumbnail = document.getElementById("thumbnail");

  if (inpbaseNome.value == "") {
    previewBase.textContent = "Not Found";
  } else {
    previewBase.textContent = `『ᴮʳETER』${inpbaseNome.value}`;
  }
  if (inpThumbnail.value == "") {
    previewImg.src =
      "https://link.hackersthegame.com/images/Hackers_title_512.png";
  } else {
    previewImg.src = inpThumbnail.value;
  }
  if (inpSimlink.value == "") {
    previewSimlink.href = "https://link.hackersthegame.com/simlink.php";
  } else {
    previewSimlink.href = inpSimlink.value;
  }
}
