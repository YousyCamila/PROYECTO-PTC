const casosService = require('../logic/casoLogic');
const clienteService = require('../logic/clienteLogic'); // Importa el servicio de cliente para verificar su existencia
const mongoose = require('mongoose'); // Importa mongoose
const Cliente = require('../models/clienteModel');
const Detective = require('../models/detectiveModel');
const Caso = require('../models/casoModel');

// Crear un nuevo caso
const crearCaso = async (req, res) => {
  try {
    const caso = await casosService.crearCaso(req.body);
    res.status(201).json(caso);
  } catch (error) {
    res.status(500).json({ message: 'Error al crear el caso', error: error.message });
  }
};

/**
 * Controlador para obtener los casos por ID de cliente.
 * @param {Request} req - La solicitud HTTP.
 * @param {Response} res - La respuesta HTTP.
 */
const obtenerCasosPorClienteId = async (req, res) => {
  try {
    const idCliente = req.params.id.trim();
   
    
    const casos = await casosService.obtenerCasosPorClienteId(idCliente);
    
    if (casos.length === 0) {
      return res.status(404).json({ message: "No se encontraron casos para el cliente especificado." });
    }
    
    res.status(200).json(casos);
  } catch (error) {
    console.error("Error al obtener casos por ID de cliente:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

/**
 * Controlador para obtener casos, contratos y registros asociados al cliente por email.
 * @param {Request} req - Objeto de solicitud HTTP.
 * @param {Response} res - Objeto de respuesta HTTP.
 */
const obtenerCasosPorEmailCliente = async (req, res) => {
  const { email } = req.params;

  try {
    const data = await casosService.obtenerCasosPorEmailCliente(email);

    if (!data.casos.length) {
      return res.status(404).json({ message: 'No se encontraron casos para el cliente especificado.' });
    }

    res.status(200).json(data);
  } catch (error) {
    console.error(`Error al obtener casos por email: ${error.message}`);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

// Listar todos los casos
const listarCasos = async (req, res) => {
  try {
    const casos = await casosService.listarCasos();
    res.status(200).json(casos);
  } catch (error) {
    res.status(500).json({ message: 'Error al listar los casos', error });
  }
};

// Buscar caso por ID
const buscarCasoPorId = async (req, res) => {
  try {
    const caso = await casosService.buscarCasoPorId(req.params.id);
    if (!caso) return res.status(404).json({ message: 'Caso no encontrado' });
    res.status(200).json(caso);
  } catch (error) {
    res.status(500).json({ message: 'Error al buscar el caso', error });
  }
};

// Actualizar un caso
const actualizarCaso = async (req, res) => {
  try {
    const casoActualizado = await casosService.actualizarCaso(req.params.id, req.body);
    if (!casoActualizado) return res.status(404).json({ message: 'Caso no encontrado' });
    res.status(200).json(casoActualizado);
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar el caso', error });
  }
};

// Desactivar un caso
const desactivarCaso = async (req, res) => {
  try {
    const casoDesactivado = await casosService.desactivarCaso(req.params.id);
    if (!casoDesactivado) return res.status(404).json({ message: 'Caso no encontrado' });
    res.status(200).json({ message: 'Caso desactivado exitosamente', caso: casoDesactivado });
  } catch (error) {
    res.status(500).json({ message: 'Error al desactivar el caso', error });
  }
};

// Exportar los controladores
module.exports = {
  crearCaso,
  listarCasos,
  buscarCasoPorId,
  actualizarCaso,
  desactivarCaso,
  obtenerCasosPorClienteId,
  obtenerCasosPorEmailCliente
};