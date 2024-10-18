const Joi = require('joi');

// Definición del esquema de validación para el formulario
const formularioSchemaValidation = Joi.object({
  nombre: Joi.string()
    .max(100)
    .required()
    .messages({
      'string.base': 'El nombre debe ser un texto.',
      'string.empty': 'El nombre no puede estar vacío.',
      'string.max': 'El nombre no puede tener más de 100 caracteres.',
      'any.required': 'El nombre es un campo requerido.'
    }),
  
  numeroCelular: Joi.string()
    .length(10)
    .pattern(/^[0-9]+$/)
    .required()
    .messages({
      'string.base': 'El número de celular debe ser un texto.',
      'string.empty': 'El número de celular no puede estar vacío.',
      'string.length': 'El número de celular debe tener exactamente 10 dígitos.',
      'string.pattern.base': 'El número de celular debe contener solo números.',
      'any.required': 'El número de celular es un campo requerido.'
    }),
  
  descripcion: Joi.string()
    .required()
    .messages({
      'string.base': 'La descripción debe ser un texto.',
      'string.empty': 'La descripción no puede estar vacía.',
      'any.required': 'La descripción es un campo requerido.'
    }),
  
  fechaEnvio: Joi.date()
    .default(() => new Date(), 'fecha de envío predeterminada')
    .required()
    .messages({
      'date.base': 'La fecha de envío debe ser una fecha válida.',
      'any.required': 'La fecha de envío es un campo requerido.'
    }),
  
  idCliente: Joi.string()
    .required()
    .messages({
      'string.base': 'El ID del cliente debe ser un texto.',
      'string.empty': 'El ID del cliente no puede estar vacío.',
      'any.required': 'El ID del cliente es un campo requerido.'
    }),
  
  correoCliente: Joi.string()
    .email()
    .required()
    .messages({
      'string.base': 'El correo electrónico debe ser un texto.',
      'string.empty': 'El correo electrónico no puede estar vacío.',
      'string.email': 'El correo electrónico debe tener un formato válido.',
      'any.required': 'El correo electrónico es un campo requerido.'
    }),
  
  respuesta: Joi.string()
    .optional() // El campo de respuesta es opcional
    .messages({
      'string.base': 'La respuesta debe ser un texto.',
      'string.empty': 'La respuesta no puede estar vacía.'
    }),
});

module.exports = {
  formularioSchemaValidation,
};
