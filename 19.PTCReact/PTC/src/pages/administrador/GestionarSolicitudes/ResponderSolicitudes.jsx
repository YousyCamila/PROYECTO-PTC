import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Container,
  Typography,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Snackbar,
} from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom'; // Importa Link

const ResponderSolicitudes = () => {
  const [formularios, setFormularios] = useState([]);
  const [respuesta, setRespuesta] = useState('');
  const [selectedFormulario, setSelectedFormulario] = useState(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [sortOrder, setSortOrder] = useState('asc'); // Estado para controlar el orden de clasificación

  useEffect(() => {
    const fetchFormularios = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/formularios');
        const data = await response.json();
        const formData = data.map(form => ({
          ...form,
          fechaEnvio: new Date(form.fechaEnvio), // Convertir a objeto Date
        }));
        setFormularios(formData);
      } catch (error) {
        console.error('Error al obtener formularios:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'No se pudo cargar las solicitudes.',
        });
      }
    };

    fetchFormularios();
  }, []);

  const handleResponder = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/api/formularios/${id}/responder`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ respuesta }),
      });

      if (response.ok) {
        // Mostrar alerta de éxito
        Swal.fire('Éxito', 'Respuesta enviada correctamente.', 'success');

        setOpenSnackbar(true);
        setRespuesta('');
        setSelectedFormulario(null);
        const updatedFormularios = formularios.map((formulario) =>
          formulario._id === id ? { ...formulario, respuesta } : formulario
        );
        setFormularios(updatedFormularios);
      } else {
        throw new Error('Error al responder la solicitud');
      }
    } catch (error) {
      console.error('Error al responder la solicitud:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No se pudo enviar la respuesta.',
      });
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  // Función para ordenar los formularios por fechaEnvio
  const handleSort = () => {
    const sortedFormularios = [...formularios].sort((a, b) => {
      const dateA = new Date(a.fechaEnvio);
      const dateB = new Date(b.fechaEnvio);
      return sortOrder === 'asc' ? dateA - dateB : dateB - dateA; // Orden ascendente o descendente
    });
    setFormularios(sortedFormularios);
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc'); // Cambiar el orden para la próxima vez
  };

  return (
    <Box
      sx={{
        width: '100vw',
        height: '100vh',
        background: 'linear-gradient(to right, #0077b6, #00b4d8)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Container
        maxWidth="lg"
        sx={{
          backgroundColor: 'white',
          padding: 4,
          borderRadius: 2,
          boxShadow: 3,
          position: 'relative', // Para posicionar el botón
        }}
      >
        <Button
          component={Link} // Hacemos que el botón sea un enlace
          to="/admin-menu" // Ruta al menú principal
          variant="outlined"
          sx={{
            position: 'absolute', // Posicionamiento absoluto
            top: 16, // Espaciado desde la parte superior
            left: 16, // Espaciado desde la izquierda
            color: '#0077b6',
            borderColor: '#0077b6',
          }}
        >
          Volver al Menú
        </Button>

        <Typography variant="h4" gutterBottom sx={{ textAlign: 'center', color: '#0077b6' }}>
          Responder Solicitudes
        </Typography>

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Nombre</TableCell>
                <TableCell>Correo</TableCell>
                <TableCell>Descripción</TableCell>
                <TableCell>Fecha de Envío</TableCell>
                <TableCell>
                  <Button onClick={handleSort}>
                    {sortOrder === 'asc' ? 'Ordenar por Fecha (Asc)' : 'Ordenar por Fecha (Desc)'}
                  </Button>
                </TableCell>
                <TableCell>Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {formularios.map((formulario) => (
                <TableRow key={formulario._id}>
                  <TableCell>{formulario.nombre}</TableCell>
                  <TableCell>{formulario.correoCliente}</TableCell>
                  <TableCell>{formulario.descripcion}</TableCell>
                  <TableCell>{new Date(formulario.fechaEnvio).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      onClick={() => {
                        setSelectedFormulario(formulario._id);
                        setRespuesta('');
                      }}
                    >
                      Responder
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        {selectedFormulario && (
          <Box sx={{ mt: 4 }}>
            <Typography variant="h6">Responder a la solicitud:</Typography>
            <TextField
              fullWidth
              multiline
              rows={4}
              value={respuesta}
              onChange={(e) => setRespuesta(e.target.value)}
              label="Tu respuesta"
              variant="outlined"
            />
            <Button
              variant="contained"
              onClick={() => handleResponder(selectedFormulario)}
              sx={{ mt: 2, backgroundColor: '#0077b6', '&:hover': { backgroundColor: '#005f91' } }}
            >
              Enviar Respuesta
            </Button>
          </Box>
        )}

        <Button
          component={Link} // Hacemos que el botón sea un enlace
          to="/mensajes-respondidos" // Ruta a los mensajes respondidos
          variant="outlined"
          sx={{ mt: 4, color: '#0077b6', borderColor: '#0077b6' }}
        >
          Ver Mensajes Respondidos
        </Button>

        <Snackbar open={openSnackbar} autoHideDuration={3000} onClose={handleCloseSnackbar}>
          <MuiAlert elevation={6} variant="filled" onClose={handleCloseSnackbar} severity="success">
            Respuesta enviada correctamente.
          </MuiAlert>
        </Snackbar>
      </Container>
    </Box>
  );
};

export default ResponderSolicitudes;
