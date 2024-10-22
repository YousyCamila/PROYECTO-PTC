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
} from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom'; // Importa Link

const MensajesRespondidos = () => {
  const [mensajes, setMensajes] = useState([]);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  useEffect(() => {
    const fetchMensajes = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/mensajes-respondidos'); // Asegúrate de que esta ruta sea correcta
        const data = await response.json();
        setMensajes(data);
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
      }}
    >
      <Container
        maxWidth="lg"
        sx={{
          backgroundColor: 'white',
          padding: 4,
          borderRadius: 2,
          boxShadow: 3,
        }}
      >
        <Typography variant="h4" gutterBottom sx={{ textAlign: 'center', color: '#0077b6' }}>
          Mensajes Respondidos
        </Typography>

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Nombre</TableCell>
                <TableCell>Correo</TableCell>
                <TableCell>Respuesta</TableCell>
                <TableCell>Fecha de Respuesta</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {mensajes.map((mensaje) => (
                <TableRow key={mensaje._id}>
                  <TableCell>{mensaje.nombre}</TableCell>
                  <TableCell>{mensaje.correoCliente}</TableCell>
                  <TableCell>{mensaje.respuesta}</TableCell>
                  <TableCell>{new Date(mensaje.fechaRespuesta).toLocaleDateString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Button
          component={Link} // Hacemos que el botón sea un enlace
          to="/responder-solicitudes" // Ruta de regreso a las solicitudes
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
