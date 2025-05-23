const fs = require('fs');
const path = require('path');

// Función para pluralizar nombres
const pluralize = (word) => {
    // Verifica si la palabra termina en vocal
    const lastChar = word.charAt(word.length - 1).toLowerCase();
    if (lastChar === 'a' || lastChar === 'e' || lastChar === 'i' || lastChar === 'o' || lastChar === 'u') {
        return `${word}s`; // Agrega "s" si termina en vocal
    }
    return `${word}es`; // Para consonantes, también agrega "es"
};

// Función para cargar las rutas dinámicamente
const loadRoutes = (app) => {
    const routesPath = __dirname; // Carpeta de rutas

    // Leer todos los archivos en la carpeta de rutas
    fs.readdirSync(routesPath).forEach((file) => {
        // Verificar que el archivo termine con '_routes.js'
        if (file.endsWith('Routes.js')) {
            const route = path.join(routesPath, file);
            // Remover el sufijo '_routes.js' y usar solo la parte anterior para el nombre de la ruta
            const routeName = path.basename(file, 'Routes.js');
            const cleanRouteName = routeName.replace('Routes', ''); // Elimina '_routes'

            // Pluralizar el nombre limpio de la ruta
            const pluralRouteName = pluralize(cleanRouteName);

            // Montar la ruta en /api/{nombre pluralizado de la ruta}
            app.use(`/api/${pluralRouteName}`, require(route));
        }
    });
};

module.exports = loadRoutes;