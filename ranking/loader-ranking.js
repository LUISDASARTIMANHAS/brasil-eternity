window.addEventListener("load", () => {
  const url = "https://pingobras-sg.glitch.me/api/brasil-eternity/votacao";
  const date = new Date();
  const id = Math.floor(Math.random() * 20242002);
  const options = {
    method: "GET",
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
  };
  console.log(options.headers);
  fetch(url, options)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        return response.text().then((errorText) => {
          throw new Error(
            "Erro ao obter banco de dados da Votação: " + errorText
          );
        });
      }
    })
    .then((data) => {
      console.log("DATA RESPONSE: ");
      console.log(data);
      renderVotacao(data);
    })
    .catch((error) => onError(error));

  function renderVotacao(database) {
    const table = document.querySelector("table");

    table.innerHTML = "Todas As Bases do Ranking Foram Carregadas!";
    for (let i = 0; i < database.length; i++) {
      const base = database[i];
      
      table.appendChild();
    }
  }

  function onError(error) {
    console.debug(error);
    alert(error);
  }

  function genTokenEncodeBase64(user, password) {
    var token = user + ":" + password;
    var encodedToken = btoa(token);
    return "Basic " + encodedToken;
  }

//       <table>
//           <tr>
//             <th>Posição</th>
//             <th>Base</th>
//             <th>Level</th>
//             <th>Poder</th>
//             <th>Dinheiro</th>
//             <th>Bitcoin</th>
//           </tr>
//           <tr>
//             <td>1</td>
//             <td>user</td>
//             <td>101 </td>
//             <td>10k</td>
//             <td>5,345 Mi</td>
//             <td>500 Mil</td>
//           </tr>
//     </table>
});
