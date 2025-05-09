import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

const generarPDF = (formData) => {
  // Obtener la fecha del día de hoy
  const fechaHoy = new Date();
  const dia = fechaHoy.getDate().toString().padStart(2, '0');
  const mes = (fechaHoy.getMonth() + 1).toString().padStart(2, '0');
  const año = fechaHoy.getFullYear();

  // Formatear la fecha en el formato deseado
  const fechaFormateada = `${dia} de ${getMesNombre(mes)} de ${año}`;

  // Función para obtener el nombre del mes
  function getMesNombre(mes) {
    const meses = [
      "enero", "febrero", "marzo", "abril", "mayo", "junio",
      "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"
    ];
    return meses[mes - 1];
  }

  // Crear nuevo documento PDF
  const doc = new jsPDF();
  
  // Constantes de diseño
  const MARGIN = 20;
  const MAX_WIDTH = doc.internal.pageSize.width - (MARGIN * 2);
  const PAGE_HEIGHT = doc.internal.pageSize.height;
  const LINE_HEIGHT = 7;
  
  // Paleta de colores
  const COLORS = {
    PRIMARY: [25, 55, 102],    // Azul oscuro más profesional
    SECONDARY: [70, 130, 180], // Azul acero (para detalles)
    ACCENT: [192, 192, 192],   // Gris plateado
    TEXT: [50, 50, 50],        // Casi negro (más suave que negro puro)
    LIGHT_TEXT: [255, 255, 255] // Blanco
  };
  
  // Configuración de fuentes y tamaños
  const FONTS = {
    HEADER: { size: 16, style: 'bold' },
    SUBHEADER: { size: 14, style: 'bold' },
    SECTION: { size: 12, style: 'bold' },
    NORMAL: { size: 11, style: 'normal' },
    SMALL: { size: 10, style: 'normal' }
  };

  // Función para agregar encabezado
  function addHeader(text) {
    // Encabezado con degradado
    doc.setFillColor(...COLORS.PRIMARY);
    doc.rect(0, 0, doc.internal.pageSize.width, 30, 'F');
    
    // Línea decorativa
    doc.setFillColor(...COLORS.SECONDARY);
    doc.rect(0, 30, doc.internal.pageSize.width, 3, 'F');
    
    // Texto de encabezado
    doc.setFont('helvetica', FONTS.HEADER.style);
    doc.setFontSize(FONTS.HEADER.size);
    doc.setTextColor(...COLORS.LIGHT_TEXT);
    doc.text(text, doc.internal.pageSize.width / 2, 19, { align: 'center' });
  }

  // Función para agregar los encabezados de las secciones
  function addSectionHeader(text, yPosition) {
    doc.setFont('helvetica', FONTS.SUBHEADER.style);
    doc.setFontSize(FONTS.SUBHEADER.size);
    doc.setTextColor(...COLORS.PRIMARY);
    doc.text(text, MARGIN, yPosition);
    
    // Línea bajo el título de sección
    doc.setDrawColor(...COLORS.SECONDARY);
    doc.setLineWidth(0.5);
    doc.line(MARGIN, yPosition + 1, doc.internal.pageSize.width - MARGIN, yPosition + 1);
    
    doc.setTextColor(...COLORS.TEXT);
    doc.setFont('helvetica', FONTS.NORMAL.style);
    doc.setFontSize(FONTS.NORMAL.size);
    
    return yPosition + 8;
  }

  // Función para verificar el espacio y cambiar de página si es necesario
  function checkPageOverflow(yPosition, buffer = 15) {
    if (yPosition > PAGE_HEIGHT - buffer) {
      doc.addPage();
      yPosition = 40; // Iniciar la nueva página con margen
    }
    return yPosition;
  }

  // Función para ajustar texto con varias líneas
  function ajustarTexto(texto, yPosition, maxWidth) {
    const lines = doc.splitTextToSize(texto, maxWidth);
    
    // Verificar si el texto se desborda
    if (yPosition + (lines.length * LINE_HEIGHT) > PAGE_HEIGHT - MARGIN) {
      doc.addPage();
      addHeader('CONTRATO DE SERVICIOS DE DETECTIVES PRIVADOS - CONTINUACIÓN');
      yPosition = 40;
    }
    
    // Dibujar las líneas
    lines.forEach((line, index) => {
      doc.text(line, MARGIN, yPosition + (index * LINE_HEIGHT));
    });
    
    return yPosition + (lines.length * LINE_HEIGHT) + 5; // Agregar espacio adicional
  }

  // Función para agregar elementos con viñetas
  function addBulletItem(title, content, yPosition) {
    // Viñeta personalizada
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(...COLORS.SECONDARY);
    doc.text('•', MARGIN, yPosition);
    
    // Título
    doc.setTextColor(...COLORS.PRIMARY);
    doc.text(` ${title}:`, MARGIN + 5, yPosition);
    
    // Contenido
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(...COLORS.TEXT);
    doc.text(content, MARGIN + 35, yPosition);
    
    return yPosition + LINE_HEIGHT + 3;
  }

  // Función para agregar firma
  function addSignature(role, name, date, yPosition) {
    // Línea de firma con estilo
    doc.setDrawColor(...COLORS.ACCENT);
    doc.setLineWidth(0.5);
    const lineLength = 120;
    const startX = MARGIN + 30;
    
    // Bloque de firma
    doc.setFillColor(248, 248, 255); // Color de fondo muy suave
    doc.roundedRect(MARGIN - 5, yPosition - 5, 180, 35, 3, 3, 'F');
    
    // Información de firma
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(...COLORS.PRIMARY);
    doc.text(`${role}:`, MARGIN, yPosition);
    
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(...COLORS.TEXT);
    doc.text(`Nombre: ${name}`, MARGIN + 5, yPosition + 7);
    
    doc.text('Firma:', MARGIN + 5, yPosition + 14);
    doc.line(startX, yPosition + 14, startX + lineLength, yPosition + 14);
    
    // Fecha con estilo
    doc.setFont('helvetica', 'italic');
    doc.setFontSize(FONTS.SMALL.size);
    doc.text(`Fecha: ${date}`, MARGIN + 5, yPosition + 21);
    
    doc.setFontSize(FONTS.NORMAL.size);
    doc.setFont('helvetica', 'normal');
    
    return yPosition + 35;
  }

  // Crear primera página con encabezado elegante
  addHeader('CONTRATO DE SERVICIOS DE DETECTIVES PRIVADOS');
  
  // Posición inicial después del encabezado
  let yPosition = 50;
  
  // Información general
  doc.setFont('helvetica', FONTS.NORMAL.style);
  doc.setFontSize(FONTS.NORMAL.size);
  doc.setTextColor(...COLORS.TEXT);
  
  // Fecha con estilo
  doc.setFont('helvetica', 'italic');
  doc.text(`En Bogotá DC, a ${fechaFormateada}`, doc.internal.pageSize.width / 2, yPosition, { align: 'center' });
  doc.setFont('helvetica', 'normal');
  
  yPosition += 15;
  
  // Datos de La Agencia
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(...COLORS.PRIMARY);
  doc.text('ENTRE:', MARGIN, yPosition);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(...COLORS.TEXT);
  yPosition += 8;
  
  const agenciaTexto = `La Agencia de Detectives PTC, con domicilio en Carrera 17 #79-04, representada por Jeison Villamil, con documento de identidad 1134894848, en adelante referida como "La Agencia".`;
  yPosition = ajustarTexto(agenciaTexto, yPosition, MAX_WIDTH);
  
  // Datos del Cliente
  yPosition = checkPageOverflow(yPosition);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(...COLORS.PRIMARY);
  doc.text('Cliente:', MARGIN, yPosition);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(...COLORS.TEXT);
  yPosition += 8;
  
  const clienteTexto = `${formData.cliente.nombres} ${formData.cliente.apellidos}, con documento de identidad ${formData.cliente.numeroDocumento}, en adelante referido como "El Cliente".`;
  yPosition = ajustarTexto(clienteTexto, yPosition, MAX_WIDTH);
  
  // Datos del Detective
  yPosition = checkPageOverflow(yPosition);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(...COLORS.PRIMARY);
  doc.text('Detective:', MARGIN, yPosition);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(...COLORS.TEXT);
  yPosition += 8;
  
  const detectiveTexto = `${formData.detective.nombres} ${formData.detective.apellidos}, con documento de identidad ${formData.detective.numeroDocumento}, especialidad ${formData.detective.especialidad}, en adelante referido como "El Detective".`;
  yPosition = ajustarTexto(detectiveTexto, yPosition, MAX_WIDTH);
  
  // Sección 1: Objeto del Contrato
  yPosition = checkPageOverflow(yPosition);
  yPosition = addSectionHeader('1. Objeto del Contrato', yPosition);
  
  const objetoContrato = "La Agencia se compromete a prestar los servicios de investigación y detección privados a El Cliente, conforme a las especificaciones detalladas en el presente contrato.";
  yPosition = ajustarTexto(objetoContrato, yPosition, MAX_WIDTH);
  
  // Sección 2: Descripción del Servicio
  yPosition = checkPageOverflow(yPosition);
  yPosition = addSectionHeader('2. Descripción del Servicio', yPosition);
  
  const textoInvestigaciones = "La Agencia se encargará de realizar investigaciones privadas en el tipo de investigación: fraude, seguimientos, investigaciones familiares, etc. que el cliente necesite. Las especificaciones del servicio se detallan a continuación:";
  yPosition = ajustarTexto(textoInvestigaciones, yPosition, MAX_WIDTH);
  
  yPosition = checkPageOverflow(yPosition);
  yPosition = addBulletItem("Descripción del servicio", formData.descripcionServicio, yPosition);
  yPosition = addBulletItem("Fecha de inicio", formData.fechaInicio, yPosition);
  yPosition = addBulletItem("Fecha de finalización", formData.fechaCierre, yPosition);
  
  // Sección 3: Tarifas y Honorarios
  yPosition = checkPageOverflow(yPosition);
  yPosition = addSectionHeader('3. Tarifas y Honorarios', yPosition);
  
  const textoTarifas = "El Cliente acuerda pagar a La Agencia una tarifa acordada, en concepto de la modalidad de pago acordada.";
  yPosition = ajustarTexto(textoTarifas, yPosition, MAX_WIDTH);
  
  yPosition = checkPageOverflow(yPosition);
  yPosition = addBulletItem("Tarifa total", `$${formData.tarifa}`, yPosition);
  
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(...COLORS.SECONDARY);
  doc.text('El pago deberá realizarse de la siguiente manera:', MARGIN, yPosition);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(...COLORS.TEXT);
  yPosition += 8;
  
  yPosition = addBulletItem("Tipo de tarifa", formData.tipoTarifa, yPosition);
  yPosition = addBulletItem("Método de pago", formData.metodoPago, yPosition);
  
  // Sección 4: Obligaciones de las Partes
  yPosition = checkPageOverflow(yPosition);
  yPosition = addSectionHeader('4. Obligaciones de las Partes', yPosition);
  
  const textoObligaciones = "La Agencia se obliga a realizar las investigaciones de forma profesional, diligente, objetiva y ajustada a la legalidad colombiana. El Cliente deberá colaborar con la información necesaria para el cumplimiento del servicio, y se abstendrá de interferir en el desarrollo de las actividades asignadas al detective.";
  yPosition = ajustarTexto(textoObligaciones, yPosition, MAX_WIDTH);
  
  // Sección 5: Confidencialidad
  yPosition = checkPageOverflow(yPosition);
  yPosition = addSectionHeader('5. Confidencialidad', yPosition);
  
  const textoConfidencialidad = "Toda la información intercambiada, recolectada o producida durante la vigencia del contrato será tratada como confidencial. Ninguna de las partes podrá divulgarla sin autorización escrita de la otra, salvo requerimiento legal de autoridad competente.";
  yPosition = ajustarTexto(textoConfidencialidad, yPosition, MAX_WIDTH);
  
  // Sección 6: Duración y Terminación
  yPosition = checkPageOverflow(yPosition);
  yPosition = addSectionHeader('6. Duración y Terminación', yPosition);
  
  const textoDuracion = "El presente contrato inicia en la fecha establecida en este documento y finaliza en la fecha acordada. Cualquiera de las partes podrá terminarlo de manera anticipada con preaviso escrito de cinco (5) días hábiles. Si el Cliente termina el contrato sin justa causa, deberá pagar los costos generados hasta la fecha de terminación.";
  yPosition = ajustarTexto(textoDuracion, yPosition, MAX_WIDTH);
  
  // Sección 7: Responsabilidad
  yPosition = checkPageOverflow(yPosition);
  yPosition = addSectionHeader('7. Responsabilidad', yPosition);
  
  const textoResponsabilidad = "La Agencia responderá únicamente por los actos realizados en el ejercicio de su labor profesional conforme a la legislación colombiana. No responderá por actos u omisiones imputables al Cliente ni por resultados que dependan de terceros o situaciones imprevisibles.";
  yPosition = ajustarTexto(textoResponsabilidad, yPosition, MAX_WIDTH);
  
  // Sección 8: Legislación Aplicable y Jurisdicción
  yPosition = checkPageOverflow(yPosition);
  yPosition = addSectionHeader('8. Legislación Aplicable y Jurisdicción', yPosition);
  
  const textoLegislacion = "Este contrato se rige por las leyes de la República de Colombia, en especial lo dispuesto en el Código Civil, Código de Comercio, Ley 1801 de 2016 (Código Nacional de Policía) y normas sobre vigilancia y seguridad privada. Cualquier diferencia será resuelta por los jueces civiles de Bogotá D.C.";
  yPosition = ajustarTexto(textoLegislacion, yPosition, MAX_WIDTH);
  
  // Sección 9: Aceptación del Contrato
  yPosition = checkPageOverflow(yPosition);
  yPosition = addSectionHeader('9. Aceptación del Contrato', yPosition);
  
  const textoAceptacion = "Las partes manifiestan que han leído y entendido cada una de las cláusulas aquí descritas, por lo cual lo suscriben en señal de aceptación, reconociendo su validez legal conforme a las normas vigentes en Colombia.";
  yPosition = ajustarTexto(textoAceptacion, yPosition, MAX_WIDTH);
  
  // Sección de Firmas
  yPosition = checkPageOverflow(yPosition, 45);
  yPosition = addSectionHeader('FIRMAS', yPosition);
  yPosition += 5;
  
  const signatures = [
    { role: 'Representante de La Agencia', name: 'Jeison Villamil', date: formData.fechaFirmaAgencia },
    { role: 'Cliente', name: `${formData.cliente.nombres} ${formData.cliente.apellidos}`, date: formData.fechaFirmaCliente },
    { role: 'Detective', name: `${formData.detective.nombres} ${formData.detective.apellidos}`, date: formData.fechaFirmaDetective }
  ];
  
  signatures.forEach(sig => {
    yPosition = checkPageOverflow(yPosition, 40);
    yPosition = addSignature(sig.role, sig.name, sig.date, yPosition);
  });
  
  // Información de Contacto en un pie de página elegante
  doc.setFillColor(...COLORS.PRIMARY);
  doc.rect(0, PAGE_HEIGHT - 30, doc.internal.pageSize.width, 30, 'F');
  
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(FONTS.SECTION.size);
  doc.setTextColor(...COLORS.LIGHT_TEXT);
  doc.text('INFORMACIÓN DE CONTACTO', doc.internal.pageSize.width / 2, PAGE_HEIGHT - 20, { align: 'center' });
  
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(FONTS.SMALL.size);
  const contactInfo = 'Dirección: Carrera 15 #79-10 | Teléfono: 350 5090145 | Email: ptcinvestigationprivatetec@gmail.com';
  doc.text(contactInfo, doc.internal.pageSize.width / 2, PAGE_HEIGHT - 10, { align: 'center' });
  
  // Agregar numeración a las páginas
  const totalPages = doc.internal.getNumberOfPages();
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i);
    doc.setFont('helvetica', 'italic');
    doc.setFontSize(8);
    doc.setTextColor(...COLORS.ACCENT);
    doc.text(`Página ${i} de ${totalPages}`, doc.internal.pageSize.width - 25, PAGE_HEIGHT - 35);
  }
  
  // Guardar el PDF
  doc.save('Contrato_DetDetective.pdf');
  
  return (
    <div>
      <button 
        style={{ 
          backgroundColor: '#1a3766', 
          color: 'white', 
          padding: '10px 20px', 
          border: 'none', 
          borderRadius: '5px', 
          cursor: 'pointer',
          fontWeight: 'bold',
          boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
        }} 
        onClick={() => generarPDF()}
      >
        Generar Contrato PDF
      </button>
    </div>
  );
};

export default generarPDF;