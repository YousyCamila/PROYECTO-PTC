const Joi = require('@hapi/joi');
const mongoose = require('mongoose');

// Validaciones para el objeto Factura
const facturaSchemaValidation = Joi.object({
  fechaEmision: Joi.date()
    .iso()
    .required()
    .messages({
      'date.base': 'La fecha de emisión debe ser una fecha válida',
      'date.iso': 'La fecha de emisión debe estar en formato ISO',
      'any.required': 'La fecha de emisión es un campo requerido',
    }),

  estadoPago: Joi.string()
    .max(50)
    .required()
    .messages({
      'string.base': 'El estado de pago debe ser un texto',
      'string.max': 'El estado de pago no debe exceder los 50 caracteres',
      'any.required': 'El estado de pago es un campo requerido',
    }),

  descripcionServicio: Joi.string()
    .max(255)
    .required()
    .messages({
      'string.base': 'La descripción del servicio debe ser un texto',
      'string.max': 'La descripción del servicio no debe exceder los 255 caracteres',
      'any.required': 'La descripción del servicio es un campo requerido',
    }),

  totalPagar: Joi.number()
    .precision(2)
    .required()
    .messages({
      'number.base': 'El total a pagar debe ser un número',
      'number.precision': 'El total a pagar debe tener como máximo 2 decimales',
      'any.required': 'El total a pagar es un campo requerido',
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
module.exports = { facturaSchemaValidation };
