const RegistroCaso = require('../models/registroCasoModel');
const Cliente = require('../models/ClienteModel');
const Detective = require('../models/detectiveModel');
const HistorialCaso = require('../models/historialCasoModel');
const Caso = require('../models/casoModel')

async function crearRegistroCaso(data) {
  try {
    if (!data.idCliente) delete data.idCliente;
    if (!data.idDetective) delete data.idDetective;

    const registroCaso = new RegistroCaso(data);
    await registroCaso.save();

    const promises = [];

    if (data.idCliente) {
      promises.push(
        Cliente.findByIdAndUpdate(data.idCliente, {
          $push: { casos: registroCaso._id }
        })
      );
    }

    if (data.idDetective) {
      promises.push(
        Detective.findByIdAndUpdate(data.idDetective, {
          $push: { casos: registroCaso._id }
        })
      );
    }

    if (data.idCasos) {
      promises.push(
        Caso.findByIdAndUpdate(data.idCasos, {
          $push: { registroCasos: registroCaso._id }
        })
      );
    }

    await Promise.all(promises);

    return registroCaso;
  } catch (error) {
    throw new Error(`Error al crear el registro de caso: ${error.message}`);
  }
}



// Finalizar el contrato del registro de caso y moverlo al historial
async function finalizarRegistroCaso(idRegistro) {
  try {
    const registroCaso = await RegistroCaso.findById(idRegistro);

    if (!registroCaso) {
      throw new Error('Registro no encontrado');
    }

    // Mover al historial del cliente y detective
    await Promise.all([
      Cliente.findByIdAndUpdate(registroCaso.idCliente, {
        $pull: { casos: idRegistro },
        $push: { historialCasos: idRegistro },
      }),
      Detective.findByIdAndUpdate(registroCaso.idDetective, {
        $pull: { casos: idRegistro },
        $push: { historialCasos: idRegistro },
      }),
    ]);

    // Guardar en el historial
    const historialCaso = new HistorialCaso(registroCaso.toObject());
    await historialCaso.save();

    // Eliminar el registro de caso
    await RegistroCaso.findByIdAndDelete(idRegistro);

    return historialCaso;
  } catch (error) {
    throw new Error(`Error al finalizar el registro de caso: ${error.message}`);
  }
}

// Listar todos los registros de casos
async function listarRegistroCasos() {
  try {
    return await RegistroCaso.find().populate('idCasos');
  } catch (error) {
    throw new Error(`Error al listar los registros de casos: ${error.message}`);
  }
}

// Buscar un registro de caso por ID
async function buscarRegistroCasoPorId(idRegistro) {
  try {
    const registroCaso = await RegistroCaso.findById(idRegistro).populate('idCasos');

    if (!registroCaso) {
      throw new Error('Registro no encontrado');
    }

    return registroCaso;
  } catch (error) {
    throw new Error(`Error al buscar el registro de caso: ${error.message}`);
  }
}

// Actualizar un registro de caso
async function actualizarRegistroCaso(idRegistro, data) {
  try {
    const registroActualizado = await RegistroCaso.findByIdAndUpdate(idRegistro, data, { new: true });

    if (!registroActualizado) {
      throw new Error('Registro no encontrado para actualizar');
    }

    return registroActualizado;
  } catch (error) {
    throw new Error(`Error al actualizar el registro de caso: ${error.message}`);
  }
}

// Desactivar un registro de caso
async function desactivarRegistroCaso(idRegistro) {
  try {
    const registroDesactivado = await RegistroCaso.findByIdAndUpdate(
      idRegistro,
      { estadoRegistro: 'Desactivado' },
      { new: true }
    );

    if (!registroDesactivado) {
      throw new Error('Registro no encontrado para desactivar');
    }

    return registroDesactivado;
  } catch (error) {
    throw new Error(`Error al desactivar el registro de caso: ${error.message}`);
  }
}

// Lógica para obtener registros por ID del caso
const buscarRegistrosPorCasoId = async (casoId) => {
  if (!casoId) {
    throw new Error('El ID del caso es obligatorio.');
  }

  const registros = await RegistroCaso.find({ idCasos: casoId }).populate('idCliente idDetective idCasos');

  if (!registros.length) {
    throw new Error('No se encontraron registros para este caso.');
  }

  return registros;
};

module.exports = {
  crearRegistroCaso,
  finalizarRegistroCaso,
  listarRegistroCasos,
  buscarRegistroCasoPorId,
  actualizarRegistroCaso,
  desactivarRegistroCaso,
  buscarRegistrosPorCasoId,
};
