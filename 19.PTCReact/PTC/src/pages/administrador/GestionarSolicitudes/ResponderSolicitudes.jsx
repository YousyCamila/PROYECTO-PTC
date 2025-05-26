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
  Divider,
  IconButton,
} from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import Swal from 'sweetalert2';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowBack, DarkMode, LightMode } from '@mui/icons-material';  // Importar los iconos para el cambio de tema

const ResponderSolicitudes = () => {
  const [formularios, setFormularios] = useState([]);
  const [respuesta, setRespuesta] = useState('');
  const [selectedFormulario, setSelectedFormulario] = useState(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [sortOrder, setSortOrder] = useState('asc');
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light'); // Estado para el tema
  const navigate = useNavigate(); // Hook para redireccionar

  useEffect(() => {
    // Cargar formularios
    const fetchFormularios = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/formularios');
        const data = await response.json();
        const formData = data
          .filter((form) => !form.respondido)  // Filtra solo los formularios pendientes
          .map((form) => ({
            ...form,
            fechaEnvio: new Date(form.fechaEnvio),
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

  useEffect(() => {
    // Aplicar el tema al cuerpo de la página
    document.body.className = theme === 'dark' ? 'dark-theme' : 'light-theme';
    localStorage.setItem('theme', theme); // Guardar el tema en localStorage
  }, [theme]);

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
        Swal.fire('Éxito', 'Respuesta enviada correctamente.', 'success');
        setOpenSnackbar(true);
        setRespuesta(''); // Limpiar la respuesta
        setSelectedFormulario(null); // Limpiar el formulario seleccionado

        // Vuelve a obtener los formularios para reflejar el cambio
        fetchFormularios(); 

        // Redirigir a la página de mensajes respondidos
        navigate('/mensajes-respondidos');
      } else {
        throw new Error('Error al responder la solicitud');
      }
    } catch (error) {
      console.error('Error al responder la solicitud:', error);
    }
  };

  const handleCancel = () => {
    setSelectedFormulario(null);
    setRespuesta('');
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const handleSort = () => {
    const sortedFormularios = [...formularios].sort((a, b) => {
      const dateA = new Date(a.fechaEnvio);
      const dateB = new Date(b.fechaEnvio);
      return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
    });
    setFormularios(sortedFormularios);
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <Box
      sx={{
        width: '100vw',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
        backgroundColor: theme === 'dark' ? '#333' : '#f5f5f5', // Ajustar color de fondo según el tema
        color: theme === 'dark' ? '#fff' : '#000', // Ajustar color de texto
      }}
    >
      <Container
        maxWidth="lg"
        sx={{
          backgroundColor: theme === 'dark' ? '#444' : 'white', // Ajustar color de contenedor
          padding: 4,
          borderRadius: 3,
          boxShadow: 6,
          position: 'relative',
          height: '90vh',
          display: 'flex',
          flexDirection: 'column',
          overflowY: 'auto',
        }}
      >
        <IconButton
          component={Link}
          to="/admin-menu"
          sx={{
            position: 'absolute',
            top: 16,
            left: 16,
            color: '#0077b6',
            '&:hover': { backgroundColor: '#f0f0f0' },
            borderRadius: '50%',
          }}
        >
          <ArrowBack />
        </IconButton>

        <Typography variant="h4" gutterBottom sx={{ textAlign: 'center', color: '#0077b6', fontWeight: 700 }}>
          Responder Solicitudes
        </Typography>

        <Divider sx={{ marginY: 2 }} />

        <TableContainer component={Paper} sx={{ flex: '1 1 auto', overflowY: 'auto' }}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 600 }}>Nombre</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Correo</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Numero de celular</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Descripción</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Fecha de Envío</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    onClick={handleSort}
                    sx={{
                      backgroundColor: '#0077b6',
                      '&:hover': { backgroundColor: '#005f91' },
                    }}
                  >
                    {sortOrder === 'asc' ? 'Ordenar por Fecha (Asc)' : 'Ordenar por Fecha (Desc)'}
                  </Button>
                </TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {formularios.map((formulario) => (
                <TableRow key={formulario._id}>
                  <TableCell>{formulario.nombre}</TableCell>
                  <TableCell>{formulario.correoCliente}</TableCell>
                  <TableCell>{formulario.numeroCelular}</TableCell>
                  <TableCell>{formulario.descripcion}</TableCell>
                  <TableCell>{new Date(formulario.fechaEnvio).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      onClick={() => {
                        setSelectedFormulario(formulario._id);
                        setRespuesta('');
                      }}
                      sx={{
                        backgroundColor: '#00b4d8',
                        '&:hover': { backgroundColor: '#0077b6' },
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
            <Typography variant="h6" sx={{ color: '#0077b6', fontWeight: 600 }}>
              Responder a la solicitud:
            </Typography>
            <TextField
              fullWidth
              multiline
              rows={4}
              value={respuesta}
              onChange={(e) => setRespuesta(e.target.value)}
              label="Tu respuesta"
              variant="outlined"
              sx={{ marginY: 2 }}
            />
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
              <Button
                variant="contained"
                onClick={() => handleResponder(selectedFormulario)}
                sx={{
                  backgroundColor: '#0077b6',
                  '&:hover': { backgroundColor: '#005f91' },
                }}
              >
                Enviar Respuesta
              </Button>
              <Button
                variant="outlined"
                onClick={handleCancel}
                sx={{
                  color: '#ff6f61',
                  borderColor: '#ff6f61',
                  '&:hover': { backgroundColor: '#ff6f61', color: '#fff' },
                }}
              >
                Cancelar Respuesta
              </Button>
            </Box>
          </Box>
        )}

        <Button
          component={Link}
          to="/mensajes-respondidos"
          variant="contained"
          sx={{
            position: 'absolute',
            bottom: 16,
            left: '50%',
            transform: 'translateX(-50%)',
            backgroundColor: '#0077b6',
            '&:hover': { backgroundColor: '#0077b6', color: '#fff' },
          }}
        >
          Ver Mensajes Respondidos
        </Button>

        {/* Botón para cambiar el tema */}
        <IconButton
          onClick={toggleTheme}
          sx={{
            position: 'absolute',
            top: 16,
            right: 16,
            color: '#0077b6',
            '&:hover': { backgroundColor: '#f0f0f0' },
          }}
        >
          {theme === 'light' ? <DarkMode /> : <LightMode />}
        </IconButton>

        <Snackbar
          open={openSnackbar}
          autoHideDuration={3000}
          onClose={handleCloseSnackbar}
        >
          <MuiAlert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
            Respuesta enviada correctamente.
          </MuiAlert>
        </Snackbar>
      </Container>
    </Box>
  );
};

export default ResponderSolicitudes;
