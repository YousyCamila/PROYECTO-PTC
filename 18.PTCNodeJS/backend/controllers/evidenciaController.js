const evidenciaService = require('../logic/evidenciaLogic');

// Crear evidencia
const crearEvidencia = async (req, res) => {
  try {
    const nuevaEvidencia = await evidenciaService.crearEvidencia(req.body);
    return res.status(201).json({ message: "Evidencia creada exitosamente", evidencia: nuevaEvidencia });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

// Listar evidencias
const listarEvidencias = async (req, res) => {
  try {
    const evidencias = await evidenciaService.listarEvidencias();
    return res.status(200).json({ evidencias });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

// Buscar evidencia por ID
const buscarEvidenciaPorId = async (req, res) => {
  try {
    const evidencia = await evidenciaService.buscarEvidenciaPorId(req.params.id);
    return res.status(200).json({ evidencia });
  } catch (error) {
    return res.status(404).json({ message: error.message }); // Cambié el código a 404 para no encontrado
  }
};

// Actualizar evidencia
const actualizarEvidencia = async (req, res) => {
  try {
    const evidenciaActualizada = await evidenciaService.actualizarEvidencia(req.params.id, req.body);
    return res.status(200).json({ message: "Evidencia actualizada exitosamente", evidencia: evidenciaActualizada });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

// Desactivar evidencia
const desactivarEvidencia = async (req, res) => {
  try {
    const evidenciaDesactivada = await evidenciaService.desactivarEvidencia(req.params.id);
    return res.status(200).json({ message: "Evidencia desactivada exitosamente", evidencia: evidenciaDesactivada });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

module.exports = {
  crearEvidencia,
  listarEvidencias,
  buscarEvidenciaPorId,
  actualizarEvidencia,
  desactivarEvidencia
};
