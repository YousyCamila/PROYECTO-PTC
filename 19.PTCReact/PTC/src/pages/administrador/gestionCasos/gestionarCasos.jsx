
import React, { useState, useEffect, useCallback } from 'react';
import {
  ThemeProvider,
  createTheme,
  CssBaseline,
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
  Chip,
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Visibility as VisibilityIcon,
  Search as SearchIcon,
  Add as AddIcon,
  ArrowBack as BackIcon,
  Brightness4 as DarkModeIcon,
  Brightness7 as LightModeIcon
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import NavbarSidebar from '../NavbarSidebar';

const GestionarCasos = () => {
  const [mode, setMode] = useState('dark');
  const [casos, setCasos] = useState([]);
  const [filteredCasos, setFilteredCasos] = useState([]);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [highlightedCaso, setHighlightedCaso] = useState(null);
  const navigate = useNavigate();

  const theme = createTheme({
    palette: {
      mode,
      primary: { main: mode === 'dark' ? '#3498db' : '#2980b9' },
      secondary: { main: mode === 'dark' ? '#2ecc71' : '#27ae60' },
      background: {
        default: mode === 'dark' ? '#0a1929' : '#ffffff',
        paper: mode === 'dark' ? '#1a2027' : '#f0f2f5',
      },
      text: {
        primary: mode === 'dark' ? '#ffffff' : '#000000',
        secondary: mode === 'dark' ? '#b2bac2' : '#333333',
      },
      action: {
        hover: mode === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,119,182,0.05)',
      },
    },
    typography: {
      fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
      h4: { fontWeight: 700, color: mode === 'dark' ? '#e0e0e0' : '#2c3e50' },
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: { textTransform: 'none', borderRadius: '12px', fontWeight: 600 },
        },
      },
      MuiTableCell: {
        styleOverrides: {
          root: {
            color: mode === 'dark' ? '#ffffff' : '#000000',
            backgroundColor: mode === 'dark' ? '#1a2027' : '#ffffff',
            borderColor: mode === 'dark' ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.1)',
          },
          head: { fontWeight: 'bold', color: mode === 'dark' ? '#ffffff' : '#000000' },
        },
      },
    },
  });

  const toggleThemeMode = () => {
    setMode((prevMode) => (prevMode === 'dark' ? 'light' : 'dark'));
  };

  const fetchCasos = useCallback(async () => {
    try {
      const response = await fetch("http://localhost:3000/api/caso");
      const data = await response.json();
      setCasos(data);
      setFilteredCasos(data);
    } catch (error) {
      console.error("Error fetching casos:", error);
      setSnackbarMessage('Error al cargar los casos');
      setOpenSnackbar(true);
    }
  }, []);

  useEffect(() => {
    fetchCasos();
  }, [fetchCasos]);


  const handleSearch = (term) => {
    setHighlightedCaso(null);
    const filtered = casos.filter((caso) =>
      caso.nombreCaso.toLowerCase().includes(term.toLowerCase()) ||
      caso._id.toString().includes(term) 

    );
    setFilteredCasos(filtered);
  };
  

  const handleEdit = (casoId) => navigate(`/editar-caso/${casoId}`);
  const handleDetails = (casoId) => navigate(`/detalles-caso/${casoId}`);

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
        await fetch(`http://localhost:3000/api/caso/${casoId}`, { method: 'DELETE' });
        fetchCasos();
        Swal.fire('Desactivado!', 'El caso ha sido desactivado.', 'success');
      } catch (error) {
        console.error("Error al desactivar caso:", error);
        setSnackbarMessage('No se pudo desactivar el caso.');
        setOpenSnackbar(true);
      }
    }
  };

  const handleCreate = () => navigate('/crear-caso');
  const handleBack = () => navigate('/admin-menu');
  const handleCloseSnackbar = () => setOpenSnackbar(false);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          width: '100vw',
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          overflow: 'hidden',
          backgroundColor: theme.palette.background.default,
          color: theme.palette.text.primary
        }}
      >
        <NavbarSidebar />

        {/* Add theme toggle button in the top right corner */}
        <IconButton
          onClick={toggleThemeMode}
          sx={{
            position: 'absolute',
            top: 80,  // Moved down from 10 to 80
            right: 10,
            zIndex: 1000
          }}
        >
          {mode === 'dark' ? <LightModeIcon /> : <DarkModeIcon />}
        </IconButton>

        <Container
          maxWidth="lg"
          component={motion.div}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          sx={{
            borderRadius: '16px',
            padding: '2rem',
            boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
            position: 'relative',
            zIndex: 10,
            mt: '6rem',
            mb: '2rem'
          }}
        >
          <Typography
            variant="h4"
            component="h1"
            sx={{
              textAlign: 'center',
              fontWeight: 700,
              mb: 3,
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              color: theme.palette.text.primary
            }}
          >
            Gestión de Casos
          </Typography>

          <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between' }}>
            <Button startIcon={<AddIcon />} variant="contained" onClick={handleCreate}>
              Crear Caso
            </Button>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  border: '1px solid #0077b6',
                  borderRadius: '12px',
                  px: 1,
                  py: 0.5
                }}
              >
                <SearchIcon sx={{ color: '#0077b6', mr: 1 }} />
                <input
                  type="text"
                  placeholder="Buscar caso "
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  style={{
                    border: 'none',
                    outline: 'none',
                    width: '200px',
                    backgroundColor: 'transparent',
                    color: '#e0e0e0' // Cambio de color de texto a claro
                  }}
                />
              </Box>
              <Button
                variant="contained"
                onClick={() => handleSearch(searchTerm)} // Llama a la función con el término actual
                sx={{
                  backgroundColor: '#0077b6',
                  color: '#e0e0e0',
                  borderRadius: '12px',
                  textTransform: 'none',
                  fontWeight: 600,
                  '&:hover': { backgroundColor: '#005f91' },
                }}
              >
                Buscar
              </Button>
            </Box>
          </Box>

          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>ID del Caso </TableCell>
                  <TableCell>Nombre del Caso</TableCell>
                  <TableCell>Cliente</TableCell>
                  <TableCell>Detective</TableCell>
                  <TableCell>Estado</TableCell>
                  <TableCell align="right">Acciones</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredCasos.map((caso) => (
                  <TableRow key={caso._id} hover>
                    <TableCell>{caso._id}</TableCell>
                    <TableCell>{caso.nombreCaso}</TableCell>
                    <TableCell>{caso.idCliente? `${caso.idCliente.nombres} ${caso.idCliente.apellidos}` : 'Sin asignar'}</TableCell>
                    <TableCell>{caso.idDetective? `${caso.idDetective.nombres} ${caso.idDetective.apellidos}`: 'No asignado'}</TableCell>
                    <TableCell>
                      <Chip
                        label={caso.activo ? 'Activo' : 'Inactivo'}
                        color={caso.activo ? 'success' : 'default'}
                      />
                    </TableCell>
                    <TableCell align="right">
                      <Tooltip title="Detalles">
                        <IconButton onClick={() => handleDetails(caso._id)} color="primary">
                          <VisibilityIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Editar">
                        <IconButton onClick={() => handleEdit(caso._id)} color="primary">
                          <EditIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Desactivar">
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
    </ThemeProvider>
  );
};

export default GestionarCasos;
