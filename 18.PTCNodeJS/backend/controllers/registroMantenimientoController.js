const registroMantenimientoLogic = require('../logic/registroMantenimientoLogic');
const { registroMantenimientoSchemaValidation } = require('../validations/registroMantenimientoValidations');

// Controlador para crear un nuevo registro de mantenimiento
const crearRegistroMantenimiento = async (req, res) => {
    const body = req.body;
    const { error, value } = registroMantenimientoSchemaValidation.validate(body);

    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }

    try {
        const nuevoRegistro = await registroMantenimientoLogic.crearRegistroMantenimiento(value);
        res.status(201).json(nuevoRegistro);
    } catch (err) {
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

// Controlador para obtener todos los registros de mantenimiento
const obtenerRegistrosMantenimiento = async (req, res) => {
    try {
        const registros = await registroMantenimientoLogic.obtenerRegistrosMantenimiento();
        if (registros.length === 0) {
            return res.status(204).send(); // 204 No Content
        }
        res.json(registros);
    } catch (err) {
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

// Controlador para obtener un registro de mantenimiento por ID
const obtenerRegistroMantenimientoPorId = async (req, res) => {
    const { id } = req.params;
    try {
        const registroMantenimiento = await registroMantenimientoLogic.obtenerRegistroMantenimientoPorId(id);
        res.json(registroMantenimiento);
    } catch (err) {
        if (err.message === 'Registro de mantenimiento no encontrado') {
            return res.status(404).json({ error: err.message });
        }
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

// Controlador para actualizar un registro de mantenimiento por ID
const actualizarRegistroMantenimiento = async (req, res) => {
    const { id } = req.params;
    const body = req.body;
    const { error, value } = registroMantenimientoSchemaValidation.validate(body);

    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }

    try {
        const registroActualizado = await registroMantenimientoLogic.actualizarRegistroMantenimiento(id, value);
        res.json(registroActualizado);
    } catch (err) {
        if (err.message === 'Registro de mantenimiento no encontrado') {
            return res.status(404).json({ error: err.message });
        }
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

// Controlador para eliminar un registro de mantenimiento por ID
const eliminarRegistroMantenimiento = async (req, res) => {
    const { id } = req.params;
    try {
        const resultado = await registroMantenimientoLogic.eliminarRegistroMantenimiento(id);
        res.json(resultado);
    } catch (err) {
        if (err.message === 'Registro de mantenimiento no encontrado') {
            return res.status(404).json({ error: err.message });
        }
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

// Exportar los controladores
module.exports = {
    crearRegistroMantenimiento,
    obtenerRegistrosMantenimiento,
    obtenerRegistroMantenimientoPorId,
    actualizarRegistroMantenimiento,
    eliminarRegistroMantenimiento,
};
