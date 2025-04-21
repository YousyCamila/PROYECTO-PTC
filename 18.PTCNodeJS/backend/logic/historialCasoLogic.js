const HistorialCaso = require('../models/historialCasoModel');
const Caso = require('../models/casoModel');
const Evidencia = require('../models/evidenciaModel');
const User = require('../models/UsuarioModel');
const RegistroCaso = require('../models/registroCasoModel');


/**
 * Crea un historial para un caso si aún no existe.
 * Solo el campo `idCaso` es obligatorio.
 * 
 * @param {Object} params
 * @param {string} params.idCaso - ID del caso asociado (obligatorio)
 * @param {string} [params.nombreCliente] - Nombre del cliente (opcional)
 * @param {string} [params.descripcionObjetivo] - Descripción del objetivo (opcional)
 * @param {string} [params.informacionInicial] - Información inicial (opcional)
 * @returns {Promise<Object>} - Historial creado
 */
async function crearHistorial({ idCaso, nombreCliente = '', descripcionObjetivo = '', informacionInicial = '' }) {
    try {

      const caso = await Caso.findById(idCaso).populate('idCliente idDetective');
      if (!caso) {
        throw new Error('Caso no encontrado');
      }
  

      const historialExistente = await HistorialCaso.findOne({ idCaso });
      if (historialExistente) {
        throw new Error('Ya existe un historial para este caso');
      }
  
      // Crea el historial con los campos opcionales (vacíos si no se proporcionan)
      const nuevoHistorial = new HistorialCaso({
        idCaso,
        nombreCliente,
        descripcionObjetivo,
        informacionInicial,
        estadoCaso: 'Abierto'
      });
  
      await nuevoHistorial.save();
      return nuevoHistorial;
    } catch (error) {
      console.error('Error al crear historial:', error.message);
      throw error; 
    }
  }

  async function editarHistorial(historialId, camposAActualizar) {
    try {
        const historial = await HistorialCaso.findById(historialId);
        if (!historial) {
            throw new Error('Historial no encontrado');
        }

        // Solo actualiza los campos que fueron enviados
        Object.keys(camposAActualizar).forEach((campo) => {
            if (camposAActualizar[campo] !== undefined) {
                historial[campo] = camposAActualizar[campo];
            }
        });

        await historial.save();
        return historial;
    } catch (error) {
        console.error('Error al editar historial:', error.message);
        throw error;
    }
}
  
  
// Obtener un historial completo por ID de caso
async function obtenerHistorialCompleto(idCaso) {
    try {
      const historialCaso = await HistorialCaso.findOne({ idCaso })
        .populate({
          path: 'idCaso',
          select: 'nombreCaso idCliente idDetective evidencias registroCasos contratos',
          populate: [
            { path: 'idCliente', select: 'nombres apellidos correo tipoDocumento numeroDocumento' },
            { path: 'idDetective', select: 'nombres apellidos correo especialidad' },
            { path: 'evidencias', select: 'descripcion fechaEvidencia tipoEvidencia' },
            { path: 'registroCasos', select: 'descripcion' },
            { path: 'contratos', select: 'descripcionServicio estado' }
          ]
        })
        .populate({
          path: 'acciones.usuario',
          select: 'nombres apellidos correo tipoDocumento numeroDocumento'
        });
  
      return historialCaso;
    } catch (error) {
      throw new Error('Error al obtener el historial del caso: ' + error.message);
    }
  }


// Obtener historial por su ID
async function obtenerHistorialPorId(historialId) {
    try {
        const historialCaso = await HistorialCaso.findById(historialId)
            .populate({
                path: 'idCaso',
                populate: [
                    { path: 'idCliente', select: 'nombre correo' },
                    { path: 'idDetective', select: 'nombre correo' }
                ]
            })
            .populate({
                path: 'acciones.usuario',
                select: 'nombre correo rol'
            })
            .populate({
                path: 'novedades.usuario',
                select: 'nombre correo rol'
            });

        if (!historialCaso) {
            throw new Error('Historial no encontrado');
        }

        return historialCaso;
    } catch (error) {
        console.error('Error al obtener historial por ID:', error.message);
        throw error;
    }
}

// Obtener todos los historiales
async function obtenerTodosLosHistoriales() {
    const historialesCaso = await HistorialCaso.find()
        .populate('idCaso')
        .populate('acciones.usuario')
        .populate('novedades.usuario');
    
    return historialesCaso;
}

// Registrar acción manual
const agregarAccion = async ({
    idHistorial,
    accion,
    detalles,
    usuarioId,
    usuarioTipo,
    documentoRelacionado = null,
    tipoDocumento = null
  }) => {
    const historial = await HistorialCaso.findById(idHistorial);
    if (!historial) throw new Error('Historial no encontrado');
  
    const caso = await Caso.findById(historial.idCaso);
    if (!caso) throw new Error('Caso no encontrado');
  
    const esClienteValido = usuarioTipo === 'Cliente' && String(caso.idCliente) === String(usuarioId);
    const esDetectiveValido = usuarioTipo === 'Detective' && String(caso.idDetective) === String(usuarioId);
  
    if (!esClienteValido && !esDetectiveValido) {
      throw new Error('El usuario no está relacionado con el caso');
    }
  
    historial.acciones.push({
      accion,
      detalles,
      documentoRelacionado,
      tipoDocumento,
      usuario: usuarioId,
      usuarioTipo,
      fecha: new Date()
    });
  
    await historial.save();
    return historial;
  };


// Registrar acción automática (Evidencias o Reportes)
async function registrarAccionAutomatica({ idCaso, descripcion, usuarioId }) {
    const historialCaso = await HistorialCaso.findOne({ idCaso });

    if (!historialCaso) {
        throw new Error('Historial no encontrado');
    }

    historialCaso.novedades.push({
        descripcion,
        usuario: usuarioId
    });

    await historialCaso.save();
    return historialCaso;
}

// Obtener información relacionada al historial sin duplicar datos
async function obtenerInformacionRelacionadaHistorial(idCaso) {
    const caso = await Caso.findById(idCaso)
        .populate('idCliente')
        .populate('idDetective')
        .populate('evidencias')
        .populate('registroCasos')
        .populate('contratos');

    if (!caso) {
        throw new Error('Caso no encontrado');
    }

    return {
        nombreCliente: caso.idCliente.nombre,
        idDetective: caso.idDetective ? caso.idDetective.nombre : null,
        evidencias: caso.evidencias,
        contratos: caso.contratos,
        registroCasos: caso.registroCasos
    };
}

module.exports = {
    crearHistorial,
    editarHistorial,
    obtenerHistorialCompleto,
    obtenerHistorialPorId,
    obtenerTodosLosHistoriales,
    agregarAccion,
    registrarAccionAutomatica,
    obtenerInformacionRelacionadaHistorial
};
