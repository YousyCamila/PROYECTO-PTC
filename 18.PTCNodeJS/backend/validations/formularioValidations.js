const Joi = require('@hapi/joi');
const mongoose = require('mongoose');

// Validaciones para el objeto Formulario
const formularioSchemaValidation = Joi.object({
  nombre: Joi.string()
    .max(100)
    .required()
    .messages({
      'string.base': 'nombre debe ser un texto',
      'string.max': 'nombre no puede tener más de 100 caracteres',
      'any.required': 'nombre es un campo requerido',
    }),

  numeroCelular: Joi.string()
    .max(10)
    .required()
    .messages({
      'string.base': 'numeroCelular debe ser un texto',
      'string.max': 'numeroCelular no puede tener más de 10 caracteres',
      'any.required': 'numeroCelular es un campo requerido',
    }),

  descripcion: Joi.string()
    .required()
    .messages({
      'string.base': 'descripcion debe ser un texto',
      'any.required': 'descripcion es un campo requerido',
    }),

  fechaEnvio: Joi.date()
    .required()
    .messages({
      'date.base': 'fechaEnvio debe ser una fecha',
      'any.required': 'fechaEnvio es un campo requerido',
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

  correoCliente: Joi.string()
    .email()
    .required()
    .messages({
      'string.base': 'correoCliente debe ser un texto',
      'string.email': 'correoCliente debe ser un correo electrónico válido',
      'any.required': 'correoCliente es un campo requerido',
    }),
});

module.exports = { formularioSchemaValidation };
