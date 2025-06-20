const Joi = require('@hapi/joi');
const mongoose = require('mongoose');

// Validaciones para el objeto Cliente
const clienteSchemaValidation = Joi.object({
  direccion: Joi.string()
    .max(255)
    .messages({
      'string.base': 'La dirección debe ser un texto',
      'string.max': 'La dirección no debe exceder los 255 caracteres',
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

  facturas: Joi.array()
    .items(Joi.string().custom((value, helpers) => {
      if (!mongoose.Types.ObjectId.isValid(value)) {
        return helpers.message('Cada ID en facturas debe ser un ID válido de MongoDB');
      }
      return value;
    }))
    .messages({
      'array.base': 'facturas debe ser un arreglo',
    }),

  formularios: Joi.array()
    .items(Joi.string().custom((value, helpers) => {
      if (!mongoose.Types.ObjectId.isValid(value)) {
        return helpers.message('Cada ID en formularios debe ser un ID válido de MongoDB');
      }
      return value;
    }))
    .messages({
      'array.base': 'formularios debe ser un arreglo',
    }),

  historials: Joi.array()
    .items(Joi.string().custom((value, helpers) => {
      if (!mongoose.Types.ObjectId.isValid(value)) {
        return helpers.message('Cada ID en historials debe ser un ID válido de MongoDB');
      }
      return value;
    }))
    .messages({
      'array.base': 'historials debe ser un arreglo',
    }),
});

// Exportar validaciones
module.exports = { clienteSchemaValidation };

