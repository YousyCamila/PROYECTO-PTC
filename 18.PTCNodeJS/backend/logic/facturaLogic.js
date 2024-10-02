// services/facturaService.js
const Factura = require('../models/facturaModel');
const Cliente = require('../models/clienteModel'); // Asegúrate de tener el modelo de Cliente importado

async function crearFactura(datos) {
    const factura = new Factura(datos);
    
    // Guardar la factura en la base de datos
    await factura.save();
  
    // Actualizar la factura en el cliente relacionado
    await Cliente.findByIdAndUpdate(
      factura.idCliente,
      {
        $push: { facturas: { estado: factura.estadoPago, total: factura.totalPagar } } // Agrega la nueva factura
      },
      { new: true }
    );
  
    return factura; // Retorna la factura creada
  }
// Otras funciones no cambiaron
async function listarFacturas() {
  const facturas = await Factura.find();
  if (facturas.length === 0) {
    throw new Error('No hay facturas registradas actualmente.');
  }
  return facturas;
}

async function buscarFacturaPorId(id) {
  const factura = await Factura.findById(id);
  if (!factura) {
    throw new Error(`No se encontró la factura con ID: ${id}`);
  }
  return factura;
}

async function actualizarFactura(id, datos) {
  const factura = await Factura.findById(id);
  if (!factura) {
    throw new Error('La factura que intenta actualizar no existe.');
  }
  Object.assign(factura, datos);
  return await factura.save();
}

async function desactivarFactura(id) {
  const factura = await Factura.findById(id);
  if (!factura) {
    throw new Error('La factura que intenta desactivar no existe.');
  }
  factura.estadoPago = 'Desactivada'; // Cambia el estado de pago
  return await factura.save();
}

module.exports = {
  crearFactura,
  listarFacturas,
  buscarFacturaPorId,
  actualizarFactura,
  desactivarFactura,
};
