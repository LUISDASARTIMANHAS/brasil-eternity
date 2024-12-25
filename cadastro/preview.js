window.addEventListener("load", () => {
  const form = document.getElementById("form");
  form.addEventListener("input", preview);
  preview();

  function preview() {
    const previewUsuario = document.getElementById("previewUsuario");
    const previewImg = document.getElementById("previewImg");
    const previewPrivacity = document.getElementById("previewPrivacity");
    const previewEmail = document.getElementById("previewEmail");
    const inpUsuario = document.getElementById("user");
    const inpAvatar = document.getElementById("perfilIMG");
    const inpPrivacity = document.getElementById("selectPrivacity");
    const inpEmail = document.getElementById("email");

    if (inpUsuario.value == "") {
      previewUsuario.textContent = "Not Found User";
    } else {
      previewUsuario.textContent = inpUsuario.value;
    }

    if (inpAvatar.value == "" || !inpAvatar.value.startsWith("https://")) {
      previewImg.src =
        "https://w7.pngwing.com/pngs/798/436/png-transparent-computer-icons-user-profile-avatar-profile-heroes-black-profile.png";
    } else {
      previewImg.src = inpAvatar.value;
      previewImg.alt = inpUsuario.value;
    }

    if (inpPrivacity.value == "") {
      previewPrivacity.textContent = "Não selecionado!";
    } else {
      previewPrivacity.textContent = inpPrivacity.value;
    }

    if (inpEmail.value == "") {
      previewEmail.textContent = "Visivel apenas para você!";
    } else {
      previewEmail.textContent = inpEmail.value;
    }
  }
});
