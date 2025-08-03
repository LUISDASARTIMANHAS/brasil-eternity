import { renderTableElement, renderTableLine } from "../src/lib/render.js";
import { getData } from "../src/js/apiUtils.mjs";

window.addEventListener("load", async () => {
  try {
    let database = await getData("ranking");
    renderVotacao(database);

    function renderVotacao(database) {
      const tabela = document.querySelector("table");
      const autoloadRanking = document.getElementById("autoloadRanking");

      for (let i = 0; i < database.length; i++) {
        const base = database[i];
        const posicao = base.posicao;
        const baseName = base.name;
        const level = base.level;
        const reputacao = base.reputacao;
        const dinheiro = base.dinheiro;
        const bitcoin = base.bitcoin;

        var trLine = renderTableLine(tabela);
        renderTableElement(trLine, `${i + 1}°`);
        renderTableElement(trLine, baseName);
        renderTableElement(trLine, level);
        renderTableElement(trLine, reputacao);
        renderTableElement(trLine, `$${dinheiro}`);
        renderTableElement(trLine, `B${bitcoin}`);
        renderTableElement(trLine, "Deletar");
      }
      autoloadRanking.innerHTML = "Todas As Bases do Ranking Foram Carregadas!";
    }
  } catch (err) {
    alert(
      "ERRO INTERNO FALTAL: " + err + "\n CONTATE O ADMINISTRADOR DO SITE!"
    );
  }
});
