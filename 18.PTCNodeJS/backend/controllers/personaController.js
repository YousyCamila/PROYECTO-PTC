const personaLogic = require('../logic/personaLogic');
const { personaSchemaValidation } = require('../validations/personaValidations');

// Controlador para listar todas las personas
const listarPersonas = async (req, res) => {
    try {
        const personas = await personaLogic.obtenerPersonas();
        if (personas.length === 0) {
            return res.status(204).send(); // 204 No Content
        }
        res.json(personas);
    } catch (err) {
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

// Controlador para crear una nueva persona
const crearPersona = async (req, res) => {
    const body = req.body;
    const { error, value } = personaSchemaValidation.validate({
        dni: body.dni,
        correo: body.correo,
        // Otras propiedades que necesites validar
    });

    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }

    try {
        const nuevaPersona = await personaLogic.crearPersona(value);
        res.status(201).json(nuevaPersona);
    } catch (err) {
        if (err.message === 'Ya existe una persona con el DNI especificado.') {
            return res.status(409).json({ error: err.message });
        }
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

// Controlador para obtener una persona por correo electrónico
const obtenerPersonaPorEmail = async (req, res) => {
    const { email } = req.params;
    try {
        const persona = await personaLogic.obtenerPersonaPorEmail(email);
        res.json(persona);
    } catch (err) {
        if (err.message === 'Persona no encontrada') {
            return res.status(404).json({ error: err.message });
        }
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

// Controlador para actualizar una persona por ID
const actualizarPersona = async (req, res) => {
    const { id } = req.params;
    const body = req.body;
    const { error, value } = personaSchemaValidation.validate({
        dni: body.dni,
        correo: body.correo,
        // Otras propiedades que necesites validar
    });

    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }

    try {
        const personaActualizada = await personaLogic.actualizarPersona(id, value);
        res.json(personaActualizada);
    } catch (err) {
        if (err.message === 'Persona no encontrada') {
            return res.status(404).json({ error: err.message });
        }
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

// Controlador para eliminar una persona por ID
const eliminarPersona = async (req, res) => {
    const { id } = req.params;
    try {
        const resultado = await personaLogic.eliminarPersona(id);
        res.json(resultado);
    } catch (err) {
        if (err.message === 'Persona no encontrada') {
            return res.status(404).json({ error: err.message });
        }
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

// Exportar los controladores
module.exports = {
    listarPersonas,
    crearPersona,
    obtenerPersonaPorEmail,
    actualizarPersona,
    eliminarPersona,
};
