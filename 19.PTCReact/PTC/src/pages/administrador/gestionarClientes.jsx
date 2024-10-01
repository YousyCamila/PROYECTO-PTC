import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Snackbar,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const GestionarClientes = () => {
  const [clientes, setClientes] = useState([]);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const navigate = useNavigate();

  // Fetch clientes from the API
  const fetchClientes = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/clientes");
      const data = await response.json();
      setClientes(data);
    } catch (error) {
      console.error("Error fetching clientes:", error);
      setSnackbarMessage('Error al cargar los clientes');
      setOpenSnackbar(true);
    }
  };

  useEffect(() => {
    fetchClientes();
  }, []);

  const handleEdit = (clienteId) => {
    navigate(`/editar-cliente/${clienteId}`);
  };

  const handleDeactivate = async (clienteId) => {
    const confirm = await Swal.fire({
      title: '¿Estás seguro?',
      text: "Cambiará el estado del cliente a inactivo.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, desactivar',
    });

    if (confirm.isConfirmed) {
      try {
        // Llamar a la API para desactivar el cliente
        await fetch(`http://localhost:3000/api/clientes/${clienteId}`, {
          method: 'DELETE', // Asegúrate de que esto se maneje en tu backend para cambiar el estado
        });

        // Actualizar el estado del cliente en la tabla
        setClientes(prevClientes => prevClientes.map(cliente => 
          cliente._id === clienteId ? { ...cliente, activo: false } : cliente
        ));
        Swal.fire('Desactivado!', 'El cliente ha sido desactivado.', 'success');
      } catch (error) {
        console.error("Error al desactivar cliente:", error);
        setSnackbarMessage('No se pudo desactivar el cliente.');
        setOpenSnackbar(true);
      }
    }
  };

  const handleCreate = () => {
    navigate('/crear-cliente');
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const handleBack = () => {
    navigate(-1); // Navegar hacia atrás
  };

  return (
    <Box
      sx={{
        width: '100vw',
        height: '100vh',
        background: 'linear-gradient(to right, #001f3f, #0077b6)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Container maxWidth="lg" sx={{ background: 'white', borderRadius: 2, padding: 4, boxShadow: 3 }}>
        <Typography variant="h4" component="h1" gutterBottom sx={{ textAlign: 'center', color: '#0077b6' }}>
          Gestionar Clientes
        </Typography>
        <Button
          variant="contained"
          onClick={handleCreate}
          sx={{
            backgroundColor: '#0077b6',
            '&:hover': { backgroundColor: '#005f91' },
            mb: 2,
          }}
        >
          Crear Cliente
        </Button>
        <Button
          variant="outlined"
          onClick={handleBack}
          sx={{
            color: '#0077b6',
            borderColor: '#0077b6',
            mb: 2,
            '&:hover': { backgroundColor: '#e0e0e0' },
          }}
        >
          Volver
        </Button>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#005f91', color: 'white' }}><strong>Nombre</strong></TableCell>
                <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#005f91', color: 'white' }}><strong>Activo</strong></TableCell>
                <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#005f91', color: 'white' }}><strong>Fecha de Nacimiento</strong></TableCell>
                <TableCell align="right" sx={{ fontWeight: 'bold', backgroundColor: '#005f91', color: 'white' }}><strong>Acciones</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {clientes.map((cliente) => (
                <TableRow key={cliente._id}>
                  <TableCell>{cliente.nombres} {cliente.apellidos}</TableCell>
                  <TableCell>{cliente.activo ? 'Sí' : 'No'}</TableCell>
                  <TableCell>{new Date(cliente.fechaNacimiento).toLocaleDateString()}</TableCell>
                  <TableCell align="right">
                    <IconButton onClick={() => handleEdit(cliente._id)} color="primary">
                      <EditIcon />
                    </IconButton>
                    <IconButton onClick={() => handleDeactivate(cliente._id)} color="error">
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Snackbar
          open={openSnackbar}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
          message={snackbarMessage}
        />
      </Container>
    </Box>
  );
};

export default GestionarClientes;
