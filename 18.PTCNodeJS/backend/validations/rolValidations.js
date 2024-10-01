const Joi = require('@hapi/joi');
const mongoose = require('mongoose');

// Validaciones para el objeto Rol
const roleSchemaValidation = Joi.object({
  nombre: Joi.string()
    .max(50)
    .required()
    .messages({
      'string.base': 'El nombre debe ser un texto',
      'string.empty': 'El nombre no puede estar vacío',
      'string.max': 'El nombre no debe exceder los 50 caracteres',
      'any.required': 'El nombre es un campo requerido',
    }),

  estado: Joi.boolean()
    .required()
    .messages({
      'boolean.base': 'El estado debe ser un valor booleano',
      'any.required': 'El estado es un campo requerido',
    }),

  usuarios: Joi.array()
    .items(Joi.string().custom((value, helpers) => {
      if (!mongoose.Types.ObjectId.isValid(value)) {
        return helpers.message('Cada ID de usuario debe ser un ID válido de MongoDB');
      }
      return value;
    }))
    .optional()
    .messages({
      'array.base': 'Usuarios debe ser un arreglo',
    }),
});

// Exportar validaciones
module.exports = { roleSchemaValidation };

