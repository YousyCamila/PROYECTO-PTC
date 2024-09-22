const Evidencia = require('../models/evidenciaModel');
const Caso = require('../models/casoModel'); // Asegúrate de importar el modelo de Caso si es necesario

// Función para crear una nueva evidencia
async function crearEvidencia(body) {
    // Verificar si ya existe evidencia en el mismo caso con la misma descripción y fecha
    const evidenciaExistente = await Evidencia.findOne({ 
        idCasos: body.idCasos, 
        descripcion: body.descripcion, 
        fechaEvidencia: body.fechaEvidencia 
    });

    if (evidenciaExistente) {
        throw new Error('Ya existe una evidencia con la misma descripción y fecha para el caso especificado.');
    }

    const evidencia = new Evidencia(body);
    return await evidencia.save();
}

// Función para obtener todas las evidencias
async function obtenerEvidencias() {
    return await Evidencia.find().populate('idCasos tipoEvidencia');
}

// Función para obtener una evidencia por ID
async function obtenerEvidenciaPorId(id) {
    const evidencia = await Evidencia.findById(id).populate('idCasos tipoEvidencia');

    if (!evidencia) {
        throw new Error('Evidencia no encontrada');
    }
    return evidencia;
}

// Función para actualizar una evidencia por ID
async function actualizarEvidencia(id, body) {
    const evidencia = await Evidencia.findByIdAndUpdate(id, body, { new: true }).populate('idCasos tipoEvidencia');

    if (!evidencia) {
        throw new Error('Evidencia no encontrada');
    }
    return evidencia;
}

// Función para eliminar una evidencia por ID
async function eliminarEvidencia(id) {
    const evidencia = await Evidencia.findByIdAndDelete(id);

    if (!evidencia) {
        throw new Error('Evidencia no encontrada');
    }
    return { message: 'Evidencia eliminada' };
}

module.exports = {
    crearEvidencia,
    obtenerEvidencias,
    obtenerEvidenciaPorId,
    actualizarEvidencia,
    eliminarEvidencia,
};
