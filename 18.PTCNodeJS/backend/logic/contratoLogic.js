const mongoose = require('mongoose'); // Asegúrate de que mongoose esté importado
const Contrato = require('../models/contratoModel');
const Cliente = require('../models/clienteModel');
const Detective = require('../models/detectiveModel');

async function crearContrato(data) {
  const contrato = new Contrato(data);
  await contrato.save();

  // Agregar el contrato al cliente
  await Cliente.findByIdAndUpdate(
    data.idCliente,
    {
      $push: {
        contratos: {
          id: contrato._id, // Asegurarnos de pasar el _id correctamente como id
          descripcionServicio: contrato.descripcionServicio,
          estado: contrato.estado
        }
      }
    },
    { new: true, runValidators: true }
  );

  // Si hay un detective, actualizar también
  if (data.idDetective) {
    await Detective.findByIdAndUpdate(
      data.idDetective,
      {
        $push: {
          contratos: {
            id: contrato._id, // Asegurarnos de pasar el _id correctamente como id
            descripcionServicio: contrato.descripcionServicio,
            estado: contrato.estado
          }
        }
      },
      { new: true, runValidators: true }
    );
  }

  return contrato;
}

async function listarContratos() {
  return await Contrato.find()
    .populate('idCliente', 'nombres apellidos') // Población de Cliente
    .populate('idDetective', 'nombres apellidos'); // Población de Detective
}

async function buscarContratoPorId(id) {
  const contrato = await Contrato.findById(id)
    .populate('idCliente')  // Poblar la información del cliente
    .populate('idDetective'); // Poblar la información del detective

  if (!contrato) throw new Error('Contrato no encontrado');
  return contrato;
}

async function desactivarContrato(id, motivo) {
  const contrato = await Contrato.findById(id);
  if (!contrato) throw new Error('Contrato no encontrado');

  contrato.estado = false; // Desactivar contrato
  contrato.historial.push({ fechaDesactivacion: new Date(), motivo }); // Agrega al historial de desactivación
  await contrato.save();

  // Actualizar historiales del cliente y detective
  await Cliente.findByIdAndUpdate(contrato.idCliente, {
    $push: { historials: contrato._id } // Agregar al historial del cliente
  });

  if (contrato.idDetective) {
    await Detective.findByIdAndUpdate(contrato.idDetective, {
      $push: { historialCasos: contrato._id } // Agregar al historial del detective
    });
  }

  return { message: 'Contrato desactivado exitosamente' };
}

// Nueva función para listar contratos por detective
async function listarContratosPorDetective(idDetective) {
  return await Contrato.find({ idDetective })
    .populate('idCliente', 'nombres apellidos') // Población de Cliente
    .populate('idDetective', 'nombres apellidos'); // Población de Detective
}

async function actualizarContrato(id, data) {
  const contrato = await Contrato.findById(id);
  if (!contrato) throw new Error('Contrato no encontrado');

  // Actualizamos solo los campos permitidos
  contrato.descripcionServicio = data.descripcionServicio || contrato.descripcionServicio;
  contrato.fechaInicio = data.fechaInicio || contrato.fechaInicio;
  contrato.fechaCierre = data.fechaCierre || contrato.fechaCierre;
  contrato.clausulas = data.clausulas || contrato.clausulas;
  contrato.tarifa = data.tarifa || contrato.tarifa;
  contrato.estado = data.estado !== undefined ? data.estado : contrato.estado;

  await contrato.save();

  return contrato;
}

module.exports = {
  crearContrato,
  listarContratos,
  buscarContratoPorId,
  desactivarContrato,
  listarContratosPorDetective,
  actualizarContrato
};
