import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Divider,
  Paper,
  Grid,
} from "@mui/material";
import {
  HistoryEdu,
  ListAlt,
} from "@mui/icons-material";

const VerAuditoria = ({ historial }) => {
  const [documentos, setDocumentos] = useState([]);

  useEffect(() => {
    const obtenerDocumentos = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/historiales/caso/${historial.idCaso._id}`,
          {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          }
        );

        const data = await response.json();
        if (!data || !data.idCaso) return;

        const documentosConTipo = [
          ...(data.idCaso.evidencias || []).map((e) => ({
            ...e,
            tipo: "Evidencia",
          })),
          ...(data.idCaso.registroCasos || []).map((r) => ({
            ...r,
            tipo: "RegistroCaso",
          })),
          ...(data.idCaso.contratos || []).map((c) => ({
            ...c,
            tipo: "Contrato",
          })),
        ];
        setDocumentos(documentosConTipo);
      } catch (error) {
        console.error("Error al obtener documentos:", error);
      }
    };

    if (historial?.idCaso?._id) {
      obtenerDocumentos();
    }
  }, [historial]);

  return (
    <Box>
      <Typography
        variant="h5"
        gutterBottom
        sx={{ display: "flex", alignItems: "center", mb: 2 }}
      >
        <HistoryEdu sx={{ mr: 1 }} /> Auditorías del Caso
      </Typography>
      <Divider />

      <Typography variant="subtitle1" sx={{ mt: 3, fontWeight: "bold" }}>
        📌 Acciones registradas:
      </Typography>

      <Grid container spacing={3} sx={{ mt: 1 }}>
        {historial.acciones && historial.acciones.length > 0 ? (
          historial.acciones.map((accion, index) => (
            <Grid item xs={12} md={6} key={index}>
              <Paper
                elevation={4}
                sx={{
                  p: 3,
                  borderRadius: "16px",
                  backgroundColor: "#f9f9f9",
                  borderLeft: "8px solid #1976d2",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                  },
                }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: "bold",
                    color: "#1976d2",
                    display: "flex",
                    alignItems: "center",
                    mb: 1,
                  }}
                >
                  <ListAlt sx={{ mr: 1 }} />
                  {accion.accion}
                </Typography>

                <Typography variant="body2" gutterBottom>
                  <strong>Detalles:</strong> {accion.detalles}
                </Typography>

                <Typography variant="body2" color="text.secondary">
                  📄 Documento relacionado: {accion.tipoDocumento} -{" "}
                  {accion.documentoRelacionado?.descripcion || "Sin descripción"}
                </Typography>

                <Typography variant="body2">
                  <strong>Tipo Usuario:</strong> {accion.usuarioTipo}
                </Typography>

                <Typography variant="body2" color="text.secondary">
                  👤 Usuario: {accion.usuario?.nombres}{" "}
                  {accion.usuario?.apellidos}
                </Typography>

                <Typography variant="body2">
                  <strong>Fecha:</strong>{" "}
                  {new Date(accion.fecha).toLocaleString()}
                </Typography>
              </Paper>
            </Grid>
          ))
        ) : (
          <Typography variant="body2" sx={{ ml: 2 }}>
            No hay acciones registradas.
          </Typography>
        )}
      </Grid>
    </Box>
  );
};

export default VerAuditoria;
