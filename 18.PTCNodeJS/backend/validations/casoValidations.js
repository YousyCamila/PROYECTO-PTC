const Joi = require('@hapi/joi');
const mongoose = require('mongoose');

// Validaciones para el objeto Caso
const casoSchemaValidation = Joi.object({
  cadenaCustodia: Joi.string()
    .required()
    .messages({
      'string.base': 'La cadena de custodia debe ser un texto',
      'string.empty': 'La cadena de custodia no puede estar vacía',
      'any.required': 'La cadena de custodia es un campo requerido',
    }),

  investigacionExtorsion: Joi.string()
    .max(200)
    .messages({
      'string.base': 'La investigación de extorsión debe ser un texto',
      'string.max': 'La investigación de extorsión no debe exceder los 200 caracteres',
    }),

  estudiosSeguridad: Joi.string()
    .max(200)
    .messages({
      'string.base': 'Los estudios de seguridad deben ser un texto',
      'string.max': 'Los estudios de seguridad no deben exceder los 200 caracteres',
    }),

  investigacionInfidelidades: Joi.string()
    .max(200)
    .messages({
      'string.base': 'La investigación de infidelidades debe ser un texto',
      'string.max': 'La investigación de infidelidades no debe exceder los 200 caracteres',
    }),

  investigacionRobosEmpresariales: Joi.string()
    .max(200)
    .messages({
      'string.base': 'La investigación de robos empresariales debe ser un texto',
      'string.max': 'La investigación de robos empresariales no debe exceder los 200 caracteres',
    }),

  antecedentes: Joi.string()
    .max(200)
    .messages({
      'string.base': 'Los antecedentes deben ser un texto',
      'string.max': 'Los antecedentes no deben exceder los 200 caracteres',
    }),

  recuperacionVehiculos: Joi.string()
    .max(200)
    .messages({
      'string.base': 'La recuperación de vehículos debe ser un texto',
      'string.max': 'La recuperación de vehículos no debe exceder los 200 caracteres',
    }),

  idCliente: Joi.string()
    .custom((value, helpers) => {
      if (!mongoose.Types.ObjectId.isValid(value)) {
        return helpers.message('idCliente debe ser un ID válido de MongoDB');
      }
      return value;
    })
    .required()
    .messages({
      'string.base': 'idCliente debe ser un texto',
      'any.required': 'idCliente es un campo requerido',
    }),

  idDetective: Joi.string()
    .custom((value, helpers) => {
      if (value && !mongoose.Types.ObjectId.isValid(value)) {
        return helpers.message('idDetective debe ser un ID válido de MongoDB');
      }
      return value;
    })
    .messages({
      'string.base': 'idDetective debe ser un texto',
    }),

  evidencias: Joi.array()
    .items(Joi.string().custom((value, helpers) => {
      if (!mongoose.Types.ObjectId.isValid(value)) {
        return helpers.message('Cada ID en evidencias debe ser un ID válido de MongoDB');
      }
      return value;
    }))
    .messages({
      'array.base': 'evidencias debe ser un arreglo',
    }),

  registroCasos: Joi.array()
    .items(Joi.string().custom((value, helpers) => {
      if (!mongoose.Types.ObjectId.isValid(value)) {
        return helpers.message('Cada ID en registroCasos debe ser un ID válido de MongoDB');
      }
      return value;
    }))
    .messages({
      'array.base': 'registroCasos debe ser un arreglo',
    }),
});

// Exportar validaciones
module.exports = { casoSchemaValidation };
