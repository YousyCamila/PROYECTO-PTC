const Joi = require('@hapi/joi');
const mongoose = require('mongoose');

// Validaciones para el objeto Usuario
const usuarioSchemaValidation = Joi.object({
  username: Joi.string()
    .max(50)
    .required()
    .messages({
      'string.base': 'El nombre de usuario debe ser un texto',
      'string.empty': 'El nombre de usuario no puede estar vacío',
      'string.max': 'El nombre de usuario no debe exceder los 50 caracteres',
      'any.required': 'El nombre de usuario es un campo requerido',
    }),

  email: Joi.string()
    .email()
    .max(100)
    .required()
    .messages({
      'string.base': 'El correo debe ser un texto',
      'string.empty': 'El correo no puede estar vacío',
      'string.email': 'El correo debe ser un correo electrónico válido',
      'string.max': 'El correo no debe exceder los 100 caracteres',
      'any.required': 'El correo es un campo requerido',
    }),

  telefono: Joi.string()
    .max(20)
    .required()
    .messages({
      'string.base': 'El teléfono debe ser un texto',
      'string.empty': 'El teléfono no puede estar vacío',
      'string.max': 'El teléfono no debe exceder los 20 caracteres',
      'any.required': 'El teléfono es un campo requerido',
    }),

  password: Joi.string()
    .max(255)
    .required()
    .messages({
      'string.base': 'La contraseña debe ser un texto',
      'string.empty': 'La contraseña no puede estar vacía',
      'string.max': 'La contraseña no debe exceder los 255 caracteres',
      'any.required': 'La contraseña es un campo requerido',
    }),

  rolId: Joi.string()
    .custom((value, helpers) => {
      if (!mongoose.Types.ObjectId.isValid(value)) {
        return helpers.message('rolId debe ser un ID válido de MongoDB');
      }
      return value;
    })
    .required()
    .messages({
      'string.base': 'rolId debe ser un texto',
      'any.required': 'rolId es un campo requerido',
    }),

  auditoria: Joi.array()
    .items(Joi.string().custom((value, helpers) => {
      if (!mongoose.Types.ObjectId.isValid(value)) {
        return helpers.message('Cada ID en auditoria debe ser un ID válido de MongoDB');
      }
      return value;
    }))
    .optional(),

  personas: Joi.array()
    .items(Joi.string().custom((value, helpers) => {
      if (!mongoose.Types.ObjectId.isValid(value)) {
        return helpers.message('Cada ID en personas debe ser un ID válido de MongoDB');
      }
      return value;
    }))
    .optional(),
});

// Exportar validaciones
module.exports = { usuarioSchemaValidation };

