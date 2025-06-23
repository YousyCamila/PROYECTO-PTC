import React, { useState, useEffect, useCallback } from 'react';
import {
  ThemeProvider,
  createTheme,
  CssBaseline
} from '@mui/material';
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

const GestionarDetectives = () => {
  const [mode, setMode] = useState('dark');
  const [detectives, setDetectives] = useState([]);
  const [filteredDetectives, setFilteredDetectives] = useState([]);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [highlightedDetective, setHighlightedDetective] = useState(null);
  const navigate = useNavigate();

  const theme = createTheme({
    palette: {
      mode,
      primary: {
        main: mode === 'dark' ? '#3498db' : '#2980b9',
      },
      secondary: {
        main: mode === 'dark' ? '#2ecc71' : '#27ae60',
      },
      background: {
        default: mode === 'dark' ? '#0a1929' : '#ffffff', // Lighter background for clear mode
        paper: mode === 'dark' ? '#1a2027' : '#f0f2f5', // Soft background for paper elements
      },
      text: {
        primary: mode === 'dark' ? '#ffffff' : '#000000', // Pure white/black for maximum contrast
        secondary: mode === 'dark' ? '#b2bac2' : '#333333', // Adjusted secondary text color
      },
      action: {
        hover: mode === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,119,182,0.05)',
      },
    },
    typography: {
      fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
      h4: {
        fontWeight: 700,
        color: mode === 'dark' ? '#e0e0e0' : '#2c3e50',
      },
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: 'none',
            borderRadius: '12px',
            fontWeight: 600,
          },
        },
      },
      MuiTableCell: {
        styleOverrides: {
          root: {
            color: mode === 'dark' ? '#ffffff' : '#000000', // Ensure maximum readability
            backgroundColor: mode === 'dark' ? '#1a2027' : '#ffffff',
            borderColor: mode === 'dark' ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.1)', // Clear border
          },
          head: {
            fontWeight: 'bold',
            color: mode === 'dark' ? '#ffffff' : '#000000', // High contrast for headers
          },
        },
      },
      MuiTable: {
        styleOverrides: {
          root: {
            backgroundColor: mode === 'dark' ? '#1a2027' : '#ffffff',
          },
        },
      },
    },
  });


  // Toggle theme mode
  const toggleThemeMode = () => {
    setMode(prevMode => prevMode === 'dark' ? 'light' : 'dark');
  };

  const fetchDetectives = useCallback(async () => {
    try {
      const response = await fetch("https://proyecto-ptc.onrender.com/api/detectives");
      const data = await response.json();
      setDetectives(data);
      setFilteredDetectives(data);
    } catch (error) {
      console.error("Error fetching detectives:", error);
      setSnackbarMessage('Error al cargar los detectives');
      setOpenSnackbar(true);
    }
  }, []);

  useEffect(() => {
    fetchDetectives();
  }, [fetchDetectives]);

  const handleSearch = (term) => {
    // Resetear el detective destacado
    setHighlightedDetective(null);

    // Filtrar detectives
    const filtered = detectives.filter((detective) => {
      const matchNumeroDocumento = detective.numeroDocumento.includes(term);
      const matchNombres = detective.nombres.toLowerCase().includes(term.toLowerCase());
      const matchApellidos = detective.apellidos.toLowerCase().includes(term.toLowerCase());
      const matchEspecialidad =
        typeof detective.especialidad === 'string' &&
        detective.especialidad.toLowerCase().includes(term.toLowerCase());

      // Si encuentra coincidencia exacta por número de documento, resaltar
      if (matchNumeroDocumento) {
        setHighlightedDetective(detective._id);
      }

      return matchNumeroDocumento || matchNombres || matchApellidos || matchEspecialidad;
    });

    // Actualizar detectives filtrados
    setFilteredDetectives(filtered);
    setSearchTerm(term);

    // Mostrar mensaje si no hay resultados
    if (filtered.length === 0) {
      setSnackbarMessage('No se encontraron detectives');
      setOpenSnackbar(true);
    }
  };

  const handleEdit = (detectiveId) => {
    navigate(`/editar-detective/${detectiveId}`);
  };

  const handleDetails = (detectiveId) => {
    navigate(`/detalles-detective/${detectiveId}`);
  };

  const handleDeactivate = async (detectiveId) => {
    const confirm = await Swal.fire({
      title: '¿Estás seguro?',
      text: "Cambiará el estado del detective a inactivo.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, desactivar',
      cancelButtonText: 'Cancelar'
    });

    if (confirm.isConfirmed) {
      try {
        const response = await fetch(`https://proyecto-ptc.onrender.com/api/detectives/${detectiveId}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ activo: false }),
        });

        if (response.ok) {
          const updatedDetectives = detectives.map(detective =>
            detective._id === detectiveId ? { ...detective, activo: false } : detective
          );
          setDetectives(updatedDetectives);
          
          setFilteredDetectives(updatedDetectives);
          Swal.fire('Desactivado!', 'El detective ha sido desactivado.', 'success');
        } else {
          throw new Error('Error al desactivar el detective');
        }
      } catch (error) {
        console.error("Error al desactivar detective:", error);
        setSnackbarMessage('No se pudo desactivar el detective.');
        setOpenSnackbar(true);
      }
    }
  };

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
            Gestión de Detectives
          </Typography>

          <Box sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mb: 3
          }}>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={() => navigate('/crear-detective')}
                sx={{
                  backgroundColor: '#0077b6',
                  '&:hover': { backgroundColor: '#005f91' },
                  borderRadius: '12px',
                  textTransform: 'none',
                  fontWeight: 600
                }}
              >
                Crear Detective
              </Button>
              <Button
                variant="outlined"
                startIcon={<BackIcon />}
                onClick={() => navigate('/admin-menu')}
                sx={{
                  color: '#0077b6',
                  borderColor: '#0077b6',
                  borderRadius: '12px',
                  textTransform: 'none',
                  '&:hover': {
                    backgroundColor: 'rgba(0,119,182,0.1)'
                  }
                }}
              >
                Volver al Menú
              </Button>
            </Box>

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
                  placeholder="Buscar detective"
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

          <TableContainer
            component={Paper}
            sx={{
              borderRadius: '12px',
              backgroundColor: '#333',
              boxShadow: '0 4px 15px rgba(0,0,0,0.1)'
            }}
          >
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  {['Número de Documento', 'Nombre', 'Especialidad','Activo', 'Acciones'].map((header) => (
                    <TableCell key={header} sx={{ color: '#0077b6', fontWeight: 'bold', textTransform: 'uppercase' }}>
                      {header}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredDetectives.map((detective) => (
                  <TableRow
                    key={detective._id}
                    sx={{
                      backgroundColor: highlightedDetective === detective._id ? '#444' : 'transparent',
                      '&:hover': { backgroundColor: '#444' }
                    }}
                  >


                    <TableCell sx={{color: theme.palette.mode === 'dark' ? '#ffffff' : '#000000',}}>{detective.numeroDocumento}</TableCell>
                    <TableCell sx={{color: theme.palette.mode === 'dark' ? '#ffffff' : '#000000',}}>{detective.nombres} {detective.apellidos}</TableCell>
                  
                    <TableCell sx={{color: theme.palette.mode === 'dark' ? '#ffffff' : '#000000',}}>
                      {detective.especialidad ? detective.especialidad : 'N/A'}
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={detective.activo ? 'Activo' : 'Inactivo'}
                        color={detective.activo ? 'success' : 'error'}
                        sx={{ fontWeight: 'bold' }}
                      />
                    </TableCell>
                    <TableCell>



                      <Tooltip title="Ver detalles" arrow>
                        <IconButton onClick={() => handleDetails(detective._id)}>
                          <VisibilityIcon sx={{ color: '#0077b6' }} />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Editar" arrow>
                        <IconButton onClick={() => handleEdit(detective._id)}>
                          <EditIcon sx={{ color: '#0077b6' }} />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Desactivar" arrow>
                        <IconButton onClick={() => handleDeactivate(detective._id)}>
                          <DeleteIcon sx={{ color: '#d32f2f' }} />
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
            autoHideDuration={3000}
            onClose={() => setOpenSnackbar(false)}
            message={snackbarMessage}
          />
        </Container>
      </Box>
    </ThemeProvider>

  );
};

export default GestionarDetectives;
