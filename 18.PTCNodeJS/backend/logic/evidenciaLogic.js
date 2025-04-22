const Evidencia = require('../models/evidenciaModel');
const Caso = require ('../models/casoModel');
const mongoose = require('mongoose');

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


const listarEvidencias = async () => {
  try {
    // Obtener todas las evidencias
    const evidencias = await Evidencia.find({});
    return evidencias;
  } catch (error) {
    console.error('Error en la lógica al obtener evidencias:', error);
    throw new Error('Error al obtener las evidencias');
  }
};


// Buscar evidencia por ID
const obtenerEvidenciaPorId = async (id) => {
  try {
    // Validar que el ID es un ObjectId válido
    if (!mongoose.Types.ObjectId.isValid(id)) {
      const error = new Error('El ID proporcionado no es válido.');
      error.status = 400;
      throw error;
    }

    // Buscar evidencia por ID
    const evidencia = await Evidencia.findById(id);
    return evidencia;
  } catch (error) {
    console.error('Error en la lógica al buscar evidencia por ID:', error);
    throw error;
  }
};


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

async function crearEvidenciaConArchivo(datos, archivo) {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    // Crear la nueva evidencia con datos y archivo
    const nuevaEvidencia = new Evidencia({
      ...datos,
      archivo: {
        nombre: archivo.filename,
        tipo: archivo.mimetype,
        ruta: archivo.path,
      },
    });

    // Guardar la nueva evidencia en la base de datos
    const evidenciaGuardada = await nuevaEvidencia.save({ session });

    // Verificar que el caso asociado existe
    const caso = await Caso.findById(datos.idCasos);
    if (!caso) {
      throw new Error('No se encontró un caso con el ID proporcionado');
    }

    // Asociar la evidencia al caso
    caso.evidencias.push(evidenciaGuardada._id);

    // Guardar el caso actualizado
    await caso.save({ session });

    // Confirmar la transacción
    await session.commitTransaction();
    session.endSession();

    return evidenciaGuardada; // Devuelve la evidencia creada

  } catch (error) {
    // Si ocurre un error, abortar la transacción
    await session.abortTransaction();
    session.endSession();
    throw new Error('Error al crear la evidencia con archivo: ' + error.message);
  }
}


const obtenerEvidenciasPorCaso = async (idCaso) => {
  try {
    // Validar que el ID es un ObjectId válido
    if (!mongoose.Types.ObjectId.isValid(idCaso)) {
      const error = new Error('El ID del caso proporcionado no es válido.');
      error.status = 400;
      throw error;
    }

    // Convertir idCaso a ObjectId
    const objectIdCaso = new mongoose.Types.ObjectId(idCaso);

    // Ejecutar consulta
    const evidencias = await Evidencia.find({ idCasos: objectIdCaso});

    return evidencias;
  } catch (error) {
    console.error('Error en la lógica al obtener evidencias por caso:', error);
    throw error;
  }
};




module.exports = {
  crearEvidencia,
  listarEvidencias,
  obtenerEvidenciaPorId,
  actualizarEvidencia,
  desactivarEvidencia,
  crearEvidenciaConArchivo,
  obtenerEvidenciasPorCaso
};
