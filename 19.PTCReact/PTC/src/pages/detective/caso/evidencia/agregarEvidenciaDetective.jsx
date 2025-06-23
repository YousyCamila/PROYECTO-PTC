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
  IconButton,
  Paper,
} from '@mui/material';
import { UploadFile, ArrowBack, Cancel } from '@mui/icons-material';
import Swal from 'sweetalert2';
import { useNavigate, useParams } from 'react-router-dom';

const agregarEvidenciaDetective = () => {
  const { casoId } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fechaEvidencia: '',
    descripcion: '',
    tipoEvidencia: '',
    archivo: null,
    preview: null,
    previewType: '',
  });

  const tiposEvidencia = ['tipoDocumento', 'tipoFotografia', 'tipoVideo', 'tipoAudio', 'archivosDigitales'];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      let previewType = '';
      if (file.type.startsWith('image/')) previewType = 'image';
      else if (file.type.startsWith('audio/')) previewType = 'audio';
      else if (file.type.startsWith('video/')) previewType = 'video';

      setFormData({
        ...formData,
        archivo: file,
        preview: previewType === 'image' ? URL.createObjectURL(file) : file.name,
        previewType,
      });
    }
  };

  const handleCancelFile = () => {
    setFormData({
      ...formData,
      archivo: null,
      preview: null,
      previewType: '',
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('fechaEvidencia', formData.fechaEvidencia);
    data.append('descripcion', formData.descripcion);
    data.append('tipoEvidencia', formData.tipoEvidencia);
    data.append('idCasos', casoId);
    if (formData.archivo) data.append('archivo', formData.archivo);

    try {
      const response = await fetch('https://proyecto-ptc.onrender.com/api/evidencias/upload', {
        method: 'POST',
        body: data,
      });

      if (response.ok) {
        Swal.fire({
          icon: 'success',
          title: 'Evidencia Agregada',
          text: 'La evidencia se ha agregado exitosamente.',
        });
        navigate('/detective-menu');
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
    <Container maxWidth="sm" sx={{ mt: 5 }}>
      <Paper elevation={6} sx={{ p: 4, backgroundColor: '#f0f8ff', borderRadius: 3 }}>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', color: '#0077b6' }}>
          Agregar Evidencia
        </Typography>

        <Divider sx={{ my: 2 }} />

        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <TextField
            fullWidth
            type="date"
            label="Fecha de Evidencia"
            name="fechaEvidencia"
            value={formData.fechaEvidencia}
            onChange={handleChange}
            required
            InputLabelProps={{ shrink: true }}
            margin="normal"
          />

          <TextField
            fullWidth
            label="Descripción"
            name="descripcion"
            value={formData.descripcion}
            onChange={handleChange}
            required
            margin="normal"
          />

          <FormControl fullWidth margin="normal">
            <InputLabel id="tipo-label">Tipo de Evidencia</InputLabel>
            <Select
              labelId="tipo-label"
              name="tipoEvidencia"
              value={formData.tipoEvidencia}
              onChange={handleChange}
              required
            >
              {tiposEvidencia.map((tipo) => (
                <MenuItem key={tipo} value={tipo}>
                  {tipo}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Box sx={{ mt: 2 }}>
            <Button
              variant="contained"
              component="label"
              startIcon={<UploadFile />}
              sx={{ backgroundColor: '#0077b6', '&:hover': { backgroundColor: '#005f91' } }}
            >
              Subir Archivo
              <input hidden type="file" onChange={handleFileChange} />
            </Button>
          </Box>

          {formData.archivo && (
            <Box sx={{ mt: 2 }}>
              <Typography variant="body2" color="primary">
                Archivo: {formData.archivo.name}
              </Typography>

              {formData.previewType === 'image' && (
                <Box sx={{ mt: 2 }}>
                  <img
                    src={formData.preview}
                    alt="Previsualización"
                    style={{
                      maxWidth: '100%',
                      maxHeight: '250px',
                      borderRadius: '10px',
                    }}
                  />
                </Box>
              )}

              {formData.previewType === 'audio' && (
                <Box sx={{ mt: 2 }}>
                  <audio controls>
                    <source src={formData.preview} type={formData.archivo.type} />
                    Tu navegador no soporta audio.
                  </audio>
                </Box>
              )}

              {formData.previewType === 'video' && (
                <Box sx={{ mt: 2 }}>
                  <video controls style={{ maxWidth: '100%', maxHeight: '250px' }}>
                    <source src={formData.preview} type={formData.archivo.type} />
                    Tu navegador no soporta video.
                  </video>
                </Box>
              )}

              <IconButton onClick={handleCancelFile} color="error" sx={{ mt: 1 }}>
                <Cancel />
              </IconButton>
            </Box>
          )}

          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
            <Button
              type="submit"
              variant="contained"
              sx={{ backgroundColor: '#0077b6', '&:hover': { backgroundColor: '#005f91' } }}
            >
              Guardar Evidencia
            </Button>
            <Button
              variant="outlined"
              startIcon={<ArrowBack />}
              onClick={() => navigate('/detective-menu')}
              sx={{ borderColor: '#005f91', color: '#005f91', '&:hover': { borderColor: '#0077b6', color: '#0077b6' } }}
            >
              Volver
            </Button>
          </Box>
        </form>
      </Paper>
    </Container>
  );
};

export default agregarEvidenciaDetective;
