const RegistroMantenimiento = require('../models/registroMantenimientoModels');
const Administrador = require('../models/administradorModels'); // Asegúrate de importar el modelo de Administrador si es necesario

// Función para crear un nuevo registro de mantenimiento
async function crearRegistroMantenimiento(body) {
    const registroMantenimiento = new RegistroMantenimiento(body);
    return await registroMantenimiento.save();
}

// Función para obtener todos los registros de mantenimiento
async function obtenerRegistrosMantenimiento() {
    return await RegistroMantenimiento.find().populate('idAdministrador');
}

// Función para obtener un registro de mantenimiento por ID
async function obtenerRegistroMantenimientoPorId(id) {
    const registroMantenimiento = await RegistroMantenimiento.findById(id).populate('idAdministrador');

    if (!registroMantenimiento) {
        throw new Error('Registro de mantenimiento no encontrado');
    }
    return registroMantenimiento;
}

// Función para actualizar un registro de mantenimiento por ID
async function actualizarRegistroMantenimiento(id, body) {
    const registroMantenimiento = await RegistroMantenimiento.findByIdAndUpdate(id, body, { new: true }).populate('idAdministrador');

    if (!registroMantenimiento) {
        throw new Error('Registro de mantenimiento no encontrado');
    }
    return registroMantenimiento;
}

// Función para eliminar un registro de mantenimiento por ID
async function eliminarRegistroMantenimiento(id) {
    const registroMantenimiento = await RegistroMantenimiento.findByIdAndDelete(id);

    if (!registroMantenimiento) {
        throw new Error('Registro de mantenimiento no encontrado');
    }
    return { message: 'Registro de mantenimiento eliminado' };
}

module.exports = {
    crearRegistroMantenimiento,
    obtenerRegistrosMantenimiento,
    obtenerRegistroMantenimientoPorId,
    actualizarRegistroMantenimiento,
    eliminarRegistroMantenimiento,
};
