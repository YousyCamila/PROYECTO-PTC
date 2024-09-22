const evidenciaLogic = require('../logic/evidenciaLogic');
const { evidenciaSchemaValidation } = require('../validations/evidenciaValidations');

// Controlador para listar todas las evidencias
const listarEvidencias = async (req, res) => {
  try {
    const evidencias = await evidenciaLogic.obtenerEvidencias();
    if (evidencias.length === 0) {
      return res.status(204).send(); // 204 No Content
    }
    res.json(evidencias);
  } catch (err) {
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

// Controlador para crear una nueva evidencia
const crearEvidencia = async (req, res) => {
  const body = req.body;
  const { error, value } = evidenciaSchemaValidation.validate({
    idCasos: body.idCasos,
    descripcion: body.descripcion,
    fechaEvidencia: body.fechaEvidencia,
    // Otras propiedades de la evidencia que necesites validar
  });

  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  try {
    const nuevaEvidencia = await evidenciaLogic.crearEvidencia(value);
    res.status(201).json(nuevaEvidencia);
  } catch (err) {
    if (err.message === 'Ya existe una evidencia con la misma descripción y fecha para el caso especificado.') {
      return res.status(409).json({ error: err.message });
    }
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

// Controlador para obtener una evidencia por ID
const obtenerEvidenciaPorId = async (req, res) => {
  const { id } = req.params;
  try {
    const evidencia = await evidenciaLogic.obtenerEvidenciaPorId(id);
    res.json(evidencia);
  } catch (err) {
    if (err.message === 'Evidencia no encontrada') {
      return res.status(404).json({ error: err.message });
    }
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

// Controlador para actualizar una evidencia por ID
const actualizarEvidencia = async (req, res) => {
  const { id } = req.params;
  const body = req.body;
  const { error, value } = evidenciaSchemaValidation.validate({
    idCasos: body.idCasos,
    descripcion: body.descripcion,
    fechaEvidencia: body.fechaEvidencia,
    // Otras propiedades de la evidencia que necesites validar
  });

  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  try {
    const evidenciaActualizada = await evidenciaLogic.actualizarEvidencia(id, value);
    res.json(evidenciaActualizada);
  } catch (err) {
    if (err.message === 'Evidencia no encontrada') {
      return res.status(404).json({ error: err.message });
    }
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

// Controlador para eliminar una evidencia por ID
const eliminarEvidencia = async (req, res) => {
  const { id } = req.params;
  try {
    const resultado = await evidenciaLogic.eliminarEvidencia(id);
    res.json(resultado);
  } catch (err) {
    if (err.message === 'Evidencia no encontrada') {
      return res.status(404).json({ error: err.message });
    }
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

// Exportar los controladores
module.exports = {
  listarEvidencias,
  crearEvidencia,
  obtenerEvidenciaPorId,
  actualizarEvidencia,
  eliminarEvidencia,
};
