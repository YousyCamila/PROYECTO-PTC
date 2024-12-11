import React, { useContext, useEffect, useState } from 'react';
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
  IconButton,
  Tooltip,
} from '@mui/material';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import NavbarSidebarDetective from './NavbarSidebarDetective';
import CasoDetailsMenu from './DetectiveCasoDetailsMenu';

const DetectiveMenu = () => {
  const { user } = useContext(AuthContext);
  const [casos, setCasos] = useState([]);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [selectedCaso, setSelectedCaso] = useState(null);
  const navigate = useNavigate();

  const email = localStorage.getItem('email');
  const API_URL = 'http://localhost:3000/api';

  useEffect(() => {
    if (email) {
      fetchCasosAsignados(email);
    }
  }, [email]);

  const fetchCasosAsignados = async (emailDetective) => {
    try {
      const response = await fetch(`${API_URL}/caso/detective/email/${emailDetective}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });
      const data = await response.json();
      if (response.ok) {
        setCasos(data); // Guardamos los casos asignados al detective
      } else {
        throw new Error(data.message || 'Error al buscar los casos');
      }
    } catch (error) {
      setSnackbarMessage(`Error al buscar los casos: ${error.message}`);
      setOpenSnackbar(true);
    }
  };

  const handleOpenCasoDetails = (caso) => {
    setSelectedCaso(caso);
  };

  return (
    <Box
      sx={{
        width: '100vw',
        height: '100vh',
        background: 'linear-gradient(to right, #ffffff, #e0e0e0)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        position: 'relative',
      }}
    >
      <NavbarSidebarDetective
        sx={{
          position: 'fixed',
          top: 0,
          width: '100%',
          zIndex: 1000,
          boxShadow: 3,
        }}
      />

      <Container
        maxWidth="lg"
        sx={{
          background: 'white',
          borderRadius: 2,
          padding: 4,
          boxShadow: 3,
          marginTop: '80px',
        }}
      >
        <Typography
          variant="h4"
          component="h1"
          gutterBottom
          sx={{ textAlign: 'center', color: '#000000' }}
        >
          Casos Asignados al Detective
        </Typography>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
          <Button variant="outlined" color="primary" onClick={() => fetchCasosAsignados(email)}>
            Cargar Casos Asignados
          </Button>
        </Box>

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#005f91', color: 'white' }}>
                  Nombre del Caso
                </TableCell>
                <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#005f91', color: 'white' }}>
                  Cliente Asociado
                </TableCell>
                <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#005f91', color: 'white' }}>
                  Estado
                </TableCell>
                <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#005f91', color: 'white' }}>
                  Acciones
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {casos.length > 0 ? (
                casos.map((caso) => (
                  <TableRow key={caso._id}>
                    <TableCell>{caso.nombreCaso}</TableCell>
                    <TableCell>{caso.nombreCliente}</TableCell>
                    <TableCell>{caso.activo ? 'Activo' : 'Inactivo'}</TableCell>
                    <TableCell>
                      <Tooltip title="Ver los detalles de este caso" arrow>
                        <IconButton onClick={() => handleOpenCasoDetails(caso)}>
                          <MenuOpenIcon color="secondary" />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} sx={{ textAlign: 'center' }}>
                    No hay casos asignados a este detective.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenSnackbar(false)}
        message={snackbarMessage}
      />

      {selectedCaso && <CasoDetailsMenu caso={selectedCaso} onClose={() => setSelectedCaso(null)} />}
    </Box>
  );
};

export default DetectiveMenu;
