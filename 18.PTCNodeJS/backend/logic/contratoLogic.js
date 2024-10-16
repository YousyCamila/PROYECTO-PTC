const Contrato = require('../models/contratoModel');
const Cliente = require('../models/clienteModel');
const Detective = require('../models/detectiveModel');

async function crearContrato(data) {
  const contrato = new Contrato(data);
  await contrato.save();

  // Actualizar el cliente para agregar el contrato
  await Cliente.findByIdAndUpdate(data.idCliente, {
    $push: { contratos: contrato._id } // Agrega el ID del contrato al cliente
  });

  // Si hay un detective, actualizar también
  if (data.idDetective) {
    await Detective.findByIdAndUpdate(data.idDetective, {
      $push: { casos: { id: contrato._id, nombre: contrato.descripcionServicio } } // Agrega el ID y nombre del contrato al detective
    });
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

module.exports = {
  crearContrato,
  listarContratos,
  buscarContratoPorId,
  desactivarContrato,
  listarContratosPorDetective // Exportar la nueva función
};
