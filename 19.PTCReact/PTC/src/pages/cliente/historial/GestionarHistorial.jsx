import React, { useState } from 'react';
import axios from 'axios';
import {
  Typography,
  Box,
  Divider,
  Paper,
  Grid,
  Stack,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Chip,
  Button,
  IconButton,
  Tooltip,
  TextField,
  Snackbar,
  Alert,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import PersonIcon from '@mui/icons-material/Person';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import InfoIcon from '@mui/icons-material/Info';
import DescriptionIcon from '@mui/icons-material/Description';
import EditIcon from '@mui/icons-material/Edit';

const GestionarHistorial = ({ historial, onEditar }) => {
  const [editMode, setEditMode] = useState(false);
  const [editableHistorial, setEditableHistorial] = useState(historial);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);

  const handleInputChange = (field, value) => {
    setEditableHistorial(prev => ({ ...prev, [field]: value }));
  };

  const handleNestedInputChange = (section, field, value) => {
    setEditableHistorial(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }));
  };

  const renderEditableField = (label, field, icon) => (
    <Paper elevation={1} sx={{ p: 2, mb: 2 }}>
      <Stack direction="row" alignItems="center" spacing={1} mb={1}>
        {icon}
        <Typography variant="h6" fontWeight="medium">{label}</Typography>
      </Stack>
      {editMode ? (
        <TextField
          fullWidth
          value={editableHistorial[field] || ''}
          onChange={(e) => handleInputChange(field, e.target.value)}
          variant="outlined"
        />
      ) : (
        <Typography variant="body1">{editableHistorial[field] || 'No disponible'}</Typography>
      )}
    </Paper>
  );

  const renderEditableNestedField = (label, section, field, icon) => (
    <Paper elevation={1} sx={{ p: 2, mb: 2 }}>
      <Stack direction="row" alignItems="center" spacing={1} mb={1}>
        {icon}
        <Typography variant="h6" fontWeight="medium">{label}</Typography>
      </Stack>
      {editMode ? (
        <TextField
          fullWidth
          value={editableHistorial[section]?.[field] || ''}
          onChange={(e) => handleNestedInputChange(section, field, e.target.value)}
          variant="outlined"
        />
      ) : (
        <Typography variant="body1">{editableHistorial[section]?.[field] || 'No disponible'}</Typography>
      )}
    </Paper>
  );

  const renderEstadoChip = (estado) => {
    const isAbierto = estado?.toLowerCase() === 'abierto';
    return (
      <Chip
        label={estado || 'Desconocido'}
        icon={isAbierto ? <CheckCircleIcon /> : <CancelIcon />}
        color={isAbierto ? 'success' : 'error'}
        sx={{ fontSize: '1rem', p: 2, mt: 1 }}
      />
    );
  };

  const handleSave = async () => {
    if (editMode) {
      try {
        const response = await axios.put(`http://localhost:3000/api/historiales/editar/${editableHistorial._id}`, editableHistorial);
        if (onEditar) onEditar(response.data);
        setShowSuccessAlert(true); // Mostrar alerta
      } catch (error) {
        console.error('Error al actualizar el historial:', error);
      }
    }
    setEditMode(!editMode);
  };

  return (
    <Box sx={{ px: { xs: 2, sm: 4 }, py: 3 }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography variant="h4" gutterBottom fontWeight="bold">
          Gestionar Historial del Caso
        </Typography>
        <Tooltip title={editMode ? 'Guardar Cambios' : 'Editar Historial'}>
          <IconButton color="primary" onClick={handleSave}>
            <EditIcon />
          </IconButton>
        </Tooltip>
      </Stack>

      <Divider sx={{ mb: 3 }} />

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          {renderEditableField('Nombre del Cliente', 'nombreCliente', <PersonIcon color="primary" />)}
        </Grid>
        <Grid item xs={12} md={6}>
          {renderEditableField('Fecha de Apertura', 'fechaApertura', <CalendarTodayIcon color="primary" />)}
        </Grid>
      </Grid>

      <Grid item xs={12} sx={{ mt: 1 }}>
        {renderEstadoChip(editableHistorial.estadoCaso)}
      </Grid>

      {/* Información General */}
      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography fontWeight="bold">Información General</Typography>
        </AccordionSummary>
        <AccordionDetails>
          {renderEditableField('Descripción del Objetivo', 'descripcionObjetivo', <DescriptionIcon color="action" />)}
          {renderEditableField('Información Inicial', 'informacionInicial', <InfoIcon color="action" />)}
          {renderEditableField('Contexto del Caso', 'contextoCaso', <InfoIcon color="action" />)}
        </AccordionDetails>
      </Accordion>

      {/* Desarrollo de Investigación */}
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography fontWeight="bold">Desarrollo de la Investigación</Typography>
        </AccordionSummary>
        <AccordionDetails>
          {editableHistorial.desarrolloInvestigacion?.length > 0 ? (
            editableHistorial.desarrolloInvestigacion.map((item, index) => (
              <Paper key={index} sx={{ p: 2, mb: 2 }} elevation={1}>
                <Typography variant="subtitle1" fontWeight="medium" gutterBottom>
                  Actividad #{index + 1}
                </Typography>
                <Stack spacing={1}>
                  <Typography><strong>Actividad:</strong> {item.actividad}</Typography>
                  <Typography><strong>Fecha:</strong> {new Date(item.fechaHora).toLocaleString()}</Typography>
                  <Typography><strong>Observaciones:</strong> {item.observaciones}</Typography>
                </Stack>
              </Paper>
            ))
          ) : (
            <Typography>No hay actividades registradas.</Typography>
          )}
        </AccordionDetails>
      </Accordion>

      {/* Pruebas y Evidencias */}
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography fontWeight="bold">Pruebas y Evidencias</Typography>
        </AccordionSummary>
        <AccordionDetails>
          {editableHistorial.pruebasEvidencias?.length > 0 ? (
            editableHistorial.pruebasEvidencias.map((prueba, index) => (
              <Paper key={index} sx={{ p: 2, mb: 2 }} elevation={1}>
                <Typography variant="subtitle1" fontWeight="medium" gutterBottom>
                  Prueba #{index + 1}
                </Typography>
                <Stack spacing={1}>
                  <Typography><strong>Descripción:</strong> {prueba.descripcion}</Typography>
                  <Typography><strong>Relevancia:</strong> {prueba.relevancia}</Typography>
                </Stack>
              </Paper>
            ))
          ) : (
            <Typography>No se han registrado pruebas o evidencias.</Typography>
          )}
        </AccordionDetails>
      </Accordion>

      {/* Conclusiones y Recomendaciones */}
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography fontWeight="bold">Conclusiones y Recomendaciones</Typography>
        </AccordionSummary>
        <AccordionDetails>
          {renderEditableNestedField('Hallazgos Importantes', 'conclusionesResultados', 'hallazgosImportantes', <InfoIcon color="action" />)}
          {renderEditableNestedField('Conclusiones', 'conclusionesResultados', 'conclusiones', <InfoIcon color="action" />)}
          {renderEditableNestedField('Recomendaciones', 'conclusionesResultados', 'recomendaciones', <InfoIcon color="action" />)}
        </AccordionDetails>
      </Accordion>

      {/* Cierre del caso */}
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography fontWeight="bold">Cierre del Caso</Typography>
        </AccordionSummary>
        <AccordionDetails>
          {renderEditableNestedField('Fecha de Cierre', 'cierreCaso', 'fechaCierre', <CalendarTodayIcon color="action" />)}
          {renderEditableNestedField('Resultado Final', 'cierreCaso', 'resultadoFinal', <DescriptionIcon color="action" />)}
        </AccordionDetails>
      </Accordion>

      {/* Snackbar de éxito */}
      <Snackbar
        open={showSuccessAlert}
        autoHideDuration={3000}
        onClose={() => setShowSuccessAlert(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert severity="success" onClose={() => setShowSuccessAlert(false)} sx={{ width: '100%' }}>
          ¡Historial actualizado con éxito!
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default GestionarHistorial;
