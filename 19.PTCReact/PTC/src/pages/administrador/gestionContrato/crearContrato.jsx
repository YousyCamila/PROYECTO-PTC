import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  InputLabel,
  FormControl,
  MenuItem,
  Select,
  Grid,
  Paper,
} from '@mui/material';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable'; // Para tablas más avanzadas

const CrearContrato = () => {
  const navigate = useNavigate();

  // Estado inicial expandido
  const [formData, setFormData] = useState({
    descripcionServicio: '',
    fechaInicio: '',
    fechaCierre: '',
    clausulas: '',
    tarifa: '',
    estado: true,
    idCliente: '',
    idDetective: '',
    cliente: null,
    detective: null,
    metodoPago: '', // Nuevo campo
    tipoTarifa: '', // Nuevo campo
    plazosPago: '', // Nuevo campo
  });

  const [clientes, setClientes] = useState([]);
  const [detectives, setDetectives] = useState([]);
  const [loading, setLoading] = useState(true);

  // Métodos de pago predefinidos
  const metodosPago = [
    'Transferencia Bancaria',
    'Pago en Efectivo',
    'Tarjeta de Crédito',
    'Cheque'
  ];

  const tiposTarifa = [
    'Tarifa Fija',
    'Tarifa por Hora',
    'Tarifa por Proyecto'
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [clientesResponse, detectivesResponse] = await Promise.all([
          fetch("http://localhost:3000/api/clientes"),
          fetch("http://localhost:3000/api/detectives")
        ]);

        const clientesData = await clientesResponse.json();
        const detectivesData = await detectivesResponse.json();

        setClientes(clientesData);
        setDetectives(detectivesData);
      } catch (error) {
        console.error("Error fetching data:", error);
        Swal.fire({
          icon: 'error',
          title: 'Error de Carga',
          text: 'No se pudieron cargar los datos. Por favor, reintente.',
        });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Validaciones más robustas
    if (name === 'tarifa') {
      const numValue = value.replace(/[^\d.]/g, '');
      if (numValue.split('.').length > 2) return; // Prevenir múltiples puntos
      setFormData({ ...formData, [name]: numValue });
      return;
    }

    setFormData({ ...formData, [name]: value });
  };

  const handleClienteChange = (e) => {
    const selectedCliente = clientes.find((cliente) => cliente._id === e.target.value);
    setFormData((prevState) => ({
      ...prevState,
      idCliente: e.target.value,
      cliente: selectedCliente,
    }));
  };

  const handleDetectiveChange = (e) => {
    const selectedDetective = detectives.find((detective) => detective._id === e.target.value);
    setFormData((prevState) => ({
      ...prevState,
      idDetective: e.target.value,
      detective: selectedDetective,
    }));
  };

  const validateForm = () => {
    const requiredFields = [
      'descripcionServicio',
      'fechaInicio',
      'fechaCierre',
      'tarifa',
      'idCliente',
      'metodoPago',
      'tipoTarifa'
    ];

    for (let field of requiredFields) {
      if (!formData[field]) {
        Swal.fire({
          icon: 'warning',
          title: 'Campos Incompletos',
          text: `Por favor complete el campo: ${field}`
        });
        return false;
      }
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      const response = await fetch('http://localhost:3000/api/contratos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error('Error al crear el contrato');
      }



      /// cambiooooos

      // Obtener la fecha del día de hoy
      const fechaHoy = new Date();
      const dia = fechaHoy.getDate().toString().padStart(2, '0'); // Día con dos dígitos
      const mes = (fechaHoy.getMonth() + 1).toString().padStart(2, '0'); // Mes con dos dígitos
      const año = fechaHoy.getFullYear();

      // Formatear la fecha en el formato deseado (ejemplo: "12 de diciembre de 2024")
      const fechaFormateada = `${dia} de ${getMesNombre(mes)} de ${año}`;

      // Función para obtener el nombre del mes
      function getMesNombre(mes) {
        const meses = [
          "enero", "febrero", "marzo", "abril", "mayo", "junio",
          "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"
        ];
        return meses[mes - 1];
      }

      const doc = new jsPDF();

      // Colores y márgenes
      const COLORS = {
        DARK_BLUE: [0, 51, 102],
        LIGHT_GRAY: [240, 240, 240],
        WHITE: [255, 255, 255]
      };
      const MARGINS = {
        left: 15,
        right: 195,
        top: 15,
        bottom: 280
      };
      
      // Configuración general de la página
      function addPageBackground(doc) {
        doc.setFillColor(...COLORS.LIGHT_GRAY);
        doc.rect(0, 0, 210, 297, 'F');
      }
      
      // Header con gradiente
      function createHeader(doc) {
        doc.setFillColor(...COLORS.DARK_BLUE);
        doc.rect(10, 10, 190, 15, 'F');
        doc.setTextColor(...COLORS.WHITE);
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(16);
        doc.text('CONTRATO DE SERVICIOS DE DETECTIVES PRIVADOS', 105, 20, { align: 'center' });
      }
      
      // Sección de encabezados
      function addSectionHeader(doc, text, yPosition) {
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(14);
        doc.setTextColor(...COLORS.DARK_BLUE);
        doc.text(text, 20, yPosition);
        doc.setTextColor(0, 0, 0);
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(12);
      }
      
      // Sección de detalles de las partes
      function addPartyDetails(doc, formData) {
        doc.setFont('helvetica', 'bold');
        doc.text('COMPARECEN:', 20, 50);
        doc.setFont('helvetica', 'normal');
      
        const parties = [
          {
            title: '1. El Cliente',
            details: [
              `Nombre: ${formData.cliente.nombres} ${formData.cliente.apellidos}`,
              `Documento: ${formData.cliente.numeroDocumento}`,
              `Correo: ${formData.cliente.correo}`
            ]
          },
          {
            title: '2. El Detective',
            details: [
              `Nombre: ${formData.detective.nombres} ${formData.detective.apellidos}`,
              `Documento: ${formData.detective.numeroDocumento}`,
              `Correo: ${formData.detective.correo}`,
              `Especialidad: ${formData.detective.especialidad}`
            ]
          }
        ];
      
        let y = 60;
        parties.forEach(party => {
          doc.setFont('helvetica', 'bold');
          doc.text(party.title, 20, y);
          doc.setFont('helvetica', 'normal');
          party.details.forEach(detail => {
            y += 7;
            doc.text(detail, 20, y);
          });
          y += 10;
        });
      }
      
      // Secciones del contrato
      function addContractSections(doc, formData) {
        const sections = [
          { 
            title: '1. Objeto del Contrato', 
            content: 'La Agencia se compromete a prestar servicios de investigación privados conforme a las especificaciones detalladas en el presente contrato.'
          },
          { 
            title: '2. Descripción del Servicio', 
            content: [
              `Descripción: ${formData.descripcionServicio}`,
              `Fecha de inicio: ${formData.fechaInicio}`,
              `Fecha de cierre: ${formData.fechaCierre}`
            ]
          },
          { 
            title: '3. Tarifas y Honorarios', 
            content: [
              `Tarifa total: $${formData.tarifa}`,
              `Tipo de tarifa: ${formData.tipoTarifa}`,
              `Método de pago: ${formData.metodoPago}`,
              `Plazos de pago: ${formData.plazosPago}`
            ]
          }
        ];
      
        let y = 150;
        sections.forEach(section => {
          addSectionHeader(doc, section.title, y);
          y += 10;
      
          if (Array.isArray(section.content)) {
            section.content.forEach(line => {
              doc.text(line, 20, y);
              y += 7;
            });
          } else {
            doc.text(section.content, 20, y);
            y += 10;
          }
          y += 5;
        });
      
        return y;
      }
      
      // Sección de firmas
      function addSignatureSection(doc, formData, startY) {
        const signatures = [
          { role: 'Representante de La Agencia', name: "Jeison Villamil" },
          { role: 'Cliente', name: `${formData.cliente.nombres} ${formData.cliente.apellidos}` },
          { role: 'Detective', name: `${formData.detective.nombres} ${formData.detective.apellidos}` }
        ];
      
        let y = startY + 20;
        addSectionHeader(doc, 'FIRMAS', y);
        y += 15;
      
        signatures.forEach(sig => {
          doc.text(`${sig.role}:`, 20, y);
          y += 7;
          doc.text(`Nombre: ${sig.name}`, 20, y);
          y += 7;
          doc.setDrawColor(200);
          doc.line(20, y + 3, 100, y + 3);
          doc.text('Firma: ___________________________', 20, y);
          y += 7;
          doc.text(`Fecha: ${new Date().toLocaleDateString()}`, 20, y);
          y += 15;
        });
      }
      
      // Sección de contacto
      function addContactSection(doc) {
        const currentY = MARGINS.bottom + 20;
        addSectionHeader(doc, 'INFORMACIÓN DE CONTACTO', currentY);
      
        const contactDetails = [
          { icon: '📍', text: 'Carrera 15 #79-10' },
          { icon: '📞', text: '350 5090145' },
          { icon: '✉️', text: 'ptcinvestigationprivatetec@gmail.com' }
        ];
      
        let y = currentY + 10;
        contactDetails.forEach(detail => {
          doc.text(`${detail.icon} ${detail.text}`, 20, y);
          y += 7;
        });
      }
      
      // Generar PDF
      function generatePDF(formData) {
        addPageBackground(doc);
        createHeader(doc);
      
        doc.setTextColor(0, 0, 0);
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(12);
      
        doc.text(`En Bogotá DC, a ${new Date().toLocaleDateString()}`, 105, 40, { align: 'center' });
      
        addPartyDetails(doc, formData);
        const lastSectionY = addContractSections(doc, formData);
        addSignatureSection(doc, formData, lastSectionY);
        addContactSection(doc);
      
        doc.save('Contrato_Servicios_Detectives.pdf');
      }
      


      Swal.fire({
        icon: 'success',
        title: 'Contrato Creado',
        text: 'El contrato se ha generado exitosamente.'
      });

      // Opcional: navegar después de crear
      navigate('/gestionar-contratos');

    } catch (error) {
      console.error('Error:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error.message
      });
    }
  };

  if (loading) {
    return <Typography>Cargando...</Typography>;
  }

  return (
    <Box
      sx={{
        width: "100vw",
        minHeight: "100vh",
        background: "linear-gradient(to right, #0077b6, #00b4d8)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        py: 4
      }}
    >
      <Container maxWidth="md">
        <Paper
          elevation={6}
          sx={{
            backgroundColor: "white",
            padding: 4,
            borderRadius: 2
          }}
        >
          <Typography
            variant="h4"
            component="h1"
            gutterBottom
            sx={{
              textAlign: "center",
              color: "#0077b6",
              mb: 3
            }}
          >
            Crear Nuevo Contrato de Investigación
          </Typography>

          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth margin="normal">
                  <InputLabel id="cliente-label">Cliente *</InputLabel>
                  <Select
                    labelId="cliente-label"
                    name="idCliente"
                    value={formData.idCliente}
                    onChange={handleClienteChange}
                    required
                  >
                    {clientes.map((cliente) => (
                      <MenuItem key={cliente._id} value={cliente._id}>
                        {cliente.nombres} {cliente.apellidos}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} md={6}>
                <FormControl fullWidth margin="normal">
                  <InputLabel id="detective-label">Detective (opcional)</InputLabel>
                  <Select
                    labelId="detective-label"
                    name="idDetective"
                    value={formData.idDetective}
                    onChange={handleDetectiveChange}
                  >
                    {detectives.map((detective) => (
                      <MenuItem key={detective._id} value={detective._id}>
                        {detective.nombres} {detective.apellidos}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Descripción del Servicio *"
                  name="descripcionServicio"
                  margin="normal"
                  value={formData.descripcionServicio}
                  onChange={handleChange}
                  required
                  multiline
                  rows={3}
                />
              </Grid>

              <Grid item xs={12} md={3}>
                <TextField
                  fullWidth
                  label="Fecha de Inicio *"
                  type="date"
                  name="fechaInicio"
                  margin="normal"
                  value={formData.fechaInicio}
                  onChange={handleChange}
                  required
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>

              <Grid item xs={12} md={3}>
                <TextField
                  fullWidth
                  label="Fecha de Cierre *"
                  type="date"
                  name="fechaCierre"
                  margin="normal"
                  value={formData.fechaCierre}
                  onChange={handleChange}
                  required
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>

              <Grid item xs={12} md={4}>
                <FormControl fullWidth margin="normal">
                  <InputLabel>Método de Pago *</InputLabel>
                  <Select
                    name="metodoPago"
                    value={formData.metodoPago}
                    onChange={handleChange}
                    required
                  >
                    {metodosPago.map(metodo => (
                      <MenuItem key={metodo} value={metodo}>{metodo}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} md={4}>
                <FormControl fullWidth margin="normal">
                  <InputLabel>Tipo de Tarifa *</InputLabel>
                  <Select
                    name="tipoTarifa"
                    value={formData.tipoTarifa}
                    onChange={handleChange}
                    required
                  >
                    {tiposTarifa.map(tipo => (
                      <MenuItem key={tipo} value={tipo}>{tipo}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  label="Tarifa *"
                  name="tarifa"
                  type="text"
                  margin="normal"
                  value={formData.tarifa}
                  onChange={handleChange}
                  required
                  helperText="Solo números, use punto para decimales"
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Cláusulas Adicionales"
                  name="clausulas"
                  margin="normal"
                  value={formData.clausulas}
                  onChange={handleChange}
                  multiline
                  rows={3}
                />
              </Grid>

              <Grid item xs={12} container justifyContent="center" spacing={2}>
                <Grid item>
                  <Button
                    type="submit"
                    variant="contained"
                    sx={{
                      backgroundColor: "#0077b6",
                      "&:hover": { backgroundColor: "#005f91" }
                    }}
                  >
                    Crear Contrato
                  </Button>
                </Grid>
                <Grid item>
                  <Button
                    variant="outlined"
                    onClick={() => navigate(-1)}
                    sx={{
                      color: '#0077b6',
                      borderColor: '#0077b6',
                      '&:hover': { backgroundColor: '#e0e0e0' },
                    }}
                  >
                    Cancelar
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Container>
    </Box>
  );
};

export default CrearContrato;