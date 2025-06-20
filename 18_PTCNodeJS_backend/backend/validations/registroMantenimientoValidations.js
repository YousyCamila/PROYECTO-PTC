const Joi = require('@hapi/joi');
const mongoose = require('mongoose');

// Validaciones para el objeto RegistroMantenimiento
const registroMantenimientoSchemaValidation = Joi.object({
  descripcion: Joi.string()
    .required()
    .messages({
      'string.base': 'La descripción debe ser un texto',
      'string.empty': 'La descripción no puede estar vacía',
      'any.required': 'La descripción es un campo requerido',
    }),

  fechaInicio: Joi.date()
    .iso()
    .required()
    .messages({
      'date.base': 'La fecha de inicio debe ser una fecha válida',
      'date.iso': 'La fecha de inicio debe estar en formato ISO',
      'any.required': 'La fecha de inicio es un campo requerido',
    }),

  fechaFinal: Joi.date()
    .iso()
    .optional()
    .messages({
      'date.base': 'La fecha final debe ser una fecha válida',
      'date.iso': 'La fecha final debe estar en formato ISO',
    }),

  estado: Joi.boolean()
    .required()
    .messages({
      'boolean.base': 'El estado debe ser un valor booleano',
      'any.required': 'El estado es un campo requerido',
    }),

  idAdministrador: Joi.string()
    .custom((value, helpers) => {
      if (!mongoose.Types.ObjectId.isValid(value)) {
        return helpers.message('idAdministrador debe ser un ID válido de MongoDB');
      }
      return value;
    })
    .required()
    .messages({
      'string.base': 'idAdministrador debe ser un texto',
      'any.required': 'idAdministrador es un campo requerido',
    }),
});

// Exportar validaciones
module.exports = { registroMantenimientoSchemaValidation };
