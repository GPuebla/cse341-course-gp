const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Books API',
    description: 'API for managing books - CSE 341',
  },
  host: process.env.RENDER_EXTERNAL_HOSTNAME || 'localhost:5000',
  schemes: process.env.RENDER_EXTERNAL_HOSTNAME ? ['https'] : ['http'],
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);