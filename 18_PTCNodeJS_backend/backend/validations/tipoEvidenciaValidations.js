const Joi = require('@hapi/joi');
const mongoose = require('mongoose');

// Validaciones para el objeto TipoEvidencia
const tipoEvidenciaSchemaValidation = Joi.object({
  tipoDocumento: Joi.string()
    .max(50)
    .required()
    .messages({
      'string.base': 'El tipo de documento debe ser un texto',
      'string.empty': 'El tipo de documento no puede estar vacío',
      'string.max': 'El tipo de documento no debe exceder los 50 caracteres',
      'any.required': 'El tipo de documento es un campo requerido',
    }),

  tipoFotografia: Joi.string()
    .max(50)
    .optional()
    .messages({
      'string.base': 'El tipo de fotografía debe ser un texto',
      'string.max': 'El tipo de fotografía no debe exceder los 50 caracteres',
    }),

  tipoVideo: Joi.string()
    .max(50)
    .optional()
    .messages({
      'string.base': 'El tipo de video debe ser un texto',
      'string.max': 'El tipo de video no debe exceder los 50 caracteres',
    }),

  tipoAudio: Joi.string()
    .max(50)
    .optional()
    .messages({
      'string.base': 'El tipo de audio debe ser un texto',
      'string.max': 'El tipo de audio no debe exceder los 50 caracteres',
    }),

  archivosDigitales: Joi.string()
    .max(50)
    .optional()
    .messages({
      'string.base': 'Los archivos digitales deben ser un texto',
      'string.max': 'Los archivos digitales no deben exceder los 50 caracteres',
    }),

  idEvidencia: Joi.string()
    .custom((value, helpers) => {
      if (!mongoose.Types.ObjectId.isValid(value)) {
        return helpers.message('idEvidencia debe ser un ID válido de MongoDB');
      }
      return value;
    })
    .required()
    .messages({
      'string.base': 'idEvidencia debe ser un texto',
      'any.required': 'idEvidencia es un campo requerido',
    }),
});

// Exportar validaciones
module.exports = { tipoEvidenciaSchemaValidation };
