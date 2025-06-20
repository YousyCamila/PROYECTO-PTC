const rolLogic = require('../logic/rolLogic');
const { rolSchemaValidation } = require('../validations/rolValidations');

// Controlador para crear un nuevo rol
const crearRol = async (req, res) => {
    const body = req.body;
    const { error, value } = rolSchemaValidation.validate(body);

    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }

    try {
        const nuevoRol = await rolLogic.crearRol(value);
        res.status(201).json(nuevoRol);
    } catch (err) {
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

// Controlador para obtener todos los roles
const obtenerRoles = async (req, res) => {
    try {
        const roles = await rolLogic.obtenerRoles();
        if (roles.length === 0) {
            return res.status(204).send(); // 204 No Content
        }
        res.json(roles);
    } catch (err) {
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

// Controlador para obtener un rol por ID
const obtenerRolPorId = async (req, res) => {
    const { id } = req.params;
    try {
        const rol = await rolLogic.obtenerRolPorId(id);
        res.json(rol);
    } catch (err) {
        if (err.message === 'Rol no encontrado') {
            return res.status(404).json({ error: err.message });
        }
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

// Controlador para actualizar un rol por ID
const actualizarRol = async (req, res) => {
    const { id } = req.params;
    const body = req.body;
    const { error, value } = rolSchemaValidation.validate(body);

    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }

    try {
        const rolActualizado = await rolLogic.actualizarRol(id, value);
        res.json(rolActualizado);
    } catch (err) {
        if (err.message === 'Rol no encontrado') {
            return res.status(404).json({ error: err.message });
        }
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

// Controlador para eliminar un rol por ID
const eliminarRol = async (req, res) => {
    const { id } = req.params;
    try {
        const resultado = await rolLogic.eliminarRol(id);
        res.json(resultado);
    } catch (err) {
        if (err.message === 'Rol no encontrado') {
            return res.status(404).json({ error: err.message });
        }
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

// Exportar los controladores
module.exports = {
    crearRol,
    obtenerRoles,
    obtenerRolPorId,
    actualizarRol,
    eliminarRol,
};
