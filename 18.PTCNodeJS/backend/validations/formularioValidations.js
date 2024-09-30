const Joi = require('@hapi/joi');
const mongoose = require('mongoose');

// Validaciones para el objeto Formulario
const formularioSchemaValidation = Joi.object({
  nombre: Joi.string()
    .max(100)
    .required()
    .messages({
      'string.base': 'El nombre debe ser un texto',
      'string.max': 'El nombre no debe exceder los 100 caracteres',
      'any.required': 'El nombre es un campo requerido',
    }),

  numeroCelular: Joi.string()
    .max(15)
    .required()
    .messages({
      'string.base': 'El número celular debe ser un texto',
      'string.max': 'El número celular no debe exceder los 15 caracteres',
      'any.required': 'El número celular es un campo requerido',
    }),

  descripcion: Joi.string()
    .required()
    .messages({
      'string.base': 'La descripción debe ser un texto',
      'string.empty': 'La descripción no puede estar vacía',
      'any.required': 'La descripción es un campo requerido',
    }),

  fechaEnvio: Joi.date()
    .iso()
    .required()
    .messages({
      'date.base': 'La fecha de envío debe ser una fecha válida',
      'date.iso': 'La fecha de envío debe estar en formato ISO',
      'any.required': 'La fecha de envío es un campo requerido',
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
});

// Exportar validaciones
module.exports = { formularioSchemaValidation };
