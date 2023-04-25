//con esto la maquina elige un numero aleatorio entre 1 y 100
let numeroMaquina = Math.floor(Math.random() * 100) + 1;

let numeroJugadores = [];
let mediaNumero = 0;
let valorNumero = 0;

document.getElementById("elegir-numero").addEventListener("click", function () {
  let numeroJugador = parseInt(document.getElementById("numero-jugador").value);
  numeroJugadores.push(numeroJugador);

  let sumaNumeros = 0;
  for (let i = 0; i < numeroJugadores.length; i++) {
    sumaNumeros += numeroJugadores[i];
  }
  mediaNumero = sumaNumeros / numeroJugador.length;
  valorObjeto = mediaNumero * 0.8;
});

let vidasJugadores = [5, 5, 5];
let ganador = null;

document
  .getElementById("comprobar-numero")
  .addEventListener("click", function () {
    let numeroJugador = parseInt(
      document.getElementById("numero-jugador").value
    );
    let jugador = parseInt(document.getElementById("jugador").value) - 1;

    let diferencia = Math.abs(valorObjetivo - numeroMaquina);
    let diferenciaJugador = Math.abs(valorObjetivo - numeroJugador);

    if (diferenciaJugador < diferencia) {
      ganador = jugador;
      for (let i = 0; i < vidasJugadores.length; i++) {
        if (i !== jugador) {
          vidasJugadores[i]--;
          if (vidasJugadores[i] === 0) {
            alert("El jugador " + (i + 1) + " ha perdido todas sus vidas");
          }
        }
      }
    } else if (diferenciaJugador === diferencia) {
      alert("Empate");
    } else {
      for (let i = 0; i < vidasJugadores.length; i++) {
        if (i === jugador) {
          vidasJugadores[i]--;
          if (vidasJugadores[i] === 0) {
            alert("El jugador " + (i + 1) + " ha perdido todas sus vidas");
          }
        }
      }
    }
  });

document
  .getElementById("mostrar-resultados")
  .addEventListener("click", function () {
    document.getElementById("numero-maquina").textContent = numeroMaquina;
    document.getElementById("valor-objetivo").textContent = valorObjetivo;
    document.getElementById("vidas-jugador-1").textContent = vidasJugadores[0];
    document.getElementById("vidas-jugador-2").textContent = vidasJugadores[1];
  });
