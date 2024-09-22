const Contrato = require('../models/contratoModels');

// Función para crear un nuevo contrato
async function crearContrato(body) {
    // Verifica si ya existe un contrato activo para el mismo cliente y detective
    const contratoExistente = await Contrato.findOne({ 
        idCliente: body.idCliente, 
        idDetective: body.idDetective, 
        estado: true 
    });

    if (contratoExistente) {
        throw new Error('Ya existe un contrato activo para el cliente y detective especificados.');
    }

    const contrato = new Contrato(body);
    return await contrato.save();
}

// Función para obtener todos los contratos
async function obtenerContratos() {
    return await Contrato.find().populate('idCliente idDetective');
}

// Función para obtener un contrato por ID
async function obtenerContratoPorId(id) {
    const contrato = await Contrato.findById(id).populate('idCliente idDetective');

    if (!contrato) {
        throw new Error('Contrato no encontrado');
    }
    return contrato;
}

// Función para actualizar un contrato por ID
async function actualizarContrato(id, body) {
    const contrato = await Contrato.findByIdAndUpdate(id, body, { new: true }).populate('idCliente idDetective');

    if (!contrato) {
        throw new Error('Contrato no encontrado');
    }
    return contrato;
}

// Función para eliminar un contrato por ID
async function eliminarContrato(id) {
    const contrato = await Contrato.findByIdAndDelete(id);

    if (!contrato) {
        throw new Error('Contrato no encontrado');
    }
    return { message: 'Contrato eliminado' };
}

module.exports = {
    crearContrato,
    obtenerContratos,
    obtenerContratoPorId,
    actualizarContrato,
    eliminarContrato,
};
