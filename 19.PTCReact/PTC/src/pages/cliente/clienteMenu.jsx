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
  Button,
  Snackbar,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
} from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import VisibilityIcon from '@mui/icons-material/Visibility';
import AddIcon from '@mui/icons-material/Add';

const ClienteMenu = () => {
  const { id } = useParams(); // Obtener el ID del cliente de la URL
  const [casos, setCasos] = useState([]); // Lista de casos
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [casoId, setCasoId] = useState(''); // ID del caso a agregar
  const navigate = useNavigate();

  // Fetch casos por cliente ID
  const fetchCasos = async () => {
    try {
      const response = await fetch(`http://localhost:3000/api/cliente-casos/${id}`);
      const data = await response.json();

      if (response.ok) {
        setCasos(data);
      } else {
        throw new Error(data.error);
      }
    } catch (error) {
      console.error("Error fetching casos:", error);
      setSnackbarMessage('Error al cargar los casos');
      setOpenSnackbar(true);
    }
  };

  // Fetch caso por ID
  const fetchCasoById = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/api/caso/${id}`);
      const data = await response.json();

      if (response.ok) {
        if (!casos.some(caso => caso._id === data._id)) {
          setCasos(prev => [...prev, data]); // Agregar el caso si no está en la lista
        } else {
          Swal.fire('El caso ya está asociado al cliente.');
        }
      } else {
        throw new Error(data.error);
      }
    } catch (error) {
      console.error("Error fetching caso:", error);
      setSnackbarMessage('Error al cargar el caso');
      setOpenSnackbar(true);
    }
  };

  const handleViewDetails = (caso) => {
    Swal.fire({
      title: `Detalles del Caso: ${caso.nombreCaso}`,
      html: `
        <p><strong>Nombre del Caso:</strong> ${caso.nombreCaso}</p>
        <p><strong>Detective Asignado:</strong> ${caso.idDetective ? `${caso.idDetective.nombres} ${caso.idDetective.apellidos}` : 'No asignado'}</p>
        <p><strong>Estado:</strong> ${caso.activo ? 'Activo' : 'Inactivo'}</p>
        <p><strong>ID del Caso:</strong> ${caso._id}</p>
        <p><strong>Evidencias:</strong> ${caso.evidencias.length > 0 ? caso.evidencias.join(', ') : 'No hay evidencias asociadas.'}</p>
      `,
      icon: 'info',
      confirmButtonText: 'Cerrar',
    });
  };

  const handleAgregarEvidencia = (casoId) => {
    navigate(`/agregar-evidencia/${casoId}`); // Redirigir a la vista de agregar evidencia
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const handleBack = () => {
    navigate('/login'); // Redirigir a la página de inicio de sesión
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setCasoId('');
  };

  const handleAddCaso = () => {
    fetchCasoById(casoId);
    handleCloseDialog();
  };

  useEffect(() => {
    fetchCasos(); // Fetch casos cuando el componente se monta
  }, [id]);

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
      <Container maxWidth="lg" sx={{ background: 'white', borderRadius: 2, padding: 4, boxShadow: 3 }}>
        <Typography variant="h4" component="h1" gutterBottom sx={{ textAlign: 'center', color: '#0077b6' }}>
          Casos Asociados al Cliente
        </Typography>
        
        <Button variant="outlined" onClick={handleOpenDialog} sx={{ mb: 2, color: '#0077b6', borderColor: '#0077b6' }}>
          Agregar ID de Caso
        </Button>

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#005f91', color: 'white' }}>Nombre del Caso</TableCell>
                <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#005f91', color: 'white' }}>Detective Asignado</TableCell>
                <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#005f91', color: 'white' }}>Estado</TableCell>
                <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#005f91', color: 'white' }}>ID del Caso</TableCell>
                <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#005f91', color: 'white' }}>Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {casos.map((caso) => (
                <TableRow key={caso._id}>
                  <TableCell>{caso.nombreCaso}</TableCell>
                  <TableCell>{caso.idDetective ? `${caso.idDetective.nombres} ${caso.idDetective.apellidos}` : 'No asignado'}</TableCell>
                  <TableCell>{caso.activo ? 'Activo' : 'Inactivo'}</TableCell>
                  <TableCell>{caso._id}</TableCell>
                  <TableCell>
                    <IconButton onClick={() => handleViewDetails(caso)}>
                      <VisibilityIcon color="primary" />
                    </IconButton>
                    <IconButton onClick={() => handleAgregarEvidencia(caso._id)}>
                      <AddIcon color="secondary" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
          <Button 
            variant="outlined" 
            onClick={handleBack} 
            sx={{ color: '#0077b6', borderColor: '#0077b6', '&:hover': { backgroundColor: '#e0e0e0' } }}
          >
            Volver
          </Button>
        </Box>
      </Container>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        message={snackbarMessage}
      />

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Agregar Caso por ID</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="ID del Caso"
            type="text"
            fullWidth
            variant="outlined"
            value={casoId}
            onChange={(e) => setCasoId(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancelar</Button>
          <Button onClick={handleAddCaso}>Agregar</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ClienteMenu;
