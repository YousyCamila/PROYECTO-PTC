const Formulario = require('../models/formularioModel');
const { enviarCorreo } = require('../services/mailService');

class FormularioLogic {
  async crearFormulario(body) {
    // Verificar si existe un formulario para el cliente
    if (body.idCliente) {
      const formularioExistente = await Formulario.findOne({ idCliente: body.idCliente });
      if (formularioExistente) {
        throw new Error('Ya existe un formulario enviado por este cliente.');
      }
    }

    const formulario = new Formulario(body);
    return await formulario.save();
  }
  async responderFormulario(id, respuesta) {
    // Validar que la respuesta no esté vacía
    if (!respuesta) {
      throw new Error('La respuesta no puede estar vacía.');
    }
  
    // Buscar y actualizar el formulario con la respuesta y cambiar su estado a 'respondido'
    const formulario = await Formulario.findByIdAndUpdate(
      id,
      {
        $set: {
          respuesta, 
          estado: 'respondido', // Cambiar estado a respondido
          fechaRespuesta: new Date() // Agregar la fecha de respuesta
        }
      },
      { new: true } // Devuelve el documento actualizado
    );
  
    if (!formulario) {
      throw new Error('Formulario no encontrado');
    }
  
    // Enviar correo al cliente con la respuesta
    await enviarCorreo(
      formulario.correoCliente,
      'Respuesta a su formulario',
      `Hola ${formulario.nombre},\n\nAquí está la respuesta:\n${respuesta}\n\nGracias.`
    );
  
    return formulario; // Retorna el formulario con su respuesta y estado actualizado
  }
  
  
  async obtenerFormularios() {
    return await Formulario.find({
      estado: { $ne: 'respondido' } // Solo formularios no respondidos
    }).populate('idCliente');
  }
  

  // Obtener solo los formularios respondidos
  async obtenerFormulariosRespondidos() {
    return await Formulario.find({
      estado: 'respondido', // Filtrar solo los formularios respondidos
      respuesta: { $exists: true, $ne: null } // Asegurarse de que la respuesta no sea null
    }).populate('idCliente');
  }

  async obtenerFormularioPorId(id) {
    const formulario = await Formulario.findById(id).populate('idCliente');
    if (!formulario) {
      throw new Error('Formulario no encontrado');
    }
    return formulario;
  }

  async actualizarFormulario(id, body) {
    const formulario = await Formulario.findByIdAndUpdate(id, body, { new: true }).populate('idCliente');
    if (!formulario) {
      throw new Error('Formulario no encontrado');
    }
    return formulario;
  }

  async eliminarFormulario(id) {
    const formulario = await Formulario.findByIdAndDelete(id);
    if (!formulario) {
      throw new Error('Formulario no encontrado');
    }
    return { message: 'Formulario eliminado' };
  }
}

module.exports = new FormularioLogic();