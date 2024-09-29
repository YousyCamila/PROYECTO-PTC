const registroCasoService = require('../logic/registroCasoLogic');

// Crear un nuevo registro de caso
const crearRegistroCaso = async (req, res) => {
  try {
    const registroCaso = await registroCasoService.crearRegistroCaso(req.body);
    res.status(201).json(registroCaso);
  } catch (error) {
    res.status(500).json({ message: 'Error al crear el registro de caso', error: error.message });
  }
};

// Listar todos los registros de caso
const listarRegistroCasos = async (req, res) => {
  try {
    const registrosCasos = await registroCasoService.listarRegistroCasos();
    res.status(200).json(registrosCasos);
  } catch (error) {
    res.status(500).json({ message: 'Error al listar los registros de caso', error });
  }
};

// Buscar registro de caso por ID
const buscarRegistroCasoPorId = async (req, res) => {
  try {
    const registroCaso = await registroCasoService.buscarRegistroCasoPorId(req.params.id);
    if (!registroCaso) return res.status(404).json({ message: 'Registro de caso no encontrado' });
    res.status(200).json(registroCaso);
  } catch (error) {
    res.status(500).json({ message: 'Error al buscar el registro de caso', error });
  }
};

// Actualizar un registro de caso
const actualizarRegistroCaso = async (req, res) => {
  try {
    const registroCasoActualizado = await registroCasoService.actualizarRegistroCaso(req.params.id, req.body);
    if (!registroCasoActualizado) return res.status(404).json({ message: 'Registro de caso no encontrado' });
    res.status(200).json(registroCasoActualizado);
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar el registro de caso', error });
  }
};

// Desactivar un registro de caso
const desactivarRegistroCaso = async (req, res) => {
  try {
    const registroCasoDesactivado = await registroCasoService.desactivarRegistroCaso(req.params.id);
    if (!registroCasoDesactivado) return res.status(404).json({ message: 'Registro de caso no encontrado' });
    res.status(200).json({ message: 'Registro de caso desactivado exitosamente', registroCaso: registroCasoDesactivado });
  } catch (error) {
    res.status(500).json({ message: 'Error al desactivar el registro de caso', error });
  }
};

// Finalizar un registro de caso
const finalizarRegistroCaso = async (req, res) => {
  try {
    const registroCasoFinalizado = await registroCasoService.finalizarRegistroCaso(req.params.id);
    if (!registroCasoFinalizado) return res.status(404).json({ message: 'Registro de caso no encontrado' });
    res.status(200).json({ message: 'Registro de caso finalizado exitosamente', registroCaso: registroCasoFinalizado });
  } catch (error) {
    res.status(500).json({ message: 'Error al finalizar el registro de caso', error });
  }
};

module.exports = {
  crearRegistroCaso,
  listarRegistroCasos,
  buscarRegistroCasoPorId,
  actualizarRegistroCaso,
  desactivarRegistroCaso,
  finalizarRegistroCaso,
};
