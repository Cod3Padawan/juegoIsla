const botonIniciarSesion = document.getElementById("iniciar-sesion");
const modal = document.getElementById("myModal");

botonIniciarSesion.addEventListener("click", () => {
  modal.style.display = "block";
});

const botonSeleccionarAvatar = document.getElementById("seleccionar-avatar");
const botonCerrar = document.getElementsByClassName("close")[0];
const botonSeleccionar = document.getElementById("seleccionar");

// Al hacer click en el botón de seleccionar avatar, se muestra el modal
botonSeleccionarAvatar.onclick = function () {
  modal.style.display = "block";
};

// Al hacer click en el botón de cerrar, se oculta el modal
botonCerrar.onclick = function () {
  modal.style.display = "none";
};

// Al hacer click en cualquier lugar fuera del modal, se oculta el modal
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

// Al hacer click en el botón de seleccionar, se guarda el nombre de usuario y la imagen seleccionada
botonSeleccionar.onclick = function () {
    const nombreUsuario = document.getElementById("nombre-usuario").value;
    const avatarSeleccionado = document.querySelector(
      'input[name="avatar"]:checked'
    ).value;
    console.log(`Nombre de usuario: ${nombreUsuario}`);
    console.log(`Avatar seleccionado: ${avatarSeleccionado}`);
  

// Función para crear los elementos de imagen y radio button de los avatares
function crearAvatarElemento(avatarSrc, avatarId) {
  const img = document.createElement("img");
  img.src = avatarSrc;
  img.alt = `Avatar ${avatarId}`;
  img.classList.add("avatar");

  const label = document.createElement("label");
  label.htmlFor = `avatar-${avatarId}`;
  label.appendChild(img);

  const radio = document.createElement("input");
  radio.type = "radio";
  radio.name = "avatar";
  radio.value = avatarSrc;
  radio.id = `avatar-${avatarId}`;

  const div = document.createElement("div");
  div.appendChild(radio);
  div.appendChild(label);
  div.classList.add("avatar-container-item");

  return div;
}

// Función para crear todos los elementos de imagen y radio button de los avatares
function crearAvatares() {
  const avatarContainer = document.getElementById("avatar-container");
  for (let i = 1; i <= 1000; i++) {
    const avatarSrc = `/imagenes/peee/${i}.jpg`;
    const avatarElemento = crearAvatarElemento(avatarSrc, i);
    avatarContainer.appendChild(avatarElemento);
  }
}

// Se crean los elementos de imagen y radio button de los avatares al cargar la página
crearAvatares();
