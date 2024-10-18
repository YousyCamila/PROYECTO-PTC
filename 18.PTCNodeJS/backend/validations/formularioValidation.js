const Joi = require('@hapi/joi');
const mongoose = require('mongoose');

// Validaciones para el objeto Formulario
const formularioSchemaValidation = Joi.object({
  nombre: Joi.string()
    .max(100)
    .required()
    .messages({
      'string.max': 'El nombre no puede tener más de 100 caracteres.',
      'any.required': 'El nombre es un campo requerido.',
    }),

  numeroCelular: Joi.string()
    .length(10)
    .pattern(/^[0-9]+$/) // Asegurarse de que solo contenga números
    .required()
    .messages({
      'string.length': 'El número de celular debe tener exactamente 10 dígitos.',
      'string.pattern.base': 'El número de celular solo puede contener números.',
      'any.required': 'El número de celular es un campo requerido.',
    }),

  descripcion: Joi.string()
    .required()
    .messages({
      'any.required': 'La descripción es un campo requerido.',
    }),

  fechaEnvio: Joi.date()
    .default(Date.now) // Se establece la fecha actual por defecto
    .messages({
      'date.base': 'Fecha de envío no válida.',
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

  correo: Joi.string()
    .email()
    .required()
    .messages({
      'string.email': 'Por favor ingresa un correo electrónico válido.',
      'any.required': 'El correo es un campo requerido.',
    }),
});

module.exports = { formularioSchemaValidation };
