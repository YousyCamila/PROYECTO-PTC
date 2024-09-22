const registroCasoLogic = require('../logic/registroCasoLogic');
const { registroCasoSchemaValidation } = require('../validations/registroCasoValidations');

// Controlador para crear un nuevo registro de caso
const crearRegistroCaso = async (req, res) => {
    const body = req.body;
    const { error, value } = registroCasoSchemaValidation.validate(body);

    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }

    try {
        const nuevoRegistro = await registroCasoLogic.crearRegistroCaso(value);
        res.status(201).json(nuevoRegistro);
    } catch (err) {
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

// Controlador para obtener todos los registros de caso
const obtenerRegistrosCasos = async (req, res) => {
    try {
        const registros = await registroCasoLogic.obtenerRegistrosCasos();
        if (registros.length === 0) {
            return res.status(204).send(); // 204 No Content
        }
        res.json(registros);
    } catch (err) {
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

// Controlador para obtener un registro de caso por ID
const obtenerRegistroCasoPorId = async (req, res) => {
    const { id } = req.params;
    try {
        const registroCaso = await registroCasoLogic.obtenerRegistroCasoPorId(id);
        res.json(registroCaso);
    } catch (err) {
        if (err.message === 'Registro de caso no encontrado') {
            return res.status(404).json({ error: err.message });
        }
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

// Controlador para actualizar un registro de caso por ID
const actualizarRegistroCaso = async (req, res) => {
    const { id } = req.params;
    const body = req.body;
    const { error, value } = registroCasoSchemaValidation.validate(body);

    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }

    try {
        const registroActualizado = await registroCasoLogic.actualizarRegistroCaso(id, value);
        res.json(registroActualizado);
    } catch (err) {
        if (err.message === 'Registro de caso no encontrado') {
            return res.status(404).json({ error: err.message });
        }
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

// Controlador para eliminar un registro de caso por ID
const eliminarRegistroCaso = async (req, res) => {
    const { id } = req.params;
    try {
        const resultado = await registroCasoLogic.eliminarRegistroCaso(id);
        res.json(resultado);
    } catch (err) {
        if (err.message === 'Registro de caso no encontrado') {
            return res.status(404).json({ error: err.message });
        }
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

// Exportar los controladores
module.exports = {
    crearRegistroCaso,
    obtenerRegistrosCasos,
    obtenerRegistroCasoPorId,
    actualizarRegistroCaso,
    eliminarRegistroCaso,
};
