import config from "./config.js";
import CryptoJS from "../lib/crypto-js@4.1.1.mjs";


export async function getData(path) {
  const url = `${config.apiUrl}/${path}`;
  const options = {
    method: "GET",
    mode: "cors",
		headers: await calculateHeaders()
  };

  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error("Erro ao obter bases: " + errorText);
    }

    const data = await response.json();
    console.log("GET BASE DATA RESPONSE: ");
    console.log(data);

    return data; // Retorna os dados obtidos da requisição
  } catch (error) {
    onError(error);
    throw error; // Rejoga o erro para tratamento posterior, se necessário
  }
}

export async function message(title, msg) {
  const url = `${config.apiUrl}/mensagem`;
	const payload = {
			titulo: `BRASIL ETERNITY/${title.toUpperCase()}`,
			mensagem: msg
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
    onError(error);
    throw error; // Rejoga o erro para tratamento posterior, se necessário
  }
}

function onError(error) {
  console.debug(error);
}

export async function calculateHeaders() {
	const ipInfo = localStorage.getItem("ipinfo");
	const timestamp = Date.now();
	const nonce = getRandomHex(16);
	const signature = await sha256(`${timestamp}:${nonce}:${config.secretKey}`);

	return {
		"content-type": "application/json;charset=utf-8",
		"authorization": await getAuthorizationHeader(), // conforme versão com HMAC
		"x-signature": signature,
		"x-timestamp": timestamp,
		"x-nonce": nonce,
		"x-ip-info":ipInfo,
	};
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
	const timestamp = Date.now();
	const nonce = getRandomHex(16);
	const baseString = `${config.userId}:${timestamp}:${nonce}`;

	// Assina com chave secreta (armazenada no servidor e no cliente)
	const signature = await sha256(baseString + config.secretKey);

	return `user=${config.userId},ts=${timestamp},nonce=${nonce},sig=${signature}`;
}

export function sha256(message) {
  return CryptoJS.SHA256(message).toString();
}