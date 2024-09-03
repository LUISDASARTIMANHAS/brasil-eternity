window.addEventListener("load", () => {
  const form = document.getElementById("deletarConta");
  form.addEventListener("submit", stopDefAction);

  function stopDefAction(event) {
    event.preventDefault();
    delearConta();
  }

  function delearConta() {
    const url = "https://pingobras-sg.glitch.me/api/brasil-eternity/user";
    const date = new Date();
    const id = Math.floor(Math.random() * 20242002);
    const options = {
      method: "DELETE",
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
      body: localStorage.getItem("dataUser"),
    };

    message("Deletando Conta. Aguarde confirmação...!");
    fetch(url, options)
      .then((response) => {
        if (response.ok) {
          return response.text();
        } else {
          return response.text().then((errorText) => {
            message("Erro ao deletar conta: " + errorText);
            throw new Error("Erro ao deletar conta: " + errorText);
          });
        }
      })
      .then((data) => {
        console.log("DATA RESPONSE: ");
        console.log(data);
        localStorage.removeItem("dataUser");
        message(data);
        alert(data);
        setTimeout(() => {
          window.location.href = "/";
        }, 2000);
      })
      .catch((error) => onError(error));
  }
  function onError(error) {
    console.debug(error);
    alert(error);
  }

  function message(msg) {}

  function genTokenEncodeBase64(user, password) {
    var token = user + ":" + password;
    var encodedToken = btoa(token);
    return "Basic " + encodedToken;
  }
});
