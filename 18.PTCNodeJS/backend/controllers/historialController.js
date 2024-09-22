const historialLogic = require('../logic/historialLogic');
const { historialSchemaValidation } = require('../validations/historialValidations');

// Controlador para listar todos los historiales
const listarHistoriales = async (req, res) => {
  try {
    const historiales = await historialLogic.obtenerHistoriales();
    if (historiales.length === 0) {
      return res.status(204).send(); // 204 No Content
    }
    res.json(historiales);
  } catch (err) {
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

// Controlador para crear un nuevo historial
const crearHistorial = async (req, res) => {
  const body = req.body;
  const { error, value } = historialSchemaValidation.validate({
    idCliente: body.idCliente,
    // Otras propiedades del historial que necesites validar
  });

  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  try {
    const nuevoHistorial = await historialLogic.crearHistorial(value);
    res.status(201).json(nuevoHistorial);
  } catch (err) {
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

// Controlador para obtener un historial por ID
const obtenerHistorialPorId = async (req, res) => {
  const { id } = req.params;
  try {
    const historial = await historialLogic.obtenerHistorialPorId(id);
    res.json(historial);
  } catch (err) {
    if (err.message === 'Historial no encontrado') {
      return res.status(404).json({ error: err.message });
    }
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

// Controlador para actualizar un historial por ID
const actualizarHistorial = async (req, res) => {
  const { id } = req.params;
  const body = req.body;
  const { error, value } = historialSchemaValidation.validate({
    idCliente: body.idCliente,
    // Otras propiedades del historial que necesites validar
  });

  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  try {
    const historialActualizado = await historialLogic.actualizarHistorial(id, value);
    res.json(historialActualizado);
  } catch (err) {
    if (err.message === 'Historial no encontrado') {
      return res.status(404).json({ error: err.message });
    }
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

// Controlador para eliminar un historial por ID
const eliminarHistorial = async (req, res) => {
  const { id } = req.params;
  try {
    const resultado = await historialLogic.eliminarHistorial(id);
    res.json(resultado);
  } catch (err) {
    if (err.message === 'Historial no encontrado') {
      return res.status(404).json({ error: err.message });
    }
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

// Exportar los controladores
module.exports = {
  listarHistoriales,
  crearHistorial,
  obtenerHistorialPorId,
  actualizarHistorial,
  eliminarHistorial,
};
