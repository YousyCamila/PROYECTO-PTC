// validations/formularioValidation.js
const Joi = require('@hapi/joi');
const mongoose = require('mongoose');

const formularioSchemaValidation = Joi.object({
  nombre: Joi.string().max(100).required().messages({
    'string.max': 'El nombre no debe exceder los 100 caracteres.',
    'any.required': 'El nombre es obligatorio.',
  }),
  numeroCelular: Joi.string()
    .pattern(/^[0-9]{10}$/)
    .required()
    .messages({
      'string.pattern.base': 'El número de celular debe tener 10 dígitos.',
      'any.required': 'El número de celular es obligatorio.',
    }),
  descripcion: Joi.string().required().messages({
    'any.required': 'La descripción es obligatoria.',
  }),
  idCliente: Joi.string()
    .custom((value, helpers) => {
      if (!mongoose.Types.ObjectId.isValid(value)) {
        return helpers.message('ID de cliente inválido.');
      }
      return value;
    })
    .required(),
});

module.exports = { formularioSchemaValidation };
