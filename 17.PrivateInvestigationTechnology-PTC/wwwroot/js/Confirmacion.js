// Mostrar el modal al cargar la página
document.addEventListener("DOMContentLoaded", function () {
    const modal = document.getElementById("confirmationModal");
    modal.style.display = "block";

    // Cerrar el modal al hacer clic en el botón de cerrar
    const closeButton = document.querySelector(".close");
    closeButton.onclick = function () {
        modal.style.display = "none";
    }

    // Cerrar el modal si se hace clic fuera de él
    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
});
