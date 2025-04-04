const mongoose = require('mongoose');

const historialSchema = new mongoose.Schema({
  idCaso: { // Referencia al caso relacionado
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Caso',
    required: true
  },
  acciones: [ // Array que contiene todas las acciones registradas en el historial
    {
      accion: { // Tipo de acción realizada
        type: String,
        enum: [
          'Evidencia agregada', 'Evidencia eliminada', 'Reporte generado', 'Reporte modificado', 
          'Contrato creado', 'Contrato modificado', 'Contrato eliminado', 
          'Cambio de estado', 'Comentario agregado', 'Caso reasignado', 'Caso cerrado', 'Caso archivado'
        ],
        required: true
      },
      detalles: { // Descripción detallada de la acción
        type: String,
        required: true
      },
      documentoRelacionado: { // Referencia a evidencia, reporte o contrato si aplica
        type: mongoose.Schema.Types.ObjectId,
        refPath: 'tipoDocumento'
      },
      tipoDocumento: { // Tipo de documento relacionado
        type: String,
        enum: ['Evidence', 'Report', 'Contract'],
        default: null
      },
      usuario: { // Quién realizó la acción
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
      },
      fecha: { // Fecha exacta de la acción
        type: Date,
        default: Date.now
      }
    }
  ],
  estadoCaso: { // Estado actual del caso (se actualiza cada vez que cambia)
    type: String,
    enum: ['Abierto', 'En investigación', 'Cerrado', 'Archivado'],
    default: 'Abierto'
  },
  idCliente: { // Cliente asignado al caso
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Cliente',
    required: true
  },
  idDetective: { // Detective asignado al caso
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Detective',
    required: true
  },
  idContrato: { // Contrato principal relacionado con el caso
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Contrato',
    required: false
  }
}, 
{ timestamps: true });

const Historial = mongoose.models.Historial || mongoose.model('Historial', historialSchema);

module.exports = Historial;
