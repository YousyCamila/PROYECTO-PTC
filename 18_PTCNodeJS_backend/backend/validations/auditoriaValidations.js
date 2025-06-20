const Joi = require('@hapi/joi');
const mongoose = require('mongoose');

// Validaciones para el objeto Auditoria
const auditoriaSchemaValidation = Joi.object({
  fechaActividad: Joi.date()
    .iso()
    .required()
    .messages({
      'date.base': 'La fecha de actividad debe ser una fecha válida',
      'date.iso': 'La fecha de actividad debe estar en formato ISO',
      'any.required': 'La fecha de actividad es un campo requerido',
    }),

  descripcionActividad: Joi.string()
    .min(5)
    .max(500)
    .required()
    .messages({
      'string.base': 'La descripción de la actividad debe ser un texto',
      'string.empty': 'La descripción de la actividad no puede estar vacía',
      'string.min': 'La descripción de la actividad debe tener al menos 5 caracteres',
      'string.max': 'La descripción de la actividad no debe exceder los 500 caracteres',
      'any.required': 'La descripción de la actividad es un campo requerido',
    }),

  estado: Joi.boolean()
    .required()
    .messages({
      'boolean.base': 'El estado debe ser un valor booleano (true o false)',
      'any.required': 'El estado es un campo requerido',
    }),

  horaActividad: Joi.date()
    .iso()
    .required()
    .messages({
      'date.base': 'La hora de actividad debe ser una fecha válida',
      'date.iso': 'La hora de actividad debe estar en formato ISO',
      'any.required': 'La hora de actividad es un campo requerido',
    }),

  detallesAdicionales: Joi.string()
    .max(200)
    .messages({
      'string.base': 'Los detalles adicionales deben ser un texto',
      'string.max': 'Los detalles adicionales no deben exceder los 200 caracteres',
    }),

  idUsuario: Joi.string()
    .custom((value, helpers) => {
      if (!mongoose.Types.ObjectId.isValid(value)) {
        return helpers.message('idUsuario debe ser un ID válido de MongoDB');
      }
      return value;
    })
    .required()
    .messages({
      'string.base': 'idUsuario debe ser un texto',
      'any.required': 'idUsuario es un campo requerido',
    }),
});

// Exportar validaciones
module.exports = { auditoriaSchemaValidation };
