const Joi = require('joi');

const formularioSchemaValidation = Joi.object({
  nombre: Joi.string().max(100).required().messages({
    'string.base': 'El nombre debe ser un texto.',
    'string.empty': 'El nombre no puede estar vacío.',
    'string.max': 'El nombre no puede tener más de 100 caracteres.',
    'any.required': 'El nombre es un campo requerido.'
  }),
  numeroCelular: Joi.string().length(10).pattern(/^[0-9]+$/).required().messages({
    'string.base': 'El número de celular debe ser un texto.',
    'string.length': 'Debe tener exactamente 10 dígitos.',
    'string.pattern.base': 'Solo puede contener números.',
    'any.required': 'El número de celular es requerido.'
  }),
  descripcion: Joi.string().required().messages({
    'string.base': 'La descripción debe ser un texto.',
    'any.required': 'La descripción es requerida.'
  }),
  fechaEnvio: Joi.date().default(() => new Date()).required().messages({
    'date.base': 'Debe ser una fecha válida.',
    'any.required': 'La fecha es requerida.'
  }),
  idCliente: Joi.string().required().messages({
    'string.base': 'El ID del cliente debe ser un texto.',
    'any.required': 'El ID del cliente es requerido.'
  }),
  correoCliente: Joi.string().email().required().messages({
    'string.email': 'Debe tener un formato de email válido.',
    'any.required': 'El correo electrónico es requerido.'
  }),
  respuesta: Joi.string().optional().messages({
    'string.base': 'La respuesta debe ser un texto.'
  })
});

module.exports = { formularioSchemaValidation };
