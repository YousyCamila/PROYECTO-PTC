const contratoService = require('../logic/contratoLogic');

const crearContrato = async (req, res) => {
  try {
    const contrato = await contratoService.crearContrato(req.body);
    res.status(201).json(contrato);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const listarContratos = async (req, res) => {
  try {
    const contratos = await contratoService.listarContratos();
    res.status(200).json(contratos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const buscarContratoPorId = async (req, res) => {
  try {
    const contrato = await contratoService.buscarContratoPorId(req.params.id);
    res.status(200).json(contrato);
  } catch (error) {
    console.error(error); // Log para ayudar a depurar
    res.status(404).json({ error: error.message });
  }
};

const desactivarContrato = async (req, res) => {
  try {
    const { motivo } = req.body; // Obtener motivo de desactivación del cuerpo de la solicitud
    const response = await contratoService.desactivarContrato(req.params.id, motivo);
    res.status(200).json(response);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

// Nuevo controlador para listar contratos por detective
const listarContratosPorDetective = async (req, res) => {
  try {
    const contratos = await contratoService.listarContratosPorDetective(req.params.id);
    res.status(200).json(contratos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const actualizarContrato = async (req, res) => {
  try {
    const contrato = await contratoService.actualizarContrato(req.params.id, req.body);
    res.status(200).json(contrato);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

module.exports = {
  crearContrato,
  listarContratos,
  buscarContratoPorId,
  desactivarContrato,
  listarContratosPorDetective,
  actualizarContrato
};
