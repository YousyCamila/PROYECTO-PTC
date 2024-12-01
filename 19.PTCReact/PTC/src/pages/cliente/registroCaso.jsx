import React, { useState, useEffect } from 'react';
import { saveAs } from 'file-saver'; // Para exportar el archivo Word
import Docxtemplater from 'docxtemplater';
import PizZip from 'pizzip';

const RegistroCaso = ({ idCaso }) => {
  const [registro, setRegistro] = useState(null);
  const [error, setError] = useState('');

  // Obtener el registro de caso por ID usando fetch
  const fetchRegistroCaso = async () => {
    try {
      const response = await fetch(`http://localhost:300/api/registros-caso/${idCaso}`);
      if (!response.ok) {
        throw new Error('Error al obtener el registro del caso');
      }
      const data = await response.json();
      setRegistro(data);
    } catch (err) {
      console.error(err);
      setError('Error al cargar el registro del caso.');
    }
  };

  // Exportar a Word
  const exportarWord = () => {
    const zip = new PizZip();
    const doc = new Docxtemplater(zip);

    const contenido = `
      Registro de Caso
      ==================
      Descripción: ${registro.descripcion}
      Fecha de Inicio: ${new Date(registro.fechaInicio).toLocaleDateString()}
      Fecha de Finalización: ${registro.fechaFinalizacion ? new Date(registro.fechaFinalizacion).toLocaleDateString() : 'N/A'}
      Estado: ${registro.estadoRegistro}
      Seguimiento: ${registro.seguimientoPorcentaje ? registro.seguimientoPorcentaje.toString() : 'N/A'}%
    `;

    zip.file('registro.docx', contenido);
    doc.loadZip(zip);
    const output = doc.getZip().generate({ type: 'blob' });
    saveAs(output, 'registro_caso.docx');
  };

  useEffect(() => {
    fetchRegistroCaso();
  }, [idCaso]);

  return (
    <div>
      <h2>Registro del Caso</h2>
      {registro ? (
        <div>
          <p><strong>Descripción:</strong> {registro.descripcion}</p>
          <p><strong>Fecha de Inicio:</strong> {new Date(registro.fechaInicio).toLocaleDateString()}</p>
          <p><strong>Fecha de Finalización:</strong> {registro.fechaFinalizacion ? new Date(registro.fechaFinalizacion).toLocaleDateString() : 'N/A'}</p>
          <p><strong>Estado:</strong> {registro.estadoRegistro}</p>
          <p><strong>Seguimiento:</strong> {registro.seguimientoPorcentaje ? `${registro.seguimientoPorcentaje.toString()}%` : 'N/A'}</p>
          <button onClick={exportarWord}>Exportar a Word</button>
        </div>
      ) : (
        <p>Cargando información del caso...</p>
      )}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default RegistroCaso;
