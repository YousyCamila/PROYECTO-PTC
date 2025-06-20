// services/administradorService.js
const Administrador = require('../models/administradorModel');

async function crearAdministrador(datos) {
  // Verificar si el correo ya existe
  const adminExistenteCorreo = await Administrador.findOne({ correo: datos.correo });
  if (adminExistenteCorreo) {
    throw new Error(`El correo ${datos.correo} ya está registrado.`);
  }

  // Verificar si el número de documento ya existe
  const adminExistenteDocumento = await Administrador.findOne({ numeroDocumento: datos.numeroDocumento });
  if (adminExistenteDocumento) {
    throw new Error(`El número de documento ${datos.numeroDocumento} ya está registrado.`);
  }

  const administrador = new Administrador(datos);
  return await administrador.save();
}

async function listarAdministradores() {
  const administradores = await Administrador.find({ activo: true });
  return administradores; // Retornamos la lista aunque esté vacía
}

async function buscarAdministradorPorCorreo(correo) {
  const administrador = await Administrador.findOne({ correo, activo: true });
  if (!administrador) {
    throw new Error(`No se encontró un administrador con el correo: ${correo}`);
  }
  return administrador;
}

async function actualizarAdministrador(id, datos) {
  const administrador = await Administrador.findById(id);

  if (!administrador || !administrador.activo) {
    throw new Error('El administrador que intenta actualizar no existe o ha sido desactivado.');
  }

  // Verificar si el correo ya está en uso por otro administrador
  if (datos.correo && datos.correo !== administrador.correo) {
    const correoExistente = await Administrador.findOne({ correo: datos.correo });
    if (correoExistente) {
      throw new Error(`El correo ${datos.correo} ya está en uso por otro administrador.`);
    }
  }

  // Verificar si el número de documento ya está en uso por otro administrador
  if (datos.numeroDocumento && datos.numeroDocumento !== administrador.numeroDocumento) {
    const documentoExistente = await Administrador.findOne({ numeroDocumento: datos.numeroDocumento });
    if (documentoExistente) {
      throw new Error(`El número de documento ${datos.numeroDocumento} ya está en uso por otro administrador.`);
    }
  }

  Object.assign(administrador, datos);
  return await administrador.save();
}

async function desactivarAdministrador(id) {
  const administrador = await Administrador.findById(id);
  if (!administrador || !administrador.activo) {
    throw new Error('El administrador que intenta desactivar no existe o ya ha sido desactivado.');
  }

  administrador.activo = false; // Cambia el estado a inactivo
  return await administrador.save();
}

module.exports = {
  crearAdministrador,
  listarAdministradores,
  buscarAdministradorPorCorreo,
  actualizarAdministrador,
  desactivarAdministrador // Cambiado aquí
};
