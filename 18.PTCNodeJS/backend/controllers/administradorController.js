const administradorLogic = require('../logic/administradorLogic');
const { administradorSchemaValidation } = require('../validations/administradorValidations');

// Controlador para listar todos los administradores
const listarAdministradores = async (req, res) => {
  try {
    const administradores = await administradorLogic.obtenerAdministradores();
    if (administradores.length === 0) {
      return res.status(204).send(); // 204 No Content
    }
    res.json(administradores);
  } catch (err) {
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

// Controlador para crear un nuevo administrador
const crearAdministrador = async (req, res) => {
  const body = req.body;
  const { error, value } = administradorSchemaValidation.validate({
    idPersona: body.idPersona,
    // Agrega otras propiedades que necesites validar
  });

  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  try {
    const nuevoAdministrador = await administradorLogic.crearAdministrador(value);
    res.status(201).json(nuevoAdministrador);
  } catch (err) {
    if (err.message === 'Ya existe un administrador con la persona especificada.') {
      return res.status(409).json({ error: err.message });
    }
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

// Controlador para obtener un administrador por email
const obtenerAdministradorPorEmail = async (req, res) => {
  const { email } = req.params;
  try {
    const administrador = await administradorLogic.obtenerAdministradorPorEmail(email);
    res.json(administrador);
  } catch (err) {
    if (err.message === 'No se encontró ninguna persona con el email especificado') {
      return res.status(404).json({ error: err.message });
    }
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

// Controlador para actualizar un administrador por ID
const actualizarAdministrador = async (req, res) => {
  const { id } = req.params;
  const body = req.body;
  const { error, value } = administradorSchemaValidation.validate({
    idPersona: body.idPersona,
    // Agrega otras propiedades que necesites validar
  });

  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  try {
    const administradorActualizado = await administradorLogic.actualizarAdministrador(id, value);
    res.json(administradorActualizado);
  } catch (err) {
    if (err.message === 'Administrador no encontrado') {
      return res.status(404).json({ error: err.message });
    }
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

// Controlador para eliminar un administrador por ID
const eliminarAdministrador = async (req, res) => {
  const { id } = req.params;
  try {
    const resultado = await administradorLogic.eliminarAdministrador(id);
    res.json(resultado);
  } catch (err) {
    if (err.message === 'Administrador no encontrado') {
      return res.status(404).json({ error: err.message });
    }
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

// Exportar los controladores
module.exports = {
  listarAdministradores,
  crearAdministrador,
  obtenerAdministradorPorEmail,
  actualizarAdministrador,
  eliminarAdministrador,
};




