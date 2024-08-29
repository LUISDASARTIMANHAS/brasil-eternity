(() => {
  const devUser = JSON.parse(localStorage.getItem("dev")) || false;
  const expUser = JSON.parse(localStorage.getItem("experimentalMode")) || false;
  const body = document.querySelector("body");
  const offline = false;

  if ((offline && !devUser) || (offline && !devUser)) {
    body.hidden = true;

    if (body) {
      body.style.display = "none";
    }

    setTimeout(() => {
      window.location.href = "/sys/manutencao.html";
    }, 3000);
  }
})();