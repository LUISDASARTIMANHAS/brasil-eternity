import config from "./config.js";
import CryptoJS from "../lib/crypto-js@4.1.1.mjs";

export async function sendData(path, payload, callback) {
  const url = `${config.apiUrl}/${path}`;
  const options = {
    method: "POST",
    mode: "cors",
    headers: await calculateHeaders(),
    body: JSON.stringify(payload),
  };
  try {
    showMessage("Aguardando Servidor....");
    await telemetria(path, `Enviando solicitação... Aguarde confirmação!`);
    fetch(url, options)
      .then(async (response) => {
        if (response.ok) {
          showMessage("Solicitação concluida com sucesso!");
          await telemetria(path, `Solicitação concluida com sucesso!`);
          return response.text();
        } else {
          return response.text().then(async (errorText) => {
            showError("Erro: " + errorText);
            await telemetria(path, "Erro: " + errorText);
            throw new Error("Erro: " + errorText);
          });
        }
      })
      .then((data) => {
        console.log("DATA RESPONSE: ");
        console.log(data);
        return callback(data); // Chama o callback com os dados obtidos da requisição
      })
      .catch((error) => {
        onError(error);
        throw error; // Rejoga o erro para tratamento posterior, se necessário
      });
  } catch (error) {
    onError(error);
    throw error; // Rejoga o erro para tratamento posterior, se necessário
  }
}

export async function getData(path, msgError, msgSuccess) {
  const url = `${config.apiUrl}/${path}`;
  const options = {
    method: "GET",
    mode: "cors",
    headers: await calculateHeaders(),
  };

  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error("Erro ao obter: " + errorText);
    }

    const data = await response.json();
    console.log("GET DATA RESPONSE: ");
    console.log(data);

    return data; // Retorna os dados obtidos da requisição
  } catch (error) {
    onError(error, msgError, msgSuccess);
    throw error; // Rejoga o erro para tratamento posterior, se necessário
  }
}

export async function telemetria(title, msg) {
  const url = `${config.apiUrl}/mensagem`;
  const payload = {
    titulo: `BRASIL ETERNITY/${title.toUpperCase()}`,
    mensagem: msg,
    ipinfo: localStorage.getItem("ipinfo"),
  };
  const options = {
    method: "POST",
    mode: "cors",
    headers: await calculateHeaders(),
    body: JSON.stringify(payload),
  };

  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error("Erro ao enviar telemetria: " + errorText);
    }

    const data = await response.text();
    console.log("SEND MESSAGE DATA RESPONSE: ");
    console.log(data);

    return data; // Retorna os dados obtidos da requisição
  } catch (error) {
    console.debug(error);
    throw error; // Rejoga o erro para tratamento posterior, se necessário
  }
}

function onError(error) {
  console.debug(error);
  telemetria("onError", error);
  showError(error);
}

export async function calculateHeaders() {
  const date = new Date();
  const ipInfo = localStorage.getItem("ipinfo");
  const timestamp = Date.now();
  const nonce = getRandomHex(16);
  const signature = await sha256(`${timestamp}:${nonce}:${config.secretKey}`);
  const id = Math.floor(Math.random() * 20242002);

  return {
    "content-type": "application/json;charset=utf-8",
    authorization: await getAuthorizationHeader(), // conforme versão com HMAC
    "x-signature": signature,
    "x-timestamp": timestamp,
    "x-nonce": nonce,
    "x-ip-info": ipInfo,
    key: date.getUTCHours() * date.getFullYear() * id,
    id: id,
  };
}

export function showError(error) {
  const msgError = document.getElementById("msgError");
  const msgSuccess = document.getElementById("msgSuccess");
  msgError.setAttribute("style", "display: block");
  msgError.textContent = error;
  msgSuccess.setAttribute("style", "display: none");
}

export function showMessage(message) {
  const msgError = document.getElementById("msgError");
  const msgSuccess = document.getElementById("msgSuccess");
  msgError.setAttribute("style", "display: none");
  msgSuccess.textContent = message;
  msgSuccess.setAttribute("style", "display: block");
}

export function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

export function getRandomBin(max) {
  return Math.floor(Math.random() * max).toString(2);
}

export function getRandomHex(max) {
  return Math.floor(Math.random() * max).toString(16);
}

export async function getAuthorizationHeader() {
  const combined = `${config.encodedUser}:${window.encodedPassword}`;
  const doubleEncoded = btoa(btoa(combined));
  return `Basic ${doubleEncoded}`;
}

export async function getAutoAuthorizationHeader() {
  const combined = `${navigator.userAgent}:${window.location.hostname}`;
  const doubleEncoded = btoa(btoa(combined));
  return `Basic ${doubleEncoded}`;
}

export function sha256(message) {
  return CryptoJS.SHA256(message).toString();
}
