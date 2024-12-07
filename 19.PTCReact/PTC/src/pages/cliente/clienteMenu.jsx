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
  CircularProgress,
} from '@mui/material';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import NavbarSidebarCliente from './NavbarSidebarCliente';
import CasoDetailsMenu from './CasoDetailsMenu';

const ClienteMenu = () => {
  const { user } = useContext(AuthContext); // Contexto de autenticación
  const [casos, setCasos] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Indicador de carga
  const [hasError, setHasError] = useState(false); // Indicador de error
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [selectedCaso, setSelectedCaso] = useState(null);
  const navigate = useNavigate();

  const email = user?.email;
  const API_URL = 'http://localhost:3000/api';

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    const fetchCasos = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`${API_URL}/caso/cliente/email/${email}`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        });
        const data = await response.json();

        if (response.ok) {
          setCasos(data.casos || []);
          setHasError(false);
        } else {
          throw new Error(data.message || 'Error al buscar los casos');
        }
      } catch (error) {
        console.error('Error al obtener los casos:', error);
        setSnackbarMessage(`Error al buscar los casos: ${error.message}`);
        setOpenSnackbar(true);
        setHasError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCasos();
  }, [email, user, navigate, API_URL]);

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
      <NavbarSidebarCliente sx={{ position: 'fixed', top: 0, width: '100%', zIndex: 1000, boxShadow: 3 }} />

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

        {isLoading ? (
          <Box sx={{ textAlign: 'center', mt: 4 }}>
            <CircularProgress />
          </Box>
        ) : hasError ? (
          <Typography sx={{ textAlign: 'center', color: 'red', mt: 2 }}>
            Ocurrió un error al cargar los casos.
          </Typography>
        ) : (
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
        )}
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

export default ClienteMenu;
