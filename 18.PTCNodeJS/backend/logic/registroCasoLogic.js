const RegistroCaso = require('../models/RegistroCasoModel');
const Cliente = require('../models/ClienteModel');
const Detective = require('../models/detectiveModel');
const HistorialCaso = require('../models/HistorialModel');

// Crear un nuevo registro de caso
async function crearRegistroCaso(data) {
  const registroCaso = new RegistroCaso(data);
  
  await registroCaso.save();
  
  // Vincular el caso con cliente y detective
  await Cliente.findByIdAndUpdate(data.idCliente, { $push: { casos: registroCaso._id } });
  await Detective.findByIdAndUpdate(data.idDetective, { $push: { casos: registroCaso._id } });
  
  return registroCaso;
}

// Finalizar el contrato del registro de caso y moverlo al historial
async function finalizarRegistroCaso(idRegistro) {
  const registroCaso = await RegistroCaso.findById(idRegistro);

  if (!registroCaso) {
    throw new Error('Registro no encontrado');
  }

  // Mover al historial del cliente y detective
  await Cliente.findByIdAndUpdate(registroCaso.idCliente, { 
    $pull: { casos: idRegistro }, 
    $push: { historialCasos: idRegistro } 
  });
  await Detective.findByIdAndUpdate(registroCaso.idDetective, { 
    $pull: { casos: idRegistro }, 
    $push: { historialCasos: idRegistro } 
  });

  // Guardar en el historial
  const historialCaso = new HistorialCaso(registroCaso.toObject());
  await historialCaso.save();

  // Eliminar el registro de caso
  await RegistroCaso.findByIdAndDelete(idRegistro);

  return historialCaso;
}

// Listar todos los registros de casos
async function listarRegistroCasos() {
  return await RegistroCaso.find().populate('idCasos');
}

// Buscar un registro de caso por ID
async function buscarRegistroCasoPorId(idRegistro) {
  const registroCaso = await RegistroCaso.findById(idRegistro).populate('idCasos');

  if (!registroCaso) {
    throw new Error('Registro no encontrado');
  }

  return registroCaso;
}

// Actualizar un registro de caso
async function actualizarRegistroCaso(idRegistro, data) {
  const registroActualizado = await RegistroCaso.findByIdAndUpdate(idRegistro, data, { new: true });

  if (!registroActualizado) {
    throw new Error('Registro no encontrado para actualizar');
  }

  return registroActualizado;
}

// Desactivar un registro de caso
async function desactivarRegistroCaso(idRegistro) {
  const registroDesactivado = await RegistroCaso.findByIdAndUpdate(idRegistro, { estadoRegistro: 'Desactivado' }, { new: true });

  if (!registroDesactivado) {
    throw new Error('Registro no encontrado para desactivar');
  }

  return registroDesactivado;
}

module.exports = {
  crearRegistroCaso,
  finalizarRegistroCaso,
  listarRegistroCasos,
  buscarRegistroCasoPorId,
  actualizarRegistroCaso,
  desactivarRegistroCaso,
};
