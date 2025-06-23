import React, { useState, useEffect, forwardRef } from "react";
import {
  Box,
  Typography,
  Divider,
  TextField,
  MenuItem,
  Button,
  Paper,
  Grid,
  Tooltip,
} from "@mui/material";
import {
  AssignmentInd as AssignmentIcon,
  AccountCircle,
  Description,
  AddCircleOutline,
  HistoryEdu,
  ListAlt,
} from "@mui/icons-material";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const accionesDisponibles = [
  "Evidencia agregada",
  "Evidencia eliminada",
  "Reporte generado",
  "Reporte modificado",
  "Contrato creado",
  "Contrato modificado",
  "Contrato eliminado",
  "Cambio de estado",
  "Comentario agregado",
  "Caso reasignado",
  "Caso cerrado",
  "Caso archivado",
];

const tiposDocumento = ["Evidencia", "RegistroCaso", "Contrato"];

const NovedadesHistorial = ({ historial, onActualizar }) => {
  const [accion, setAccion] = useState("");
  const [detalles, setDetalles] = useState("");
  const [usuarioTipo, setUsuarioTipo] = useState("");
  const [usuarioId, setUsuarioId] = useState("");
  const [tipoDocumento, setTipoDocumento] = useState("");
  const [documentoRelacionado, setDocumentoRelacionado] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const [usuarios, setUsuarios] = useState({ clientes: [], detectives: [] });
  const [documentos, setDocumentos] = useState([]);

  const Alert = forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });

  useEffect(() => {
    const obtenerDatosRelacionados = async () => {
      try {
        const response = await fetch(
          `https://proyecto-ptc.onrender.com/api/historiales/caso/${historial.idCaso._id}`,
          {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          }
        );

        const data = await response.json();

        console.log(data.idCaso.registroCasos);

        if (!data || !data.idCaso) {
          console.error("No se encontró el idCaso en la respuesta:", data);
          return;
        }

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

        setUsuarios({
          clientes: [data.idCaso.idCliente],
          detectives: [data.idCaso.idDetective],
        });
      } catch (error) {
        console.error("Error al obtener datos relacionados:", error);
      }
    };

    if (historial?.idCaso?._id) {
      obtenerDatosRelacionados();
    }
  }, [historial]);

  const handleAgregarAccion = async (e) => {
    e.preventDefault();

    const payload = {
      idHistorial: historial._id,
      accion,
      detalles,
      usuarioTipo,
      usuarioId,
      tipoDocumento,
      documentoRelacionado: documentoRelacionado || null,
    };

    try {
      const res = await fetch(
        `https://proyecto-ptc.onrender.com/api/historiales/agregar-accion`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      if (res.ok) {
        setAccion("");
        setDetalles("");
        setUsuarioTipo("");
        setUsuarioId("");
        setTipoDocumento("");
        setDocumentoRelacionado("");
        setOpenSnackbar(true);
        onActualizar();
      } else {
        const error = await res.json();
        console.error("Error al agregar acción:", error.message);
      }
    } catch (error) {
      console.error("Error al conectar con el servidor:", error);
    }
  };

  return (
    <Box>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={4000}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert onClose={() => setOpenSnackbar(false)} severity="success">
          Acción agregada correctamente
        </Alert>
      </Snackbar>

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

      <Grid container spacing={2} sx={{ mt: 1 }}>
        {historial.acciones && historial.acciones.length > 0 ? (
          historial.acciones.map((accion, index) => (
            <Grid item xs={12} md={6} key={index}>
              <Paper
                elevation={3}
                sx={{ p: 2, borderLeft: "5px solid #1976d2" }}
              >
                <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                  <ListAlt sx={{ verticalAlign: "middle", mr: 1 }} />
                  {accion.accion}
                </Typography>
                <Typography variant="body2">
                  <strong>Detalles:</strong> {accion.detalles}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  📄 Documento relacionado: {accion.tipoDocumento} -{" "}
                  {accion.documentoRelacionado.descripcion}
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

      <Divider sx={{ my: 4 }} />
      <Typography
        variant="h6"
        gutterBottom
        sx={{ display: "flex", alignItems: "center" }}
      >
        <AddCircleOutline sx={{ mr: 1 }} /> Agregar nueva acción
      </Typography>

      <Box component="form" onSubmit={handleAgregarAccion} sx={{ mt: 2 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              select
              fullWidth
              label="Acción"
              value={accion}
              onChange={(e) => setAccion(e.target.value)}
              required
            >
              {accionesDisponibles.map((op) => (
                <MenuItem key={op} value={op}>
                  {op}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              select
              fullWidth
              label="Tipo de Usuario"
              value={usuarioTipo}
              onChange={(e) => {
                setUsuarioTipo(e.target.value);
                setUsuarioId("");
              }}
              required
            >
              <MenuItem value="Cliente">Cliente</MenuItem>
              <MenuItem value="Detective">Detective</MenuItem>
            </TextField>
          </Grid>

          {usuarioTipo && (
            <Grid item xs={12} sm={6}>
              <TextField
                select
                fullWidth
                label={`Seleccionar ${usuarioTipo}`}
                value={usuarioId}
                onChange={(e) => setUsuarioId(e.target.value)}
                required
              >
                {(usuarioTipo === "Cliente"
                  ? usuarios.clientes
                  : usuarios.detectives
                ).map((user, index) => (
                  <MenuItem key={index} value={user._id}>
                    <AccountCircle sx={{ mr: 1 }} />
                    {user.nombres} {user.apellidos}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
          )}

          <Grid item xs={12} sm={6}>
            <TextField
              select
              fullWidth
              label="Tipo de Documento"
              value={tipoDocumento}
              onChange={(e) => {
                setTipoDocumento(e.target.value);
                setDocumentoRelacionado("");
              }}
              required
            >
              {tiposDocumento.map((tipo) => (
                <MenuItem key={tipo} value={tipo}>
                  {tipo}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          <Grid item xs={12}>
            <TextField
              select
              fullWidth
              label="Seleccionar Documento Relacionado"
              value={documentoRelacionado}
              onChange={(e) => setDocumentoRelacionado(e.target.value)}
              required
            >
              {documentos
                .filter((doc) => doc.tipo === tipoDocumento)
                .map((doc, index) => (
                  <MenuItem key={index} value={doc._id}>
                    <Tooltip
                      title={doc.descripcion || doc.nombre || "Sin descripción"}
                    >
                      <span>
                        <Description sx={{ mr: 1 }} />
                        {doc.descripcion || doc.nombre || "Documento"}
                      </span>
                    </Tooltip>
                  </MenuItem>
                ))}
            </TextField>
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              multiline
              label="Detalles"
              value={detalles}
              onChange={(e) => setDetalles(e.target.value)}
              required
            />
          </Grid>

          <Grid item xs={12}>
            <Button
              type="submit"
              variant="contained"
              fullWidth
              startIcon={<AddCircleOutline />}
            >
              Agregar Acción
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default NovedadesHistorial;
