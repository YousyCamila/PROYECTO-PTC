import React, { useEffect, useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Snackbar,
  Button,
} from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom'; // Para navegación entre rutas

const MensajesRespondidos = () => {
  const [mensajes, setMensajes] = useState([]);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  useEffect(() => {
    const fetchMensajes = async () => {
      try {
        const response = await fetch('https://proyecto-ptc.onrender.com/api/formularios/respondidos'); // Nueva ruta
        const data = await response.json();
        setMensajes(data);
        setOpenSnackbar(true); // Mostrar snackbar al cargar correctamente
      } catch (error) {
        console.error('Error al obtener mensajes respondidos:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'No se pudieron cargar los mensajes respondidos.',
        });
      }
    };

    fetchMensajes();
  }, []);

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
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
        overflow: 'hidden', // Evitar overflow
      }}
    >
      <Container
        maxWidth="lg"
        sx={{
          backgroundColor: 'white',
          padding: 4,
          borderRadius: 2,
          boxShadow: 3,
          height: '90vh', // Ajustar altura
          display: 'flex',
          flexDirection: 'column',
          overflowY: 'auto', // Permitir scroll si es necesario
        }}
      >
        <Typography variant="h4" gutterBottom sx={{ textAlign: 'center', color: '#0077b6' }}>
          Mensajes Respondidos
        </Typography>

        <TableContainer component={Paper} sx={{ flex: '1 1 auto', overflowY: 'auto' }}>
          <Table stickyHeader>
            {/* Esto mantiene el encabezado visible mientras haces scroll */}
            <TableHead>
              <TableRow>
                <TableCell>Nombre</TableCell>
                <TableCell>Correo</TableCell>
                <TableCell>Numero de Celular</TableCell>
                <TableCell>Descripcion</TableCell>
                <TableCell>Respuesta</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {mensajes.length > 0 ? (
                mensajes.map((mensaje) => (
                  <TableRow key={mensaje._id}>
                    <TableCell>{mensaje.nombre}</TableCell>
                    <TableCell>{mensaje.correoCliente}</TableCell>
                    <TableCell>{mensaje.numeroCelular}</TableCell>
                    <TableCell>{mensaje.descripcion}</TableCell>
                    <TableCell>{mensaje.respuesta}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={3} align="center">
                    No hay mensajes respondidos disponibles.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>

        <Button
          component={Link}
          to="/responder-solicitudes" // Redirección a solicitudes pendientes
          variant="outlined"
          sx={{ mt: 4, color: '#0077b6', borderColor: '#0077b6' }}
        >
          Volver a Responder Solicitudes
        </Button>

        <Snackbar open={openSnackbar} autoHideDuration={3000} onClose={handleCloseSnackbar}>
          <MuiAlert elevation={6} variant="filled" onClose={handleCloseSnackbar} severity="success">
            Mensajes respondidos cargados correctamente.
          </MuiAlert>
        </Snackbar>
      </Container>
    </Box>
  );
};

export default MensajesRespondidos;
