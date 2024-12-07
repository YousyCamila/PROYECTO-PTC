import React, { useState } from 'react';
import {
  Box,
  Button,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  Divider,
  IconButton,
  TextField,
} from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import AddIcon from '@mui/icons-material/Add';
import EvidenciasCrud from './EvidenciasCrud';

const CasoDetailsMenu = ({ caso, onClose }) => {
  const [view, setView] = useState('details'); // Para cambiar entre vistas: detalles, evidencias, contrato, registro
  const [openCreateDialog, setOpenCreateDialog] = useState(false); // Controlar el diálogo para crear registros
  const [newRegistro, setNewRegistro] = useState({
    descripcion: '',
    fechaInicio: '',
    estadoRegistro: '',
  }); // Datos del nuevo registro

  const handleViewDetails = () => setView('details');
  const handleViewEvidencias = () => setView('evidencias');
  const handleViewContrato = () => setView('contrato');
  const handleViewRegistroCasos = () => setView('registro');

  const handleOpenCreateDialog = () => setOpenCreateDialog(true);
  const handleCloseCreateDialog = () => {
    setOpenCreateDialog(false);
    setNewRegistro({ descripcion: '', fechaInicio: '', estadoRegistro: '' }); // Limpiar campos
  };

  const handleCreateRegistro = async () => {
    console.log('Creando nuevo registro:', newRegistro);
    handleCloseCreateDialog();
  };

  const renderContent = () => {
    switch (view) {
      case 'evidencias':
        return (
          <Box>
            <Typography variant="h6" gutterBottom>
              Evidencias
            </Typography>
            <EvidenciasCrud evidencias={caso.evidencias} casoId={caso._id} />
          </Box>
        );
      case 'contrato':
        return (
          <Box>
            <Typography variant="h6" gutterBottom>
              Contratos Asociados
            </Typography>
            {caso.contratos && caso.contratos.length > 0 ? (
              <ul>
                {caso.contratos.map((contrato, index) => (
                  <li key={index}>
                    <strong>Descripción:</strong> {contrato.descripcionServicio || 'Sin descripción'}, 
                    <strong> Estado:</strong> {contrato.estado || 'No definido'}
                  </li>
                ))}
              </ul>
            ) : (
              <Typography>No hay contratos asociados.</Typography>
            )}
          </Box>
        );
      case 'registro':
        return (
          <Box>
            <Typography variant="h6" gutterBottom>
              Registros del Caso
            </Typography>
            {caso.registroCasos && caso.registroCasos.length > 0 ? (
              <ul>
                {caso.registroCasos.map((registro, index) => (
                  <li key={index}>
                    <strong>Descripción:</strong> {registro.descripcion || 'Sin descripción'}, 
                    <strong> Estado:</strong> {registro.estadoRegistro || 'No definido'}, 
                    <strong> Fecha Inicio:</strong> {new Date(registro.fechaInicio).toLocaleDateString()}
                    <IconButton onClick={() => console.log('Ver detalles del registro:', registro)}>
                      <VisibilityIcon color="primary" />
                    </IconButton>
                  </li>
                ))}
              </ul>
            ) : (
              <Typography>No hay registros asociados.</Typography>
            )}
            <Button
              startIcon={<AddIcon />}
              variant="outlined"
              color="primary"
              onClick={handleOpenCreateDialog}
              sx={{ mt: 2 }}
            >
              Crear Nuevo Registro
            </Button>
          </Box>
        );
      default:
        return (
          <Box sx={{ px: 2 }}>
            <Typography variant="h5" component="h2" sx={{ mb: 2, fontWeight: 'bold', color: '#005f91' }}>
              Detalles del Caso: {caso.nombreCaso}
            </Typography>
            <Divider sx={{ mb: 2, backgroundColor: '#d1e0e5' }} />
            <Typography variant="body1" sx={{ mb: 1, color: '#333' }}>
              <strong>ID del Caso:</strong> {caso._id}
            </Typography>
            <Typography variant="body1" sx={{ mb: 1, color: '#333' }}>
              <strong>Estado:</strong> {caso.activo ? 'Activo' : 'Inactivo'}
            </Typography>
            <Typography variant="body1" sx={{ mb: 1, color: '#333' }}>
              <strong>Detective Asignado:</strong> {caso.idDetective?.nombres || 'No asignado'}
            </Typography>
            <Typography variant="body1" sx={{ mb: 1, color: '#333' }}>
  <strong>Evidencias:</strong>
  {caso.evidencias && caso.evidencias.length > 0 ? (
    <ul aria-label="Lista de evidencias">
      {caso.evidencias.map((evidencia) => (
        <li key={evidencia._id}>
          Fecha: {new Date(evidencia.fechaEvidencia).toLocaleDateString()}, 
          Descripción: {evidencia.descripcion}, 
          Tipo: {evidencia.tipoEvidencia}
        </li>
      ))}
    </ul>
  ) : (
    'No hay evidencias asociadas.'
  )}
</Typography> 
          </Box>
        );
    }
  };

  return (
    <Dialog open={true} onClose={onClose} maxWidth="lg" fullWidth>
      <Box sx={{ display: 'flex', minHeight: '60vh' }}>
        {/* Menú lateral */}
        <Box sx={{ width: '250px', backgroundColor: '#005f91', color: '#ffffff', padding: 3, boxShadow: 3 }}>
          <Typography variant="h5" sx={{ mb: 4, fontWeight: 'bold' }}>Opciones del Caso</Typography>
          <Button fullWidth variant="contained" sx={{ mb: 2, backgroundColor: '#ffffff', color: '#005f91' }} onClick={handleViewDetails}>
            Ver Detalles del Caso
          </Button>
          <Button fullWidth variant="contained" sx={{ mb: 2, backgroundColor: '#ffffff', color: '#005f91' }} onClick={handleViewEvidencias}>
            Ver Evidencias
          </Button>
          <Button fullWidth variant="contained" sx={{ mb: 2, backgroundColor: '#ffffff', color: '#005f91' }} onClick={handleViewContrato}>
            Ver Contrato
          </Button>
          <Button fullWidth variant="contained" sx={{ mb: 2, backgroundColor: '#ffffff', color: '#005f91' }} onClick={handleViewRegistroCasos}>
            Ver Registros del Caso
          </Button>
        </Box>

        {/* Área de contenido */}
        <Box sx={{ flex: 1, padding: 4, backgroundColor: '#f5faff' }}>
          <DialogContent>{renderContent()}</DialogContent>
        </Box>
      </Box>

      <DialogActions sx={{ backgroundColor: '#f5faff', padding: 2 }}>
        <Button onClick={onClose} sx={{ color: '#005f91', fontWeight: 'bold' }}>Cerrar</Button>
      </DialogActions>

      {/* Diálogo para crear un nuevo registro */}
      <Dialog open={openCreateDialog} onClose={handleCloseCreateDialog}>
        <DialogContent>
          <Typography variant="h6" gutterBottom>Crear Nuevo Registro</Typography>
          <TextField
            label="Descripción"
            fullWidth
            value={newRegistro.descripcion}
            onChange={(e) => setNewRegistro({ ...newRegistro, descripcion: e.target.value })}
            sx={{ mb: 2 }}
          />
          <TextField
            label="Fecha de Inicio"
            type="date"
            fullWidth
            value={newRegistro.fechaInicio}
            onChange={(e) => setNewRegistro({ ...newRegistro, fechaInicio: e.target.value })}
            sx={{ mb: 2 }}
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            label="Estado"
            fullWidth
            value={newRegistro.estadoRegistro}
            onChange={(e) => setNewRegistro({ ...newRegistro, estadoRegistro: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseCreateDialog} color="secondary">Cancelar</Button>
          <Button onClick={handleCreateRegistro} color="primary">Crear</Button>
        </DialogActions>
      </Dialog>
    </Dialog>
  );
};

export default CasoDetailsMenu;
