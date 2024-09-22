const facturaLogic = require('../logic/facturaLogic');
const { facturaSchemaValidation } = require('../validations/facturaValidations');

// Controlador para listar todas las facturas
const listarFacturas = async (req, res) => {
  try {
    const facturas = await facturaLogic.obtenerFacturas();
    if (facturas.length === 0) {
      return res.status(204).send(); // 204 No Content
    }
    res.json(facturas);
  } catch (err) {
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

// Controlador para crear una nueva factura
const crearFactura = async (req, res) => {
  const body = req.body;
  const { error, value } = facturaSchemaValidation.validate({
    fechaEmision: body.fechaEmision,
    idCliente: body.idCliente,
    // Otras propiedades de la factura que necesites validar
  });

  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  try {
    const nuevaFactura = await facturaLogic.crearFactura(value);
    res.status(201).json(nuevaFactura);
  } catch (err) {
    if (err.message === 'Ya existe una factura para el cliente en la fecha de emisión especificada.') {
      return res.status(409).json({ error: err.message });
    }
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

// Controlador para obtener una factura por ID
const obtenerFacturaPorId = async (req, res) => {
  const { id } = req.params;
  try {
    const factura = await facturaLogic.obtenerFacturaPorId(id);
    res.json(factura);
  } catch (err) {
    if (err.message === 'Factura no encontrada') {
      return res.status(404).json({ error: err.message });
    }
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

// Controlador para actualizar una factura por ID
const actualizarFactura = async (req, res) => {
  const { id } = req.params;
  const body = req.body;
  const { error, value } = facturaSchemaValidation.validate({
    fechaEmision: body.fechaEmision,
    idCliente: body.idCliente,
    // Otras propiedades de la factura que necesites validar
  });

  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  try {
    const facturaActualizada = await facturaLogic.actualizarFactura(id, value);
    res.json(facturaActualizada);
  } catch (err) {
    if (err.message === 'Factura no encontrada') {
      return res.status(404).json({ error: err.message });
    }
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

// Controlador para eliminar una factura por ID
const eliminarFactura = async (req, res) => {
  const { id } = req.params;
  try {
    const resultado = await facturaLogic.eliminarFactura(id);
    res.json(resultado);
  } catch (err) {
    if (err.message === 'Factura no encontrada') {
      return res.status(404).json({ error: err.message });
    }
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

// Exportar los controladores
module.exports = {
  listarFacturas,
  crearFactura,
  obtenerFacturaPorId,
  actualizarFactura,
  eliminarFactura,
};
