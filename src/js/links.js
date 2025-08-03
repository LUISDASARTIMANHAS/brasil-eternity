import { renderLinkCss } from "../lib/render.js";
(() => {
  const head = document.querySelector("head");
  const isGithubPages = location.hostname.includes("github.io");
  const fonteUser = isGithubPages
    ? `${window.location.origin}/brasil-eternity/src`
    : "/src";
  const srcs = ["style", "reset", "presets", "animations", "scrollbar"];
  const srcsLinksFonts = ["bootstrap@5.3.3"];

  if (!head) {
    return;
  }

  srcs.forEach((src) => {
    const link = `${fonteUser}/css/${src}.css`;
    renderLinkCss(head, link);

    console.log(`%c [SISTEMA]: Carregando css: ${link}`, "color: #ff0000");
  });

  // // carregar fontes para o site
  // fonts.forEach((src) => {
  //   const link = `${fonteUser}/fonts/${src}.css`;
  //   renderLinkCss(head, link);

  //   console.log(
  //     `%c [SISTEMA]: Carregando Fontes css: ${link}`,
  //     "color: #ffaa00"
  //   );
  // });
})();
