const tipoEvidenciaLogic = require('../logic/tipoEvidenciaLogic');
const { tipoEvidenciaSchemaValidation } = require('../validations/tipoEvidenciaValidations');

// Controlador para crear un nuevo tipo de evidencia
const crearTipoEvidencia = async (req, res) => {
    const body = req.body;
    const { error, value } = tipoEvidenciaSchemaValidation.validate(body);

    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }

    try {
        const nuevoTipoEvidencia = await tipoEvidenciaLogic.crearTipoEvidencia(value);
        res.status(201).json(nuevoTipoEvidencia);
    } catch (err) {
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

// Controlador para obtener todos los tipos de evidencia
const obtenerTiposEvidencia = async (req, res) => {
    try {
        const tiposEvidencia = await tipoEvidenciaLogic.obtenerTiposEvidencia();
        if (tiposEvidencia.length === 0) {
            return res.status(204).send(); // 204 No Content
        }
        res.json(tiposEvidencia);
    } catch (err) {
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

// Controlador para obtener un tipo de evidencia por ID
const obtenerTipoEvidenciaPorId = async (req, res) => {
    const { id } = req.params;
    try {
        const tipoEvidencia = await tipoEvidenciaLogic.obtenerTipoEvidenciaPorId(id);
        res.json(tipoEvidencia);
    } catch (err) {
        if (err.message === 'Tipo de evidencia no encontrado') {
            return res.status(404).json({ error: err.message });
        }
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

// Controlador para actualizar un tipo de evidencia por ID
const actualizarTipoEvidencia = async (req, res) => {
    const { id } = req.params;
    const body = req.body;
    const { error, value } = tipoEvidenciaSchemaValidation.validate(body);

    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }

    try {
        const tipoEvidenciaActualizado = await tipoEvidenciaLogic.actualizarTipoEvidencia(id, value);
        res.json(tipoEvidenciaActualizado);
    } catch (err) {
        if (err.message === 'Tipo de evidencia no encontrado') {
            return res.status(404).json({ error: err.message });
        }
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

// Controlador para eliminar un tipo de evidencia por ID
const eliminarTipoEvidencia = async (req, res) => {
    const { id } = req.params;
    try {
        const resultado = await tipoEvidenciaLogic.eliminarTipoEvidencia(id);
        res.json(resultado);
    } catch (err) {
        if (err.message === 'Tipo de evidencia no encontrado') {
            return res.status(404).json({ error: err.message });
        }
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

// Exportar los controladores
module.exports = {
    crearTipoEvidencia,
    obtenerTiposEvidencia,
    obtenerTipoEvidenciaPorId,
    actualizarTipoEvidencia,
    eliminarTipoEvidencia,
};
