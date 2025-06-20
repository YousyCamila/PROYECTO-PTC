const Joi = require('@hapi/joi');
const mongoose = require('mongoose');

// Validaciones para el objeto RegistroCaso
const registroCasoSchemaValidation = Joi.object({
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

  fechaFinalizacion: Joi.date()
    .iso()
    .optional()
    .messages({
      'date.base': 'La fecha de finalización debe ser una fecha válida',
      'date.iso': 'La fecha de finalización debe estar en formato ISO',
    }),

  estadoRegistro: Joi.string()
    .max(50)
    .required()
    .messages({
      'string.base': 'El estado de registro debe ser un texto',
      'string.max': 'El estado de registro no debe exceder los 50 caracteres',
      'any.required': 'El estado de registro es un campo requerido',
    }),

  seguimientoPorcentaje: Joi.number()
    .min(0)
    .max(100)
    .optional()
    .messages({
      'number.base': 'El porcentaje de seguimiento debe ser un número',
      'number.min': 'El porcentaje de seguimiento no puede ser menor que 0',
      'number.max': 'El porcentaje de seguimiento no puede exceder 100',
    }),

  idCasos: Joi.string()
    .custom((value, helpers) => {
      if (!mongoose.Types.ObjectId.isValid(value)) {
        return helpers.message('idCasos debe ser un ID válido de MongoDB');
      }
      return value;
    })
    .required()
    .messages({
      'string.base': 'idCasos debe ser un texto',
      'any.required': 'idCasos es un campo requerido',
    }),
});

// Exportar validaciones
module.exports = { registroCasoSchemaValidation };
