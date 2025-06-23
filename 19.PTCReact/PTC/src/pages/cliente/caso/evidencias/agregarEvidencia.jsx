import React, { useState } from 'react';
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Divider,
} from '@mui/material';
import Swal from 'sweetalert2';
import { useNavigate, useParams } from 'react-router-dom';

const AgregarEvidencia = () => {
  const { casoId } = useParams(); // Obtener el casoId desde la URL
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fechaEvidencia: '',
    descripcion: '',
    tipoEvidencia: '',
    archivo: null, // Inicializar el archivo como null
    preview: null, // Previsualización del archivo
    previewType: '', // Tipo de archivo para previsualización
  });

  const tiposEvidencia = ['tipoDocumento', 'tipoFotografia', 'tipoVideo', 'tipoAudio', 'archivosDigitales'];

  // Manejar cambios en los campos de texto y selección
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Manejar la selección del archivo
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      let previewType = '';

      if (file.type.startsWith('image/')) {
        previewType = 'image';
      } else if (file.type.startsWith('audio/')) {
        previewType = 'audio';
      } else if (file.type.startsWith('video/')) {
        previewType = 'video';
      }

      setFormData({
        ...formData,
        archivo: file,
        preview: previewType === 'image' ? URL.createObjectURL(file) : file.name, // Mostrar URL para imagen, nombre para otros
        previewType,
      });
    }
  };

  // Cancelar el archivo seleccionado
  const handleCancelFile = () => {
    setFormData({
      ...formData,
      archivo: null,
      preview: null,
      previewType: '',
    });
  };

  // Enviar los datos al backend
  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData(); // Crear un objeto FormData para enviar archivos
    data.append('fechaEvidencia', formData.fechaEvidencia);
    data.append('descripcion', formData.descripcion);
    data.append('tipoEvidencia', formData.tipoEvidencia);
    data.append('idCasos', casoId);
    if (formData.archivo) {
      data.append('archivo', formData.archivo); // Agregar el archivo al FormData
    }

    try {
      const response = await fetch('https://proyecto-ptc.onrender.com/api/evidencias/upload', {
        method: 'POST',
        body: data, // Enviar el objeto FormData
      });

      if (response.ok) {
        Swal.fire({
          icon: 'success',
          title: 'Evidencia Agregada',
          text: 'La evidencia se ha agregado exitosamente.',
        });
        navigate('/cliente-menu'); // Redirigir al menú del cliente
      } else {
        const errorData = await response.json();
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: errorData.message || 'No se pudo agregar la evidencia.',
        });
      }
    } catch (error) {
      console.error('Error al agregar evidencia:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Ocurrió un error inesperado.',
      });
    }
  };

  return (
    <Container
      sx={{
        mt: 4,
        p: 4,
        backgroundColor: '#eaf4fc',
        borderRadius: 2,
        boxShadow: 3,
        color: '#005f91',
      }}
    >
      <Typography variant="h5" sx={{ mb: 2, fontWeight: 'bold', color: '#005f91' }}>
        Agregar Evidencia
      </Typography>
      <Divider sx={{ mb: 3, backgroundColor: '#d1e0e5' }} />

      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <TextField
          fullWidth
          label="Fecha de Evidencia"
          type="date"
          name="fechaEvidencia"
          margin="normal"
          value={formData.fechaEvidencia}
          onChange={handleChange}
          required
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          fullWidth
          label="Descripción"
          name="descripcion"
          margin="normal"
          value={formData.descripcion}
          onChange={handleChange}
          required
        />
        <FormControl fullWidth margin="normal">
          <InputLabel id="tipoEvidencia-label" sx={{ color: '#005f91' }}>
            Tipo de Evidencia
          </InputLabel>
          <Select
            labelId="tipoEvidencia-label"
            name="tipoEvidencia"
            value={formData.tipoEvidencia}
            onChange={handleChange}
            required
            sx={{ backgroundColor: '#ffffff', color: '#000000' }}
          >
            {tiposEvidencia.map((tipo) => (
              <MenuItem key={tipo} value={tipo}>
                {tipo}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button
          variant="contained"
          component="label"
          sx={{
            mt: 2,
            backgroundColor: '#0077b6',
            '&:hover': { backgroundColor: '#005f91' },
          }}
        >
          Subir Archivo
          <input
            type="file"
            name="archivo"
            hidden
            onChange={handleFileChange}
          />
        </Button>
        {formData.archivo && (
          <>
            <Typography variant="body2" sx={{ mt: 2, color: '#005f91' }}>
              Archivo seleccionado: {formData.archivo.name}
            </Typography>
            {formData.previewType === 'image' && (
              <Box sx={{ mt: 2, textAlign: 'center' }}>
                <img
                  src={formData.preview}
                  alt="Previsualización"
                  style={{
                    maxWidth: '100%',
                    maxHeight: '300px',
                    borderRadius: '8px',
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                  }}
                />
              </Box>
            )}
            {formData.previewType === 'audio' && (
              <Box sx={{ mt: 2, textAlign: 'center' }}>
                <audio controls>
                  <source src={formData.preview} type={formData.archivo.type} />
                  Tu navegador no soporta la reproducción de audio.
                </audio>
              </Box>
            )}
            {formData.previewType === 'video' && (
              <Box sx={{ mt: 2, textAlign: 'center' }}>
                <video controls style={{ maxWidth: '100%', maxHeight: '300px' }}>
                  <source src={formData.preview} type={formData.archivo.type} />
                  Tu navegador no soporta la reproducción de video.
                </video>
              </Box>
            )}
            <Button
              onClick={handleCancelFile}
              variant="outlined"
              sx={{ mt: 2, color: '#d9534f', borderColor: '#d9534f', '&:hover': { borderColor: '#c9302c', color: '#c9302c' } }}
            >
              Cancelar Archivo
            </Button>
          </>
        )}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
          <Button
            type="submit"
            variant="contained"
            sx={{
              backgroundColor: '#0077b6',
              '&:hover': { backgroundColor: '#005f91' },
            }}
          >
            Agregar Evidencia
          </Button>
          <Button
            onClick={() => navigate('/cliente-menu')}
            variant="outlined"
            sx={{
              color: '#005f91',
              borderColor: '#005f91',
              '&:hover': { borderColor: '#0077b6', color: '#0077b6' },
            }}
          >
            Volver
          </Button>
        </Box>
      </form>
    </Container>
  );
};

export default AgregarEvidencia;
