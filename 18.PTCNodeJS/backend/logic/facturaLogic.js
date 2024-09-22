const Factura = require('../models/facturaModel');
const Cliente = require('../models/clienteModel'); // Asegúrate de importar el modelo de Cliente si es necesario

// Función para crear una nueva factura
async function crearFactura(body) {
    // Verificar si ya existe una factura para el mismo cliente con la misma fecha de emisión
    const facturaExistente = await Factura.findOne({ 
        fechaEmision: body.fechaEmision, 
        idCliente: body.idCliente 
    });

    if (facturaExistente) {
        throw new Error('Ya existe una factura para el cliente en la fecha de emisión especificada.');
    }

    const factura = new Factura(body);
    return await factura.save();
}

// Función para obtener todas las facturas
async function obtenerFacturas() {
    return await Factura.find().populate('idCliente');
}

// Función para obtener una factura por ID
async function obtenerFacturaPorId(id) {
    const factura = await Factura.findById(id).populate('idCliente');

    if (!factura) {
        throw new Error('Factura no encontrada');
    }
    return factura;
}

// Función para actualizar una factura por ID
async function actualizarFactura(id, body) {
    const factura = await Factura.findByIdAndUpdate(id, body, { new: true }).populate('idCliente');

    if (!factura) {
        throw new Error('Factura no encontrada');
    }
    return factura;
}

// Función para eliminar una factura por ID
async function eliminarFactura(id) {
    const factura = await Factura.findByIdAndDelete(id);

    if (!factura) {
        throw new Error('Factura no encontrada');
    }
    return { message: 'Factura eliminada' };
}

module.exports = {
    crearFactura,
    obtenerFacturas,
    obtenerFacturaPorId,
    actualizarFactura,
    eliminarFactura,
};
