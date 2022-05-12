const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');

const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: "Speedrun Videos API",
      version: '1.0.0',
    },
  },
  apis: ['./src/routes*.js'],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

module.exports = {
    swaggerUI,
    swaggerDocs
}