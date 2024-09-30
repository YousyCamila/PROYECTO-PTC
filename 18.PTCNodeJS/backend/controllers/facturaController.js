// controllers/facturaController.js
const facturaService = require('../logic/facturaLogic');

const crearFactura = async (req, res) => {
  try {
    const nuevaFactura = await facturaService.crearFactura(req.body);
    res.status(201).json({
      mensaje: 'Factura creada exitosamente',
      factura: nuevaFactura
    });
  } catch (error) {
    res.status(400).json({ mensaje: error.message });
  }
};

const listarFacturas = async (req, res) => {
  try {
    const facturas = await facturaService.listarFacturas();
    res.status(200).json(facturas);
  } catch (error) {
    res.status(400).json({ mensaje: error.message });
  }
};

const buscarFacturaPorId = async (req, res) => {
  const { id } = req.params;
  try {
    const factura = await facturaService.buscarFacturaPorId(id);
    res.status(200).json(factura);
  } catch (error) {
    res.status(404).json({ mensaje: error.message });
  }
};

const actualizarFactura = async (req, res) => {
  const { id } = req.params;
  try {
    const facturaActualizada = await facturaService.actualizarFactura(id, req.body);
    res.status(200).json({
      mensaje: 'Factura actualizada exitosamente.',
      factura: facturaActualizada,
    });
  } catch (error) {
    res.status(400).json({ mensaje: error.message });
  }
};

const desactivarFactura = async (req, res) => {
  const { id } = req.params;
  try {
    const facturaDesactivada = await facturaService.desactivarFactura(id);
    res.status(200).json({
      mensaje: 'Factura desactivada exitosamente.',
      factura: facturaDesactivada,
    });
  } catch (error) {
    res.status(400).json({ mensaje: error.message });
  }
};

module.exports = {
  crearFactura,
  listarFacturas,
  buscarFacturaPorId,
  actualizarFactura,
  desactivarFactura,
};
