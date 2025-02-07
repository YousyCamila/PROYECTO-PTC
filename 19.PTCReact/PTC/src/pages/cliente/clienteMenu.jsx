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
  Snackbar,
  IconButton,
  Tooltip,
} from '@mui/material';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import NavbarSidebarCliente from './NavbarSidebarCliente';
import CasoDetailsMenu from './CasoDetailsMenu';

const ClienteMenu = () => {
  const { user } = useContext(AuthContext); // Contexto de autenticación
  const [casos, setCasos] = useState([]); // Lista de casos asociados al cliente
  const [openSnackbar, setOpenSnackbar] = useState(false); // Estado para el Snackbar
  const [snackbarMessage, setSnackbarMessage] = useState(''); // Mensaje del Snackbar
  const [selectedCaso, setSelectedCaso] = useState(null); // Caso seleccionado para detalles
  const navigate = useNavigate();

  const email = localStorage.getItem('email_cliente'); // Email del cliente
  console.log('Email obtenido:', email); // Verificar si se recibe el email
  const API_URL = 'http://localhost:3000/api';

  useEffect(() => {
    if (email) {
      fetchCasosByEmail(email); // Cargar casos asociados al cargar el componente
    }
  }, [email]);

  /**
   * Lógica para obtener casos asociados por email del cliente
   * @param {string} emailCliente
   */
  const fetchCasosByEmail = async (emailCliente) => {
    try {
      const response = await fetch(`${API_URL}/caso/cliente/email/${emailCliente}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });

      const data = await response.json();
      console.log('Respuesta del backend:', data); // Depuración: Inspección de datos

      if (response.ok) {
        setCasos(data.casos || []); // Asegúrate de usar solo la lista de casos
      } else {
        throw new Error(data.message || 'Error al buscar los casos');
      }
    } catch (error) {
      console.error('Error al obtener los casos:', error);
      setSnackbarMessage(`Error al buscar los casos: ${error.message}`);
      setOpenSnackbar(true);
    }
  };

  /**
   * Manejo de la selección de un caso para mostrar detalles
   * @param {Object} caso
   */
  const handleOpenCasoDetails = (caso) => {
    setSelectedCaso(caso); // Guardar el caso seleccionado
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
      {/* Barra de navegación superior */}
      <NavbarSidebarCliente
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
          Casos Asociados al Cliente
        </Typography>

        {/* Tabla de casos */}
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#005f91', color: 'white' }}>
                  Nombre del Caso
                </TableCell>
                <TableCell sx={{ fontWeight: 'bold', backgroundColor: '#005f91', color: 'white' }}>
                  Detective Asignado
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
                    <TableCell>
                      {caso.idDetective
                        ? `${caso.idDetective.nombres} ${caso.idDetective.apellidos}`
                        : 'Detective no asignado'}
                    </TableCell>
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
                    No hay casos asociados para este cliente.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>

      {/* Snackbar para errores */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenSnackbar(false)}
        message={snackbarMessage}
      />

      {/* Menú de detalles del caso */}
      {selectedCaso && <CasoDetailsMenu caso={selectedCaso} onClose={() => setSelectedCaso(null)} />}
    </Box>
  );
};

export default ClienteMenu;