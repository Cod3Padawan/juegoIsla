//Creamos un Array de palabras
const palabras = [
  "cirujano",
  "raiz",
  "radiografia",
  "espectaculo",
  "ciempies",
  "farmacia",
  "paraguas",
  "pasteleria",
  "radiacion",
  "misterio",
  "planta",
  "murcielago",
  "respiracion",
  "sobreviviente",
  "independiente",
  "periodico",
  "oportunidad",
];

// Declara una variable llamada intervalId sin asignarle ningún valor
let intervalId;

// Declara una variable booleana llamada letraIngresada y le asigna el valor false
let letraIngresada = false;

// Selecciona una palabra al azar del array 'palabras'
const palabra = palabras[Math.floor(Math.random() * palabras.length)];

// Crea una nueva cadena con los mismos caracteres que 'palabra', pero cambiando cada letra por un guión bajo.
// Luego convierte todo a mayúsculas
let palabraConGuiones = palabra.replace(/[A-Za-z]/g, "_ ").toUpperCase();

// Inicializa el contador de fallos en 0
let contadorFallos = 0;

// Esta función agrega un nuevo método al prototipo de la clase String que reemplaza un carácter en una posición determinada por otro carácter
String.prototype.replaceAt = function (index, character) {
  return (
    this.substr(0, index) + character + this.substr(index + character.length)
  );
};

// Esta línea selecciona el elemento del documento con el id "output" y establece su contenido interno como el valor de la variable "palabraConGuiones"
document.querySelector("#output").innerHTML = palabraConGuiones;

// Esta línea selecciona el elemento del documento con el id "contador" y lo asigna a la variable "contador"
const contador = document.getElementById("contador");

// Se inicializa la variable "tiempoRestante" en 45 segundos
let tiempoRestante = 90;

// Se crea un intervalo que disminuye el valor de "tiempoRestante" en 1 cada segundo y actualiza el contenido del elemento con el id "contador" con el valor actualizado de "tiempoRestante". Si el valor de "tiempoRestante" es menor o igual a 0, se detiene el intervalo, se muestra una alerta, se establece el contenido del elemento con el id "output" como el valor de la variable "palabra" y se deshabilita el botón con el id "calcular"
const cuentaRegresiva = setInterval(() => {
  tiempoRestante--;
  contador.textContent = tiempoRestante;
  if (contadorFallos == 10 || palabraConGuiones.indexOf("_") === -1) {
    window.location.replace("inicio.html");
  }

  if (tiempoRestante <= 0) {
    clearInterval(cuentaRegresiva);
    alert("Has muerto");
    document.querySelector("#output").innerHTML = palabra;
    document.querySelector("#calcular").disabled = true;
  }
}, 1000);

document.querySelector("#calcular").addEventListener("click", () => {
  // Selecciona el botón "calcular" y le agrega un evento de clic
  if (!letraIngresada) {
    // Si no se ha ingresado una letra
    letraIngresada = true; // Se marca que ya se ingresó una letra
    intervalId = setInterval(() => {
      // Se crea un intervalo que se ejecuta cada segundo
      tiempoRestante--; // Se decrementa el tiempo restante
      document.querySelector("#tiempo").innerHTML = tiempoRestante; // Se actualiza el tiempo restante en la pantalla

      if (tiempoRestante == 0) {
        // Si el tiempo restante llega a 0
        clearInterval(intervalId); // Se detiene el intervalo
        alert("Has muerto"); // Se muestra una alerta
        document.querySelector("#output").innerHTML = palabra; // Se muestra la palabra completa en la pantalla
        document.querySelector("#calcular").disabled = true; // Se deshabilita el botón "calcular"
      }
    }, 1000);
  }

  const letra = document.querySelector("#letra").value; // Se obtiene la letra ingresada por el usuario
  let haFallado = true; // Se establece un valor inicial para la variable que indica si se ha fallado o no

  // Se recorre cada letra de la palabra oculta para comprobar si la letra ingresada coincide con alguna
  for (const i in palabra) {
    if (letra == palabra[i]) {
      palabraConGuiones = palabraConGuiones.replaceAt(i * 2, letra); // Se reemplaza el guión por la letra correcta en la palabra con guiones
      haFallado = false; // Se cambia el valor de la variable a "false" porque se ha acertado la letra
    }
  }

  // Si no se ha acertado la letra, se aumenta el contador de fallos y se cambia la imagen del ahorcado
  if (haFallado) {
    contadorFallos++;
    document.querySelector("#ahorcado").style.backgroundPosition =
      -(207 * contadorFallos) + "px 0"; // Se cambia la posición de la imagen del ahorcado según el número de fallos
    // Si se han cometido 4 fallos, se pierde la partida
    if (contadorFallos == 4) {
      clearInterval(intervalId); // Se detiene la cuenta regresiva del tiempo
      alert("Has muerto");
      document.querySelector("#output").innerHTML = palabra; // Se muestra la palabra oculta completa
      document.querySelector("#calcular").disabled = true; // Se desactiva el botón para ingresar letras
    }
  } else {
    // Si se acertó la letra, se verifica si se completó la palabra
    if (palabraConGuiones.indexOf("_") < 0) {
      clearInterval(intervalId); // Se detiene la cuenta regresiva del tiempo
      alert("¡Has ganado!");
      document.querySelector("#calcular").disabled = true; // Se desactiva el botón para ingresar letras
    }
  }

  // Actualiza el contenido del elemento HTML con el ID "output"
  document.querySelector("#output").innerHTML = palabraConGuiones;

  // Limpia el valor del campo de entrada de texto con el ID "letra"
  document.querySelector("#letra").value = "";
});
