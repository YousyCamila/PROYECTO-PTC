// controllers/detectiveController.js
const detectiveService = require('../logic/detectiveLogic');

const crearDetective = async (req, res) => {
  try {
    const nuevoDetective = await detectiveService.crearDetective(req.body);
    res.status(201).json(nuevoDetective);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const listarDetectives = async (req, res) => {
  try {
    const detectives = await detectiveService.listarDetectives();
    res.status(200).json(detectives);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

const buscarDetectivePorCorreo = async (req, res) => {
  try {
    const detective = await detectiveService.buscarDetectivePorCorreo(req.params.correo);
    res.status(200).json(detective);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

const actualizarDetective = async (req, res) => {
  try {
    const detectiveActualizado = await detectiveService.actualizarDetective(req.params.id, req.body);
    res.status(200).json(detectiveActualizado);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const eliminarDetective = async (req, res) => {
  try {
    await detectiveService.eliminarDetective(req.params.id);
    res.status(200).json({ message: "Detective desactivado correctamente" });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

module.exports = {
  crearDetective,
  listarDetectives,
  buscarDetectivePorCorreo,
  actualizarDetective,
  eliminarDetective
};
