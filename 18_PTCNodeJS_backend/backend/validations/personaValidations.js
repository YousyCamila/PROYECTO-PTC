const Joi = require('@hapi/joi');


// Validaciones para el objeto Persona
const personaSchemaValidation = Joi.object({
  dni: Joi.string()
    .max(20)
    .required()
    .messages({
      'string.base': 'El DNI debe ser un texto',
      'string.max': 'El DNI no debe exceder los 20 caracteres',
      'any.required': 'El DNI es un campo requerido',
    }),

  nombres: Joi.string()
    .max(100)
    .required()
    .messages({
      'string.base': 'Los nombres deben ser un texto',
      'string.max': 'Los nombres no deben exceder los 100 caracteres',
      'any.required': 'Los nombres son un campo requerido',
    }),

  apellidos: Joi.string()
    .max(100)
    .required()
    .messages({
      'string.base': 'Los apellidos deben ser un texto',
      'string.max': 'Los apellidos no deben exceder los 100 caracteres',
      'any.required': 'Los apellidos son un campo requerido',
    }),

  correo: Joi.string()
    .email()
    .max(100)
    .required()
    .messages({
      'string.base': 'El correo debe ser un texto',
      'string.email': 'El correo debe ser un correo electrónico válido',
      'string.max': 'El correo no debe exceder los 100 caracteres',
      'any.required': 'El correo es un campo requerido',
    }),

  fechaNacimiento: Joi.date()
    .iso()
    .required()
    .messages({
      'date.base': 'La fecha de nacimiento debe ser una fecha válida',
      'date.iso': 'La fecha de nacimiento debe estar en formato ISO',
      'any.required': 'La fecha de nacimiento es un campo requerido',
    }),
});

// Exportar validaciones
module.exports = { personaSchemaValidation };

