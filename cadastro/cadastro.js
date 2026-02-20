import config from "../src/js/config.js";
import { sendData } from "../src/js/apiUtils.mjs";

window.addEventListener("load", () => {
  const form = document.getElementById("form");
  const msgError = document.getElementById("msgError");
  const msgSuccess = document.getElementById("msgSuccess");

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    verificar();
  });

  function verificar() {
    const inpUsuario = document.getElementById("user");
    const inpPerfilIMG = document.getElementById("perfilIMG");
    const inpPrivacity = document.getElementById("selectPrivacity");
    const inpEmail = document.getElementById("email");
    const thumbnail = inpPerfilIMG.value;

    if (!inpUsuario.value && !inpUsuario.value > 3) {
      alert("O usuario deve conter mais de 3 caracteres!");
    } else if (
      thumbnail !== "" &&
      thumbnail !== null &&
      !thumbnail.startsWith("https://")
    ) {
      alert("Insira uma imagem de perfil Valida!");
    } else if (
      thumbnail !== "" &&
      thumbnail !== null &&
      !thumbnail.endsWith(".png") &&
      !thumbnail.endsWith(".jpg")
    ) {
      alert("A imagem precisa ser png ou jpg");
    } else {
      cadastrar(
        inpUsuario.value,
        inpEmail.value,
        inpPrivacity.value,
        thumbnail,
      );
    }
  }

  async function cadastrar(user, email, privacityPerfil, PerfilImg) {
    const payloadLogin = {
      usuario: user,
      email: email,
      privacity: privacityPerfil,
      PerfilIMG: PerfilImg,
    };
    sendData("cadastro", payloadLogin, msgError, msgSuccess, (data) => {
      window.location.href = "../user";
    });
  }

  async function cadastroMessage(msg) {
    await window.brasil_Eternity_message("CADASTRO", msg);
  }
});
