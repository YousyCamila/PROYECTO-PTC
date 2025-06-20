const Joi = require('@hapi/joi');
const mongoose = require('mongoose');

// Validaciones para el objeto Evidencia
const evidenciaSchemaValidation = Joi.object({
  fechaEvidencia: Joi.date()
    .iso()
    .required()
    .messages({
      'date.base': 'La fecha de evidencia debe ser una fecha válida',
      'date.iso': 'La fecha de evidencia debe estar en formato ISO',
      'any.required': 'La fecha de evidencia es un campo requerido',
    }),

  descripcion: Joi.string()
    .required()
    .messages({
      'string.base': 'La descripción debe ser un texto',
      'string.empty': 'La descripción no puede estar vacía',
      'any.required': 'La descripción es un campo requerido',
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

  tipoEvidencia: Joi.array()
    .items(Joi.string().custom((value, helpers) => {
      if (!mongoose.Types.ObjectId.isValid(value)) {
        return helpers.message('Cada ID en tipoEvidencia debe ser un ID válido de MongoDB');
      }
      return value;
    }))
    .messages({
      'array.base': 'tipoEvidencia debe ser un arreglo',
    }),
});

// Exportar validaciones
module.exports = { evidenciaSchemaValidation };

