// controllers/detectiveController.js
const detectiveService = require('../logic/detectiveLogic');

const crearDetective = async (req, res) => {
  try {
    const nuevoDetective = await detectiveService.crearDetective(req.body);
    res.status(201).json(nuevoDetective);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const listarDetectives = async (req, res) => {
  try {
    const detectives = await detectiveService.listarDetectives();
    res.status(200).json(detectives);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

const buscarDetectivePorId = async (req, res) => {
  try {
    const detective = await detectiveService.buscarDetectivePorId(req.params.id);
    res.status(200).json(detective);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

const buscarDetectivePorCorreo = async (req, res) => {
  try {
    const detective = await detectiveService.buscarDetectivePorCorreo(req.params.correo);
    res.status(200).json(detective);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

const actualizarDetective = async (req, res) => {
  try {
    const detectiveActualizado = await detectiveService.actualizarDetective(req.params.id, req.body);
    res.status(200).json(detectiveActualizado);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const desactivarDetective = async (req, res) => {
  try {
    const { id } = req.params;

    // Validar el formato del ID antes de procesar
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ error: "Formato de ID inválido." });
    }

    // Llamar al servicio para desactivar al detective
    const detectiveDesactivado = await detectiveService.desactivarDetective(id);

    // Respuesta exitosa
    res.status(200).json({
      message: "Detective desactivado correctamente.",
      detective: detectiveDesactivado,
    });
  } catch (error) {
    console.error("Error en desactivarDetective:", error);

    // Diferenciar errores según la lógica del servicio
    if (error.message === "El detective no existe.") {
      return res.status(404).json({ error: error.message });
    }
    if (error.message === "El detective ya está desactivado.") {
      return res.status(400).json({ error: error.message });
    }

    // Error interno del servidor
    res.status(500).json({ error: "Error interno del servidor." });
  }
};


module.exports = {
  crearDetective,
  listarDetectives,
  buscarDetectivePorCorreo,
  actualizarDetective,
  desactivarDetective,
  buscarDetectivePorId,
};
