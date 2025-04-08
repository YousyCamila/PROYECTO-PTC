import React from 'react';
import {
  Typography,
  Box,
  Divider,
  Paper,
  IconButton,
  Grid,
  Button,
  Stack,
} from '@mui/material';
import { Edit as EditIcon, Add as AddIcon } from '@mui/icons-material';

const HistorialPlantilla = ({ historial }) => {
  if (!historial) {
    return <Typography>No hay historial disponible.</Typography>;
  }

  const renderEditableSection = (title, content, onEdit) => (
    <Paper elevation={3} sx={{ p: 2, mb: 3 }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography variant="h6">{title}</Typography>
        <IconButton onClick={onEdit} color="primary">
          <EditIcon />
        </IconButton>
      </Stack>
      <Typography>{content || 'No disponible'}</Typography>
    </Paper>
  );

  const formatDate = (date) =>
    date ? new Date(date).toLocaleDateString() : 'No disponible';

  return (
    <Box p={3}>
      <Typography variant="h4" gutterBottom fontWeight="bold">
        Historial del Caso
      </Typography>
      <Divider sx={{ mb: 3 }} />

      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          {renderEditableSection(
            'Nombre del Cliente',
            historial.nombreCliente,
            () => console.log('Editar Nombre Cliente')
          )}
        </Grid>
        <Grid item xs={12} md={6}>
          {renderEditableSection(
            'Fecha de Apertura',
            formatDate(historial.fechaApertura),
            () => console.log('Editar Fecha Apertura')
          )}
        </Grid>
      </Grid>

      {renderEditableSection(
        'Descripción del Objetivo',
        historial.descripcionObjetivo,
        () => console.log('Editar Descripción Objetivo')
      )}

      {renderEditableSection(
        'Información Inicial',
        historial.informacionInicial,
        () => console.log('Editar Información Inicial')
      )}

      {renderEditableSection(
        'Contexto del Caso',
        historial.contextoCaso,
        () => console.log('Editar Contexto del Caso')
      )}

      <Divider sx={{ my: 3 }} />
      <Typography variant="h5" gutterBottom>Desarrollo de la Investigación</Typography>
      <Button
        startIcon={<AddIcon />}
        onClick={() => console.log('Agregar actividad')}
        sx={{ mb: 2 }}
        variant="outlined"
      >
        Agregar Actividad
      </Button>

      {historial.desarrolloInvestigacion?.length > 0 ? (
        historial.desarrolloInvestigacion.map((item, index) => (
          <Paper key={index} sx={{ p: 2, mb: 2 }} elevation={2}>
            <Stack direction="row" justifyContent="space-between" alignItems="center">
              <Typography fontWeight="bold">Actividad #{index + 1}</Typography>
              <IconButton onClick={() => console.log('Editar actividad', index)}>
                <EditIcon fontSize="small" />
              </IconButton>
            </Stack>
            <Typography><strong>Actividad:</strong> {item.actividad}</Typography>
            <Typography><strong>Fecha:</strong> {new Date(item.fechaHora).toLocaleString()}</Typography>
            <Typography><strong>Observaciones:</strong> {item.observaciones}</Typography>
            <Typography><strong>Personas Contactadas:</strong> {item.personasContactadas || 'No especificado'}</Typography>
            <Typography><strong>Métodos Utilizados:</strong> {item.metodosUtilizados || 'No especificado'}</Typography>
          </Paper>
        ))
      ) : (
        <Typography>No hay actividades registradas.</Typography>
      )}

      <Divider sx={{ my: 3 }} />
      <Typography variant="h5" gutterBottom>Pruebas y Evidencias</Typography>
      <Button
        startIcon={<AddIcon />}
        onClick={() => console.log('Agregar evidencia')}
        sx={{ mb: 2 }}
        variant="outlined"
      >
        Agregar Evidencia
      </Button>

      {historial.pruebasEvidencias?.length > 0 ? (
        historial.pruebasEvidencias.map((prueba, index) => (
          <Paper key={index} sx={{ p: 2, mb: 2 }} elevation={2}>
            <Stack direction="row" justifyContent="space-between" alignItems="center">
              <Typography fontWeight="bold">Prueba #{index + 1}</Typography>
              <IconButton onClick={() => console.log('Editar prueba', index)}>
                <EditIcon fontSize="small" />
              </IconButton>
            </Stack>
            <Typography><strong>Descripción:</strong> {prueba.descripcion}</Typography>
            <Typography><strong>Relevancia:</strong> {prueba.relevancia}</Typography>
            <Typography><strong>Lugar de Recopilación:</strong> {prueba.lugarRecopilacion}</Typography>
            <Typography><strong>Fecha:</strong> {formatDate(prueba.fechaRecopilacion)}</Typography>
          </Paper>
        ))
      ) : (
        <Typography>No se han registrado pruebas o evidencias.</Typography>
      )}

      <Divider sx={{ my: 3 }} />
      <Typography variant="h5" gutterBottom>Conclusiones y Resultados</Typography>
      {renderEditableSection(
        'Hallazgos Importantes',
        historial.conclusionesResultados?.hallazgosImportantes,
        () => console.log('Editar Hallazgos')
      )}
      {renderEditableSection(
        'Conclusiones',
        historial.conclusionesResultados?.conclusiones,
        () => console.log('Editar Conclusiones')
      )}
      {renderEditableSection(
        'Recomendaciones',
        historial.conclusionesResultados?.recomendaciones,
        () => console.log('Editar Recomendaciones')
      )}

      <Divider sx={{ my: 3 }} />
      <Typography variant="h5" gutterBottom>Cierre del Caso</Typography>
      {renderEditableSection(
        'Fecha de Cierre',
        formatDate(historial.cierreCaso?.fechaCierre),
        () => console.log('Editar Fecha Cierre')
      )}
      {renderEditableSection(
        'Resultado Final',
        historial.cierreCaso?.resultadoFinal,
        () => console.log('Editar Resultado Final')
      )}

      <Divider sx={{ my: 3 }} />
      {renderEditableSection(
        'Estado del Caso',
        historial.estadoCaso,
        () => console.log('Editar Estado Caso')
      )}
    </Box>
  );
};

export default HistorialPlantilla;
