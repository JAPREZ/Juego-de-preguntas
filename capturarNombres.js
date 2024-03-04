function almacenarYAvanzar() {
    // Obtener los valores de los campos de entrada
    var player1 = document.getElementById("jugador1").value;
    var player2 = document.getElementById("jugador2").value;

    // Verificar si ambos campos están llenos
    if (player1.trim() !== '' && player2.trim() !== '') {
        // Almacenar los valores en localStorage
        localStorage.setItem("jugador1", player1);
        localStorage.setItem("jugador2", player2);

        // Redirigir a la siguiente página
        window.location.href = "index.html";
    } else {
        // Mostrar un mensaje de error o tomar otra acción en caso de que falten datos
        alert("Por favor, ingrese ambos jugadores antes de avanzar.");
    }
}
