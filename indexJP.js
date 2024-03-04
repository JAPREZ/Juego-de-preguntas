let INDEX_PREGUNTA = 0;
let puntaje = 0;

cargarPregunta(INDEX_PREGUNTA);

function cargarPregunta(INDEX_PREGUNTA) {
  objetopregunta = objetosSeleccionados[INDEX_PREGUNTA];
  opciones = [...objetopregunta.distractores];
  opciones.push(objetopregunta.respuesta);

  for (let i = 0; i < 4; i++) {
    opciones.sort(() => Math.random() - 0.5);
  }

  document.getElementById("pregunta").innerHTML = objetopregunta.pregunta;
  if (objetopregunta.imagen) {
    document.getElementById("imagen").src = objetopregunta.imagen;
    document.getElementById("imagen").style.display = "";
  } else {
    document.getElementById("imagen").style.display = "none";
  }

  document.getElementById("opcion-1").innerHTML = opciones[0];
  document.getElementById("opcion-2").innerHTML = opciones[1];
  document.getElementById("opcion-3").innerHTML = opciones[2];
  document.getElementById("opcion-4").innerHTML = opciones[3];
  document.getElementById("nivel").innerHTML = objetopregunta.nivel
}

async function seleccionarOpcion(index) {
  let validezRespuesta = opciones[index] == objetopregunta.respuesta;
  if (validezRespuesta) {
    clearInterval(counter); 
    await Swal.fire({
      title: "Respuesta correcta",
      text: "La opcion seleccionada es la correcta",
      icon: "success",
    });
    counter = setInterval(updateCountdown, 1000);

    puntaje++;
  } else {
    clearInterval(counter);
    await Swal.fire({
      title: "Respuesta incorrecta",
      text: `La respuesta correcta es "${objetopregunta.respuesta}"`,
      icon: "error",
    });
    counter = setInterval(updateCountdown, 1000);
  }
  INDEX_PREGUNTA++;
  if (INDEX_PREGUNTA >= 8) {
    count = 10
    clearInterval(counter);
    await Swal.fire({
      title: "Juego terminado",
      text: `Tu puntaje fue ${puntaje}/8`,
      imageUrl: objetopregunta.imagenFinalizado,
      imageHeight: 300,
    });
    puntaje = 0;
    INDEX_PREGUNTA = 0;
    
    playagain();
  }
  document.getElementById("nivel").innerHTML = objetopregunta.nivel;
  count = 10
  updateCountdown()
  cargarPregunta(INDEX_PREGUNTA);
  
}

function pista() {
  Swal.fire({
    title: "Pista",
    text: objetopregunta.pista,
    imageUrl: objetopregunta.pistaImg,
    imageHeight: 300,
  });
}

let count = 10;
let maxCount = 10; // Valor máximo antes de reiniciar la cuenta regresiva

function updateCountdown() {
  document.getElementById('countdown').textContent = count;
  if (count === 0) {
    // Si el contador llega a 0, reinicia la cuenta regresiva
    count = maxCount;
    INDEX_PREGUNTA++
    document.getElementById("nivel").innerHTML = objetopregunta.nivel
    cargarPregunta(INDEX_PREGUNTA)
  } else {
    count--;
  }
}

counter = setInterval(updateCountdown, 1000);
updateCountdown()
// funcion para reiniciar todo
function playagain() {
  location.reload(true);
}

