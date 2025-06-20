const Joi = require('@hapi/joi');
const mongoose = require('mongoose');

// Validaciones para el objeto Contrato
const contratoSchemaValidation = Joi.object({
  descripcionServicio: Joi.string()
    .max(255)
    .required()
    .messages({
      'string.base': 'La descripción del servicio debe ser un texto',
      'string.empty': 'La descripción del servicio no puede estar vacía',
      'string.max': 'La descripción del servicio no debe exceder los 255 caracteres',
      'any.required': 'La descripción del servicio es un campo requerido',
    }),

  fechaInicio: Joi.date()
    .iso()
    .required()
    .messages({
      'date.base': 'La fecha de inicio debe ser una fecha válida',
      'date.iso': 'La fecha de inicio debe estar en formato ISO',
      'any.required': 'La fecha de inicio es un campo requerido',
    }),

  fechaCierre: Joi.date()
    .iso()
    .greater(Joi.ref('fechaInicio'))
    .required()
    .messages({
      'date.base': 'La fecha de cierre debe ser una fecha válida',
      'date.iso': 'La fecha de cierre debe estar en formato ISO',
      'any.required': 'La fecha de cierre es un campo requerido',
      'date.greater': 'La fecha de cierre debe ser posterior a la fecha de inicio',
    }),

  clausulas: Joi.string()
    .max(500)
    .messages({
      'string.base': 'Las cláusulas deben ser un texto',
      'string.max': 'Las cláusulas no deben exceder los 500 caracteres',
    }),

  tarifa: Joi.number()
    .precision(2)
    .required()
    .messages({
      'number.base': 'La tarifa debe ser un número',
      'number.precision': 'La tarifa debe tener como máximo 2 decimales',
      'any.required': 'La tarifa es un campo requerido',
    }),

  estado: Joi.boolean()
    .required()
    .messages({
      'boolean.base': 'El estado debe ser un valor booleano (true o false)',
      'any.required': 'El estado es un campo requerido',
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

  idDetective: Joi.string()
    .custom((value, helpers) => {
      if (value && !mongoose.Types.ObjectId.isValid(value)) {
        return helpers.message('idDetective debe ser un ID válido de MongoDB');
      }
      return value;
    })
    .messages({
      'string.base': 'idDetective debe ser un texto',
    }),
});

// Exportar validaciones
module.exports = { contratoSchemaValidation };

