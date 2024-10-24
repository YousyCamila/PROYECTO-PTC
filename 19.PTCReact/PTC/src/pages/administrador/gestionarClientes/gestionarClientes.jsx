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
  Tooltip,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
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

  const handleDetails = (clienteId) => {
    navigate(`/detalles-cliente/${clienteId}`);
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
        await fetch(`http://localhost:3000/api/clientes/${clienteId}`, {
          method: 'DELETE',
        });
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
    navigate('/admin-menu'); // Navegar al menú administrativo
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
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
          <Button
            variant="contained"
            onClick={handleCreate}
            sx={{
              backgroundColor: '#0077b6',
              '&:hover': { backgroundColor: '#005f91' },
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
              '&:hover': { backgroundColor: '#e0e0e0' },
            }}
          >
            Volver al Menú
          </Button>
        </Box>
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
                    <Tooltip title="Ver Detalles" arrow>
                      <IconButton onClick={() => handleDetails(cliente._id)} color="primary">
                        <VisibilityIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Editar Cliente" arrow>
                      <IconButton onClick={() => handleEdit(cliente._id)} color="primary">
                        <EditIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Desactivar Cliente" arrow>
                      <IconButton onClick={() => handleDeactivate(cliente._id)} color="error">
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
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
