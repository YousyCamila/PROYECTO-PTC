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
import VisibilityIcon from '@mui/icons-material/Visibility'; // Icono para ver detalles
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const GestionarCasos = () => {
  const [casos, setCasos] = useState([]);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const navigate = useNavigate();

  // Fetch casos from the API
  const fetchCasos = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/caso");
      const data = await response.json();
      setCasos(data);
    } catch (error) {
      console.error("Error fetching casos:", error);
      setSnackbarMessage('Error al cargar los casos');
      setOpenSnackbar(true);
    }
  };

  useEffect(() => {
    fetchCasos();
  }, []);

  const handleEdit = (casoId) => {
    navigate(`/editar-caso/${casoId}`);
  };

  const handleDetails = (casoId) => {
    navigate(`/detalles-caso/${casoId}`); // Redirigir a la página de detalles del caso
  };

  const handleDeactivate = async (casoId) => {
    const confirm = await Swal.fire({
      title: '¿Estás seguro?',
      text: "Cambiará el estado del caso a inactivo.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, desactivar',
    });

    if (confirm.isConfirmed) {
      try {
        await fetch(`http://localhost:3000/api/caso/${casoId}`, {
          method: 'DELETE',
        });
        setCasos(prevCasos => prevCasos.map(caso => 
          caso._id === casoId ? { ...caso, activo: false } : caso
        ));
        Swal.fire('Desactivado!', 'El caso ha sido desactivado.', 'success');
      } catch (error) {
        console.error("Error al desactivar caso:", error);
        setSnackbarMessage('No se pudo desactivar el caso.');
        setOpenSnackbar(true);
      }
    }
  };

  const handleCreate = () => {
    navigate('/crear-caso');
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
          Gestionar Casos
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
            Crear Caso
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
                <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#005f91', color: 'white' }}>Nombre del Caso</TableCell>
                <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#005f91', color: 'white' }}>Cliente</TableCell>
                <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#005f91', color: 'white' }}>Detective</TableCell>
                <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#005f91', color: 'white' }}>Activo</TableCell>
                <TableCell align="right" sx={{ fontWeight: 'bold', backgroundColor: '#005f91', color: 'white' }}>Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {casos.map((caso) => (
                <TableRow key={caso._id}>
                  <TableCell>{caso.nombreCaso}</TableCell>
                  <TableCell>{caso.idCliente.nombres} {caso.idCliente.apellidos}</TableCell>
                  <TableCell>{caso.idDetective ? `${caso.idDetective.nombres} ${caso.idDetective.apellidos}` : 'No asignado'}</TableCell>
                  <TableCell>{caso.activo ? 'Sí' : 'No'}</TableCell>
                  <TableCell align="right">
                    <Tooltip title="Ver Detalles" arrow>
                      <IconButton onClick={() => handleDetails(caso._id)} color="primary">
                        <VisibilityIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Editar Caso" arrow>
                      <IconButton onClick={() => handleEdit(caso._id)} color="primary">
                        <EditIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Desactivar Caso" arrow>
                      <IconButton onClick={() => handleDeactivate(caso._id)} color="error">
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

export default GestionarCasos;
