const Auditoria = require('../models/auditoriaModels');

// Función para crear una nueva auditoría
async function crearAuditoria(body) {
    const auditoria = new Auditoria(body);
    return await auditoria.save();
}

// Función para obtener todas las auditorías
async function obtenerAuditorias() {
    return await Auditoria.find().populate('idUsuario');
}

// Función para obtener una auditoría por ID
async function obtenerAuditoriaPorId(id) {
    const auditoria = await Auditoria.findById(id).populate('idUsuario');

    if (!auditoria) {
        throw new Error('Auditoría no encontrada');
    }
    return auditoria;
}

// Función para actualizar una auditoría por ID
async function actualizarAuditoria(id, body) {
    const auditoria = await Auditoria.findByIdAndUpdate(id, body, { new: true }).populate('idUsuario');

    if (!auditoria) {
        throw new Error('Auditoría no encontrada');
    }
    return auditoria;
}

// Función para eliminar una auditoría por ID
async function eliminarAuditoria(id) {
    const auditoria = await Auditoria.findByIdAndDelete(id);

    if (!auditoria) {
        throw new Error('Auditoría no encontrada');
    }
    return { message: 'Auditoría eliminada' };
}

module.exports = {
    crearAuditoria,
    obtenerAuditorias,
    obtenerAuditoriaPorId,
    actualizarAuditoria,
    eliminarAuditoria,
};
