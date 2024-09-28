const Joi = require('@hapi/joi');
const { personaSchemaValidation } = require('./personaValidations');

// Validaciones para el objeto Administrador
const administradorSchemaValidation = Joi.object({
    ...personaSchemaValidation.describe().keys, // Importar validaciones de Persona
    especialidad: Joi.string().max(100).messages({
        'string.base': 'La especialidad debe ser un texto',
        'string.max': 'La especialidad no debe exceder los 100 caracteres',
    }),
    registroMantenimientos: Joi.array().items(Joi.string().custom((value, helpers) => {
        if (!mongoose.Types.ObjectId.isValid(value)) {
            return helpers.message('Cada ID en registroMantenimientos debe ser un ID válido de MongoDB');
        }
        return value;
    })).messages({
        'array.base': 'registroMantenimientos debe ser un arreglo',
    })
});

// Exportar validaciones
module.exports = { administradorSchemaValidation };
