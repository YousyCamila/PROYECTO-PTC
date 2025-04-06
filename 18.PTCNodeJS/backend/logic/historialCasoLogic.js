const HistorialCaso = require('../models/historialCasoModel');
const Caso = require('../models/casoModel');
const Evidencia = require('../models/evidenciaModel');
const User = require('../models/UsuarioModel');

// Crear un historial al crear un nuevo caso
async function crearHistorial({ idCaso, nombreCliente, descripcionObjetivo, informacionInicial }) {
    const caso = await Caso.findById(idCaso).populate('idCliente idDetective');

    if (!caso) {
        throw new Error('Caso no encontrado');
    }

    const historialCaso = new HistorialCaso({
        idCaso,
        nombreCliente,
        descripcionObjetivo,
        informacionInicial,
        estadoCaso: 'Abierto'
    });

    await historialCaso.save();
    return historialCaso;
}

// Obtener un historial completo por ID de caso
async function obtenerHistorialCompleto(idCaso) {
    const historialCaso = await HistorialCaso.findOne({ idCaso })
        .populate({
            path: 'idCaso',
            populate: [
                { path: 'idCliente' },
                { path: 'idDetective' },
                { path: 'evidencias' },
                { path: 'registroCasos' },
                { path: 'contratos' }
            ]
        })
        .populate('acciones.usuario')
        .populate('novedades.usuario');
    
    if (!historialCaso) {
        throw new Error('Historial no encontrado');
    }
    
    return historialCaso;
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
async function agregarAccion({ idCaso, accion, detalles, usuarioId, documentoRelacionado = null, tipoDocumento = null }) {
    const historialCaso = await HistorialCaso.findOne({ idCaso });

    if (!historialCaso) {
        throw new Error('Historial no encontrado');
    }

    historial.acciones.push({
        accion,
        detalles,
        documentoRelacionado,
        tipoDocumento,
        usuario: usuarioId
    });

    await historialCaso.save();
    return historialCaso;
}

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
    obtenerHistorialCompleto,
    obtenerHistorialPorId,
    obtenerTodosLosHistoriales,
    agregarAccion,
    registrarAccionAutomatica,
    obtenerInformacionRelacionadaHistorial
};
