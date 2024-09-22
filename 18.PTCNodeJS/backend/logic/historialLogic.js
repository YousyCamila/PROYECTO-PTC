const Historial = require('../models/historialModels');
const Cliente = require('../models/clienteModels'); // Asegúrate de importar el modelo de Cliente si es necesario

// Función para crear un nuevo historial
async function crearHistorial(body) {
    const historial = new Historial(body);
    return await historial.save();
}

// Función para obtener todos los historiales
async function obtenerHistoriales() {
    return await Historial.find().populate('idCliente');
}

// Función para obtener un historial por ID
async function obtenerHistorialPorId(id) {
    const historial = await Historial.findById(id).populate('idCliente');

    if (!historial) {
        throw new Error('Historial no encontrado');
    }
    return historial;
}

// Función para actualizar un historial por ID
async function actualizarHistorial(id, body) {
    const historial = await Historial.findByIdAndUpdate(id, body, { new: true }).populate('idCliente');

    if (!historial) {
        throw new Error('Historial no encontrado');
    }
    return historial;
}

// Función para eliminar un historial por ID
async function eliminarHistorial(id) {
    const historial = await Historial.findByIdAndDelete(id);

    if (!historial) {
        throw new Error('Historial no encontrado');
    }
    return { message: 'Historial eliminado' };
}

module.exports = {
    crearHistorial,
    obtenerHistoriales,
    obtenerHistorialPorId,
    actualizarHistorial,
    eliminarHistorial,
};
