// Validar opciones habilitadas por código
function validarOpciones() {
    const codigo = prompt("Ingrese el código suministrado por el administrador:");
    if (codigo === "12345") {
        alert("Código correcto. Opciones habilitadas.");
        document.getElementById('chat-cliente').style.display = 'block';
        document.getElementById('historial-casos').style.display = 'block';
        document.getElementById('evidencias').style.display = 'block';
    } else {
        alert("Código incorrecto. Intente nuevamente.");
    }
}
// Ver avances del caso
function verAvances() {
    const caseId = document.getElementById('case-id').value;
    if (caseId) {
        const progressList = document.getElementById('progress-list');
        progressList.innerHTML = ''; // Limpiar la lista de avances anteriores
        // Simular la obtención de datos de avances del caso
        const progressData = [
            'Recolección de pruebas iniciales.',
            'Entrevistas con testigos realizadas.',
            'Análisis de evidencia forense completado.',
            'Informe preliminar enviado al cliente.',
            'Seguimiento y vigilancia en curso.'
        ];
        progressData.forEach(progress => {
            const listItem = document.createElement('li');
            listItem.textContent = progress;
            progressList.appendChild(listItem);
        });
        document.getElementById('case-progress').style.display = 'block';
    } else {
        alert('Por favor, ingrese el ID del caso.');
    }
}