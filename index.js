let INDEX_PREGUNTA = 0;
let INDEX_PREGUNTA2 = 8;
let puntaje = 0;
let puntaje2 = 0;
let jugador1 = false
let jugador2 = false
cargarPregunta(INDEX_PREGUNTA);

function cargarPregunta(INDEX_PREGUNTA) {
    jugador1 = true
    objetopregunta = arregloCombinado[INDEX_PREGUNTA];
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
    var player1 = localStorage.getItem("jugador1");
    document.getElementById("mostrarJugador1").innerHTML = player1;

}

function cargarPregunta2(INDEX_PREGUNTA2) {
    jugador2 = true
    objetopregunta = arregloCombinado[INDEX_PREGUNTA2];
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
    var player2 = localStorage.getItem("jugador2");
    document.getElementById("mostrarJugador1").innerHTML = player2;
}


async function seleccionarOpcion(index) {
  var player1 = localStorage.getItem("jugador1");
  var player2 = localStorage.getItem("jugador2");
    if(jugador1){
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
        jugador1=false
        } else {
        clearInterval(counter);
        await Swal.fire({
            title: "Respuesta incorrecta",
            text: `La respuesta correcta es "${objetopregunta.respuesta}"`,
            icon: "error",
        });
        counter = setInterval(updateCountdown, 1000);
        jugador1=false
        }
        INDEX_PREGUNTA++;
        if (INDEX_PREGUNTA >= 8) {
        count = 10
        clearInterval(counter);
        // await Swal.fire({
        //     title: "Jugador 1",
        //     text: `Tu puntaje fue ${puntaje}/8`,
        //     imageUrl: objetopregunta.imagenFinalizado,
        //     imageHeight: 300,
        // });
        INDEX_PREGUNTA = 0;
        
        }
        document.getElementById("nivel").innerHTML = objetopregunta.nivel;
        count = 10
        updateCountdown()
        cargarPregunta2(INDEX_PREGUNTA2);
    }
    else if(jugador2){
        let validezRespuesta = opciones[index] == objetopregunta.respuesta;
        if (validezRespuesta) {
        clearInterval(counter); 
        await Swal.fire({
            title: "Respuesta correcta",
            text: "La opcion seleccionada es la correcta",
            icon: "success",
        });
        counter = setInterval(updateCountdown, 1000);
        puntaje2++
        jugador2 = false

        } else {
        clearInterval(counter);
        await Swal.fire({
            title: "Respuesta incorrecta",
            text: `La respuesta correcta es "${objetopregunta.respuesta}"`,
            icon: "error",
        });
        counter = setInterval(updateCountdown, 1000);
        jugador2 = false
        }
        INDEX_PREGUNTA2++;
        if (INDEX_PREGUNTA2 >= 16) {
          count = 10
          clearInterval(counter);
          if(puntaje == puntaje2){
            resultado = `Fue un empate!!`
          }else if (puntaje > puntaje2){
              resultado = `${player1} es el Ganador!!`
          }else{
              resultado = `${player2} es el Ganador!!`
          }
          await Swal.fire({
            title: resultado,
            text: `Pts ${player1}: ${puntaje}/8 | Pts ${player2}: ${puntaje2}/8 `,
            imageUrl: objetopregunta.imagenGanador,
            imageHeight: 300,
        });
        playagain()
        puntaje2 = 0;
        puntaje = 0
        INDEX_PREGUNTA2 = 0;
        }
        document.getElementById("nivel").innerHTML = objetopregunta.nivel;
        count = 10
        updateCountdown()
        cargarPregunta(INDEX_PREGUNTA);
    }
    
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
      if(jugador1){
        INDEX_PREGUNTA++
        jugador1 = false
        cargarPregunta2(INDEX_PREGUNTA2)
      }else if(jugador2){
        INDEX_PREGUNTA2++
        jugador2 = false
        cargarPregunta(INDEX_PREGUNTA)
      }

      document.getElementById("nivel").innerHTML = objetopregunta.nivel
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
  