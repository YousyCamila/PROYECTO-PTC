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
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';

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
import { useNavigate } from 'react-router-dom';
import NavbarSidebar from '../NavbarSidebar';
import Swal from 'sweetalert2';


const ClienteButton = ({ cliente }) => {
  const isActive = cliente.activo;

  return (
    <Button
      variant="contained"
      sx={{
        backgroundColor: isActive ? '#2ecc71' : '#e74c3c',
        color: '#fff',
        fontWeight: 'bold',
        borderRadius: '12px',
      }}
    >
      {isActive ? 'Activo' : 'Inactivo'}
    </Button>
  );
};

const GestionarClientes = () => {
  const [mode, setMode] = useState('dark');
  const [clientes, setClientes] = useState([]);
  const [filteredClientes, setFilteredClientes] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [highlightedCliente, setHighlightedCliente] = useState(null);
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
            color: mode === 'dark' ? '#ffffff' : '#000000',
            backgroundColor: mode === 'dark' ? '#1a2027' : '#ffffff',
            borderColor: mode === 'dark' ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.1)',
          },
          head: {
            fontWeight: 'bold',
            color: mode === 'dark' ? '#ffffff' : '#000000',
            textAlign: 'center', // Ensure headers are centered
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


  const toggleThemeMode = () => {
    setMode(prevMode => prevMode === 'dark' ? 'light' : 'dark');
  };

  const fetchClientes = useCallback(async () => {
    try {
      const response = await fetch("http://localhost:3000/api/clientes");
      const data = await response.json();
      setClientes(data);
      setFilteredClientes(data);
    } catch (error) {
      console.error("Error fetching clientes:", error);
    }
  }, []);

  useEffect(() => {
    fetchClientes();
  }, [fetchClientes]);
  const handleSearch = (term) => {
    setHighlightedCliente(null);

    // Filtrar clientes por número de documento o incluir los inactivos
    const filtered = clientes.filter((cliente) => {
      const matchNumeroDocumento = cliente.numeroDocumento.includes(term);
      const matchActivo = cliente.activo === false || cliente.activo === true; // Incluir clientes activos e inactivos

      if (matchNumeroDocumento && matchActivo) {
        setHighlightedCliente(cliente._id);
        return true;
      }

      return false;
    });

    setFilteredClientes(filtered);
    setSearchTerm(term);

    if (filtered.length === 0) {
      setSnackbarMessage('No se encontraron clientes');
      setOpenSnackbar(true);
    }
  };



  const handleEdit = (clienteId) => {
    navigate(`/editar-cliente/${clienteId}`);
  };

  const handleDetails = (clienteId) => {
    navigate(`/detalles-cliente/${clienteId}`);
  };


  const handleDeactivate = async (clienteId) => {
    const confirm = await Swal.fire({
      title: '¿Estás seguro?',
      text: 'Cambiará el estado del cliente a inactivo.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, desactivar',
    });

    if (confirm.isConfirmed) {
      try {
        // Cambiar el método de DELETE a PATCH para actualizar el estado del cliente
        const response = await fetch(`http://localhost:3000/api/clientes/${clienteId}`, {
          method: 'PATCH', // Cambiado a PATCH para actualización
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            activo: false, // Cambiar el estado a inactivo
          }),
        });

        if (!response.ok) {
          throw new Error('Error al desactivar cliente');
        }

        // Actualizar el estado de los clientes localmente
        setClientes((prevClientes) =>
          prevClientes.map((cliente) =>
            cliente._id === clienteId ? { ...cliente, activo: false } : cliente
          )
        );


        Swal.fire('Desactivado!', 'El cliente ha sido desactivado.', 'success');
      } catch (error) {
        console.error('Error al desactivar cliente:', error);
        setSnackbarMessage('No se pudo desactivar el cliente.');
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

        <IconButton
          onClick={toggleThemeMode}
          sx={{
            position: 'absolute',
            top: 80,
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
            Gestión de Clientes
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
                onClick={() => navigate('/crear-cliente')}
                sx={{
                  backgroundColor: '#0077b6',
                  '&:hover': { backgroundColor: '#005f91' },
                  borderRadius: '12px',
                  textTransform: 'none',
                  fontWeight: 600
                }}
              >
                Crear Cliente
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
                  placeholder="Buscar cliente"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  style={{
                    border: 'none',
                    outline: 'none',
                    width: '200px',
                    backgroundColor: 'transparent',
                    color: '#e0e0e0'
                  }}
                />
              </Box>
              <Button
                variant="contained"
                onClick={() => handleSearch(searchTerm)}
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
              boxShadow: 3
            }}
          >
            <Table sx={{ minWidth: 650 }} aria-label="table of clientes">
              <TableHead>
                <TableRow>
                  <TableCell sx={{ textAlign: 'center', color: theme.palette.text.primary }}>Número Documento</TableCell>
                  <TableCell sx={{ textAlign: 'center', color: theme.palette.text.primary }}>Nombre</TableCell>
                  <TableCell sx={{ textAlign: 'center', color: theme.palette.text.primary }}>Correo</TableCell>
                  <TableCell sx={{ textAlign: 'center', color: theme.palette.text.primary }}>Estado</TableCell>
                  <TableCell sx={{ textAlign: 'center', color: theme.palette.text.primary }}>Acciones</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredClientes.map((cliente) => (
                  <TableRow
                    key={cliente.numeroDocumento}
                    hover
                    onClick={() => setHighlightedCliente(cliente.numeroDocumento)}
                    sx={{
                      backgroundColor:
                        cliente.numeroDocumento === highlightedCliente ? '#f1f1f1' : 'transparent',
                      cursor: 'pointer'
                    }}
                  >
                    <TableCell sx={{ textAlign: 'center', color: theme.palette.text.primary }}>
                      {cliente.numeroDocumento}
                    </TableCell>
                    <TableCell sx={{ textAlign: 'center', color: theme.palette.text.primary }}>
                      {cliente.nombres} {cliente.apellidos}
                    </TableCell>
                    <TableCell sx={{ textAlign: 'center', color: theme.palette.text.primary }}>
                      {cliente.correo}
                    </TableCell>
                    <TableCell sx={{ textAlign: 'center' }}>
                      <Chip
                        label={cliente.activo ? 'Activo' : 'Inactivo'}
                        color={cliente.activo ? 'success' : 'error'}
                        size="small"
                        sx={{
                          cursor: 'pointer',
                        }}
                      />
                    </TableCell>

                    <TableCell sx={{ textAlign: 'center' }}>
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
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default GestionarClientes;
