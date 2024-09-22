const TipoEvidencia = require('../models/tipoEvidenciaModels');
const Evidencia = require('../models/evidenciaModels'); // Asegúrate de importar el modelo de Evidencia si es necesario

// Función para crear un nuevo tipo de evidencia
async function crearTipoEvidencia(body) {
    const tipoEvidencia = new TipoEvidencia(body);
    return await tipoEvidencia.save();
}

// Función para obtener todos los tipos de evidencia
async function obtenerTiposEvidencia() {
    return await TipoEvidencia.find().populate('idEvidencia');
}

// Función para obtener un tipo de evidencia por ID
async function obtenerTipoEvidenciaPorId(id) {
    const tipoEvidencia = await TipoEvidencia.findById(id).populate('idEvidencia');

    if (!tipoEvidencia) {
        throw new Error('Tipo de evidencia no encontrado');
    }
    return tipoEvidencia;
}

// Función para actualizar un tipo de evidencia por ID
async function actualizarTipoEvidencia(id, body) {
    const tipoEvidencia = await TipoEvidencia.findByIdAndUpdate(id, body, { new: true }).populate('idEvidencia');

    if (!tipoEvidencia) {
        throw new Error('Tipo de evidencia no encontrado');
    }
    return tipoEvidencia;
}

// Función para eliminar un tipo de evidencia por ID
async function eliminarTipoEvidencia(id) {
    const tipoEvidencia = await TipoEvidencia.findByIdAndDelete(id);

    if (!tipoEvidencia) {
        throw new Error('Tipo de evidencia no encontrado');
    }
    return { message: 'Tipo de evidencia eliminado' };
}

module.exports = {
    crearTipoEvidencia,
    obtenerTiposEvidencia,
    obtenerTipoEvidenciaPorId,
    actualizarTipoEvidencia,
    eliminarTipoEvidencia,
};
