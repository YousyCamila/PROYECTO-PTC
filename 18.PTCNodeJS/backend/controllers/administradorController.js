// controllers/administradorController.js
const administradorService = require('../logic/administradorLogic');

const crearAdministrador = async (req, res) => {
  try {
    const nuevoAdministrador = await administradorService.crearAdministrador(req.body);
    res.status(201).json(nuevoAdministrador);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const listarAdministradores = async (req, res) => {
  try {
    const administradores = await administradorService.listarAdministradores();
    if (administradores.length === 0) {
      return res.status(404).json({ message: 'No hay administradores registrados actualmente.' });
    }
    res.status(200).json(administradores);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const buscarAdministradorPorCorreo = async (req, res) => {
  try {
    const administrador = await administradorService.buscarAdministradorPorCorreo(req.params.correo);
    res.status(200).json(administrador);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

const actualizarAdministrador = async (req, res) => {
  try {
    const administradorActualizado = await administradorService.actualizarAdministrador(req.params.id, req.body);
    res.status(200).json(administradorActualizado);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const desactivarAdministrador = async (req, res) => {
  try {
    await administradorService.desactivarAdministrador(req.params.id);
    res.status(200).json({ message: "Administrador desactivado correctamente" });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

module.exports = {
  crearAdministrador,
  listarAdministradores,
  buscarAdministradorPorCorreo,
  actualizarAdministrador,
  desactivarAdministrador // Cambiado aquí
};
