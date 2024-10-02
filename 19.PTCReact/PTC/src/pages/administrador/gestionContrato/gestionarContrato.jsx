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

const GestionarContratos = () => {
  const [contratos, setContratos] = useState([]);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const navigate = useNavigate();

  // Fetch contratos from the API
  const fetchContratos = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/contratos");
      const data = await response.json();
      setContratos(data);
    } catch (error) {
      console.error("Error fetching contratos:", error);
      setSnackbarMessage('Error al cargar los contratos');
      setOpenSnackbar(true);
    }
  };

  useEffect(() => {
    fetchContratos();
  }, []);

  const handleEdit = (contratoId) => {
    navigate(`/editar-contrato/${contratoId}`);
  };

  const handleDetails = (contratoId) => {
    navigate(`/detalles-contrato/${contratoId}`);
  };

  const handleDeactivate = async (contratoId) => {
    const confirm = await Swal.fire({
      title: '¿Estás seguro?',
      text: "Cambiará el estado del contrato a inactivo.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, desactivar',
    });

    if (confirm.isConfirmed) {
      try {
        await fetch(`http://localhost:3000/api/contratos/${contratoId}`, {
          method: 'DELETE',
        });
        setContratos(prevContratos => prevContratos.map(contrato => 
          contrato._id === contratoId ? { ...contrato, estado: false } : contrato
        ));
        Swal.fire('Desactivado!', 'El contrato ha sido desactivado.', 'success');
      } catch (error) {
        console.error("Error al desactivar contrato:", error);
        setSnackbarMessage('No se pudo desactivar el contrato.');
        setOpenSnackbar(true);
      }
    }
  };

  const handleCreate = () => {
    navigate('/crear-contrato');
  };

  const handleBack = () => {
    navigate('/admin-menu'); // Navegar al menú administrativo
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
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
          Gestionar Contratos
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
            Crear Contrato
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
                <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#005f91', color: 'white' }}>Descripción Servicio</TableCell>
                <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#005f91', color: 'white' }}>Cliente</TableCell>
                <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#005f91', color: 'white' }}>Detective</TableCell>
                <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#005f91', color: 'white' }}>Estado</TableCell>
                <TableCell align="right" sx={{ fontWeight: 'bold', backgroundColor: '#005f91', color: 'white' }}>Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {contratos.map((contrato) => (
                <TableRow key={contrato._id}>
                  <TableCell>{contrato.descripcionServicio}</TableCell>
                  <TableCell>{contrato.idCliente ? `${contrato.idCliente.nombres} ${contrato.idCliente.apellidos}` : 'No asignado'}</TableCell>
                  <TableCell>{contrato.idDetective ? `${contrato.idDetective.nombres} ${contrato.idDetective.apellidos}` : 'No asignado'}</TableCell>
                  <TableCell>{contrato.estado ? 'Activo' : 'Inactivo'}</TableCell>
                  <TableCell align="right">
                    <Tooltip title="Ver Detalles" arrow>
                      <IconButton onClick={() => handleDetails(contrato._id)} color="primary">
                        <VisibilityIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Editar Contrato" arrow>
                      <IconButton onClick={() => handleEdit(contrato._id)} color="primary">
                        <EditIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Desactivar Contrato" arrow>
                      <IconButton onClick={() => handleDeactivate(contrato._id)} color="error">
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

export default GestionarContratos;
