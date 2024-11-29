const Evidencia = require('../models/evidenciaModel');
const Caso = require ('../models/casoModel');

// Lista de tipos de evidencia permitidos
const tiposEvidenciaPermitidos = [
  'tipoDocumento', 
  'tipoFotografia', 
  'tipoVideo', 
  'tipoAudio', 
  'archivosDigitales'
];

// Función para validar tipos de evidencia
function validarTiposEvidencia(tiposEvidenciaRecibidos) {
  const tiposEvidenciaComoArreglo = Array.isArray(tiposEvidenciaRecibidos) 
    ? tiposEvidenciaRecibidos 
    : [tiposEvidenciaRecibidos];

  const tiposNoPermitidos = tiposEvidenciaComoArreglo.filter(tipo => !tiposEvidenciaPermitidos.includes(tipo));

  if (tiposNoPermitidos.length > 0) {
    throw new Error(`Tipo(s) de evidencia no válido(s): ${tiposNoPermitidos.join(', ')}. Deben ser uno de los tipos especificados: ${tiposEvidenciaPermitidos.join(', ')}`);
  }
}

// Crear evidencia y asociarla con un caso
async function crearEvidencia(datos) {
  // Verificar que el tipo de evidencia esté en la lista permitida
  validarTiposEvidencia(datos.tipoEvidencia);

  const nuevaEvidencia = new Evidencia(datos);
  
  // Guardar la nueva evidencia
  const evidenciaGuardada = await nuevaEvidencia.save();

  // Asociar la evidencia al caso correspondiente
  await Caso.findByIdAndUpdate(datos.idCasos, {
    $push: { evidencias: evidenciaGuardada._id }
  });

  return evidenciaGuardada;
}


// Listar evidencias
async function listarEvidencias() {
  const evidencias = await Evidencia.find({ activo: true });
  if (evidencias.length === 0) {
    throw new Error('No hay evidencias registradas actualmente.');
  }
  return evidencias;
}

// Buscar evidencia por ID
async function buscarEvidenciaPorId(id) {
  const evidencia = await Evidencia.findById(id);
  if (!evidencia || !evidencia.activo) {
    throw new Error(`No se encontró una evidencia con el ID: ${id}`);
  }
  return evidencia;
}

// Actualizar evidencia
async function actualizarEvidencia(id, datos) {
  const evidencia = await Evidencia.findById(id);
  if (!evidencia || !evidencia.activo) {
    throw new Error('La evidencia que intenta actualizar no existe o ha sido desactivada.');
  }

  // Verificar si el tipo de evidencia es válido en caso de ser actualizado
  if (datos.tipoEvidencia) {
    validarTiposEvidencia(datos.tipoEvidencia);
  }

  Object.assign(evidencia, datos);
  return await evidencia.save();
}

// Desactivar evidencia
async function desactivarEvidencia(id) {
  const evidencia = await Evidencia.findById(id);
  if (!evidencia || !evidencia.activo) {
    throw new Error('La evidencia que intenta desactivar no existe o ya ha sido desactivada.');
  }

  evidencia.activo = false; // Cambia el estado a inactivo
  return await evidencia.save();
}

const crearEvidenciaConArchivo = async ({ fechaEvidencia, descripcion, idCasos, tipoEvidencia, archivo }) => {
  const nuevaEvidencia = new Evidencia({
    fechaEvidencia,
    descripcion,
    idCasos,
    tipoEvidencia,
    archivo: {
      nombre: archivo.filename,
      tipo: archivo.mimetype,
      ruta: archivo.path,
    },
  });

  return await nuevaEvidencia.save();
}


module.exports = {
  crearEvidencia,
  listarEvidencias,
  buscarEvidenciaPorId,
  actualizarEvidencia,
  desactivarEvidencia,
  crearEvidenciaConArchivo
};
