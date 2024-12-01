import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Tooltip
} from '@mui/material';


import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { motion } from 'framer-motion';
import { LineChart, CartesianGrid, XAxis, ResponsiveContainer, YAxis, Line, BarChart, Bar } from 'recharts';
import NavbarSidebar from './NavbarSidebar'; 
import './style.css';

const AdminMenu = () => {
  const { user } = useContext(AuthContext);
  const [casos, setCasos] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [detectives, setDetectives] = useState([]);
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [totalDetectives, setTotalDetectives] = useState(0);


  // Si el usuario no es administrador, muestra un mensaje de acceso denegado
  if (!user || user.role !== 'administrador') {
    return <Typography variant="h6" color="error">Acceso denegado. Solo administradores pueden acceder a este menú.</Typography>;
  }

  useEffect(() => {
    fetch('http://localhost:3000/api/caso')
      .then((response) => response.json())
      .then((data) => {
        setCasos(data);
        setLoading(false);
      })
      .catch((error) => console.error('Error al cargar los casos:', error));
  }, []);

  useEffect(() => {
    fetch('http://localhost:3000/api/clientes')
      .then((response) => response.json())
      .then((data) => {
        setClientes(data);
      })
      .catch((error) => console.error('Error al cargar los clientes:', error));
  }, []);


  const especialidades = [
    'Investigación Penal y Criminal',
    'Cadena de Custodia y Evidencias',
    'Extorsiones y Secuestros',
    'Seguridad Residencial y Empresarial',
    'Asesoría Legal',
    'Infidelidades',
    'Fraudes Financieros y Comerciales',
    'Desapariciones',
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/detectives');
        if (!response.ok) {
          throw new Error('Error al cargar los datos');
        }

        const detectives = await response.json();

        // Calcular el total de detectives
        const total = detectives.length;
        setTotalDetectives(total); // Guardar el total de detectives

        // Filtrar y contar detectives por especialidad
        const conteoEspecialidades = especialidades.reduce((acc, especialidad) => {
          acc[especialidad] = detectives.filter((det) =>
            det.especialidad && det.especialidad.includes(especialidad)
          ).length;
          return acc;
        }, {});

        setData(conteoEspecialidades); // Guardar el conteo por especialidad
        setLoading(false); // Cambiar el estado de carga
      } catch (error) {
        console.error('Error al cargar los datos:', error);
        setLoading(false); // En caso de error, detener la carga
      }
    };

    fetchData(); // Llama inmediatamente cuando el componente se monte
    const interval = setInterval(fetchData, 10); // Actualiza cada 5 segundos

    // Limpieza del intervalo cuando el componente se desmonte
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div>Loading...</div> // Puedes colocar un spinner aquí o mensaje de carga
    );
  }

  return (
    

    <Box>
        {/* Agregar el Navbar aquí */}
        <NavbarSidebar />
      {/* Contenido principal */}
      <Container
        maxWidth="xl"
        sx={{
          background: 'radial-gradient(circle, rgba(63,123,251,1) 0%, rgba(70,76,252,1) 100%)',
          padding: '60px 60px 60px 60px', // Puedes ajustar el padding superior
          borderRadius: 2,
          boxShadow: 20,
          textAlign: 'center',
          height: '100vh',
          paddingTop: '60px',

        }}
      >
        <Typography
          variant="h3"
          component="h1" // Cambié el componente a "h1" para hacerlo más destacado.
          gutterBottom
          sx={{
            color: '#001b24',  // Asegurándote de que el color es correcto.
            fontWeight: 'bold',
            fontSize: '3.0rem', // Hacer el texto más grande
            marginTop: '-px', // Subir el texto un poco más
            marginLeft: '-400px', // Desplazarlo a la izquierda
            textShadow: '2px 2px 4px rgba(0, 0, 0, 0.2)', // Agregar sombra sutil al texto para darle un efecto destacado
          }}
        >
          Informe general
        </Typography>

        <Typography
          variant="h4"  // Cambié el "h3" a "h4" para que sea más pequeño que el título principal.
          component="h2" // Cambié el componente a "h2" para mantener una jerarquía adecuada.
          gutterBottom
          sx={{
            color: '#001b24',  // Elegí un color azul para darle contraste con el título principal.
            fontWeight: 'bold',
            fontSize: '3.0rem', // Ajusté el tamaño del texto
            marginTop: '10px', // Menos espacio superior
            marginLeft: '-400px', // Desplazarlo a la izquierda
            textShadow: '2px 2px 4px rgba(0, 0, 0, 0.2)', // Sombra sutil
          }}
        >
          PTC
        </Typography>



        <motion.div
          initial={{ opacity: 0, scale: 0.8 }} // Misma animación de las cards
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          style={{
            backgroundColor: '#f8f9fa', // Fondo blanco no tan blanco
            paddingTop: '80px', // Espaciado para no tapar el NavBar
            minHeight: '100vh',
          }}
        >
          {/* Información general detective */}
          <Grid container spacing={9} sx={{ padding: '2rem' }}>
            <Grid item xs={12} md={4}>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
              >
                <Card
                  sx={{
                    position: 'relative',
                    padding: '2rem',
                    width: '100%',
                    height: '486px',
                    boxShadow: '-1px 15px 30px -12px rgb(32, 32, 32)',
                    borderRadius: '0.9rem',
                    backgroundColor: '#fff',
                    color: '#0077b6',
                    cursor: 'pointer',
                    transition: 'transform 0.3s ease-in-out',
                    overflow: 'hidden',
                    marginTop: '-60px',
                  }}
                >
                  <CardContent>
                    <Typography
                      variant="h5"
                      sx={{
                        color: '#08a9ff',
                        fontWeight: 'bold',
                        textAlign: 'center',
                        fontSize: '3.7rem',
                        marginTop: '20px',
                      }}
                    >
                      Total de Detectives
                    </Typography>
                    <Box
                      sx={{
                        fontSize: '8rem',
                        fontWeight: 'bold',
                        color: '#0077b6',
                        animation: 'beepEffect 1s ease-in-out infinite',
                        opacity: 1,
                        display: 'inline-block',
                        textAlign: 'center',
                        marginTop: '30px',
                        '@keyframes beepEffect': {
                          '0%': { transform: 'scale(1)', opacity: 1, color: '#59c1f8' },
                          '50%': { transform: 'scale(1.2)', opacity: 1, color: '#59c1f8' },
                          '100%': { transform: 'scale(1)', opacity: 1, color: '#59c1f8' },
                        },
                      }}
                    >
                      {totalDetectives}
                    </Box>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>

            {/* Cards pequeñas de especialidades */}
            <Grid item xs={12} md={8}>
              <Grid container spacing={10}>
                {Object.entries(data).map(([especialidad, cantidad], index) => (
                  <Grid item xs={12} sm={6} md={4} key={especialidad}>
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.8, delay: index * 0.1 }}
                    >

                      <Card
                        sx={{
                          padding: 1, // Reduce el espacio interno
                          marginTop: '-60px',
                          width: '250px', // Especifica un ancho más pequeño
                          height: '150px', // Especifica una altura más pequeña
                          backgroundColor: 'rgba(0, 119, 182, 0.1)',
                          borderRadius: 1.5, // Reducción del radio de los bordes
                          boxShadow: 2, // Sombra menos pronunciada
                          backdropFilter: 'blur(8px)', // Ligera reducción del desenfoque
                          border: '1px solid rgba(0, 119, 182, 0.2)',
                          transition: 'background-color 0.3s, transform 0.3s',
                          '&:hover': {
                            backgroundColor: 'rgba(0, 85, 119, 0.3)', // Fondo al hacer hover
                            transform: 'scale(1.05)', // Efecto de escala al pasar el mouse
                          },
                        }}
                      >
                        <CardContent>
                          <Typography
                            variant="h6"
                            sx={{
                              color: '#0077b6', // Azul
                              fontFamily: 'Roboto, sans-serif', // Fuente
                              fontWeight: 'bold', // Menos audaz
                              fontSize: '1.0rem', // Tamaño reducido
                              letterSpacing: '0.5px', // Menor espaciado
                              marginTop: '-7px',

                            }}
                          >
                            {especialidad}
                          </Typography>
                          <Typography
                            variant="h4"
                            sx={{
                              color: '#0077b6', // Azul
                              fontSize: '1.2rem', // Tamaño reducido
                              fontWeight: 'bold',
                              fontFamily: 'Roboto, sans-serif',
                              marginTop: 1,
                            }}
                          >
                            {cantidad}
                          </Typography>
                          <Typography sx={{ mt: 2, fontStyle: 'italic', color: '#555' }}>
                            Detectives especializados en esta área.
                          </Typography>
                        </CardContent>
                      </Card>
                    </motion.div>
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </Grid>
        </motion.div>


        <Grid item xs={12} md={4}>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            <Card sx={{ padding: 3, backgroundColor: '#f0f4f8', borderRadius: 2, boxShadow: 2 }}>
              <CardContent>
                <Typography variant="h6" sx={{ color: '#0077b6' }}>Casos Abiertos</Typography>
                <Typography variant="h4" sx={{ fontWeight: 'bold' }}>{casos.length}</Typography>
                <Typography sx={{ mt: 2 }}>Número de casos actualmente abiertos para investigación.</Typography>
              </CardContent>
            </Card>
          </motion.div>
        </Grid>

        <Grid item xs={12} md={4}>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            <Card sx={{ padding: 3, backgroundColor: '#f0f4f8', borderRadius: 2, boxShadow: 2 }}>
              <CardContent>
                <Typography variant="h6" sx={{ color: '#0077b6' }}>Clientes Atendidos</Typography>
                <Typography variant="h4" sx={{ fontWeight: 'bold' }}>{clientes.length}</Typography>
                <Typography sx={{ mt: 2 }}>Clientes que han recibido servicios de investigación en el último mes.</Typography>
              </CardContent>
            </Card>
          </motion.div>
        </Grid>


        {/* Sección de Gráficas */}
        <Box sx={{ mt: 4 }}>
          <Typography variant="h5" sx={{ color: '#0077b6', fontWeight: 'bold' }}>Casos por Mes</Typography>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="casos" stroke="#0077b6" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </Box>
      </Container>
    </Box>
  );
};

export default AdminMenu;