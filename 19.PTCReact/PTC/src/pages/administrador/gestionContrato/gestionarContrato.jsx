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
import { useNavigate } from 'react-router-dom';
import NavbarSidebar from '../NavbarSidebar';
import Swal from 'sweetalert2';

const GestionarContratos = () => {
  const [mode, setMode] = useState('dark');
  const [contratos, setContratos] = useState([]);
  const [filteredContratos, setFilteredContratos] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [highlightedContrato, setHighlightedContrato] = useState(null);
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
            textAlign: 'center',
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

  const fetchContratos = useCallback(async () => {
    try {
      const response = await fetch("https://proyecto-ptc.onrender.com/api/contratos");
      const data = await response.json();
      setContratos(data);
      setFilteredContratos(data);
    } catch (error) {
      console.error("Error fetching contratos:", error);
    }
  }, []);

  useEffect(() => {
    fetchContratos();
  }, [fetchContratos]);

  const handleSearch = (term) => {
    setHighlightedContrato(null);

    const filtered = contratos.filter((contrato) =>
      contrato._id.toString().includes(term)

    );

    setFilteredContratos(filtered);
  };

  const handleEdit = (contratoId) => {
    navigate(`/editar-contrato/${contratoId}`);
  };

  const handleDetails = (contratoId) => {
    navigate(`/detalles-contrato/${contratoId}`);
  };

  const handleDeactivate = async (contratoId) => {
    const confirm = await Swal.fire({
      title: '¿Estás seguro?',
      text: 'Cambiará el estado del contrato a inactivo.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, desactivar',
    });

    if (confirm.isConfirmed) {
      try {
        const response = await fetch(`https://proyecto-ptc.onrender.com/api/contratos/${contratoId}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          // Actualiza el estado directamente sin recargar
          setContratos((prevContratos) =>
            prevContratos.map((contrato) =>
              contrato._id === contratoId ? { ...contrato, estado: false } : contrato
            )
          );

          setFilteredContratos((prevFiltered) =>
            prevFiltered.map((contrato) =>
              contrato._id === contratoId ? { ...contrato, estado: false } : contrato
            )
          );

          Swal.fire('Desactivado!', 'El contrato ha sido desactivado.', 'success');
        } else {
          throw new Error('Error al desactivar el contrato.');
        }
      } catch (error) {
        console.error('Error al desactivar contrato:', error);
        Swal.fire('Error', 'No se pudo desactivar el contrato.', 'error');
      }
    }
  };


  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ width: '100vw', minHeight: '100vh', display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden', backgroundColor: theme.palette.background.default, color: theme.palette.text.primary }}>
        <NavbarSidebar />
        <IconButton onClick={toggleThemeMode} sx={{ position: 'absolute', top: 80, right: 10, zIndex: 1000 }}>
          {mode === 'dark' ? <LightModeIcon /> : <DarkModeIcon />}
        </IconButton>
        <Container maxWidth="lg" component={motion.div} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} sx={{ borderRadius: '16px', padding: '2rem', boxShadow: '0 10px 30px rgba(0,0,0,0.1)', position: 'relative', zIndex: 10, mt: '6rem', mb: '2rem' }}>
          <Typography variant="h4" component="h1" sx={{ textAlign: 'center', fontWeight: 700, mb: 3, textTransform: 'uppercase', letterSpacing: '0.05em', color: theme.palette.text.primary }}>
            Gestión de Contratos
          </Typography>

          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Button variant="contained" startIcon={<AddIcon />} onClick={() => navigate('/crear-contrato')} sx={{ backgroundColor: '#0077b6', '&:hover': { backgroundColor: '#005f91' }, borderRadius: '12px', textTransform: 'none', fontWeight: 600 }}>
                Crear Contrato
              </Button>
              <Button variant="outlined" startIcon={<BackIcon />} onClick={() => navigate('/admin-menu')} sx={{ color: '#0077b6', borderColor: '#0077b6', borderRadius: '12px', textTransform: 'none', '&:hover': { backgroundColor: 'rgba(0,119,182,0.1)' } }}>
                Volver al Menú
              </Button>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', border: '1px solid #0077b6', borderRadius: '12px', px: 1, py: 0.5 }}>
                <SearchIcon sx={{ color: '#0077b6', mr: 1 }} />
                <input type="text" placeholder="Buscar contrato" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} style={{ border: 'none', outline: 'none', width: '200px', backgroundColor: 'transparent', color: '#e0e0e0' }} />
              </Box>
              <Button variant="contained" onClick={() => handleSearch(searchTerm)} sx={{ backgroundColor: '#0077b6', color: '#e0e0e0', borderRadius: '12px', textTransform: 'none' }}>
                Buscar
              </Button>
            </Box>
          </Box>

          <TableContainer component={Paper} sx={{ borderRadius: '12px', overflow: 'hidden' }}>
            <Table sx={{ minWidth: 650 }} aria-label="contratos table">
              <TableHead>
                <TableRow>
                  <TableCell>Id del Contrato</TableCell>
                  <TableCell align="center">Descripcion del servicio</TableCell>
                  <TableCell align="center">Cliente</TableCell>
                  <TableCell align="center">Detective</TableCell>
                  <TableCell align="center">Estado</TableCell>
                  <TableCell align="center">Acciones</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredContratos.map((contrato) => (
                  <TableRow key={contrato._id} hover sx={{ backgroundColor: highlightedContrato === contrato._id ? 'rgba(0,119,182,0.1)' : 'inherit' }}>
                    <TableCell align="center">{contrato._id}</TableCell>
                    <TableCell>{contrato.descripcionServicio}</TableCell>
                    <TableCell>
                      {contrato.idCliente ? `${contrato.idCliente.nombres} ${contrato.idCliente.apellidos || 'Sin apellido'}` : 'Sin asignar'}
                    </TableCell>
                    <TableCell>
                      {contrato.idDetective ? `${contrato.idDetective.nombres} ${contrato.idDetective.apellidos || 'Sin apellido'}` : 'No asignado'}
                    </TableCell>


                    <TableCell>
                      <Chip
                        label={contrato.estado ? 'Activo' : 'Inactivo'}
                        color={contrato.estado ? 'success' : 'error'} />
                    </TableCell>
                    <TableCell align="center">
                      <Tooltip title="Ver detalles">
                        <IconButton color="primary" onClick={() => handleDetails(contrato._id)} sx={{ marginRight: 1 }}>
                          <VisibilityIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Desactivar">
                        <IconButton color="error" onClick={() => handleDeactivate(contrato._id)}>
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

export default GestionarContratos;
