const Joi = require('@hapi/joi');
const mongoose = require('mongoose');

// Validaciones para el objeto Administrador
const administradorSchemaValidation = Joi.object({
  especialidad: Joi.string()
    .max(100)
    .messages({
      'string.base': 'La especialidad debe ser un texto',
      'string.empty': 'La especialidad no puede estar vacía',
      'string.max': 'La especialidad no debe exceder los 100 caracteres',
    }),

  idPersona: Joi.string()
    .custom((value, helpers) => {
      if (!mongoose.Types.ObjectId.isValid(value)) {
        return helpers.message('idPersona debe ser un ID válido de MongoDB');
      }
      return value;
    })
    .required()
    .messages({
      'string.base': 'idPersona debe ser un texto',
      'any.required': 'idPersona es un campo requerido',
    }),

  registroMantenimientos: Joi.array()
    .items(Joi.string().custom((value, helpers) => {
      if (!mongoose.Types.ObjectId.isValid(value)) {
        return helpers.message('Cada ID en registroMantenimientos debe ser un ID válido de MongoDB');
      }
      return value;
    }))
    .messages({
      'array.base': 'registroMantenimientos debe ser un arreglo',
    })
});

// Exportar validaciones
module.exports = { administradorSchemaValidation };

