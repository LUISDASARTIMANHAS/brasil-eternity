window.addEventListener("load", () => {
  try {
    const form = document.getElementById("deletarConta");
    form.addEventListener("submit", stopDefAction);

    function stopDefAction(event) {
      event.preventDefault();
      delearConta();
    }

    async function delearConta() {
      const url = `${window.env.apiUrl}/user`;
      const date = new Date();
      const id = Math.floor(Math.random() * 20242002);
      const options = {
        method: "DELETE",
        mode: "cors",
        headers: {
          "content-type": "application/json;charset=utf-8",
          Authorization: window.getAuthorizationHeader(),
          key: date.getUTCHours() * date.getFullYear() * id,
          id: id,
        },
        body: localStorage.getItem("dataUser"),
      };

      await message("Deletando Conta. Aguarde confirmação...!");
      fetch(url, options)
        .then(async (response) => {
          if (response.ok) {
            await message("COnta Deletada! Espero que tenha sido bom!");
            return response.text();
          } else {
            return response.text().then(async (errorText) => {
              await message("Erro ao deletar conta: " + errorText);
              throw new Error("Erro ao deletar conta: " + errorText);
            });
          }
        })
        .then(async (data) => {
          console.log("DATA RESPONSE: ");
          console.log(data);
          localStorage.removeItem("dataUser");
          await message(data);
          alert(data);
          setTimeout(() => {
            window.location.href = "../";
          }, 2000);
        })
        .catch((error) => onError(error));
    }

    async function message(msg) {
      await window.brasil_Eternity_message("DELETAR", msg);
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
