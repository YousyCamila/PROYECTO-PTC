import React from "react";
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
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import PersonIcon from "@mui/icons-material/Person";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import InfoIcon from "@mui/icons-material/Info";
import DescriptionIcon from "@mui/icons-material/Description";

const InformacionHistorial = ({ historial }) => {
  if (!historial) {
    return <Typography>No hay historial disponible.</Typography>;
  }

  const formatDate = (date) =>
    date ? new Date(date).toLocaleDateString() : "No disponible";

  const renderInfoSection = (title, content, icon) => (
    <Paper elevation={1} sx={{ p: 2, mb: 2 }}>
      <Stack direction="row" alignItems="center" spacing={1} mb={1}>
        {icon}
        <Typography variant="h6" fontWeight="medium">
          {title}
        </Typography>
      </Stack>
      <Typography variant="body1">{content || "No disponible"}</Typography>
    </Paper>
  );

  const renderEstadoChip = (estado) => {
    const isAbierto = estado?.toLowerCase() === "abierto";
    return (
      <Chip
        label={estado || "Desconocido"}
        icon={isAbierto ? <CheckCircleIcon /> : <CancelIcon />}
        color={isAbierto ? "success" : "error"}
        sx={{ fontSize: "1rem", p: 2, mt: 1 }}
      />
    );
  };

  return (
    <Box sx={{ px: { xs: 2, sm: 4 }, py: 3 }}>
      <Typography variant="h4" gutterBottom fontWeight="bold">
        Historial del Caso
      </Typography>
      <Divider sx={{ mb: 3 }} />

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          {renderInfoSection(
            "Nombre del Cliente",
            historial.nombreCliente,
            <PersonIcon color="primary" />
          )}
        </Grid>
        <Grid item xs={12} md={6}>
          {renderInfoSection(
            "Fecha de Apertura",
            formatDate(historial.fechaApertura),
            <CalendarTodayIcon color="primary" />
          )}
        </Grid>
      </Grid>

      <Grid item xs={12} sx={{ mt: 1 }}>
        {renderEstadoChip(historial.estadoCaso)}
      </Grid>

      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography fontWeight="bold">Información General</Typography>
        </AccordionSummary>
        <AccordionDetails>
          {renderInfoSection(
            "Descripción del Objetivo",
            historial.descripcionObjetivo,
            <DescriptionIcon color="action" />
          )}
          {renderInfoSection(
            "Información Inicial",
            historial.informacionInicial,
            <InfoIcon color="action" />
          )}
          {renderInfoSection(
            "Contexto del Caso",
            historial.contextoCaso,
            <InfoIcon color="action" />
          )}
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography fontWeight="bold">
            Desarrollo de la Investigación
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          {historial.desarrolloInvestigacion?.length > 0 ? (
            historial.desarrolloInvestigacion.map((item, index) => (
              <Paper key={index} sx={{ p: 2, mb: 2 }} elevation={1}>
                <Typography
                  variant="subtitle1"
                  fontWeight="medium"
                  gutterBottom
                >
                  Actividad #{index + 1}
                </Typography>
                <Stack spacing={1}>
                  <Typography>
                    <strong>Actividad:</strong> {item.actividad}
                  </Typography>
                  <Typography>
                    <strong>Fecha:</strong>{" "}
                    {new Date(item.fechaHora).toLocaleString()}
                  </Typography>
                  <Typography>
                    <strong>Observaciones:</strong> {item.observaciones}
                  </Typography>
                  <Typography>
                    <strong>Personas Contactadas:</strong>{" "}
                    {item.personasContactadas || "No especificado"}
                  </Typography>
                  <Typography>
                    <strong>Métodos Utilizados:</strong>{" "}
                    {item.metodosUtilizados || "No especificado"}
                  </Typography>
                </Stack>
              </Paper>
            ))
          ) : (
            <Typography>No hay actividades registradas.</Typography>
          )}
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography fontWeight="bold">Pruebas y Evidencias</Typography>
        </AccordionSummary>
        <AccordionDetails>
          {historial.idCaso?.evidencias?.length > 0 ? (
            <Stack spacing={2}>
              {historial.idCaso.evidencias.map((evidencia, index) => (
                <Paper key={index} elevation={1} sx={{ p: 2 }}>
                  <Typography variant="subtitle2" fontWeight="bold">
                    {new Date(evidencia.fechaEvidencia).toLocaleDateString()}
                  </Typography>
                  <Typography variant="body1">
                    {evidencia.descripcion}
                  </Typography>
                  <Chip
                    label={evidencia.tipoEvidencia}
                    color="primary"
                    size="small"
                    sx={{ mt: 1 }}
                  />
                </Paper>
              ))}
            </Stack>
          ) : (
            <Typography>No se han registrado evidencias.</Typography>
          )}
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography fontWeight="bold">
            Conclusiones y Recomendaciones
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          {renderInfoSection(
            "Hallazgos Importantes",
            historial.conclusionesResultados?.hallazgosImportantes
          )}
          {renderInfoSection(
            "Conclusiones",
            historial.conclusionesResultados?.conclusiones
          )}
          {renderInfoSection(
            "Recomendaciones",
            historial.conclusionesResultados?.recomendaciones
          )}
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography fontWeight="bold">Cierre del Caso</Typography>
        </AccordionSummary>
        <AccordionDetails>
          {renderInfoSection(
            "Fecha de Cierre",
            formatDate(historial.cierreCaso?.fechaCierre)
          )}
          {renderInfoSection(
            "Resultado Final",
            historial.cierreCaso?.resultadoFinal
          )}
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};

export default InformacionHistorial;
