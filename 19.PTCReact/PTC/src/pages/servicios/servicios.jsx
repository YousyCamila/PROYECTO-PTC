import React from 'react';
import './servicios.css';
import { Link, useNavigate } from 'react-router-dom';

const Servicios = () => {
  const navigate = useNavigate(); // Hook para la navegación

  return (
    <>
      <div className="header-line">
        <h2 className="header-title">PTC</h2>
      </div>
      <section className="services-section">
        <div className="services-title">
          <h1>Nuestros Servicios</h1>
        </div>
        <div className="services-content">
          <div className="service">
            <h2>Agencia de Investigación Criminal</h2>
            <p>Investigadores Privados. Investigación Especializada en:</p>
            <ul>
              <li>Cadena de custodia</li>
              <li>Investigación en extorsiones y secuestros</li>
              <li>Estudios de seguridad</li>
              <li>Investigación de infidelidades</li>
              <li>Investigación en robos empresariales</li>
              <li>Antecedentes</li>
              <li>Recuperación de vehículos</li>
            </ul>
            <p>Asesoría legal en todas las áreas del derecho.</p>
          </div>
          <hr className="divider" />
          <div className="service">
            <div className="service-details">
              <div className="service-image"></div>
              <div className="service-description">
                <h3>Cadena de Custodia</h3>
                <p>Procedimiento de control y registro que se aplica a los indicios, vestigios, evidencias,
                  huellas, instrumentos, objetos o productos relacionados con el delito.</p>
                <p>Realizando un acompañamiento según las leyes establecidas en la constitución política de
                  Colombia y el manual de procedimiento para la cadena de custodia.</p>
              </div>
            </div>
          </div>
          <hr className="divider" />
          <div className="service">
            <div className="service-details">
              <div className="service-image"></div>
              <div className="service-description">
                <h3>Extorsiones y Secuestros</h3>
                <p>Delitos de este tipo muchas veces son llevados a cabo por personas cercanas. Nuestros
                  investigadores resuelven estos casos con un 89% de efectividad, asegurando la prevención y
                  solución de estos crímenes.</p>
                <p>Evitar una extorsión o secuestro es posible con nuestros servicios.</p>
              </div>
            </div>
          </div>
          <hr className="divider" />
          <div className="service">
            <div className="service-details">
              <div className="service-image"></div>
              <div className="service-description">
                <h3>Estudios de Seguridad</h3>
                <p>Realizamos estudios de seguridad empresariales y residenciales, análisis de riesgos, rutas de
                  evacuación, y estructuramos un cordón de seguridad para prevenir vulnerabilidades.</p>
                <p>Nuestro personal altamente capacitado define y estudia cada riesgo en su entorno para
                  asegurar su seguridad.</p>
              </div>
            </div>
          </div>
          <hr className="divider" />
          <div className="service">
            <div className="service-details">
              <div className="service-image"></div>
              <div className="service-description">
                <h3>Asesoría Legal</h3>
                <p>Nuestro equipo de abogados especializados en diferentes ramas del derecho brinda asesoría
                  integral para resolver cualquier asunto legal que su empresa o persona pueda necesitar.</p>
                <p>Si desea más información sobre nuestros servicios de asesoría legal, contáctenos.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="button-container">
        <Link to="/contact" className="contact-button">Contáctanos Aquí!</Link>
      </div>

      {/* Botón para retroceder en la esquina inferior derecha */}
      <div className="back-button-container">
        <button onClick={() => navigate(-1)} className="back-button">Regresar</button>
      </div>
    </>
  );
};

export default Servicios;
