const codeLabel = document.getElementById("codeError");
const codeServerLabel = document.getElementById("codeServerError");
const code = 504;

if (code == 404) {
  codeLabel.innerHTML = "404 NÃO_ENCONTRADO";
}
if (code == 501) {
  codeLabel.innerHTML = "501 NÃO_IMPLEMENTADO";
}
if (code == 502) {
  codeLabel.innerHTML = "502 PORTÃO_DE_ENTRADA_RUIM";
}
if (code == 503) {
  codeLabel.innerHTML = "503 SERVIÇO_INDISPONÍVEL";
}
if (code == 504) {
  codeLabel.innerHTML = "504 TEMPO_LIMITE_DO_SERVIDOR";
}
if (code == 505) {
  codeLabel.innerHTML = "505 VERSÃO_HTTP_NÃO_SUPORTADA";
}

function getServer() {
  const url = "https://pingobras-sg.glitch.me/";
  const date = new Date();
  const id = Math.floor(Math.random() * 20242002);
  const options = {
    method: "GET",
    mode: "cors",
    headers: {
      "content-type": "application/json;charset=utf-8",
      key: date.getUTCHours() * date.getFullYear() * id,
      id: id,
    },
  };
  fetch(url, options)
    .then((response) => {
    const status = response.status;
      if (status == 200) {
        genBarServerStatus(100);
      } else {
        genBarServerStatus(25);
      }
      codeServerLabel.innerHTML = status;
    })
    .catch((error) => {
      console.error(error);
    });
}
getServer();

function genBarServerStatus(loaded) {
  const bar = document.getElementById("barStatusServer");
  let width = 0;
  const delay = 100;

  if (loaded == 25) {
    bar.style.animation = "";
    bar.textContent = `Falha ao Reconectar`;
    return true;
  }

  bar.style.animation = "disabled";
  for (let i = 0; i < loaded; i++) {
    setTimeout(() => {
      width++;
      bar.style.width = width + "%";
      bar.textContent = `Reconectando...${width}%`;
      if (width == 100) {
        bar.textContent = `Reconectado! Tudo Funcionando.`;
        setTimeout(()=>{
          window.location.href = "https://brasil-eternity.glitch.me"
        },5*1000)
      }
    }, i * delay);
  }
}
