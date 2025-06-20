const auditoriaLogic = require('../logic/auditoriaLogic');
const { auditoriaSchemaValidation } = require('../validations/auditoriaValidations');

// Controlador para listar todas las auditorías
const listarAuditorias = async (req, res) => {
  try {
    const auditorias = await auditoriaLogic.obtenerAuditorias();
    if (auditorias.length === 0) {
      return res.status(204).send(); // 204 No Content
    }
    res.json(auditorias);
  } catch (err) {
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

// Controlador para crear una nueva auditoría
const crearAuditoria = async (req, res) => {
  const body = req.body;
  const { error, value } = auditoriaSchemaValidation.validate({
    // Agrega las propiedades que necesites validar
    idUsuario: body.idUsuario,
    fecha: body.fecha,
    accion: body.accion,
    detalles: body.detalles,
  });

  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  try {
    const nuevaAuditoria = await auditoriaLogic.crearAuditoria(value);
    res.status(201).json(nuevaAuditoria);
  } catch (err) {
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

// Controlador para obtener una auditoría por ID
const obtenerAuditoriaPorId = async (req, res) => {
  const { id } = req.params;
  try {
    const auditoria = await auditoriaLogic.obtenerAuditoriaPorId(id);
    res.json(auditoria);
  } catch (err) {
    if (err.message === 'Auditoría no encontrada') {
      return res.status(404).json({ error: err.message });
    }
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

// Controlador para actualizar una auditoría por ID
const actualizarAuditoria = async (req, res) => {
  const { id } = req.params;
  const body = req.body;
  const { error, value } = auditoriaSchemaValidation.validate({
    // Agrega las propiedades que necesites validar
    idUsuario: body.idUsuario,
    fecha: body.fecha,
    accion: body.accion,
    detalles: body.detalles,
  });

  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  try {
    const auditoriaActualizada = await auditoriaLogic.actualizarAuditoria(id, value);
    res.json(auditoriaActualizada);
  } catch (err) {
    if (err.message === 'Auditoría no encontrada') {
      return res.status(404).json({ error: err.message });
    }
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

// Controlador para eliminar una auditoría por ID
const eliminarAuditoria = async (req, res) => {
  const { id } = req.params;
  try {
    const resultado = await auditoriaLogic.eliminarAuditoria(id);
    res.json(resultado);
  } catch (err) {
    if (err.message === 'Auditoría no encontrada') {
      return res.status(404).json({ error: err.message });
    }
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

// Exportar los controladores
module.exports = {
  listarAuditorias,
  crearAuditoria,
  obtenerAuditoriaPorId,
  actualizarAuditoria,
  eliminarAuditoria,
};
