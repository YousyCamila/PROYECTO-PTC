const administradorLogic = require('../logic/administradorLogic');
const { administradorSchemaValidation } = require('../validations/administradorValidations');
const { personaSchemaValidation } = require('../validations/personaValidations');

// Controlador para listar todos los administradores
const listarAdministradores = async (req, res) => {
    try {
        const administradores = await administradorLogic.obtenerAdministradores();
        if (administradores.length === 0) {
            return res.status(204).send(); // 204 No Content
        }
        res.json(administradores);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

// Controlador para crear un nuevo administrador
const crearAdministrador = async (req, res) => {
  const body = req.body;

  // Extraer datos de Persona
  const personaData = {
      dni: body.dni,
      nombres: body.nombres,
      apellidos: body.apellidos,
      correo: body.correo,
      fechaNacimiento: body.fechaNacimiento,
  };

  // Validar los datos de la persona
  const { error: personaError } = personaSchemaValidation.validate(personaData);
  if (personaError) {
      return res.status(400).json({ error: personaError.details[0].message });
  }

  try {
      const nuevoAdministrador = await administradorLogic.crearAdministrador(body);
      res.status(201).json(nuevoAdministrador);
  } catch (err) {
      if (err.message.includes('Ya existe una persona con ese DNI.')) {
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
        console.error(err);
        if (err.message === 'Administrador no encontrado') {
            return res.status(404).json({ error: err.message });
        }
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

// Controlador para actualizar un administrador por email
const actualizarAdministrador = async (req, res) => {
    const { email } = req.params;
    const body = req.body;

    // Aquí puedes validar los campos que necesitas actualizar
    const { error } = administradorSchemaValidation.validate(body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }

    try {
        const administradorActualizado = await administradorLogic.actualizarAdministrador(email, body);
        res.json(administradorActualizado);
    } catch (err) {
        console.error(err);
        if (err.message === 'Administrador no encontrado') {
            return res.status(404).json({ error: err.message });
        }
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

// Controlador para desactivar un administrador por email
const desactivarAdministrador = async (req, res) => {
    const { email } = req.params;
    try {
        const resultado = await administradorLogic.desactivarAdministrador(email);
        res.json(resultado);
    } catch (err) {
        console.error(err);
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
    desactivarAdministrador,
};
