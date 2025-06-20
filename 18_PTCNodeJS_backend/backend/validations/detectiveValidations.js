const Joi = require('@hapi/joi');
const mongoose = require('mongoose');

// Validaciones para el objeto Detective
const detectiveSchemaValidation = Joi.object({
  especialidad: Joi.string()
    .max(100)
    .messages({
      'string.base': 'La especialidad debe ser un texto',
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

  casos: Joi.array()
    .items(Joi.string().custom((value, helpers) => {
      if (!mongoose.Types.ObjectId.isValid(value)) {
        return helpers.message('Cada ID en casos debe ser un ID válido de MongoDB');
      }
      return value;
    }))
    .messages({
      'array.base': 'casos debe ser un arreglo',
    }),

  contratos: Joi.array()
    .items(Joi.string().custom((value, helpers) => {
      if (!mongoose.Types.ObjectId.isValid(value)) {
        return helpers.message('Cada ID en contratos debe ser un ID válido de MongoDB');
      }
      return value;
    }))
    .messages({
      'array.base': 'contratos debe ser un arreglo',
    }),
});

// Exportar validaciones
module.exports = { detectiveSchemaValidation };

