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

async function crearEvidencia(datos) {
  // Inicia una transacción para asegurar que ambas acciones (guardar evidencia y actualizar el caso) sean atómicas
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    // Crear la nueva evidencia
    const nuevaEvidencia = new Evidencia(datos);

    // Guardar la nueva evidencia en la base de datos
    const evidenciaGuardada = await nuevaEvidencia.save({ session });

    // Verificar que el caso al que se quiere asociar la evidencia existe
    const caso = await Caso.findById(datos.idCasos);
    if (!caso) {
      throw new Error('No se encontró un caso con el ID proporcionado');
    }

    // Asociar la evidencia al caso utilizando el método $push
    caso.evidencias.push(evidenciaGuardada._id);

    // Actualizar el caso con la nueva evidencia
    await caso.save({ session });

    // Confirmar la transacción
    await session.commitTransaction();
    session.endSession();

    return evidenciaGuardada; // Devuelve la evidencia creada

  } catch (error) {
    // Si ocurre un error, aborta la transacción
    await session.abortTransaction();
    session.endSession();
    throw new Error('Error al crear la evidencia: ' + error.message);
  }
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


// Lógica para obtener las evidencias asociadas al caso
async function obtenerEvidenciasPorCaso(idCaso) {
  // Buscar las evidencias activas del caso
  const evidencias = await Evidencia.find({ idCasos: idCaso, activo: true });

  if (!evidencias || evidencias.length === 0) {
    throw new Error(`No se encontraron evidencias para el caso con ID: ${idCaso}`);
  }

  // Añadir la URL del archivo a cada evidencia
  const evidenciasConURL = evidencias.map(evidencia => {
    evidencia.archivo.urlCompleto = `http://localhost:3000/uploads/${evidencia.archivo.nombre}`; // Asumiendo que usas localhost
    return evidencia;
  });

  return evidenciasConURL;
}



module.exports = {
  crearEvidencia,
  listarEvidencias,
  buscarEvidenciaPorId,
  actualizarEvidencia,
  desactivarEvidencia,
  crearEvidenciaConArchivo,
  obtenerEvidenciasPorCaso
};
