// services/detectiveService.js
const Detective = require('../models/detectiveModel');

async function crearDetective(datos) {
  // Verificar si el correo ya existe
  const detectiveExistenteCorreo = await Detective.findOne({ correo: datos.correo });
  if (detectiveExistenteCorreo) {
    throw new Error(`El correo ${datos.correo} ya está registrado.`);
  }

  // Verificar si el número de documento ya existe
  const detectiveExistenteDocumento = await Detective.findOne({ numeroDocumento: datos.numeroDocumento });
  if (detectiveExistenteDocumento) {
    throw new Error(`El número de documento ${datos.numeroDocumento} ya está registrado.`);
  }

  const detective = new Detective(datos);
  return await detective.save();
}

async function listarDetectives() {
  const detectives = await Detective.find({ activo: true });
  if (detectives.length === 0) {
    throw new Error('No hay detectives registrados actualmente.');
  }
  return detectives;
}

async function buscarDetectivePorCorreo(correo) {
  const detective = await Detective.findOne({ correo, activo: true });
  if (!detective) {
    throw new Error(`No se encontró un detective con el correo: ${correo}`);
  }
  return detective;
}

async function actualizarDetective(id, datos) {
  const detective = await Detective.findById(id);

  if (!detective || !detective.activo) {
    throw new Error('El detective que intenta actualizar no existe o ha sido desactivado.');
  }

  // Verificar si el correo ya está en uso por otro detective
  if (datos.correo && datos.correo !== detective.correo) {
    const correoExistente = await Detective.findOne({ correo: datos.correo });
    if (correoExistente) {
      throw new Error(`El correo ${datos.correo} ya está en uso por otro detective.`);
    }
  }

  // Verificar si el número de documento ya está en uso por otro detective
  if (datos.numeroDocumento && datos.numeroDocumento !== detective.numeroDocumento) {
    const documentoExistente = await Detective.findOne({ numeroDocumento: datos.numeroDocumento });
    if (documentoExistente) {
      throw new Error(`El número de documento ${datos.numeroDocumento} ya está en uso por otro detective.`);
    }
  }

  Object.assign(detective, datos);
  return await detective.save();
}

async function desactivarDetective(id) {
  const administrador = await Administrador.findById(id);
  if (!administrador || !administrador.activo) {
    throw new Error('El administrador que intenta desactivar no existe o ya ha sido desactivado.');
  }

  administrador.activo = false; // Cambia el estado a inactivo
  return await administrador.save();
}

module.exports = {
  crearDetective,
  listarDetectives,
  buscarDetectivePorCorreo,
  actualizarDetective,
  desactivarDetective
};