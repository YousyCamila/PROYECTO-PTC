import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Divider,
  TextField,
  MenuItem,
  Button,
} from '@mui/material';

const accionesDisponibles = [
  'Evidencia agregada', 'Evidencia eliminada', 'Reporte generado',
  'Reporte modificado', 'Contrato creado', 'Contrato modificado',
  'Contrato eliminado', 'Cambio de estado', 'Comentario agregado',
  'Caso reasignado', 'Caso cerrado', 'Caso archivado'
];

const tiposDocumento = ['Evidencia', 'RegistroCaso', 'Contrato'];

const NovedadesHistorial = ({ historial, onActualizar }) => {
  const [accion, setAccion] = useState('');
  const [detalles, setDetalles] = useState('');
  const [usuarioTipo, setUsuarioTipo] = useState('');
  const [usuarioId, setUsuarioId] = useState('');
  const [tipoDocumento, setTipoDocumento] = useState('');
  const [documentoRelacionado, setDocumentoRelacionado] = useState('');

  const [usuarios, setUsuarios] = useState({ clientes: [], detectives: [] });
  const [documentos, setDocumentos] = useState([]);

  useEffect(() => {
    const obtenerDatosRelacionados = async (idCaso) => {
        try {
            const response = await fetch(`http://localhost:3000/api/historiales/caso/${idCaso}`, {
              method: 'GET',
              headers: { 'Content-Type': 'application/json' },
            });

            const data = await response.json();

            // Poblar documentos con tipo
            const documentosConTipo = [
              ...(data.idCaso.evidencias || []).map(e => ({ ...e, tipo: 'Evidencia' })),
              ...(data.idCaso.registroCasos || []).map(r => ({ ...r, tipo: 'RegistroCaso' })),
              ...(data.idCaso.contratos || []).map(c => ({ ...c, tipo: 'Contrato' }))
            ];
            setDocumentos(documentosConTipo);

            // Poblar usuarios asociados al caso (cliente y detective)
            setUsuarios({
              clientes: [data.idCaso.idCliente],
              detectives: [data.idCaso.idDetective],
            });
        } catch (error) {
            console.error('Error al obtener datos relacionados:', error);
        }
    };

    if (historial.idCaso) {
      obtenerDatosRelacionados(historial.idCaso); // Llamada con idCaso
    }
  }, [historial]);

  const handleAgregarAccion = async (e) => {
    e.preventDefault();

    const payload = {
      accion,
      detalles,
      usuarioTipo,
      usuario: usuarioId,
      tipoDocumento,
      documentoRelacionado: documentoRelacionado || null,
    };

    try {
      const res = await fetch(`http://localhost:3000/api/historiales/${historial._id}/acciones`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setAccion('');
        setDetalles('');
        setUsuarioTipo('');
        setUsuarioId('');
        setTipoDocumento('');
        setDocumentoRelacionado('');
        onActualizar(); // recarga historial
      } else {
        const error = await res.json();
        console.error('Error al agregar acción:', error.message);
      }
    } catch (error) {
      console.error('Error al conectar con el servidor:', error);
    }
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom>Novedades del Caso</Typography>
      <Divider sx={{ mb: 2 }} />

      <Typography variant="subtitle1" sx={{ mt: 2, fontWeight: 'bold' }}>📌 Acciones registradas:</Typography>
      {historial.acciones && historial.acciones.length > 0 ? (
        historial.acciones.map((accion, index) => (
          <Box key={index} sx={{ my: 1, p: 2, border: '1px solid #ccc', borderRadius: 2 }}>
            <Typography variant="body1"><strong>Acción:</strong> {accion.accion}</Typography>
            <Typography variant="body2"><strong>Detalles:</strong> {accion.detalles}</Typography>
            <Typography variant="body2"><strong>Tipo Usuario:</strong> {accion.usuarioTipo}</Typography>
            <Typography variant="body2"><strong>Fecha:</strong> {new Date(accion.fecha).toLocaleString()}</Typography>
          </Box>
        ))
      ) : (
        <Typography variant="body2">No hay acciones registradas.</Typography>
      )}

      <Divider sx={{ my: 3 }} />
      <Typography variant="h6" gutterBottom>Agregar nueva acción</Typography>

      <Box component="form" onSubmit={handleAgregarAccion}>
        <TextField
          select
          fullWidth
          label="Acción"
          value={accion}
          onChange={(e) => setAccion(e.target.value)}
          sx={{ mb: 2 }}
          required
        >
          {accionesDisponibles.map((op) => (
            <MenuItem key={op} value={op}>{op}</MenuItem>
          ))}
        </TextField>

        <TextField
          fullWidth
          label="Detalles"
          value={detalles}
          onChange={(e) => setDetalles(e.target.value)}
          multiline
          rows={3}
          sx={{ mb: 2 }}
          required
        />

        <TextField
          select
          fullWidth
          label="Tipo de Usuario"
          value={usuarioTipo}
          onChange={(e) => setUsuarioTipo(e.target.value)}
          sx={{ mb: 2 }}
          required
        >
          <MenuItem value="Cliente">Cliente</MenuItem>
          <MenuItem value="Detective">Detective</MenuItem>
        </TextField>

        {usuarioTipo && (
          <TextField
            select
            fullWidth
            label="ID del Usuario"
            value={usuarioId}
            onChange={(e) => setUsuarioId(e.target.value)}
            sx={{ mb: 2 }}
            required
          >
            {usuarioTipo === 'Cliente' && usuarios.clientes.map((cliente) => (
              <MenuItem key={cliente._id} value={cliente._id}>{cliente.nombres}</MenuItem>
            ))}
            {usuarioTipo === 'Detective' && usuarios.detectives.map((detective) => (
              <MenuItem key={detective._id} value={detective._id}>{detective.nombres}</MenuItem>
            ))}
          </TextField>
        )}

        <TextField
          select
          fullWidth
          label="Tipo de Documento (opcional)"
          value={tipoDocumento}
          onChange={(e) => setTipoDocumento(e.target.value)}
          sx={{ mb: 2 }}
        >
          <MenuItem value="">Ninguno</MenuItem>
          {tiposDocumento.map((op) => (
            <MenuItem key={op} value={op}>{op}</MenuItem>
          ))}
        </TextField>

        {tipoDocumento && (
          <TextField
            select
            fullWidth
            label="ID del Documento Relacionado (opcional)"
            value={documentoRelacionado}
            onChange={(e) => setDocumentoRelacionado(e.target.value)}
            sx={{ mb: 2 }}
          >
            {documentos
              .filter(doc => doc.tipo === tipoDocumento)
              .map((documento) => (
                <MenuItem key={documento._id} value={documento._id}>{documento.nombre}</MenuItem>
              ))}
          </TextField>
        )}

        <Button type="submit" variant="contained" sx={{ backgroundColor: '#005f91' }}>
          Guardar Acción
        </Button>
      </Box>
    </Box>
  );
};

export default NovedadesHistorial;
