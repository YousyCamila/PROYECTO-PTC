const historialCasoLogic = require('../logic/historialCasoLogic');

// Crear un historial para un caso nuevo
async function crearHistorial(req, res) {
    try {
        const { idCaso, nombreCliente, descripcionObjetivo, informacionInicial } = req.body;
        const historialCaso = await historialCasoLogic.crearHistorial({ idCaso, nombreCliente, descripcionObjetivo, informacionInicial });
        res.status(201).json(historialCaso);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Obtener historial completo por ID de caso
async function obtenerHistorialCompleto(req, res) {
    try {
        const { idCaso } = req.params;
        const historialCaso = await historialCasoLogic.obtenerHistorialCompleto(idCaso);
        res.status(200).json(historialCaso);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Obtener historial por ID único
async function obtenerHistorialPorId(req, res) {
    try {
        const { id } = req.params;
        const historialCaso = await historialCasoLogic.obtenerHistorialPorId(id);
        res.status(200).json(historialCaso);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Obtener todos los historiales
async function obtenerTodosLosHistoriales(req, res) {
    try {
        const historialesCaso = await historialCasoLogic.obtenerTodosLosHistoriales();
        res.status(200).json(historialesCaso);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Agregar una acción al historial (manual)
const agregarAccion = async (req, res) => {
    try {
      const {
        idHistorial,
        accion,
        detalles,
        usuarioId,
        usuarioTipo,
        documentoRelacionado,
        tipoDocumento
      } = req.body;
  
      const historialActualizado = await historialCasoLogic.agregarAccion({
        idHistorial,
        accion,
        detalles,
        usuarioId,
        usuarioTipo,
        documentoRelacionado,
        tipoDocumento
      });
  
      res.status(200).json({
        mensaje: 'Acción registrada correctamente',
        idHistorial: historialActualizado._id,
        historial: historialActualizado
      });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

// Registrar acción automáticamente (Evidencias o Reportes)
async function registrarAccionAutomatica(req, res) {
    try {
        const { idCaso, descripcion, usuarioId } = req.body;
        const historialCaso = await historialCasoLogic.registrarAccionAutomatica({ idCaso, descripcion, usuarioId });
        res.status(200).json(historialCaso);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Obtener información relacionada al historial (Evita duplicar datos)
async function obtenerInformacionRelacionadaHistorial(req, res) {
    try {
        const { idCaso } = req.params;
        const informacionRelacionada = await historialCasoLogic.obtenerInformacionRelacionadaHistorial(idCaso);
        res.status(200).json(informacionRelacionada);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
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
