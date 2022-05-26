const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');

const swaggerOptions = {
    swaggerDefinition: {
        openapi: "3.0.0",
        info: {
            title: "Speedrun Videos API",
            description: "Welcome to the API documentation.",
            version: '1.0.0',
        },
        host: "https://proyecto-api-fedeiar.herokuapp.com/"
    },
    apis: ['./src/index.js', './src/routes/userRoutes.js', './src/routes/gameRoutes.js', './src/routes/categoryRoutes.js', './src/routes/videoRoutes.js'],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

module.exports = {
    swaggerUI,
    swaggerDocs
}