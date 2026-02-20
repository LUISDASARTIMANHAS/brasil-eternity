import { sendData } from "../src/js/apiUtils.mjs";
import config from "../src/js/config.js";
window.addEventListener("load", () => {
  const formCode = document.getElementById("formCode");
  const msgError = document.getElementById("msgError");
  const msgSuccess = document.getElementById("msgSuccess");
  const inpCode = document.getElementById("code");

  formCode.addEventListener("submit", (event) => {
    event.preventDefault();
    sendCode();
  });
  // aciona o enviar codigo automaticamente para caracteres digitados acima de 5
  inpCode.addEventListener("input", () => {
    if (inpCode.value.length > 5) {
      sendCode();
    }
  });

  async function sendCode() {
    const inpEmail = document.getElementById("email");
    const inpCode = document.getElementById("code");
    const payloadLogin = {
      email: inpEmail.value,
      code: inpCode.value,
    };
    await sendData("login", payloadLogin, msgError, msgSuccess, autenticar);
  }

  function autenticar(userLogado) {
    const manterConectado = document.getElementById("continueConnected");
    const dataUserJson = JSON.stringify(userLogado);

    formMessage("Validando Acesso...");
    localStorage.setItem("dataUser", dataUserJson);
    setCookie("continuarConectado", manterConectado.checked, 30);

    setTimeout(() => {
      window.location.href = "../user";
    }, 4000);
  }

  async function loginMessage(msg) {
    await window.brasil_Eternity_message("LOGIN",msg);
  }
  
  function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
    let expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  }

});
