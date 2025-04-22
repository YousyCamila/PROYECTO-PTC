const evidenciaService = require('../logic/evidenciaLogic');
const { crearEvidenciaConArchivo } = require('../logic/evidenciaLogic');
const mongoose = require('mongoose');


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

    if (!evidencias || evidencias.length === 0) {
      return res.status(404).json({ message: 'No se encontraron evidencias.' });
    }

    res.status(200).json({
      message: 'Evidencias encontradas',
      evidencias,
    });
  } catch (error) {
    console.error('Error al listar las evidencias:', error);
    res.status(500).json({ error: 'Error al obtener las evidencias' });
  }
};

// Buscar evidencia por ID
const buscarEvidenciaPorId = async (req, res) => {
  const { id } = req.params;

  try {
    // Llamar a la capa de servicio para buscar la evidencia
    const evidencia = await evidenciaService.obtenerEvidenciaPorId(id);

    if (!evidencia) {
      return res.status(404).json({ message: `No se encontró una evidencia con el ID: ${id}` });
    }

    res.status(200).json({
      message: 'Evidencia encontrada',
      evidencia,
    });
  } catch (error) {
    console.error('Error al buscar la evidencia:', error);

    if (error.status) {
      return res.status(error.status).json({ error: error.message });
    }

    res.status(500).json({ error: 'Error al obtener la evidencia' });
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
  const { fechaEvidencia, descripcion, idCasos, tipoEvidencia } = req.body;

  try {
    const evidencia = await crearEvidenciaConArchivo(
      { fechaEvidencia, descripcion, idCasos, tipoEvidencia },
      req.file // Archivo subido por multer
    );

    res.status(201).json({
      message: 'Evidencia creada con éxito',
      evidencia,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

const obtenerEvidenciasPorCaso = async (req, res) => {
  const { idCaso } = req.params;

  try {
    const evidencias = await evidenciaService.obtenerEvidenciasPorCaso(idCaso);

    if (!evidencias || evidencias.length === 0) {
      return res.status(404).json({ message: `No se encontraron evidencias para el caso con ID: ${idCaso}` });
    }

    res.status(200).json({
      message: 'Evidencias encontradas',
      evidencias,
    });
  } catch (error) {
    console.error('Error al obtener las evidencias:', error);

    if (error.status) {
      return res.status(error.status).json({ error: error.message });
    }

    res.status(500).json({ error: 'Error al obtener las evidencias' });
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
