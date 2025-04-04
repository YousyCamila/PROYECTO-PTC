const Historial = require('../models/historialModel');
const Caso = require('../models/casoModel');
const Cliente = require('../models/clienteModel');
const Detective = require('../models/detectiveModel');

// Obtener todos los historiales
obtenerHistoriales = async (req, res) => {
    try {
        const historiales = await Historial.find().populate('idCaso').populate('idCliente').populate('idDetective');
        res.status(200).json(historiales);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener historiales', error });
    }
};

// Obtener historial por ID
obtenerHistorialPorId = async (req, res) => {
    const { id } = req.params;
    try {
        const historial = await Historial.findById(id).populate('idCaso').populate('idCliente').populate('idDetective');
        if (!historial) return res.status(404).json({ message: 'Historial no encontrado' });
        res.status(200).json(historial);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener el historial', error });
    }
};

// Crear un nuevo historial
exports.crearHistorial = async (req, res) => {
    const { idCaso, acciones, estadoCaso, idCliente, idDetective } = req.body;

    try {
        // Verificar que el caso, cliente y detective existan
        const caso = await Caso.findById(idCaso);
        const cliente = await Cliente.findById(idCliente);
        const detective = await Detective.findById(idDetective);

        if (!caso || !cliente || !detective) {
            return res.status(400).json({ message: 'Caso, Cliente o Detective no encontrados' });
        }

        const nuevoHistorial = new Historial({
            idCaso,
            acciones,
            estadoCaso,
            idCliente,
            idDetective 
        });

        const historialGuardado = await nuevoHistorial.save();
        res.status(201).json(historialGuardado);
    } catch (error) {
        res.status(500).json({ message: 'Error al crear historial', error });
    }
};

// Actualizar un historial
exports.actualizarHistorial = async (req, res) => {
    const { id } = req.params;
    const { acciones, estadoCaso } = req.body;

    try {
        const historialActualizado = await Historial.findByIdAndUpdate(
            id,
            { acciones, estadoCaso },
            { new: true }
        );

        if (!historialActualizado) {
            return res.status(404).json({ message: 'Historial no encontrado' });
        }

        res.status(200).json(historialActualizado);
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar el historial', error });
    }
};

// Eliminar un historial
eliminarHistorial = async (req, res) => {
    const { id } = req.params;

    try {
        const historialEliminado = await Historial.findByIdAndDelete(id);

        if (!historialEliminado) {
            return res.status(404).json({ message: 'Historial no encontrado' });
        }

        res.status(200).json({ message: 'Historial eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar el historial', error });
    }
};
module.exports = {
    obtenerHistoriales,
    obtenerHistorialPorId,
    crearHistorial,
    actualizarHistorial,
    eliminarHistorial,
};
