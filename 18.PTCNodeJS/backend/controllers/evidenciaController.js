const evidenciaService = require('../logic/evidenciaLogic');
const { crearEvidenciaConArchivo } = require('../logic/evidenciaLogic');

// Crear evidencia
const crearEvidencia = async (req, res) => {
  try {
    // Llamar a la lógica de crear evidencia
    const nuevaEvidencia = await evidenciaService.crearEvidencia(req.body);

    // Retornar la respuesta exitosa
    return res.status(201).json({
      message: "Evidencia creada exitosamente",
      evidencia: nuevaEvidencia
    });
  } catch (error) {
    // Retornar un mensaje de error detallado
    return res.status(400).json({
      message: "Error al crear la evidencia",
      error: error.message
    });
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
    return res.status(404).json({ message: error.message });
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

// Subir evidencia
const subirEvidencia = async (req, res) => {
  try {
    const { fechaEvidencia, descripcion, idCasos, tipoEvidencia } = req.body;
    const archivo = req.file;  // Archivo subido

    // Llama a la función de lógica para crear la evidencia
    const evidencia = await crearEvidenciaConArchivo({ 
      fechaEvidencia, 
      descripcion, 
      idCasos, 
      tipoEvidencia, 
      archivo 
    });

    // Respuesta exitosa
    res.status(201).json({ mensaje: 'Evidencia creada con éxito', evidencia });
  } catch (error) {
    // Respuesta con error
    res.status(500).json({ error: error.message });
  }
};

// Obtener evidencias asociadas a un caso
// Obtener evidencias por caso
const obtenerEvidenciasPorCaso = async (req, res) => {
  try {
    const idCaso = req.params.idCaso; // Obtener el ID del caso desde los parámetros de la ruta
    const evidencias = await evidenciaService.obtenerEvidenciasPorCaso(idCaso);

    return res.status(200).json({
      message: 'Evidencias encontradas',
      evidencias
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message
    });
  }
};



module.exports = {
  crearEvidencia,
  listarEvidencias,
  buscarEvidenciaPorId,
  actualizarEvidencia,
  desactivarEvidencia,
  subirEvidencia,
  obtenerEvidenciasPorCaso // Nueva función agregada
};
