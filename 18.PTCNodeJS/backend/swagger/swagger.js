const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

// Configuración básica de Swagger
const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'API de Private Investigation Technology', // Título para la documentación
    version: '1.0.0', // Versión de la API
    description: 'Documentación de la API para la gestión de citas', // Descripción
  },
  servers: [
    {
      url: 'http://localhost:3000/api/', // Cambia esto por la URL de tu servidor
      description: 'Servidor de desarrollo',
    },
  ],
  tags: [
    {
      name: 'Administradores',
      description: 'Operaciones relacionadas con los administradores',
    },
    {
      name: 'Auditorías',
      description: 'Operaciones relacionadas con las auditorías',
    },
    {
      name: 'Clientes',
      description: 'Operaciones relacionadas con los clientes',
    },
    {
      name: 'Contratos',
      description: 'Operaciones relacionadas con los contratos',
    },
    {
      name: 'Detectives',
      description: 'Operaciones relacionadas con los detectives',
    },
    {
      name: 'Evidencias',
      description: 'Operaciones relacionadas con las evidencias',
    },
    {
      name: 'Facturas',
      description: 'Operaciones relacionadas con las facturas',
    },
    {
      name: 'Formularios',
      description: 'Operaciones relacionadas con los formularios',
    },
    {
      name: 'Historiales',
      description: 'Operaciones relacionadas con los historiales',
    },
    {
      name: 'Personas',
      description: 'Operaciones relacionadas con las personas',
    },
    {
      name: 'Registros de Caso',
      description: 'Operaciones relacionadas con los registros de caso',
    },
    {
      name: 'Registros de Mantenimiento',
      description: 'Operaciones relacionadas con los registros de mantenimiento',
    },
    {
      name: 'Roles',
      description: 'Operaciones relacionadas con los roles',
    },
    {
      name: 'Tipos de Evidencia',
      description: 'Operaciones relacionadas con los tipos de evidencia',
    },
    {
      name: 'Usuarios',
      description: 'Operaciones relacionadas con los usuarios',
    },
  ],
};

const options = {
  swaggerDefinition,
  apis: ['./routes/*.js'], // Ruta a los archivos que contienen anotaciones de Swagger
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = {
  swaggerUi,
  swaggerSpec,
};
