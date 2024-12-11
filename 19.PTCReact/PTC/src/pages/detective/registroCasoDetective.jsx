import React, { useState, useEffect } from 'react';
import { saveAs } from 'file-saver';
import Docxtemplater from 'docxtemplater';
import PizZip from 'pizzip';

const RegistroCasoDetective = ({ detectiveId }) => {
  const [casos, setCasos] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchCasosDetective = async () => {
    try {
      const response = await fetch(`http://localhost:300/api/casos-detective/${detectiveId}`);
      if (!response.ok) {
        throw new Error('Error al obtener los casos del detective');
      }
      const data = await response.json();
      setCasos(data);
    } catch (err) {
      console.error(err);
      setError('Error al cargar los casos del detective.');
    } finally {
      setLoading(false);
    }
  };

  const exportarWord = (caso) => {
    const zip = new PizZip();
    const doc = new Docxtemplater(zip);

    const contenido = `
      Registro del Caso
      ==================
      Descripción: ${caso.descripcion}
      Fecha de Inicio: ${new Date(caso.fechaInicio).toLocaleDateString()}
      Fecha de Finalización: ${caso.fechaFinalizacion ? new Date(caso.fechaFinalizacion).toLocaleDateString() : 'N/A'}
      Estado: ${caso.estado}
      Detective Asignado: ${caso.detectiveNombre}
    `;

    zip.file('caso.docx', contenido);
    doc.loadZip(zip);
    const output = doc.getZip().generate({ type: 'blob' });
    saveAs(output, `caso_${caso.id}.docx`);
  };

  useEffect(() => {
    if (detectiveId) {
      fetchCasosDetective();
    }
  }, [detectiveId]);

  return (
    <div>
      <h2>Casos Asignados al Detective</h2>
      {loading ? (
        <p>Cargando información...</p>
      ) : error ? (
        <p style={{ color: 'red' }}>{error}</p>
      ) : casos.length > 0 ? (
        casos.map((caso) => (
          <div key={caso.id} style={{ marginBottom: '20px', padding: '10px', border: '1px solid #ddd' }}>
            <p><strong>Descripción:</strong> {caso.descripcion}</p>
            <p><strong>Fecha de Inicio:</strong> {new Date(caso.fechaInicio).toLocaleDateString()}</p>
            <p><strong>Fecha de Finalización:</strong> {caso.fechaFinalizacion ? new Date(caso.fechaFinalizacion).toLocaleDateString() : 'N/A'}</p>
            <p><strong>Estado:</strong> {caso.estado}</p>
            <p><strong>Detective Asignado:</strong> {caso.detectiveNombre}</p>
            <button onClick={() => exportarWord(caso)}>Exportar a Word</button>
          </div>
        ))
      ) : (
        <p>No hay casos asignados a este detective.</p>
      )}
    </div>
  );
};

export default RegistroCasoDetective;
