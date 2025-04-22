const mongoose = require('mongoose');

const historialCasoSchema = new mongoose.Schema({
  idCaso: { 
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Caso',
    required: true
  },
  nombreCliente: {
    type: String,
    required: false
  },
  fechaApertura: {
    type: Date,
    required: true,
    default: Date.now
  },
  descripcionObjetivo: {
    type: String,
    required: false
  },
  informacionInicial: {
    type: String,
    required: false
  },
  contextoCaso: {
    type: String,
    required: false
  },
  desarrolloInvestigacion: {
    type: [
      new mongoose.Schema({
        fechaHora: { type: Date, default: Date.now },
        actividad: { type: String, required: true },
        observaciones: { type: String, required: true },
        personasContactadas: { type: String },
        metodosUtilizados: { type: String }
      }, { _id: false })
    ],
    default: []
  },
  pruebasEvidencias: {
    type: [
      new mongoose.Schema({
        pruebaId: { type: mongoose.Schema.Types.ObjectId, ref: 'Evidencia' },
        descripcion: { type: String, required: true },
        relevancia: { type: String, required: true },
        lugarRecopilacion: { type: String, required: true },
        fechaRecopilacion: { type: Date, required: true }
      }, { _id: false })
    ],
    default: []
  },
  conclusionesResultados: {
    hallazgosImportantes: { type: String },
    conclusiones: { type: String },
    recomendaciones: { type: String }
  },
  cierreCaso: {
    fechaCierre: { type: Date },
    resultadoFinal: {
      type: String,
      default: 'Pendiente'
    }
  },
  acciones: {
    type: [
      new mongoose.Schema({
        accion: {
          type: String,
          enum: [
            'Evidencia agregada', 'Evidencia eliminada', 'Reporte generado', 'Reporte modificado',
            'Contrato creado', 'Contrato modificado', 'Contrato eliminado',
            'Cambio de estado', 'Comentario agregado', 'Caso reasignado', 'Caso cerrado', 'Caso archivado'
          ]
        },
        detalles: { type: String, required: true },
        documentoRelacionado: { type: mongoose.Schema.Types.ObjectId, refPath: 'acciones.tipoDocumento' },
        tipoDocumento: {
          type: String,
          enum: ['Evidencia', 'RegistroCaso', 'Contrato'],
          default: null
        },
        usuario: {
          type: mongoose.Schema.Types.ObjectId,
          refPath: 'acciones.usuarioTipo',
          required: true
        },
        usuarioTipo: {
          type: String,
          enum: ['Cliente', 'Detective'],
          required: true
        },
        fecha: { type: Date, default: Date.now }
      }, { _id: false })
    ],
    default: []
  },
  novedades: {
    type: [
      new mongoose.Schema({
        descripcion: { type: String, required: true },
        usuario: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
        fecha: { type: Date, default: Date.now }
      }, { _id: false })
    ],
    default: []
  },
  estadoCaso: {
    type: String,
    enum: ['Abierto', 'En investigación', 'Cerrado', 'Archivado'],
    default: 'Abierto'
  }
}, { timestamps: true });

module.exports = mongoose.model('HistorialCaso', historialCasoSchema);
