const Joi = require('@hapi/joi');
const mongoose = require('mongoose');

// Validaciones para el objeto Caso
const casoSchemaValidation = Joi.object({
  nombreCaso: Joi.string()
    .valid(
      'cadenaCustodia',
      'investigacionExtorsion',
      'estudiosSeguridad',
      'investigacionInfidelidades',
      'investigacionRobosEmpresariales',
      'antecedentes',
      'recuperacionVehiculos'
    )
    .required()
    .messages({
      'any.only': 'nombreCaso debe ser uno de los siguientes valores: cadenaCustodia, investigacionExtorsion, estudiosSeguridad, investigacionInfidelidades, investigacionRobosEmpresariales, antecedentes, recuperacionVehiculos',
      'any.required': 'nombreCaso es un campo requerido',
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

module.exports = { casoSchemaValidation };
